import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SimEmbed } from './sim-embed';
import { SIM_PRESETS } from './sim-presets';
import { SimGateService } from '../../core/services/sim-gate';

async function create(presetId: string): Promise<ComponentFixture<SimEmbed>> {
    await TestBed.configureTestingModule({ imports: [SimEmbed] }).compileComponents();
    const fixture = TestBed.createComponent(SimEmbed);
    fixture.componentRef.setInput('presetId', presetId);
    await fixture.whenStable();
    return fixture;
}

afterEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
});

describe('SimEmbed without WebGL', () => {
    it('shows the notice and releases the gate', async () => {
        const fixture = await create('p1-explore');
        expect(fixture.componentInstance.status()).toBe('failed');
        expect(TestBed.inject(SimGateService).isReached('p1-explore')).toBe(true);
        expect(fixture.nativeElement.querySelector('iframe')).toBeNull();
        expect(fixture.nativeElement.textContent).toContain('nicht geladen werden');
    });
});

describe('SimEmbed with the sim', () => {
    let fixture: ComponentFixture<SimEmbed>;
    let embed: SimEmbed;
    let sim: Window;
    let sent: { cmd: string; value: unknown }[];

    // plays the sim's part: messages from the iframe's window
    const fromSim = (data: object) => window.dispatchEvent(new MessageEvent('message',
        { origin: window.location.origin, source: sim, data: { source: 'precession-sim', ...data } }));
    const state = (run: number, extra: object = {}) => fromSim({
        type: 'state', run, time: 0, apparatus: 'lab', thetaDeg: 90, phiDeg: 0, phiDot: 0,
        omegaR: 41.9, omegaP: 0, addOnMassGrams: 0, paused: false, spinLimited: false, ...extra,
    });

    beforeEach(async () => {
        vi.spyOn(SimEmbed.prototype as any, 'hasWebGL2').mockReturnValue(true);
        fixture = await create('p1-explore');
        embed = fixture.componentInstance;
        sim = fixture.nativeElement.querySelector('iframe').contentWindow;
        sent = [];
        vi.spyOn(sim, 'postMessage').mockImplementation((msg: any) => sent.push({ cmd: msg.cmd, value: msg.value }));
    });

    afterEach(() => fixture.destroy());

    it('sends the preset after ready and the first state, and runs once the new run starts', () => {
        fromSim({ type: 'ready' });
        expect(sent).toEqual([]);                           // waits for the run number
        state(1);
        expect(sent.map(m => m.cmd)).toEqual(['ApplyPreset']);
        expect((sent[0].value as any).show.L).toBe(false);
        state(1);
        expect(embed.status()).toBe('loading');             // still the default scene
        state(2);
        expect(embed.status()).toBe('running');
        expect(embed.runs()).toHaveLength(1);
    });

    it('ignores messages from other windows', () => {
        window.dispatchEvent(new MessageEvent('message',
            { origin: window.location.origin, source: window, data: { source: 'precession-sim', type: 'ready' } }));
        state(1);
        expect(sent).toEqual([]);
    });

    it('records each run and releases the gate (p1: weight on, two rpm values)', () => {
        const gate = TestBed.inject(SimGateService);
        fromSim({ type: 'ready' });
        state(1);
        state(2);

        embed.setValue('addOnMassGrams', 30);
        expect(sent.at(-1)).toEqual({ cmd: 'SetAddOnMassGrams', value: 30 });
        state(3);
        expect(gate.isReached('p1-explore')).toBe(false);

        embed.setValue('rpm', 300);
        expect(sent.at(-1)).toEqual({ cmd: 'SetRpm', value: 300 });
        state(4);
        expect(embed.runs().map(r => [r.rpm, r.addOnMassGrams])).toEqual([[400, 0], [400, 30], [300, 30]]);
        expect(gate.isReached('p1-explore')).toBe(true);
    });

    it('averages ω_P over the run, none during the first 2 s', () => {
        fromSim({ type: 'ready' });
        state(1);
        state(2, { time: 0.1, phiDeg: 0 });
        state(2, { time: 1.5, phiDeg: 10 });
        expect(embed.omegaPAverage()).toBeNull();
        state(2, { time: 10.1, phiDeg: 90 });
        expect(embed.omegaPAverage()).toBeCloseTo(Math.PI / 2 / 10, 6);
    });

    // sims from module-sim-v1.1.0 continue the run on parameter changes and count segments instead
    it('records a segment per parameter change within one run, and restarts the ω_P average there', () => {
        fromSim({ type: 'ready' });
        state(1, { segment: 1 });
        state(2, { segment: 2, time: 0 });
        state(2, { segment: 2, time: 10, phiDeg: 90 });

        embed.setValue('addOnMassGrams', 30);
        state(2, { segment: 3, time: 10.1, phiDeg: 91 });
        expect(embed.omegaPAverage()).toBeNull();
        state(2, { segment: 3, time: 15.1, phiDeg: 91 + 180 / Math.PI });
        expect(embed.omegaPAverage()).toBeCloseTo(0.2, 6);

        embed.setValue('rpm', 300);
        state(2, { segment: 4, time: 15.2 });
        expect(embed.runs().map(r => [r.rpm, r.addOnMassGrams])).toEqual([[400, 0], [400, 30], [300, 30]]);
        expect(TestBed.inject(SimGateService).isReached('p1-explore')).toBe(true);
    });

    it('pauses; a parameter change keeps it paused, a restart runs again', () => {
        fromSim({ type: 'ready' });
        state(1);
        state(2);

        embed.togglePause();
        expect(sent.at(-1)).toEqual({ cmd: 'SetPaused', value: true });
        embed.setValue('rpm', 300);
        expect(sent.at(-1)).toEqual({ cmd: 'SetRpm', value: 300 });
        expect(embed.current()!.paused).toBe(true);
        embed.applyPreset();
        expect((sent.at(-1)!.value as any).paused).toBe(false);
    });

    it('shows ω while the Rastpol- or Gangpolkegel is on (p6)', () => {
        embed.config = SIM_PRESETS['p6-nutation'];         // the switches' config is all that matters here
        embed.current.set(structuredClone(embed.config.preset));
        fromSim({ type: 'ready' });
        state(1);

        embed.setShow(['spaceCone'], true);
        embed.setShow(['bodyCone'], true);
        embed.setShow(['spaceCone'], false);
        expect(sent.at(-1)).toEqual({ cmd: 'SetHelpers', value: { spaceCone: false, omega: true } });
        embed.setShow(['bodyCone'], false);
        expect(sent.at(-1)).toEqual({ cmd: 'SetHelpers', value: { bodyCone: false, omega: false } });
        embed.setShow(['nutationCone'], false);
        expect(sent.at(-1)).toEqual({ cmd: 'SetHelpers', value: { nutationCone: false, omega: false } });
    });

    describe('assembly game (p1-assembly)', () => {
        const assembly = (event: string, extra: object = {}) => fromSim({
            type: 'assembly', phase: 'build', placed: [], slots: [1], selected: '', event, part: '', slot: 0, seq: 0, ...extra,
        });
        const control = (label: string) => embed.config.controls.find(c => c.label === label)!;

        beforeEach(() => {
            embed.presetId = 'p1-assembly';                     // the gate is stored under the embed's id
            embed.config = SIM_PRESETS['p1-assembly'];
            embed.current.set(structuredClone(embed.config.preset));
            fromSim({ type: 'ready' });
            state(1);
            state(2);
        });

        it('starts the game with its preset', () => {
            expect(sent[0]).toEqual({ cmd: 'ApplyPreset', value: expect.objectContaining({ mode: 'assembly' }) });
        });

        it('writes the page hint from event, part and marker', () => {
            assembly('begin');
            expect(embed.assembly()!.hint).toContain('Bauen Sie den Kreisel auf');
            assembly('wrong', { part: 'wheel', slot: 4, slots: [3, 4] });
            expect(embed.assembly()!.hint).toContain('Kerbe');
            assembly('wrong', { part: 'lightgate', slot: 3, slots: [3, 4] });
            expect(embed.assembly()!.hint).toContain('Ist das Rad schon eingebaut?');
            assembly('wrong', { part: 'pendulum', slot: 3, slots: [3, 4] });
            expect(embed.assembly()!.hint).toContain('Pendelversuch');
            assembly('select', { part: 'axle' });
            expect(embed.assembly()!.hint).toContain('Pendelversuch');    // selecting keeps the hint
            assembly('place', { part: 'axle', slot: 2 });
            expect(embed.assembly()!.hint).toBe('Richtig. Die Achse liegt im Lager.');
        });

        it('offers the counterweight, Andrehen and Loslassen only in their phase', () => {
            const slider = control('Ausgleichsgewicht'), spin = control('Andrehen'), release = control('Loslassen');
            expect([slider, spin, release].map(c => embed.available(c))).toEqual([false, false, false]);
            assembly('phase', { phase: 'balance' });
            expect([slider, spin, release].map(c => embed.available(c))).toEqual([true, false, false]);
            assembly('balanced', { phase: 'weight' });
            expect(embed.available(spin)).toBe(false);                  // the weight still lies on the tray
            assembly('place', { phase: 'weight', part: 'weight', slot: 6, placed: ['weight'] });
            expect([slider, spin, release].map(c => embed.available(c))).toEqual([false, true, false]);
            assembly('spin', { phase: 'spin', placed: ['weight'] });
            expect(embed.available(release)).toBe(false);               // still spinning up
            assembly('spun', { phase: 'spin', placed: ['weight'] });
            expect(embed.available(release)).toBe(true);
            expect(embed.available(control('Andrehen'))).toBe(false);
        });

        it('sends the counterweight in metres and the actions as strings', () => {
            embed.setValue('balanceCm', 17.5);
            expect(sent.at(-1)!.cmd).toBe('AssemblyBalance');
            expect(sent.at(-1)!.value).toBeCloseTo(0.175, 9);
            embed.assemblyAction('release');
            expect(sent.at(-1)).toEqual({ cmd: 'AssemblyAction', value: 'release' });
        });

        it('releases the gate on letting go, and keeps it after Zurücksetzen', () => {
            const gate = TestBed.inject(SimGateService);
            assembly('spun', { phase: 'spin' });
            expect(gate.isReached('p1-assembly')).toBe(false);
            assembly('release', { phase: 'released' });
            expect(gate.isReached('p1-assembly')).toBe(true);
            embed.reset();
            assembly('begin');
            expect(embed.assembly()!.released).toBe(true);
            expect(embed.assembly()!.phase).toBe('build');
        });
    });

    it('ignores assembly messages on the other pages', () => {
        fromSim({ type: 'ready' });
        state(1);
        fromSim({ type: 'assembly', phase: 'build', placed: [], slots: [], selected: '', event: 'begin', part: '', slot: 0, seq: 1 });
        expect(embed.assembly()).toBeNull();
    });

    it('resets to the page preset', () => {
        fromSim({ type: 'ready' });
        state(1);
        state(2);

        embed.setValue('addOnMassGrams', 30);
        embed.setValue('rpm', 300);
        embed.togglePause();
        embed.reset();
        expect(sent.at(-1)!.cmd).toBe('ApplyPreset');
        expect(sent.at(-1)!.value).toEqual(SIM_PRESETS['p1-explore'].preset);
    });
});
