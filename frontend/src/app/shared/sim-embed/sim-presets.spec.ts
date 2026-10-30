import { SIM_PRESETS, SIM_SHOW_FLAGS, TOP_MIN_RPM, SimRunRecord } from './sim-presets';

const run = (r: Partial<SimRunRecord>): SimRunRecord =>
    ({ rpm: 400, addOnMassGrams: 0, theta0Deg: 90, startMode: 'guided', pushes: 0, ...r });

describe('SIM_PRESETS', () => {
    const entries = Object.entries(SIM_PRESETS);

    it('has one entry per embed, keyed by its id', () => {
        expect(entries.map(([key]) => key)).toEqual(
            ['p1-explore', 'p2-vectors', 'p4-axes', 'p5-precession', 'p6-nutation', 'p7-release']);
        for (const [key, config] of entries) expect(config.id).toBe(key);
    });

    // missing keys would take the sim's defaults, which show L, ω, D, labels, cones and trail
    it('sets all 13 show flags in every preset', () => {
        for (const [, config] of entries) {
            expect(Object.keys(config.preset.show).sort()).toEqual([...SIM_SHOW_FLAGS].sort());
        }
    });

    it('never shows the rejected ω_P helpers', () => {
        for (const [, config] of entries) {
            expect(config.preset.show.precessionArc).toBe(false);
            expect(config.preset.show.precessionVector).toBe(false);
        }
    });

    // the simple top has no collision handling: below the safe rpm it falls through its tower
    it('keeps every rpm of the simple top at or above the safe value', () => {
        for (const [, config] of entries.filter(([, c]) => c.preset.apparatus === 'top')) {
            expect(config.preset.rpm).toBeGreaterThanOrEqual(TOP_MIN_RPM);
            for (const c of config.controls) {
                if (c.kind === 'slider' && c.key === 'rpm') expect(c.min).toBeGreaterThanOrEqual(TOP_MIN_RPM);
            }
        }
    });

    it('starts every slider within its range, on a step', () => {
        for (const [, config] of entries) {
            for (const c of config.controls) {
                if (c.kind !== 'slider') continue;
                const value = config.preset[c.key];
                expect(value).toBeGreaterThanOrEqual(c.min);
                expect(value).toBeLessThanOrEqual(c.max);
                const steps = (value - c.min) / c.step;
                expect(Math.abs(steps - Math.round(steps))).toBeLessThan(1e-9);     // fractional steps (Zeitlupe)
            }
        }
    });

    // switches only show or hide helpers and don't count
    it('offers at most three controls that change the experiment per page', () => {
        for (const [, config] of entries) {
            expect(config.controls.filter(c => c.kind !== 'switch').length).toBeLessThanOrEqual(3);
        }
    });

    it('releases p1 only after two rpm values with the weight on', () => {
        const gate = SIM_PRESETS['p1-explore'].gate;
        expect(gate([run({ rpm: 400 }), run({ rpm: 300 })])).toBe(false);
        expect(gate([run({ rpm: 400 }), run({ rpm: 400, addOnMassGrams: 30 })])).toBe(false);
        expect(gate([run({ rpm: 400, addOnMassGrams: 30 }), run({ rpm: 300, addOnMassGrams: 30 })])).toBe(true);
    });

    it('releases p5 only after two rpm and two tilt values', () => {
        const gate = SIM_PRESETS['p5-precession'].gate;
        expect(gate([run({ rpm: 400 }), run({ rpm: 300 })])).toBe(false);
        expect(gate([run({ rpm: 400 }), run({ rpm: 300 }), run({ rpm: 300, theta0Deg: 70 })])).toBe(true);
    });

    it('releases p6 only after pushes at two rpm values', () => {
        const gate = SIM_PRESETS['p6-nutation'].gate;
        expect(gate([run({ rpm: 200, pushes: 3 }), run({ rpm: 400 })])).toBe(false);
        expect(gate([run({ rpm: 200, pushes: 1 }), run({ rpm: 400, pushes: 1 })])).toBe(true);
    });

    it('releases p7 only after both start modes', () => {
        const gate = SIM_PRESETS['p7-release'].gate;
        expect(gate([run({ startMode: 'released' }), run({ startMode: 'released' })])).toBe(false);
        expect(gate([run({ startMode: 'released' }), run({ startMode: 'guided' })])).toBe(true);
    });
});
