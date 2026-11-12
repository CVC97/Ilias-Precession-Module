// One entry per simulation embed: the complete ApplyPreset state, the controls the page
// offers, the readouts it shows and the rule that releases its "Weiter" button.
// Keys and commands follow the module build's bridge (design_notes.md section 4, ModuleWebBridge.cs).
// Every preset is a complete state: missing keys would take the sim's defaults, which show
// almost every helper. Values and reasons per page: design_notes.md section 6.

export const SIM_SHOW_FLAGS = [
    'L', 'omega', 'D', 'labels', 'figureAxis', 'verticalAxis',
    'precessionCone', 'nutationCone', 'spaceCone', 'bodyCone', 'trail',
    'precessionArc', 'precessionVector',
] as const;

export type SimShowFlag = typeof SIM_SHOW_FLAGS[number];
export type SimShow = Record<SimShowFlag, boolean>;
export type SimApparatus = 'lab' | 'top';
export type SimStartMode = 'guided' | 'released';

export interface SimPreset {
    // 'assembly': the students build the lab gyroscope (from module-sim-v1.4.0). The sim then sets apparatus, values
    // and helpers itself and only takes timeScale and paused from the preset; the other keys stay for completeness.
    mode?: 'simulation' | 'assembly';
    balanceCm?: number;                 // assembly only, page side: the counterweight slider's start (the sim's 11 cm)
    apparatus: SimApparatus;
    rpm: number;                        // lab ≤ 800, top ≤ 3000 (clamped by the sim)
    addOnMassGrams: number;             // lab only, 0 = balanced (no torque)
    theta0Deg: number;                  // angle between L (wheel side) and the vertical
    startMode: SimStartMode;
    pushThetaDot: number;               // strength of "Push" in rad/s (up/down) …
    pushPhiDot: number;                 // … and sideways
    frictionFactor: number;             // Lagerreibung, × the lab value (τ = 120 s), 0 = none
    timeScale: number;
    paused: boolean;
    show: SimShow;
}

// state message of the sim, ~10 Hz
export interface SimState {
    run: number;                        // +1 on every restart
    segment?: number;                   // +1 on every restart and rpm/weight/θ₀ change (these continue the run); missing in sim builds before module-sim-v1.1.0
    time: number;                       // s of simulated time since the restart
    apparatus: SimApparatus;
    thetaDeg: number;
    phiDeg: number;                     // continuous, not wrapped
    phiDot: number;                     // rad/s, signed
    omegaR: number;                     // rad/s
    omegaP: number;                     // rad/s, instantaneous
    addOnMassGrams: number;
    paused: boolean;
    spinLimited: boolean;               // drawn spin slower than the real one
}

// assembly game, on every event (ModuleAssemblyMessage in the sim). Part ids: pivot (Lagerbock), axle (Achse), wheel
// (Rad), counterweight (Ausgleichsgewicht), lightgate (Lichtschranke), weight (Zusatzgewicht), pendulum (Pendelgewicht,
// fits nowhere). Markers 1–6: rod top, bearing, wheel end, other end, beside the wheel, notch.
export type SimAssemblyPhase = 'build' | 'balance' | 'weight' | 'spin' | 'released';
export interface SimAssemblyMessage {
    phase: SimAssemblyPhase;
    placed: string[];                   // parts on their markers (or on the way there)
    slots: number[];                    // markers shown now
    selected: string;                   // part id or ''
    event: 'begin' | 'select' | 'deselect' | 'grab' | 'place' | 'wrong' | 'back' | 'unavailable' |
           'phase' | 'balanced' | 'spin' | 'spun' | 'release' | 'end';
    part: string;                       // part id or ''
    slot: number;                       // marker, 0 = none
    seq: number;
}

// what the page keeps of the game: the panel's buttons and the gate read it
export interface SimAssemblyProgress {
    phase: SimAssemblyPhase;
    placed: string[];
    spun: boolean;                      // the wheel runs at full speed: "Loslassen" possible
    released: boolean;                  // let go at least once since the page was opened
    hint: string;                       // the page's hint for the last event (assembly-hints.ts)
}

export type SimCommand =
    'ApplyPreset' | 'SetHelpers' | 'SetApparatus' | 'SetStartMode' | 'SetRpm' | 'SetAddOnMassGrams' |
    'SetTheta0Deg' | 'SetFriction' | 'SetTimeScale' | 'SetPaused' | 'SetPushThetaDot' | 'SetPushPhiDot' |
    'Restart' | 'Push' | 'AssemblyBalance' | 'AssemblyAction';

// preset keys a control may change, and the command that changes each one alone
export type SimNumberKey =
    'rpm' | 'addOnMassGrams' | 'theta0Deg' | 'timeScale' | 'frictionFactor' | 'pushThetaDot' | 'balanceCm';
