import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, signal, computed, afterNextRender } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DevModeService } from '../../core/services/dev-mode';
import { SimGateService } from '../../core/services/sim-gate';
import { ThemeService } from '../../core/services/theme';
import { SimPanel } from '../sim-panel/sim-panel';
import {
    SIM_PRESETS, SET_COMMAND, SimEmbedConfig, SimPreset, SimState, SimCommand,
    SimNumberKey, SimShowFlag, SimStartMode, SimRunRecord,
} from './sim-presets';



// Embeds the Unity module build (<base>/sim/index.html) in an iframe and talks to it with
// postMessage (contract: build_process.md C5). Sends the page's preset once the sim runs,
// keeps a loading overlay until that preset's run has started, and records every run for
// the page's gate. The control panel below calls the public methods.
@Component({
    selector: 'app-sim-embed',
    imports: [SimPanel],
    templateUrl: './sim-embed.html',
    styleUrl: './sim-embed.css',
})
export class SimEmbed implements OnInit, OnDestroy {
    @Input() presetId!: string;
    @ViewChild('frame') frame?: ElementRef<HTMLIFrameElement>;

    config!: SimEmbedConfig;

    readonly frameSrc = signal<SafeResourceUrl | null>(null);   // set in the browser only
    readonly status = signal<'loading' | 'running' | 'failed'>('loading');
    readonly state = signal<SimState | null>(null);
    readonly current = signal<SimPreset | null>(null);      // the preset as changed by the controls
    readonly progress = signal('');                         // download progress of the sim's own loader
    readonly runs = signal<SimRunRecord[]>([]);

    // ω_P averaged over the segment: |Δφ| / Δt since its first state, none during the first 2 s
    readonly omegaPAverage = computed(() => {
        const s = this.state();
        const start = this.segmentStart;
        if (!s || !start || this.segmentOf(s) !== start.segment || s.time - start.time < 2) return null;
        return Math.abs(s.phiDeg - start.phiDeg) * Math.PI / 180 / (s.time - start.time);
    });

    private readonly STALL_MS = 30000;                      // no loader progress and no ready → give up
    private readyReceived = false;
    private presetSent = false;
    private runBeforePreset = 0;
    private lastRecordedSegment = 0;
    private segmentStart: { segment: number; time: number; phiDeg: number } | null = null;
    private pollTimer: ReturnType<typeof setInterval> | null = null;
    private lastProgress = '';
    private lastProgressAt = 0;

    constructor(
        private sanitizer: DomSanitizer,
        private theme: ThemeService,
        private simGate: SimGateService,
        public devMode: DevModeService
    ) {
        // browser only, after hydration: the server renders the frame with the loading overlay
        afterNextRender(() => this.start());
    }

    ngOnInit() {
        this.config = SIM_PRESETS[this.presetId];
        this.current.set(structuredClone(this.config.preset));
    }

    ngOnDestroy() {
        if (this.pollTimer !== null) clearInterval(this.pollTimer);
        window.removeEventListener('message', this.onMessage);
    }


    // +++ loading +++

    private start() {
        if (!this.hasWebGL2()) {
            this.fail();
            return;
        }
        const theme = this.theme.isDarkMode() ? '?theme=dark' : '';
        this.frameSrc.set(this.sanitizer.bypassSecurityTrustResourceUrl(`sim/index.html${theme}`));
        window.addEventListener('message', this.onMessage);
        this.lastProgressAt = Date.now();
        this.pollTimer = setInterval(() => this.pollLoader(), 500);
    }

    private hasWebGL2(): boolean {
        try {
            return !!document.createElement('canvas').getContext('webgl2');
        } catch {
            return false;
        }
    }

    // same origin: read the sim's own loading screen for the percentage and its error line
    private pollLoader() {
        if (this.readyReceived) return;
        let percent = '';
        let error = false;
        try {
            const doc = this.frame?.nativeElement.contentDocument;
            percent = doc?.querySelector('#loading-percent')?.textContent ?? '';
            const errorEl = doc?.querySelector('#loading-error') as HTMLElement | null;
            error = !!errorEl && !errorEl.hidden;
        } catch { /* not readable: only the stall timeout applies */ }

        if (percent !== this.lastProgress) {
            this.lastProgress = percent;
            this.lastProgressAt = Date.now();
            this.progress.set(percent);
        }
        if (error || Date.now() - this.lastProgressAt > this.STALL_MS) this.fail();
    }

