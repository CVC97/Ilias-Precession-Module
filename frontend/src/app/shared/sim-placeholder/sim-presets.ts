// Planned simulation presets, one per embed. Phase 6 turns each entry into an
// ApplyPreset(json) call and the page's control panel; until then the
// SimPlaceholder component shows the entry in place of the iframe.
// Parameter names follow WebBridge.cs (rpm 0–3000, theta0 1–89°, phiDot0 in rad/s).

export interface SimPresetPlan {
    id: string;
    page: string;                       // route + sub-page the embed sits on
    description: string;                // what the sim should show (dev note)
    settings: {
        rpm?: number;
        theta0?: number;
        phiDot0?: number;
        showL?: boolean;
        showOmega?: boolean;
        showTorque?: boolean;
    };
    controls: string[];                 // controls the page panel offers
    task?: string;                      // student-facing task, as in the page text
    gate?: string;                      // planned "Weiter" gate (Phase 6), if any
}

export const SIM_PRESETS: Record<string, SimPresetPlan> = {
    'p1-explore': {
        id: 'p1-explore',
        page: '/learning/p1-setup?page=3',
        description: 'Erster Kontakt: Kreisel ohne Vektoren, freie Exploration von Drehzahl und Neigung.',
        settings: { rpm: 1500, theta0: 60, phiDot0: 0, showL: false, showOmega: false, showTorque: false },
        controls: ['rpm', 'theta0', 'pause', 'restart'],
        task: 'Lassen Sie den Kreisel zuerst mit hoher, dann mit immer kleinerer Drehzahl laufen und beobachten Sie die Bewegung der Achse.',
        gate: 'Weiter erst nach mindestens zwei verschiedenen Drehzahlen (interactionThresholdReached).',
    },
    'p2-vectors': {
        id: 'p2-vectors',
        page: '/learning/p2-rotation?page=2',
        description: 'L und ω als Pfeile, kein Drehmomentpfeil. phiDot0 so wählen, dass möglichst reine Präzession entsteht (in Phase 6 bestimmen).',
        settings: { rpm: 2000, theta0: 45, showL: true, showOmega: true, showTorque: false },
        controls: ['rpm', 'pause', 'restart'],
        task: 'Verändern Sie die Drehzahl. Wie ändern sich die Längen der beiden Pfeile?',
    },
    'p4-axes': {
        id: 'p4-axes',
        page: '/learning/p4-gyroscope?page=2',
        description: 'L und ω eingeblendet; kleine Drehzahl mit großer Anfangs-Präzessionsgeschwindigkeit, damit L, ω und Figurenachse sichtbar auseinanderliegen.',
        settings: { rpm: 300, theta0: 45, phiDot0: 5, showL: true, showOmega: true, showTorque: false },
        controls: ['rpm', 'phiDot0', 'pause', 'restart'],
        task: 'Kleine Drehzahl, große Anfangsgeschwindigkeit der Achse: Richtungen von L, ω und Figurenachse vergleichen; dann Drehzahl schrittweise erhöhen.',
        gate: 'Weiter erst nach mindestens zwei verschiedenen Drehzahlen (interactionThresholdReached).',
    },
    'p5-precession': {
        id: 'p5-precession',
        page: '/learning/p5-precession?page=3',
        description: 'Präzession mit allen drei Pfeilen. phiDot0 passend zur stationären Präzession, damit die Nutation klein bleibt. Readout ω_P (C# → JS) wünschenswert. Optional (A6.3): Drehmoment über Masse/Hebelarm einstellbar.',
        settings: { rpm: 2000, theta0: 60, showL: true, showOmega: true, showTorque: true },
        controls: ['rpm', 'theta0', 'pause', 'restart'],
        task: 'Drehzahl variieren (ω_P ∝ 1/ω_R?), Neigung variieren (ω_P unabhängig von θ?), Richtung von D relativ zu L beobachten.',
        gate: 'Weiter erst nach mindestens zwei Drehzahlen und zwei Neigungswinkeln.',
    },
};
