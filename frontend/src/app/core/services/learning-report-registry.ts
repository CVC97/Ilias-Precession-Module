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
];

export const PAGE_LOOKUP = new Map<string, PageDefinition>(
    PAGE_REGISTRY.map(p => [`${p.route}:${p.page}`, p])
);
