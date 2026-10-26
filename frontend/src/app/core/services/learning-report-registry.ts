import * as p1Content from '../../features/learning_features/p1-setup/p1-setup-content';

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
];

export const PAGE_LOOKUP = new Map<string, PageDefinition>(
    PAGE_REGISTRY.map(p => [`${p.route}:${p.page}`, p])
);