    // never block the student on technology: notice, and the gate opens
    private fail() {
        if (this.pollTimer !== null) clearInterval(this.pollTimer);
        this.pollTimer = null;
        this.status.set('failed');
        this.simGate.markReached(this.presetId);
    }


    // +++ messages from the sim +++

    private onMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        if (event.source !== this.frame?.nativeElement.contentWindow) return;
        const data = event.data;
        if (!data || data.source !== 'precession-sim') return;

        if (data.type === 'ready') {
            this.readyReceived = true;
            if (this.pollTimer !== null) clearInterval(this.pollTimer);
            this.pollTimer = null;
            if (this.status() === 'failed') this.status.set('loading');     // a slow start after the stall notice
            if (this.state()) this.applyPreset();
        } else if (data.type === 'state') {
            this.onState(data as SimState);
        }
    };

    // older sim builds have no segment: there every parameter change restarted the run
    private segmentOf(s: SimState): number {
        return s.segment ?? s.run;
    }

    private onState(s: SimState) {
        const segment = this.segmentOf(s);
        if (!this.segmentStart || this.segmentStart.segment !== segment) {
            this.segmentStart = { segment, time: s.time, phiDeg: s.phiDeg };
        }
        this.state.set(s);

        // the preset waits for the first state, so its run number is known
        if (this.readyReceived && !this.presetSent) {
            this.applyPreset();
            return;
        }
        if (!this.presetSent || s.run <= this.runBeforePreset) return;

        if (this.status() !== 'running') this.status.set('running');
        const runs = this.runs();
        if (segment > this.lastRecordedSegment) {
            this.lastRecordedSegment = segment;
            const p = this.current()!;
            this.runs.set([...runs, {
                rpm: p.rpm, addOnMassGrams: p.addOnMassGrams, theta0Deg: p.theta0Deg, startMode: p.startMode, pushes: 0,
            }]);
            this.checkGate();
        }
    }

    private checkGate() {
        if (this.config.gate(this.runs())) this.simGate.markReached(this.presetId);
    }


    // +++ commands, used by the panel +++

    send(cmd: SimCommand, value?: unknown) {
        const target = this.frame?.nativeElement.contentWindow;
        if (!target || !this.readyReceived) return;
        target.postMessage({ source: 'precession-module', type: 'command', cmd, value }, window.location.origin);
    }

    // the whole current preset (one restart, running), then the page's follow-up commands
    applyPreset() {
        if (!this.presetSent) this.runBeforePreset = this.state()?.run ?? 0;
        this.presetSent = true;
        this.current.update(p => ({ ...p!, paused: false }));
        this.send('ApplyPreset', this.current());
        this.config.afterPreset?.forEach(cmd => this.send(cmd));
    }

    // back to the page's start values (sliders, switches, slow motion)
    reset() {
        this.current.set(structuredClone(this.config.preset));
        this.applyPreset();
    }

    togglePause() {
        const paused = !this.current()!.paused;
        this.current.update(p => ({ ...p!, paused }));
        this.send('SetPaused', paused);
    }

    // a restart or a push should be seen: SetStartMode alone would keep a paused sim paused
    private resume() {
        if (!this.current()!.paused) return;
        this.current.update(p => ({ ...p!, paused: false }));
        this.send('SetPaused', false);
    }

    // no restart, and a paused sim stays paused: the student may set up the next step before going on
    setValue(key: SimNumberKey, value: number) {
        this.current.update(p => ({ ...p!, [key]: value }));
        this.send(SET_COMMAND[key], value);
    }

    setShow(flags: SimShowFlag[], on: boolean) {
        const change = Object.fromEntries(flags.map(f => [f, on]));
        this.current.update(p => ({ ...p!, show: { ...p!.show, ...change } }));
        this.send('SetHelpers', change);
    }

    setStartMode(mode: SimStartMode) {
        this.current.update(p => ({ ...p!, startMode: mode }));
        this.send('SetStartMode', mode);
        this.resume();
    }

    push() {
        this.send('Push');
        this.resume();
        const runs = this.runs();
        if (runs.length === 0) return;
        const last = runs[runs.length - 1];
        this.runs.set([...runs.slice(0, -1), { ...last, pushes: last.pushes + 1 }]);
        this.checkGate();
    }

    get gateReached(): boolean {
        return this.simGate.isReached(this.presetId);
    }

    get stateText(): string {
        return JSON.stringify(this.state());
    }
}