// none of them restarts: the gyroscope goes on from where it is (a new θ₀ tilts the axle at its azimuth)
export const SET_COMMAND: Record<SimNumberKey, SimCommand> = {
    rpm: 'SetRpm',
    addOnMassGrams: 'SetAddOnMassGrams',
    theta0Deg: 'SetTheta0Deg',
    timeScale: 'SetTimeScale',
    frictionFactor: 'SetFriction',
    pushThetaDot: 'SetPushThetaDot',    // strength of the next Stoß; from sim v1.3.0 (older builds drop it)
    balanceCm: 'AssemblyBalance',       // the sim takes metres (SEND_FACTOR) and acts only in the balance phase
};

// slider value × factor = the command's value
export const SEND_FACTOR: Partial<Record<SimNumberKey, number>> = { balanceCm: 0.01 };

// label: HTML (sub/sup only, no MathJax: the panel updates at 10 Hz). Parameters are always
// sliders (also two-valued ones like the weight on p1, and the bearing friction of the free simulation);
// switches only show or hide helpers.
// alsoShows: flags that are on while at least one switch naming them is on (p6: ω with either cone it touches).
// Pause is on every panel, Zurücksetzen on panels with a slider or switch; neither is listed here.
// The assembly game's buttons and its slider are greyed out outside their phase (SimEmbed.available).
export type SimShowSwitch = { kind: 'switch'; show: SimShowFlag[]; label: string; alsoShows?: SimShowFlag[] };
export type SimButtonAction = 'push' | SimStartMode | 'assemblySpin' | 'assemblyRelease';
export type SimControl =
    | { kind: 'slider'; key: SimNumberKey; label: string; unit: string; min: number; max: number; step: number }
    | SimShowSwitch
    | { kind: 'button'; label: string; action: SimButtonAction };

export type SimReadout = 'omegaR' | 'omegaP';

// what was set in one segment of the sim (from a restart or parameter change to the next); the gate rules read the
// list of all segments on the page
export interface SimRunRecord {
    rpm: number;
    addOnMassGrams: number;
    theta0Deg: number;
    startMode: SimStartMode;
    pushes: number;                     // pushes by the student in this segment
}

export interface SimEmbedConfig {
    id: string;
    page: string;                       // route + sub-page the embed sits on
    learningTarget: string;             // dev note
    preset: SimPreset;
    afterPreset?: SimCommand[];         // sent right after every ApplyPreset
    controls: SimControl[];
    readouts?: SimReadout[];
    // none: nothing to unlock (the free simulation); assembly: the game's progress, null on the other pages
    gate?: (runs: SimRunRecord[], assembly?: SimAssemblyProgress | null) => boolean;
    gateHint?: string;                  // shown below the panel until the gate is reached
    free?: boolean;                     // free experimenting: all parameters, no limit on the number of controls
}


// all helpers off; presets switch on what the page needs
export const HIDE_ALL: SimShow = {
    L: false, omega: false, D: false, labels: false, figureAxis: false, verticalAxis: false,
    precessionCone: false, nutationCone: false, spaceCone: false, bodyCone: false, trail: false,
    precessionArc: false, precessionVector: false,
};

// lowest rpm at which the simple top neither falls nor swings through its tower (60°)
export const TOP_MIN_RPM = 1000;

const distinct = (values: (number | string)[]) => new Set(values).size;

const RPM_SLIDER_LAB: SimControl = { kind: 'slider', key: 'rpm', label: 'Drehzahl', unit: 'U/min', min: 150, max: 800, step: 50 };
const ZEITLUPE_SLIDER: SimControl = { kind: 'slider', key: 'timeScale', label: 'Zeitlupe', unit: '×', min: 0.1, max: 1, step: 0.05 };


