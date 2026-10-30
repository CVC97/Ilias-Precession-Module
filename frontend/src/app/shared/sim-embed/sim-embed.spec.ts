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

    it('pauses, and a restart runs again', () => {
        fromSim({ type: 'ready' });
        state(1);
        state(2);

        embed.togglePause();
        expect(sent.at(-1)).toEqual({ cmd: 'SetPaused', value: true });
        embed.setValue('rpm', 300);
        expect(sent.slice(-2)).toEqual([{ cmd: 'SetRpm', value: 300 }, { cmd: 'SetPaused', value: false }]);
        expect(embed.current()!.paused).toBe(false);
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
