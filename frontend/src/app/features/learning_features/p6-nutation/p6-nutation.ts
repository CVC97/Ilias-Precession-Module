import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MultipleChoice } from '../../../shared/evaluation/multiple-choice/multiple-choice';
import { SingleChoice } from '../../../shared/evaluation/single-choice/single-choice';
import { SimPlaceholder } from '../../../shared/sim-placeholder/sim-placeholder';
import { ResultsTracking } from '../../../core/services/results-tracking';
import { GlossaryOverlay } from '../../../shared/glossary-overlay/glossary-overlay.service';
import { DevModeService } from '../../../core/services/dev-mode';
import * as p6Questions from './p6-nutation-questions';
import * as p6Content from './p6-nutation-content';



@Component({
	selector: 'app-p6-nutation',
	imports: [CommonModule, RouterLink, MultipleChoice, SingleChoice, SimPlaceholder],
	templateUrl: './p6-nutation.html',
	styleUrl: './p6-nutation.css',
})
export class P6Nutation implements OnInit, AfterViewInit, OnDestroy {
    constructor(
		private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) private platformId: Object,
        private route: ActivatedRoute,
        private router: Router,
		private trackingService: ResultsTracking,
        public glossaryOverlay: GlossaryOverlay,
        public devMode: DevModeService
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


	// +++ QA data +++
    question1 = p6Questions.question1;
    question2 = p6Questions.question2;
    question3 = p6Questions.question3;


	// track completion
	isCorrect1 = false;
	isCorrect2 = false;
	isCorrect3 = false;


	// actions upon aswering questions
    onQuestion1Answered(isCorrect: boolean) {
		this.isCorrect1 = isCorrect;
    }
    onQuestion2Answered(isCorrect: boolean) {
		this.isCorrect2 = isCorrect;
    }
    onQuestion3Answered(isCorrect: boolean) {
		this.isCorrect3 = isCorrect;
    }



	// +++ TeX rendering +++
	nutationText1a!: SafeHtml;
	nutationText1b!: SafeHtml;
	nutationText1c!: SafeHtml;

	nutationText2a!: SafeHtml;
	nutationText2b!: SafeHtml;
	nutationText2c!: SafeHtml;

	nutationText3a!: SafeHtml;
	nutationText3b!: SafeHtml;
	nutationText3c!: SafeHtml;


    ngOnInit() {
        // subscribe to page param so nav-bar jumps update the view reactively
        this.pageSub = this.route.queryParams.subscribe(params => {
            const page = params['page'];
            if (page && ['1','2','3'].includes(page)) {
                this.currentView = `nutation${page}`;
                this.renderMath();
            }
        });

        // start tracking this module
        this.trackingService.startModule('p6-nutation-module');

        // restore completion states from previous session
        this.restoreCompletionState();

		// sanitized strings to enable LaTeX rendering
        this.nutationText1a = this.sanitizer.bypassSecurityTrustHtml(p6Content.nutationText1a);
        this.nutationText1b = this.sanitizer.bypassSecurityTrustHtml(p6Content.nutationText1b);
        this.nutationText1c = this.sanitizer.bypassSecurityTrustHtml(p6Content.nutationText1c);

        this.nutationText2a = this.sanitizer.bypassSecurityTrustHtml(p6Content.nutationText2a);
        this.nutationText2b = this.sanitizer.bypassSecurityTrustHtml(p6Content.nutationText2b);
        this.nutationText2c = this.sanitizer.bypassSecurityTrustHtml(p6Content.nutationText2c);

        this.nutationText3a = this.sanitizer.bypassSecurityTrustHtml(p6Content.nutationText3a);
        this.nutationText3b = this.sanitizer.bypassSecurityTrustHtml(p6Content.nutationText3b);
        this.nutationText3c = this.sanitizer.bypassSecurityTrustHtml(p6Content.nutationText3c);
    }


    ngAfterViewInit() {
        this.renderMath();
    }


    ngOnDestroy() {
        this.pageSub?.unsubscribe();
        if (this.mathJaxTimeout !== null) clearTimeout(this.mathJaxTimeout);
        this.trackingService.endModule();
    }


    private restoreCompletionState() {
        // check if questions were already answered correctly
        this.isCorrect1 = this.trackingService.isQuestionCompleted(this.question1.questionId);
        this.isCorrect2 = this.trackingService.isQuestionCompleted(this.question2.questionId);
        this.isCorrect3 = this.trackingService.isQuestionCompleted(this.question3.questionId);
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
        const page = this.currentView.replace('nutation', '');
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page },
            queryParamsHandling: 'merge',
            replaceUrl: true
        });
    }

    // navigation helpers
	currentView: string = 'nutation1';

    get isFirstPage(): boolean {
        return this.currentView === 'nutation1';
    }
    get isLastPage(): boolean {
        return this.currentView === 'nutation3';
    }



    // going back shows the previous subpage / the previous segment (dev mode only)
    goBack() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const page = Number(this.currentView.replace('nutation', ''));
        if (page === 1) {
            this.router.navigate(['/learning/p5-precession'], { queryParams: { page: '3' } });
            return;
        }
        this.currentView = `nutation${page - 1}`;
        this.updateUrl();
        this.renderMath();
    }


    // go forward shows next subpage / page
    goForward() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const page = Number(this.currentView.replace('nutation', ''));
        if (page === 3) {
            this.router.navigate(['/learning/p7-measurement']);
            return;
        }
        this.currentView = `nutation${page + 1}`;
        this.updateUrl();
        this.renderMath();
    }
}
