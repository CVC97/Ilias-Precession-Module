import { SIM_PRESETS, SIM_SHOW_FLAGS, TOP_MIN_RPM, SimRunRecord } from './sim-presets';

const run = (r: Partial<SimRunRecord>): SimRunRecord =>
    ({ rpm: 400, addOnMassGrams: 0, theta0Deg: 90, startMode: 'guided', pushes: 0, ...r });

describe('SIM_PRESETS', () => {
    const entries = Object.entries(SIM_PRESETS);

    it('has one entry per embed, keyed by its id', () => {
        expect(entries.map(([key]) => key)).toEqual(
            ['p1-assembly', 'p1-explore', 'p2-vectors', 'p4-axes', 'p5-precession', 'p6-nutation', 'p7-release', 'free-lab']);
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
                const value = config.preset[c.key]!;
                expect(value).toBeDefined();
                expect(value).toBeGreaterThanOrEqual(c.min);
                expect(value).toBeLessThanOrEqual(c.max);
                const steps = (value - c.min) / c.step;
                expect(Math.abs(steps - Math.round(steps))).toBeLessThan(1e-9);     // fractional steps (Zeitlupe)
            }
        }
    });

    // switches only show or hide helpers and don't count; the free simulation offers everything on purpose
    it('offers at most three controls that change the experiment per learning page', () => {
        for (const [, config] of entries.filter(([, c]) => !c.free)) {
            expect(config.controls.filter(c => c.kind !== 'switch').length).toBeLessThanOrEqual(3);
        }
    });

    it('gates every learning page, and only those', () => {
        for (const [, config] of entries) {
            expect(!!config.gate).toBe(!config.free);
            expect(!!config.gateHint).toBe(!config.free);
        }
    });

    it('shows nothing but the apparatus in the free simulation', () => {
        expect(Object.values(SIM_PRESETS['free-lab'].preset.show).every(on => !on)).toBe(true);
    });

    it('releases the assembly game only once the gyroscope was let go', () => {
        const gate = SIM_PRESETS['p1-assembly'].gate!;
        const progress = { phase: 'spin' as const, placed: [], spun: true, released: false, hint: '' };
        expect(gate([run({}), run({ rpm: 300 })], null)).toBe(false);
        expect(gate([], progress)).toBe(false);
        expect(gate([], { ...progress, phase: 'released', released: true })).toBe(true);
    });

    // the balance position (1.3 kg · 12 cm / 0.9 kg ≈ 17.3 cm, LabGyroscope) must be reachable within the sim's 4 mm
    it('lets the counterweight slider reach the balance position', () => {
        const slider = SIM_PRESETS['p1-assembly'].controls.find(c => c.kind === 'slider')!;
        if (slider.kind !== 'slider') throw new Error('no slider');
        const balanceCm = 1.3 * 12 / 0.9;
        const nearest = slider.min + Math.round((balanceCm - slider.min) / slider.step) * slider.step;
        expect(Math.abs(nearest - balanceCm)).toBeLessThan(0.4);
        expect(slider.min).toBeGreaterThanOrEqual(8);       // the sim's range, 0.08–0.24 m
        expect(slider.max).toBeLessThanOrEqual(24);
    });

    it('releases p1 only after two rpm values with the weight on', () => {
        const gate = SIM_PRESETS['p1-explore'].gate!;
        expect(gate([run({ rpm: 400 }), run({ rpm: 300 })])).toBe(false);
        expect(gate([run({ rpm: 400 }), run({ rpm: 400, addOnMassGrams: 30 })])).toBe(false);
        expect(gate([run({ rpm: 400, addOnMassGrams: 30 }), run({ rpm: 300, addOnMassGrams: 30 })])).toBe(true);
    });

    it('releases p5 only after two rpm and two tilt values', () => {
        const gate = SIM_PRESETS['p5-precession'].gate!;
        expect(gate([run({ rpm: 400 }), run({ rpm: 300 })])).toBe(false);
        expect(gate([run({ rpm: 400 }), run({ rpm: 300 }), run({ rpm: 300, theta0Deg: 70 })])).toBe(true);
    });

    it('releases p6 only after pushes at two rpm values', () => {
        const gate = SIM_PRESETS['p6-nutation'].gate!;
        expect(gate([run({ rpm: 200, pushes: 3 }), run({ rpm: 400 })])).toBe(false);
        expect(gate([run({ rpm: 200, pushes: 1 }), run({ rpm: 400, pushes: 1 })])).toBe(true);
    });

    it('releases p7 only after both start modes', () => {
        const gate = SIM_PRESETS['p7-release'].gate!;
        expect(gate([run({ startMode: 'released' }), run({ startMode: 'released' })])).toBe(false);
        expect(gate([run({ startMode: 'released' }), run({ startMode: 'guided' })])).toBe(true);
    });
});
