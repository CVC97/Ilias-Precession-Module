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
import * as p7Questions from './p7-measurement-questions';
import * as p7Content from './p7-measurement-content';



@Component({
	selector: 'app-p7-measurement',
	imports: [CommonModule, MultipleChoice, SingleChoice, SimPlaceholder],
	templateUrl: './p7-measurement.html',
	styleUrl: './p7-measurement.css',
})
export class P7Measurement implements OnInit, AfterViewInit, OnDestroy {
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
    question1 = p7Questions.question1;
    question2 = p7Questions.question2;
    question3 = p7Questions.question3;
    question4 = p7Questions.question4;


	// track completion
	isCorrect1 = false;
	isCorrect2 = false;
	isCorrect3 = false;
	isCorrect4 = false;


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



	// +++ TeX rendering +++
	measureText1a!: SafeHtml;
	measureText1b!: SafeHtml;

	measureText2a!: SafeHtml;
	measureText2b!: SafeHtml;
	measureText2c!: SafeHtml;

	measureText3a!: SafeHtml;
	measureText3b!: SafeHtml;


    ngOnInit() {
        // subscribe to page param so nav-bar jumps update the view reactively
        this.pageSub = this.route.queryParams.subscribe(params => {
            const page = params['page'];
            if (page && ['1','2','3'].includes(page)) {
                this.currentView = `measure${page}`;
                this.renderMath();
            }
        });

        // start tracking this module
        this.trackingService.startModule('p7-measurement-module');

        // restore completion states from previous session
        this.restoreCompletionState();

		// sanitized strings to enable LaTeX rendering
        this.measureText1a = this.sanitizer.bypassSecurityTrustHtml(p7Content.measureText1a);
        this.measureText1b = this.sanitizer.bypassSecurityTrustHtml(p7Content.measureText1b);

        this.measureText2a = this.sanitizer.bypassSecurityTrustHtml(p7Content.measureText2a);
        this.measureText2b = this.sanitizer.bypassSecurityTrustHtml(p7Content.measureText2b);
        this.measureText2c = this.sanitizer.bypassSecurityTrustHtml(p7Content.measureText2c);

        this.measureText3a = this.sanitizer.bypassSecurityTrustHtml(p7Content.measureText3a);
        this.measureText3b = this.sanitizer.bypassSecurityTrustHtml(p7Content.measureText3b);
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
        const page = this.currentView.replace('measure', '');
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page },
            queryParamsHandling: 'merge',
            replaceUrl: true
        });
    }

    // navigation helpers
	currentView: string = 'measure1';

    get isFirstPage(): boolean {
        return this.currentView === 'measure1';
    }
    get isLastPage(): boolean {
        return this.currentView === 'measure3';
    }



    // going back shows the previous subpage / the previous segment (dev mode only)
    goBack() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const page = Number(this.currentView.replace('measure', ''));
        if (page === 1) {
            this.router.navigate(['/learning/p6-nutation'], { queryParams: { page: '3' } });
            return;
        }
        this.currentView = `measure${page - 1}`;
        this.updateUrl();
        this.renderMath();
    }


    // go forward shows next subpage / page
    goForward() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const page = Number(this.currentView.replace('measure', ''));
        if (page === 3) {
            this.router.navigate(['/target/tar-precession']);
            return;
        }
        this.currentView = `measure${page + 1}`;
        this.updateUrl();
        this.renderMath();
    }
}
