import * as p1Content from '../../features/learning_features/p1-setup/p1-setup-content';
import * as p2Content from '../../features/learning_features/p2-rotation/p2-rotation-content';
import * as p3Content from '../../features/learning_features/p3-pendulum/p3-pendulum-content';
import * as p4Content from '../../features/learning_features/p4-gyroscope/p4-gyroscope-content';
import * as p5Content from '../../features/learning_features/p5-precession/p5-precession-content';

export type TextStyle = 'normal' | 'lamp' | 'glossary';

export type ReportBlock =
    | { type: 'text';     html: string; style?: TextStyle }
    | { type: 'image';    src: string; alt: string; caption?: string }
    | { type: 'question'; questionId: string }
    | { type: 'spoiler';  label: string; html: string };

export interface PageDefinition {
    route: string;
    page: number;
    title: string;
    subtitle?: string;
    blocks: ReportBlock[];
}

export const PAGE_REGISTRY: PageDefinition[] = [

    // ── 1: Einstieg Versuchsaufbau ────────────────────────────────────────
    {
        route: '/learning/p1-setup', page: 1,
        title: '[1] Einstieg: Versuchsaufbau', subtitle: 'Einführung',
        blocks: [
            { type: 'text',  html: p1Content.setupText1a },
            { type: 'image', src: 'assets/images/p1_setup/versuchsaufbau.png',
              alt: 'Versuchsaufbau Kreiselpräzession', caption: p1Content.setupText1b },
            { type: 'text',  html: p1Content.setupText1c },
            { type: 'question', questionId: 'p1-setup-1-kreisel-teile' },
        ],
    },
    {
        route: '/learning/p1-setup', page: 2,
        title: '[1] Einstieg: Versuchsaufbau', subtitle: 'Komponenten',
        blocks: [
            { type: 'image', src: 'assets/images/p1_setup/versuchsaufbau.png',
              alt: 'Versuchsaufbau Kreiselpräzession' },
            { type: 'text', html: p1Content.setupText2a },
            { type: 'text', html: p1Content.setupText2b, style: 'lamp' },
            { type: 'question', questionId: 'p1-setup-2-ausgleichsgewicht' },
            { type: 'question', questionId: 'p1-setup-3-messgeraete' },
        ],
    },
    {
        route: '/learning/p1-setup', page: 3,
        title: '[1] Einstieg: Versuchsaufbau', subtitle: 'Messprogramm',
        blocks: [
            { type: 'text', html: p1Content.setupText3a },
            { type: 'text', html: p1Content.setupText3b, style: 'lamp' },
            { type: 'text', html: p1Content.setupText3c },
            { type: 'question', questionId: 'p1-setup-4-erwartung' },
            { type: 'text', html: p1Content.setupText3d },
            { type: 'text', html: p1Content.setupText3e },
        ],
    },

    // ── 2: Grundlagen der Rotation ────────────────────────────────────────
    {
        route: '/learning/p2-rotation', page: 1,
        title: '[2] Grundlagen der Rotation', subtitle: 'Winkelgeschwindigkeit',
        blocks: [
            { type: 'text',  html: p2Content.rotationText1a },
            { type: 'image', src: 'assets/images/p2_rotation/omega_vektor.svg',
              alt: 'Winkelgeschwindigkeit als Vektor', caption: p2Content.rotationText1b },
            { type: 'text',  html: p2Content.rotationText1c, style: 'lamp' },
            { type: 'question', questionId: 'p2-rotation-1-omega-richtung' },
        ],
    },
    {
        route: '/learning/p2-rotation', page: 2,
        title: '[2] Grundlagen der Rotation', subtitle: 'Drehimpuls',
        blocks: [
            { type: 'text',  html: p2Content.rotationText2a },
            { type: 'text',  html: p2Content.rotationText2b, style: 'lamp' },
            { type: 'image', src: 'assets/images/p2_rotation/drehimpuls_vektor.svg',
              alt: 'Drehimpuls und Winkelgeschwindigkeit' },
            { type: 'text',  html: p2Content.rotationText2c },
            { type: 'question', questionId: 'p2-rotation-2-drehzahl-drehimpuls' },
            { type: 'question', questionId: 'p2-rotation-3-ring-scheibe' },
            { type: 'text',  html: p2Content.rotationText2d },
        ],
    },
    {
        route: '/learning/p2-rotation', page: 3,
        title: '[2] Grundlagen der Rotation', subtitle: 'Drehmoment',
        blocks: [
            { type: 'text', html: p2Content.rotationText3a },
            { type: 'text', html: p2Content.rotationText3b, style: 'lamp' },
            { type: 'text', html: p2Content.rotationText3c },
            { type: 'text', html: p2Content.rotationText3d, style: 'glossary' },
            { type: 'question', questionId: 'p2-rotation-4-antriebsschnur' },
            { type: 'question', questionId: 'p2-rotation-5-drehmoment-aussagen' },
            { type: 'text', html: p2Content.rotationText3e },
        ],
    },

    // ── 3: Trägheitsmoment: physikalisches Pendel ─────────────────────────
    {
        route: '/learning/p3-pendulum', page: 1,
        title: '[3] Trägheitsmoment: physikalisches Pendel', subtitle: 'Das Rad als Pendel',
        blocks: [
            { type: 'text',  html: p3Content.pendulumText1a },
            { type: 'image', src: 'assets/images/p3_pendulum/pendel_skizze.svg',
              alt: 'Rad mit ausgelenktem Pendelgewicht', caption: p3Content.pendulumText1b },
            { type: 'text',  html: p3Content.pendulumText1c },
            { type: 'text',  html: p3Content.pendulumText1d, style: 'lamp' },
            { type: 'text',  html: p3Content.pendulumText1e },
            { type: 'question', questionId: 'p3-pendulum-1-traegheitsmoment' },
            { type: 'question', questionId: 'p3-pendulum-2-annahmen' },
        ],
    },
    {
        route: '/learning/p3-pendulum', page: 2,
        title: '[3] Trägheitsmoment: physikalisches Pendel', subtitle: 'Messung und Fehlerquellen',
        blocks: [
            { type: 'text', html: p3Content.pendulumText2a },
            { type: 'question', questionId: 'p3-pendulum-3-gegenueber' },
            { type: 'question', questionId: 'p3-pendulum-4-zehn-perioden' },
            { type: 'text', html: p3Content.pendulumText2b, style: 'lamp' },
            { type: 'text', html: p3Content.pendulumText2c },
        ],
    },

    // ── 4: Der Kreisel ────────────────────────────────────────────────────
    {
        route: '/learning/p4-gyroscope', page: 1,
        title: '[4] Der Kreisel', subtitle: 'Drei Achsen',
        blocks: [
            { type: 'text',  html: p4Content.gyroText1a },
            { type: 'image', src: 'assets/images/p4_gyroscope/kreiselachsen.png',
              alt: 'Figurenachse, Impulsachse und Drehachse', caption: p4Content.gyroText1b },
            { type: 'text',  html: p4Content.gyroText1c },
            { type: 'text',  html: p4Content.gyroText1d, style: 'lamp' },
            { type: 'question', questionId: 'p4-gyroscope-1-l-richtung' },
        ],
    },
    {
        route: '/learning/p4-gyroscope', page: 2,
        title: '[4] Der Kreisel', subtitle: 'Der schnelle Kreisel',
        blocks: [
            { type: 'text', html: p4Content.gyroText2a },
            { type: 'text', html: p4Content.gyroText2b },
            { type: 'text', html: p4Content.gyroText2c, style: 'lamp' },
            { type: 'question', questionId: 'p4-gyroscope-2-schneller-kreisel' },
        ],
    },
    {
        route: '/learning/p4-gyroscope', page: 3,
        title: '[4] Der Kreisel', subtitle: 'Raumfestes und körperfestes System',
        blocks: [
            { type: 'text', html: p4Content.gyroText3a },
            { type: 'text', html: p4Content.gyroText3b, style: 'lamp' },
            { type: 'text', html: p4Content.gyroText3c },
            { type: 'question', questionId: 'p4-gyroscope-3-raumfest' },
        ],
    },

    // ── 5: Präzession ─────────────────────────────────────────────────────
    {
        route: '/learning/p5-precession', page: 1,
        title: '[5] Präzession', subtitle: 'Drehmoment senkrecht zum Drehimpuls',
        blocks: [
            { type: 'text',  html: p5Content.precessionText1a },
            { type: 'image', src: 'assets/images/p5_precession/praezession_skizze.png',
              alt: 'Versuchsskizze mit Drehimpuls, Drehmoment und Präzessionsgeschwindigkeit', caption: p5Content.precessionText1b },
            { type: 'question', questionId: 'p5-precession-1-drehmoment-richtung' },
            { type: 'text',  html: p5Content.precessionText1c },
            { type: 'text',  html: p5Content.precessionText1d, style: 'lamp' },
            { type: 'question', questionId: 'p5-precession-2-betrag-l' },
        ],
    },
    {
        route: '/learning/p5-precession', page: 2,
        title: '[5] Präzession', subtitle: 'Präzession im Versuch',
        blocks: [
            { type: 'text', html: p5Content.precessionText2a },
            { type: 'text', html: p5Content.precessionText2b, style: 'lamp' },
            { type: 'text', html: p5Content.precessionText2c },
            { type: 'question', questionId: 'p5-precession-3-drehzahl' },
            { type: 'question', questionId: 'p5-precession-4-steigung' },
            { type: 'text', html: p5Content.precessionText2d, style: 'glossary' },
        ],
    },
    {
        route: '/learning/p5-precession', page: 3,
        title: '[5] Präzession', subtitle: 'Präzession in der Simulation',
        blocks: [
            { type: 'text', html: p5Content.precessionText3a },
            { type: 'text', html: p5Content.precessionText3b },
            { type: 'question', questionId: 'p5-precession-5-abhaengigkeiten' },
            { type: 'text', html: p5Content.precessionText3c },
        ],
    },
];

export const PAGE_LOOKUP = new Map<string, PageDefinition>(
    PAGE_REGISTRY.map(p => [`${p.route}:${p.page}`, p])
);
