import { Component, OnInit, OnDestroy, HostBinding, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DevModeService } from '../../core/services/dev-mode';
import { NavDrawerService } from '../../core/services/nav-drawer';
import { VisitedPages } from '../../core/services/visited-pages';
import { SEGMENTS, SegmentDef, SubpageItem } from './segments';


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
        public drawer: NavDrawerService,
        private visited: VisitedPages
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
        if (path.startsWith('/learning/p3')) return 'p2-rotation';   // the Trägheitsmoment pages belong to Grundlagen
        if (path.startsWith('/learning/p4')) return 'p4-gyroscope';
        if (path.startsWith('/learning/p5')) return 'p5-precession';
        if (path.startsWith('/learning/p6')) return 'p6-nutation';
        if (path.startsWith('/learning/p7')) return 'p7-measurement';
        if (path.startsWith('/target/')) return 'target';
        return null;
    }

    // the path is linear: every page already visited (or any page in dev mode) can be opened again
    canOpen(sub: SubpageItem): boolean {
        return this.devMode.isEnabled || this.visited.has(sub.route, sub.queryParams?.['page']);
    }

    canOpenSegment(seg: SegmentDef): boolean {
        return !!seg.subpages[0] && this.canOpen(seg.subpages[0]);
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
        if (!this.canOpen(sub)) return;
        this.router.navigate([sub.route], { queryParams: sub.queryParams ?? {} });
    }

    onSegmentClick(seg: SegmentDef) {
        if (!this.canOpenSegment(seg)) return;
        this.navigateToSubpage(seg.subpages[0]);
    }

    get isHomeClickable(): boolean {
        return this.devMode.isEnabled || this.visited.has('/');
    }

    goHome() {
        if (!this.isHomeClickable) return;
        this.router.navigate(['/']);
    }

    goGlossary() {
        if (!this.devMode.isEnabled) return;
        this.router.navigate(['/glossary']);
    }

    get targetRoute(): string {
        return '/target/tar-precession';
    }

    @HostBinding('style.visibility')
    get hostVisibility(): string {
        return (this.activeSegment === 'home') ? 'hidden' : '';
    }

    // the page grid drops the nav's column for this (styles.css)
    @HostBinding('class.nav-hidden')
    get isHidden(): boolean {
        return this.activeSegment === 'home';
    }

    get isTargetClickable(): boolean {
        return this.devMode.isEnabled || this.activeSegment === 'target' || this.visited.has(this.targetRoute);
    }

    goTarget() {
        if (this.isTargetClickable) {
            this.router.navigate([this.targetRoute]);
        }
    }
}