export const SIM_PRESETS: Record<string, SimEmbedConfig> = {
    // the assembly game (Melissa Atik): the parts lie on a tray and are placed with the mouse or a finger in the canvas;
    // the page offers only what the canvas can't: the counterweight, spinning up and letting go
    'p1-assembly': {
        id: 'p1-assembly',
        page: '/learning/p1-setup?page=2',
        learningTarget: 'Wo jedes Bauteil sitzt und wozu: Lagerbock, Achse, Rad, Ausgleichsgewicht, Lichtschranke, Zusatzgewicht; ausbalancieren, dann kippt die Achse ohne Drehung mit dem Zusatzgewicht.',
        preset: {
            mode: 'assembly', balanceCm: 11,
            apparatus: 'lab', rpm: 400, addOnMassGrams: 30, theta0Deg: 90, startMode: 'released',
            pushThetaDot: 0, pushPhiDot: 0, frictionFactor: 0, timeScale: 1, paused: false,
            show: { ...HIDE_ALL },
        },
        controls: [
            { kind: 'slider', key: 'balanceCm', label: 'Ausgleichsgewicht', unit: 'cm', min: 8, max: 24, step: 0.5 },
            { kind: 'button', label: 'Andrehen', action: 'assemblySpin' },
            { kind: 'button', label: 'Loslassen', action: 'assemblyRelease' },
        ],
        gate: (_runs, assembly) => !!assembly?.released,
        gateHint: 'Weiter geht es, sobald Sie den Kreisel vollständig aufgebaut, angedreht und losgelassen haben.',
    },
    'p1-explore': {
        id: 'p1-explore',
        page: '/learning/p1-setup?page=3',
        learningTarget: 'Phänomen ohne Theorie: mit Zusatzgewicht kippt der Kreisel nicht, sondern dreht sich seitwärts – je langsamer das Rad, desto schneller.',
        preset: {
            apparatus: 'lab', rpm: 400, addOnMassGrams: 0, theta0Deg: 90, startMode: 'guided',
            pushThetaDot: 0, pushPhiDot: 0, frictionFactor: 0, timeScale: 1, paused: false,
            show: { ...HIDE_ALL },
        },
        controls: [
            { kind: 'slider', key: 'addOnMassGrams', label: 'Zusatzgewicht', unit: 'g', min: 0, max: 30, step: 30 },
            RPM_SLIDER_LAB,
        ],
        gate: (runs) => distinct(runs.filter(r => r.addOnMassGrams > 0).map(r => r.rpm)) >= 2,
        gateHint: 'Weiter geht es, sobald Sie das Zusatzgewicht angehängt und damit mindestens zwei Drehzahlen ausprobiert haben.',
    },
    'p2-vectors': {
        id: 'p2-vectors',
        page: '/learning/p2-rotation?page=2',
        learningTarget: 'L und ω liegen auf der Drehachse, zeigen in dieselbe Richtung und wachsen proportional zur Drehzahl.',
        preset: {
            apparatus: 'top', rpm: 2400, addOnMassGrams: 0, theta0Deg: 60, startMode: 'guided',
            pushThetaDot: 0, pushPhiDot: 0, frictionFactor: 0, timeScale: 1, paused: false,
            show: { ...HIDE_ALL, L: true, omega: true, labels: true },
        },
        controls: [
            { kind: 'slider', key: 'rpm', label: 'Drehzahl', unit: 'U/min', min: 1500, max: 3000, step: 100 },
            ZEITLUPE_SLIDER,
        ],
        gate: (runs) => distinct(runs.map(r => r.rpm)) >= 2,
        gateHint: 'Weiter geht es, sobald Sie mindestens zwei Drehzahlen ausprobiert haben.',
    },
    'p4-axes': {
        id: 'p4-axes',
        page: '/learning/p4-gyroscope?page=2',
        learningTarget: 'Figurenachse, L und ω sind verschiedene Richtungen, wenn sich die Achse bewegt; mit wachsender Drehzahl rücken L und ω an die Figurenachse.',
        preset: {
            apparatus: 'top', rpm: 1000, addOnMassGrams: 0, theta0Deg: 60, startMode: 'guided',
            pushThetaDot: 0, pushPhiDot: 4, frictionFactor: 0, timeScale: 0.25, paused: false,
            show: { ...HIDE_ALL, L: true, omega: true, labels: true, figureAxis: true },
        },
        afterPreset: ['Push'],
        controls: [
            { kind: 'slider', key: 'rpm', label: 'Drehzahl', unit: 'U/min', min: TOP_MIN_RPM, max: 3000, step: 250 },
            ZEITLUPE_SLIDER,
        ],
        gate: (runs) => distinct(runs.map(r => r.rpm)) >= 2,
        gateHint: 'Weiter geht es, sobald Sie mindestens zwei Drehzahlen ausprobiert haben.',
    },
    'p5-precession': {
        id: 'p5-precession',
        page: '/learning/p5-precession?page=3',
        learningTarget: 'ω_P ∝ 1/ω_R, ω_P unabhängig von θ, D waagrecht und senkrecht zu L (Zusatzgewicht statt Eigengewicht).',
        preset: {
            apparatus: 'lab', rpm: 400, addOnMassGrams: 30, theta0Deg: 90, startMode: 'guided',
            pushThetaDot: 0, pushPhiDot: 0, frictionFactor: 0, timeScale: 1, paused: false,
            show: { ...HIDE_ALL, L: true, D: true, labels: true, verticalAxis: true, precessionCone: true },
        },
        controls: [
            RPM_SLIDER_LAB,
            { kind: 'slider', key: 'addOnMassGrams', label: 'Zusatzgewicht', unit: 'g', min: 10, max: 60, step: 10 },
            { kind: 'slider', key: 'theta0Deg', label: 'Neigung θ<sub>0</sub>', unit: '°', min: 60, max: 120, step: 10 },
        ],
        readouts: ['omegaR', 'omegaP'],
        gate: (runs) => distinct(runs.map(r => r.rpm)) >= 2 && distinct(runs.map(r => r.theta0Deg)) >= 2,
        gateHint: 'Weiter geht es, sobald Sie mindestens zwei Drehzahlen und zwei Neigungswinkel ausprobiert haben.',
    },
    'p6-nutation': {
        id: 'p6-nutation',
        page: '/learning/p6-nutation?page=3',
        learningTarget: 'Nutation des ausbalancierten Kreisels nach einem Stoß (Nutationskegel um das raumfeste L); mehr Drehzahl: schneller und enger. Optional Rast- und Gangpolkegel.',
        preset: {
            apparatus: 'lab', rpm: 200, addOnMassGrams: 0, theta0Deg: 90, startMode: 'guided',
            pushThetaDot: 2, pushPhiDot: 0, frictionFactor: 0, timeScale: 1, paused: false,
            show: { ...HIDE_ALL, L: true, labels: true, figureAxis: true, nutationCone: true },
        },
        controls: [
            { kind: 'slider', key: 'rpm', label: 'Drehzahl', unit: 'U/min', min: 150, max: 600, step: 50 },
            ZEITLUPE_SLIDER,
            { kind: 'button', label: 'Stoß', action: 'push' },
            { kind: 'switch', show: ['nutationCone'], label: 'Nutationskegel' },
            { kind: 'switch', show: ['spaceCone'], label: 'Rastpolkegel', alsoShows: ['omega'] },
            { kind: 'switch', show: ['bodyCone'], label: 'Gangpolkegel', alsoShows: ['omega'] },
        ],
        gate: (runs) => distinct(runs.filter(r => r.pushes > 0).map(r => r.rpm)) >= 2,
        gateHint: 'Weiter geht es, sobald Sie den Kreisel bei mindestens zwei Drehzahlen angestoßen haben.',
    },
    'p7-release': {
        id: 'p7-release',
        page: '/learning/p7-measurement?page=2',
        learningTarget: 'Losgelassen: die Achse sackt ab und nickt (Spitzen in der Bahn); geführt: gleichmäßige Präzession.',
        preset: {
            apparatus: 'lab', rpm: 250, addOnMassGrams: 40, theta0Deg: 90, startMode: 'released',
            pushThetaDot: 0, pushPhiDot: 0, frictionFactor: 0, timeScale: 1, paused: false,
            show: { ...HIDE_ALL, trail: true },
        },
        controls: [
            { kind: 'button', label: 'Loslassen', action: 'released' },
            { kind: 'button', label: 'Geführt starten', action: 'guided' },
        ],
        gate: (runs) => distinct(runs.map(r => r.startMode)) >= 2,
        gateHint: 'Weiter geht es, sobald Sie den Kreisel einmal losgelassen und einmal geführt gestartet haben.',
    },
    // Vertiefung: the lab experiment as the students will see it, every parameter, no helpers, no gate
    'free-lab': {
        id: 'free-lab',
        page: '/learning/p8-deepening?page=1',
        learningTarget: 'Freies Experimentieren am Versuchskreisel, ohne Pfeile, Kegel und Beschriftungen.',
        preset: {
            apparatus: 'lab', rpm: 400, addOnMassGrams: 30, theta0Deg: 90, startMode: 'guided',
            pushThetaDot: 2, pushPhiDot: 0, frictionFactor: 0, timeScale: 1, paused: false,
            show: { ...HIDE_ALL },
        },
        controls: [
            RPM_SLIDER_LAB,
            { kind: 'slider', key: 'addOnMassGrams', label: 'Zusatzgewicht', unit: 'g', min: 0, max: 60, step: 10 },
            { kind: 'slider', key: 'theta0Deg', label: 'Neigung θ<sub>0</sub>', unit: '°', min: 60, max: 120, step: 10 },
            { kind: 'slider', key: 'pushThetaDot', label: 'Stoßstärke', unit: 'rad/s', min: 0.5, max: 4, step: 0.5 },
            { kind: 'slider', key: 'frictionFactor', label: 'Lagerreibung', unit: '×', min: 0, max: 5, step: 0.5 },
            ZEITLUPE_SLIDER,
            { kind: 'button', label: 'Stoß', action: 'push' },
        ],
        free: true,
    },
};
