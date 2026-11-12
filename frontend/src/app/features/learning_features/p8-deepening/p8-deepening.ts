import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SimEmbed } from '../../../shared/sim-embed/sim-embed';
import { ResultsTracking } from '../../../core/services/results-tracking';
import { GlossaryOverlay } from '../../../shared/glossary-overlay/glossary-overlay.service';
import { DevModeService } from '../../../core/services/dev-mode';
import * as p8Content from './p8-deepening-content';



@Component({
	selector: 'app-p8-deepening',
	imports: [CommonModule, SimEmbed],
	templateUrl: './p8-deepening.html',
	styleUrl: './p8-deepening.css',
})
export class P8Deepening implements OnInit, AfterViewInit, OnDestroy {
    constructor(
		private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) private platformId: Object,
        private route: ActivatedRoute,
        private router: Router,
		private trackingService: ResultsTracking,
        public glossaryOverlay: GlossaryOverlay,
        public devMode: DevModeService,
    ) {}

    private mathJaxTimeout: ReturnType<typeof setTimeout> | null = null;
    private pageSub: Subscription | null = null;

    @HostListener('click', ['$event'])
    onGlossaryLink(event: MouseEvent) {
        const routeLink = (event.target as HTMLElement)
            ?.closest('a[data-route]') as HTMLAnchorElement | null;
        if (routeLink) {
            event.preventDefault();
            const rawQuery = routeLink.getAttribute('data-query');
            const queryParams = rawQuery
                ? Object.fromEntries(new URLSearchParams(rawQuery))
                : undefined;
            this.router.navigate([routeLink.getAttribute('data-route')!], { queryParams });
            return;
        }

        const link = (event.target as HTMLElement)
            ?.closest('a[data-glossary]') as HTMLAnchorElement | null;
        if (!link) return;

        const term = link.getAttribute('data-glossary')!;
        this.glossaryOverlay.open(term);
    }


	// +++ TeX rendering +++
	deepeningText1a!: SafeHtml;
	deepeningText2a!: SafeHtml;


    ngOnInit() {
        // subscribe to page param so nav-bar jumps update the view reactively
        this.pageSub = this.route.queryParams.subscribe(params => {
            const page = params['page'];
            if (page && ['1','2'].includes(page)) {
                this.currentView = `deepening${page}`;
                this.renderMath();
            }
        });

        // start tracking this module (no questions yet; the matching task on page 2 will use it)
        this.trackingService.startModule('p8-deepening-module');

		// sanitized strings to enable LaTeX rendering
        this.deepeningText1a = this.sanitizer.bypassSecurityTrustHtml(p8Content.deepeningText1a);
        this.deepeningText2a = this.sanitizer.bypassSecurityTrustHtml(p8Content.deepeningText2a);
    }


    ngAfterViewInit() {
        this.renderMath();
    }


    ngOnDestroy() {
        this.pageSub?.unsubscribe();
        if (this.mathJaxTimeout !== null) clearTimeout(this.mathJaxTimeout);
        this.trackingService.endModule();
    }


    // trigger MathJax rendering
	renderMath() {
		if (isPlatformBrowser(this.platformId)) {
			if (this.mathJaxTimeout !== null) clearTimeout(this.mathJaxTimeout);
			this.mathJaxTimeout = setTimeout(() => {
				this.mathJaxTimeout = null;
				if (window.MathJax) {
					window.MathJax.typesetPromise();
				}
			}, 100);
		}
	}


// +++ in-page navigation +++

    private updateUrl() {
        const page = this.currentView.replace('deepening', '');
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page },
            queryParamsHandling: 'merge',
            replaceUrl: true
        });
    }

    // navigation helpers
	currentView: string = 'deepening1';

    get isFirstPage(): boolean {
        return this.currentView === 'deepening1';
    }
    get isLastPage(): boolean {
        return this.currentView === 'deepening2';
    }



    // going back shows the previous subpage / the previous segment (dev mode only)
    goBack() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const page = Number(this.currentView.replace('deepening', ''));
        if (page === 1) {
            this.router.navigate(['/learning/p7-measurement'], { queryParams: { page: '3' } });
            return;
        }
        this.currentView = `deepening${page - 1}`;
        this.updateUrl();
        this.renderMath();
    }


    // go forward shows next subpage / page
    goForward() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const page = Number(this.currentView.replace('deepening', ''));
        if (page === 2) {
            this.router.navigate(['/target/tar-precession']);
            return;
        }
        this.currentView = `deepening${page + 1}`;
        this.updateUrl();
        this.renderMath();
    }
}
