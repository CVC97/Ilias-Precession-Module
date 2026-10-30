import { Component, Input, signal, afterNextRender } from '@angular/core';
import type { SimEmbed } from '../sim-embed/sim-embed';
import { SimControl, SimNumberKey } from '../sim-embed/sim-presets';



// Control panel below a SimEmbed: the page's sliders, switches and buttons from its
// SIM_PRESETS entry, Pause and Zurücksetzen, the readouts, and the hints. Sliders that
// restart the run send on release (change); the Zeitlupe slider sends while dragging.
@Component({
    selector: 'app-sim-panel',
    imports: [],
    templateUrl: './sim-panel.html',
    styleUrl: './sim-panel.css',
})
export class SimPanel {
    @Input({ required: true }) embed!: SimEmbed;

    readonly draft = signal<Partial<Record<SimNumberKey, number>>>({});    // slider values while dragging
    readonly mouseHint = signal(false);                                     // no camera control on touch devices

    private readonly numberFormat = new Intl.NumberFormat('de-DE', { minimumSignificantDigits: 3, maximumSignificantDigits: 3 });
    private readonly sliderFormat = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 2, useGrouping: false });

    constructor() {
        afterNextRender(() => this.mouseHint.set(window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? false));
    }

    get disabled(): boolean {
        return this.embed.status() !== 'running';
    }

    get paused(): boolean {
        return this.embed.current()?.paused ?? false;
    }

    sliderValue(key: SimNumberKey): number {
        return this.draft()[key] ?? this.embed.current()?.[key] ?? 0;
    }

    sliderText(key: SimNumberKey, unit: string): string {
        return this.sliderFormat.format(this.sliderValue(key)) + (unit === '°' ? '' : ' ') + unit;
    }

    onSliderInput(key: SimNumberKey, event: Event) {
        const value = Number((event.target as HTMLInputElement).value);
        if (key === 'timeScale') {
            this.embed.setValue(key, value);    // no restart: follow the slider
            return;
        }
        this.draft.update(d => ({ ...d, [key]: value }));
    }

    onSliderChange(key: SimNumberKey, event: Event) {
        const value = Number((event.target as HTMLInputElement).value);
        this.draft.update(d => ({ ...d, [key]: undefined }));
        this.embed.setValue(key, value);
    }

    isOn(control: SimControl): boolean {
        const p = this.embed.current();
        return !!p && control.kind === 'switch' && control.show.every(f => p.show[f]);
    }

    onSwitch(control: SimControl, event: Event) {
        if (control.kind !== 'switch') return;
        this.embed.setShow(control.show, (event.target as HTMLInputElement).checked);
    }

    onButton(control: SimControl) {
        if (control.kind !== 'button') return;
        if (control.action === 'push') this.embed.push();
        else if (control.action === 'restart') this.embed.applyPreset();
        else this.embed.setStartMode(control.action);
    }

    onReset() {
        this.draft.set({});
        this.embed.reset();
    }

    format(value: number | null | undefined): string {
        return value === null || value === undefined ? '–' : this.numberFormat.format(value);
    }

    // controls by kind, for the panel's rows
    get switches() { return this.ofKind('switch'); }
    get buttons() { return this.ofKind('button'); }
    get sliders() { return this.ofKind('slider'); }

    private ofKind<K extends SimControl['kind']>(kind: K): Extract<SimControl, { kind: K }>[] {
        return this.embed.config.controls.filter((c): c is Extract<SimControl, { kind: K }> => c.kind === kind);
    }
}
