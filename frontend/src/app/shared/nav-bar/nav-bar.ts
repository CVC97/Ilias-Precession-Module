import { Component, OnInit, OnDestroy, HostBinding, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DevModeService } from '../../core/services/dev-mode';
import { NavDrawerService } from '../../core/services/nav-drawer';


interface SubpageItem {
    label: string;
    route: string;
    queryParams?: Record<string, string>;
}

interface SegmentDef {
    id: string;
    label: string;
    subpages: SubpageItem[];
}


// The module's single learning path, in order.
const SEGMENTS: SegmentDef[] = [
    {
        id: 'p1-setup', label: '1. Einstieg: Versuchsaufbau',
        subpages: [
            { label: '(1/3) - Einführung', route: '/learning/p1-setup', queryParams: { page: '1' } },
            { label: '(2/3) - Komponenten', route: '/learning/p1-setup', queryParams: { page: '2' } },
            { label: '(3/3) - Messprogramm', route: '/learning/p1-setup', queryParams: { page: '3' } },
        ]
    },
    {
        id: 'p2-rotation', label: '2. Grundlagen der Rotation',
        subpages: [
            { label: '(1/3) - Winkelgeschwindigkeit', route: '/learning/p2-rotation', queryParams: { page: '1' } },
            { label: '(2/3) - Drehimpuls', route: '/learning/p2-rotation', queryParams: { page: '2' } },
            { label: '(3/3) - Drehmoment', route: '/learning/p2-rotation', queryParams: { page: '3' } },
        ]
    },
    {
        id: 'p3-pendulum', label: '3. Physikalisches Pendel',
        subpages: [
            { label: '(1/2) - Das Rad als Pendel', route: '/learning/p3-pendulum', queryParams: { page: '1' } },
            { label: '(2/2) - Messung und Fehlerquellen', route: '/learning/p3-pendulum', queryParams: { page: '2' } },
        ]
    },
    {
        id: 'p4-gyroscope', label: '4. Der Kreisel',
        subpages: [
            { label: '(1/3) - Drei Achsen', route: '/learning/p4-gyroscope', queryParams: { page: '1' } },
            { label: '(2/3) - Der schnelle Kreisel', route: '/learning/p4-gyroscope', queryParams: { page: '2' } },
            { label: '(3/3) - Raum- und Körpersystem', route: '/learning/p4-gyroscope', queryParams: { page: '3' } },
        ]
    },
    {
        id: 'p5-precession', label: '5. Präzession',
        subpages: [
            { label: '(1/3) - Drehmoment senkrecht zu L', route: '/learning/p5-precession', queryParams: { page: '1' } },
            { label: '(2/3) - Präzession im Versuch', route: '/learning/p5-precession', queryParams: { page: '2' } },
            { label: '(3/3) - Simulation', route: '/learning/p5-precession', queryParams: { page: '3' } },
        ]
    },
];


@Component({
    selector: 'app-nav-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './nav-bar.html',
    styleUrl: './nav-bar.css'
})
export class NavBar implements OnInit, OnDestroy {
    activeSegment: string | null = null;

    readonly segments = SEGMENTS;

    private routerSub: Subscription | null = null;

    constructor(
        public router: Router,
        public devMode: DevModeService,
        public drawer: NavDrawerService
    ) {}

    ngOnInit() {
        this.updateFromUrl(this.router.url);

        this.routerSub = this.router.events
            .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
            .subscribe(e => {
                this.updateFromUrl(e.urlAfterRedirects);
                this.drawer.close();
            });
    }

    @HostListener('document:keydown.escape')
    onEscape() {
        this.drawer.close();
    }

    ngOnDestroy() {
        this.routerSub?.unsubscribe();
    }

    private updateFromUrl(url: string) {
        this.activeSegment = this.segmentFromUrl(url);
    }

    segmentFromUrl(url: string): string | null {
        const path = url.split('?')[0];
        if (path === '/' || path === '') return 'home';
        if (path.includes('/glossary')) return 'glossary';
        if (path.startsWith('/learning/p1')) return 'p1-setup';
        if (path.startsWith('/learning/p2')) return 'p2-rotation';
        if (path.startsWith('/learning/p3')) return 'p3-pendulum';
        if (path.startsWith('/learning/p4')) return 'p4-gyroscope';
        if (path.startsWith('/learning/p5')) return 'p5-precession';
        if (path.startsWith('/target/')) return 'anleitung';
        return null;
    }

    getSegmentClass(seg: SegmentDef): Record<string, boolean> {
        const isActive = this.activeSegment === seg.id;
        return {
            'seg-active': isActive,
            'seg-dev': this.devMode.isEnabled && !isActive,
        };
    }

    isSubpageActive(sub: SubpageItem): boolean {
        const url = this.router.url;
        const path = url.split('?')[0];
        if (path !== sub.route) return false;
        if (sub.queryParams?.['page']) {
            const match = url.match(/[?&]page=([^&]*)/);
            const activePage = match ? match[1] : '1'; // no param → component defaults to page 1
            return activePage === sub.queryParams['page'];
        }
        return true;
    }

    navigateToSubpage(sub: SubpageItem) {
        if (!this.devMode.isEnabled) return;
        this.router.navigate([sub.route], { queryParams: sub.queryParams ?? {} });
    }

    onSegmentClick(seg: SegmentDef) {
        if (!this.devMode.isEnabled) return;
        const first = seg.subpages[0];
        if (first) this.navigateToSubpage(first);
    }

    goHome() {
        if (!this.devMode.isEnabled) return;
        this.router.navigate(['/']);
    }

    goGlossary() {
        if (!this.devMode.isEnabled) return;
        this.router.navigate(['/glossary']);
    }

    get anleitungRoute(): string {
        return '/target/tar-precession';
    }

    @HostBinding('style.visibility')
    get hostVisibility(): string {
        return (this.activeSegment === 'home') ? 'hidden' : '';
    }

    get isAnleitungClickable(): boolean {
        return this.devMode.isEnabled || this.activeSegment === 'anleitung';
    }

    goAnleitung() {
        if (this.isAnleitungClickable) {
            this.router.navigate([this.anleitungRoute]);
        }
    }
}
