import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MultipleChoice } from '../../../shared/evaluation/multiple-choice/multiple-choice';
import { SingleChoice } from '../../../shared/evaluation/single-choice/single-choice';
import { SimPlaceholder } from '../../../shared/sim-placeholder/sim-placeholder';
import { ResultsTracking } from '../../../core/services/results-tracking';
import { GlossaryOverlay } from '../../../shared/glossary-overlay/glossary-overlay.service';
import { DevModeService } from '../../../core/services/dev-mode';
import * as p5Questions from './p5-precession-questions';
import * as p5Content from './p5-precession-content';



@Component({
	selector: 'app-p5-precession',
	imports: [CommonModule, MultipleChoice, SingleChoice, SimPlaceholder],
	templateUrl: './p5-precession.html',
	styleUrl: './p5-precession.css',
})
export class P5Precession implements OnInit, AfterViewInit, OnDestroy {
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
    question1 = p5Questions.question1;
    question2 = p5Questions.question2;
    question3 = p5Questions.question3;
    question4 = p5Questions.question4;
    question5 = p5Questions.question5;


	// track completion
	isCorrect1 = false;
	isCorrect2 = false;
	isCorrect3 = false;
	isCorrect4 = false;
	isCorrect5 = false;


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
    onQuestion4Answered(isCorrect: boolean) {
		this.isCorrect4 = isCorrect;
    }
    onQuestion5Answered(isCorrect: boolean) {
		this.isCorrect5 = isCorrect;
    }



	// +++ TeX rendering +++
	precessionText1a!: SafeHtml;
	precessionText1b!: SafeHtml;
	precessionText1c!: SafeHtml;
	precessionText1d!: SafeHtml;

	precessionText2a!: SafeHtml;
	precessionText2b!: SafeHtml;
	precessionText2c!: SafeHtml;
	precessionText2d!: SafeHtml;

	precessionText3a!: SafeHtml;
	precessionText3b!: SafeHtml;
	precessionText3c!: SafeHtml;


    ngOnInit() {
        // subscribe to page param so nav-bar jumps update the view reactively
        this.pageSub = this.route.queryParams.subscribe(params => {
            const page = params['page'];
            if (page && ['1','2','3'].includes(page)) {
                this.currentView = `precession${page}`;
                this.renderMath();
            }
        });

        // start tracking this module
        this.trackingService.startModule('p5-precession-module');

        // restore completion states from previous session
        this.restoreCompletionState();

		// sanitized strings to enable LaTeX rendering
        this.precessionText1a = this.sanitizer.bypassSecurityTrustHtml(p5Content.precessionText1a);
        this.precessionText1b = this.sanitizer.bypassSecurityTrustHtml(p5Content.precessionText1b);
        this.precessionText1c = this.sanitizer.bypassSecurityTrustHtml(p5Content.precessionText1c);
        this.precessionText1d = this.sanitizer.bypassSecurityTrustHtml(p5Content.precessionText1d);

        this.precessionText2a = this.sanitizer.bypassSecurityTrustHtml(p5Content.precessionText2a);
        this.precessionText2b = this.sanitizer.bypassSecurityTrustHtml(p5Content.precessionText2b);
        this.precessionText2c = this.sanitizer.bypassSecurityTrustHtml(p5Content.precessionText2c);
        this.precessionText2d = this.sanitizer.bypassSecurityTrustHtml(p5Content.precessionText2d);

        this.precessionText3a = this.sanitizer.bypassSecurityTrustHtml(p5Content.precessionText3a);
        this.precessionText3b = this.sanitizer.bypassSecurityTrustHtml(p5Content.precessionText3b);
        this.precessionText3c = this.sanitizer.bypassSecurityTrustHtml(p5Content.precessionText3c);
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
        this.isCorrect4 = this.trackingService.isQuestionCompleted(this.question4.questionId);
        this.isCorrect5 = this.trackingService.isQuestionCompleted(this.question5.questionId);
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
        const page = this.currentView.replace('precession', '');
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page },
            queryParamsHandling: 'merge',
            replaceUrl: true
        });
    }

    // navigation helpers
	currentView: string = 'precession1';

    get isFirstPage(): boolean {
        return this.currentView === 'precession1';
    }
    get isLastPage(): boolean {
        return this.currentView === 'precession3';
    }



    // going back shows the previous subpage / the previous segment (dev mode only)
    goBack() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const page = Number(this.currentView.replace('precession', ''));
        if (page === 1) {
            this.router.navigate(['/learning/p4-gyroscope'], { queryParams: { page: '3' } });
            return;
        }
        this.currentView = `precession${page - 1}`;
        this.updateUrl();
        this.renderMath();
    }


    // go forward shows next subpage / page
    goForward() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const page = Number(this.currentView.replace('precession', ''));
        if (page === 3) {
            this.router.navigate(['/learning/p6-nutation']);
            return;
        }
        this.currentView = `precession${page + 1}`;
        this.updateUrl();
        this.renderMath();
    }
}
