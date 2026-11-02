export interface SubpageItem {
    label: string;
    route: string;
    queryParams?: Record<string, string>;
}

export interface SegmentDef {
    id: string;
    label: string;
    number?: number;    // marker of a main chapter
    icon?: string;      // SVG path for the marker, in place of a number
    sub?: boolean;      // sub-chapter of the chapter above: an indented row with a dot as its marker
    subpages: SubpageItem[];
}


// The module's single learning path, in order (also the list on the start page).
// Grundlagen spans two routes: the Trägheitsmoment pages keep their own route, so saved visits and tracking IDs stay valid.
export const SEGMENTS: SegmentDef[] = [
    {
        id: 'p1-setup', label: 'Einstieg: Versuchsaufbau', number: 1,
        subpages: [
            { label: '(1/3) - Einführung', route: '/learning/p1-setup', queryParams: { page: '1' } },
            { label: '(2/3) - Komponenten', route: '/learning/p1-setup', queryParams: { page: '2' } },
            { label: '(3/3) - Messprogramm', route: '/learning/p1-setup', queryParams: { page: '3' } },
        ]
    },
    {
        id: 'p2-rotation', label: 'Grundlagen der Rotation', number: 2,
        subpages: [
            { label: '(1/5) - Winkelgeschwindigkeit', route: '/learning/p2-rotation', queryParams: { page: '1' } },
            { label: '(2/5) - Drehimpuls', route: '/learning/p2-rotation', queryParams: { page: '2' } },
            { label: '(3/5) - Drehmoment', route: '/learning/p2-rotation', queryParams: { page: '3' } },
            { label: '(4/5) - Trägheitsmoment: Pendel', route: '/learning/p3-pendulum', queryParams: { page: '1' } },
            { label: '(5/5) - Trägheitsmoment: Messung', route: '/learning/p3-pendulum', queryParams: { page: '2' } },
        ]
    },
    {
        id: 'p4-gyroscope', label: 'Der Kreisel', number: 3,
        subpages: [
            { label: '(1/3) - Drei Achsen', route: '/learning/p4-gyroscope', queryParams: { page: '1' } },
            { label: '(2/3) - Der schnelle Kreisel', route: '/learning/p4-gyroscope', queryParams: { page: '2' } },
            { label: '(3/3) - Raum- und Körpersystem', route: '/learning/p4-gyroscope', queryParams: { page: '3' } },
        ]
    },
    {
        id: 'p5-precession', label: 'Präzession', sub: true,
        subpages: [
            { label: '(1/3) - Drehmoment senkrecht zu L', route: '/learning/p5-precession', queryParams: { page: '1' } },
            { label: '(2/3) - Präzession im Versuch', route: '/learning/p5-precession', queryParams: { page: '2' } },
            { label: '(3/3) - Simulation', route: '/learning/p5-precession', queryParams: { page: '3' } },
        ]
    },
    {
        id: 'p6-nutation', label: 'Nutation', sub: true,
        subpages: [
            { label: '(1/3) - Nutationskegel', route: '/learning/p6-nutation', queryParams: { page: '1' } },
            { label: '(2/3) - Drei Kegel', route: '/learning/p6-nutation', queryParams: { page: '2' } },
            { label: '(3/3) - Nutation im Versuch', route: '/learning/p6-nutation', queryParams: { page: '3' } },
        ]
    },
    {
        id: 'p7-measurement', label: 'Messstrategie',
        icon: 'M6 .5h4V2H6zM8 3a6.25 6.25 0 1 0 0 12.5A6.25 6.25 0 0 0 8 3zm0 1.6a4.65 4.65 0 1 1 0 9.3 4.65 4.65 0 0 1 0-9.3zM7.25 6h1.5v3.8h-1.5z',
        subpages: [
            { label: '(1/3) - Reibung', route: '/learning/p7-measurement', queryParams: { page: '1' } },
            { label: '(2/3) - Präzession sauber starten', route: '/learning/p7-measurement', queryParams: { page: '2' } },
            { label: '(3/3) - Weitere Fehlerquellen', route: '/learning/p7-measurement', queryParams: { page: '3' } },
        ]
    },
];
