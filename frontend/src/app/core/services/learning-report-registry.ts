import * as p1Content from '../../features/learning_features/p1-setup/p1-setup-content';
import * as p2Content from '../../features/learning_features/p2-rotation/p2-rotation-content';
import * as p3Content from '../../features/learning_features/p3-pendulum/p3-pendulum-content';
import * as p4Content from '../../features/learning_features/p4-gyroscope/p4-gyroscope-content';
import * as p5Content from '../../features/learning_features/p5-precession/p5-precession-content';
import * as p6Content from '../../features/learning_features/p6-nutation/p6-nutation-content';
import * as p7Content from '../../features/learning_features/p7-measurement/p7-measurement-content';
import * as p8Content from '../../features/learning_features/p8-deepening/p8-deepening-content';

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
            { type: 'text',  html: `Der Versuch im Video: <a href="https://www.youtube.com/watch?v=tuvwWrP1FVA">youtube.com/watch?v=tuvwWrP1FVA</a>` },
            { type: 'text',  html: p1Content.setupText1c },
        ],
    },
    {
        route: '/learning/p1-setup', page: 2,
        title: '[1] Einstieg: Versuchsaufbau', subtitle: 'Komponenten',
        blocks: [
            { type: 'image', src: 'assets/images/p1_setup/versuchsaufbau.png',
              alt: 'Versuchsaufbau Kreiselpräzession', caption: p1Content.setupText2c },
            { type: 'text', html: p1Content.setupText2a },
            { type: 'text', html: p1Content.setupText2d },
            { type: 'text', html: p1Content.setupText2b, style: 'lamp' },
            { type: 'question', questionId: 'p1-setup-1-kreisel-teile' },
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
            { type: 'text', html: p1Content.setupText3d },
            { type: 'question', questionId: 'p1-setup-4-erwartung' },
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
              alt: 'Drehimpuls und Winkelgeschwindigkeit', caption: p2Content.rotationText2e },
            { type: 'text',  html: p2Content.rotationText2d },
            { type: 'text',  html: p2Content.rotationText2c },
            { type: 'question', questionId: 'p2-rotation-2-drehzahl-drehimpuls' },
            { type: 'question', questionId: 'p2-rotation-3-ring-scheibe' },
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

    // ── 2: Grundlagen der Rotation, Trägheitsmoment ───────────────────────
    {
        route: '/learning/p3-pendulum', page: 1,
        title: '[2] Grundlagen der Rotation', subtitle: 'Trägheitsmoment: Das Rad als Pendel',
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
        title: '[2] Grundlagen der Rotation', subtitle: 'Trägheitsmoment: Messung und Fehlerquellen',
        blocks: [
            { type: 'text', html: p3Content.pendulumText2a },
            { type: 'question', questionId: 'p3-pendulum-3-gegenueber' },
            { type: 'question', questionId: 'p3-pendulum-4-zehn-perioden' },
            { type: 'text', html: p3Content.pendulumText2b, style: 'lamp' },
            { type: 'text', html: p3Content.pendulumText2c },
        ],
    },

    // ── 3: Der Kreisel ────────────────────────────────────────────────────
    {
        route: '/learning/p4-gyroscope', page: 1,
        title: '[3] Der Kreisel', subtitle: 'Drei Achsen',
        blocks: [
            { type: 'text',  html: p4Content.gyroText1a },
            { type: 'image', src: 'assets/images/p4_gyroscope/kreiselachsen.svg',
              alt: 'Figurenachse, Drehimpulsachse und momentane Drehachse', caption: p4Content.gyroText1b },
            { type: 'text',  html: p4Content.gyroText1c },
            { type: 'text',  html: p4Content.gyroText1d, style: 'lamp' },
            { type: 'question', questionId: 'p4-gyroscope-1-l-richtung' },
        ],
    },
    {
        route: '/learning/p4-gyroscope', page: 2,
        title: '[3] Der Kreisel', subtitle: 'Der schnelle Kreisel',
        blocks: [
            { type: 'text', html: p4Content.gyroText2a },
            { type: 'text', html: p4Content.gyroText2b },
            { type: 'text', html: p4Content.gyroText2c, style: 'lamp' },
            { type: 'question', questionId: 'p4-gyroscope-2-schneller-kreisel' },
        ],
    },
    {
        route: '/learning/p4-gyroscope', page: 3,
        title: '[3] Der Kreisel', subtitle: 'Raumfestes und körperfestes System',
        blocks: [
            { type: 'text', html: p4Content.gyroText3a },
            { type: 'text', html: p4Content.gyroText3b, style: 'lamp' },
            { type: 'spoiler', label: 'EXKURS: Herleitung der Eulerschen Kreiselgleichung', html: p4Content.gyroText3d },
            { type: 'text', html: p4Content.gyroText3c },
            { type: 'question', questionId: 'p4-gyroscope-3-raumfest' },
        ],
    },

    // ── 3: Der Kreisel, Präzession ────────────────────────────────────────
    {
        route: '/learning/p5-precession', page: 1,
        title: '[3] Der Kreisel: Präzession', subtitle: 'Drehmoment senkrecht zum Drehimpuls',
        blocks: [
            { type: 'text',  html: p5Content.precessionText1a },
            { type: 'image', src: 'assets/images/p5_precession/praezession_skizze.svg',
              alt: 'Präzession: allgemeiner Fall und Versuchskreisel', caption: p5Content.precessionText1b },
            { type: 'question', questionId: 'p5-precession-1-drehmoment-richtung' },
            { type: 'text',  html: p5Content.precessionText1c },
            { type: 'text',  html: p5Content.precessionText1d, style: 'lamp' },
            { type: 'question', questionId: 'p5-precession-2-betrag-l' },
        ],
    },
    {
        route: '/learning/p5-precession', page: 2,
        title: '[3] Der Kreisel: Präzession', subtitle: 'Präzession im Versuch',
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
        title: '[3] Der Kreisel: Präzession', subtitle: 'Präzession in der Simulation',
        blocks: [
            { type: 'text', html: p5Content.precessionText3a },
            { type: 'text', html: p5Content.precessionText3b },
            { type: 'question', questionId: 'p5-precession-5-abhaengigkeiten' },
            { type: 'text', html: p5Content.precessionText3c },
        ],
    },

    // ── 3: Der Kreisel, Nutation ──────────────────────────────────────────
    {
        route: '/learning/p6-nutation', page: 1,
        title: '[3] Der Kreisel: Nutation', subtitle: 'Die Figurenachse kreist um den Drehimpuls',
        blocks: [
            { type: 'text', html: p6Content.nutationText1a },
            { type: 'text', html: p6Content.nutationText1b, style: 'lamp' },
            { type: 'text', html: p6Content.nutationText1c },
            { type: 'question', questionId: 'p6-nutation-1-nutationskegel' },
        ],
    },
    {
        route: '/learning/p6-nutation', page: 2,
        title: '[3] Der Kreisel: Nutation', subtitle: 'Nutationskegel, Rastpolkegel, Gangpolkegel',
        blocks: [
            { type: 'text',  html: p6Content.nutationText2a },
            { type: 'image', src: 'assets/images/p6_nutation/kreiselkegel.svg',
              alt: 'Nutationskegel, Rastpolkegel und Gangpolkegel', caption: p6Content.nutationText2b },
            { type: 'text',  html: p6Content.nutationText2c, style: 'lamp' },
            { type: 'question', questionId: 'p6-nutation-2-kegel' },
        ],
    },
    {
        route: '/learning/p6-nutation', page: 3,
        title: '[3] Der Kreisel: Nutation', subtitle: 'Nutation im Versuch',
        blocks: [
            { type: 'text', html: p6Content.nutationText3a },
            { type: 'text', html: p6Content.nutationText3b },
            { type: 'question', questionId: 'p6-nutation-3-drehzahl' },
            { type: 'text', html: p6Content.nutationText3c, style: 'glossary' },
        ],
    },

    // ── Messstrategie ────────────────────────────────────────────────────
    {
        route: '/learning/p7-measurement', page: 1,
        title: 'Messstrategie und Fehlerquellen', subtitle: 'Reibung',
        blocks: [
            { type: 'text', html: p7Content.measureText1a },
            { type: 'question', questionId: 'p7-measurement-1-tr-vorher-nachher' },
            { type: 'text', html: p7Content.measureText1b, style: 'lamp' },
            { type: 'question', questionId: 'p7-measurement-2-halbe-umdrehung' },
        ],
    },
    {
        route: '/learning/p7-measurement', page: 2,
        title: 'Messstrategie und Fehlerquellen', subtitle: 'Die Präzession sauber starten',
        blocks: [
            { type: 'text',  html: p7Content.measureText2a },
            { type: 'image', src: 'assets/images/p7_measurement/achsenbahn.svg',
              alt: 'Bahn des Achsenendes', caption: p7Content.measureText2b },
            { type: 'text',  html: p7Content.measureText2c },
            { type: 'question', questionId: 'p7-measurement-3-sanft-einleiten' },
        ],
    },
    {
        route: '/learning/p7-measurement', page: 3,
        title: 'Messstrategie und Fehlerquellen', subtitle: 'Weitere Fehlerquellen',
        blocks: [
            { type: 'text', html: p7Content.measureText3a },
            { type: 'question', questionId: 'p7-measurement-4-fehlerquellen' },
            { type: 'text', html: p7Content.measureText3b },
        ],
    },

    // ── Vertiefung ───────────────────────────────────────────────────────
    {
        route: '/learning/p8-deepening', page: 1,
        title: 'Vertiefung', subtitle: 'Freies Experimentieren',
        blocks: [
            { type: 'text', html: p8Content.deepeningText1a },
        ],
    },
    {
        route: '/learning/p8-deepening', page: 2,
        title: 'Vertiefung', subtitle: 'Kreisel im Kosmos',
        blocks: [
            { type: 'text', html: p8Content.deepeningText2a },
        ],
    },
];

export const PAGE_LOOKUP = new Map<string, PageDefinition>(
    PAGE_REGISTRY.map(p => [`${p.route}:${p.page}`, p])
);
