import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MultipleChoice } from '../../../shared/evaluation/multiple-choice/multiple-choice';
import { SingleChoice } from '../../../shared/evaluation/single-choice/single-choice';
import { ResultsTracking } from '../../../core/services/results-tracking';
import { GlossaryOverlay } from '../../../shared/glossary-overlay/glossary-overlay.service';
import { DevModeService } from '../../../core/services/dev-mode';
import * as p3Questions from './p3-pendulum-questions';
import * as p3Content from './p3-pendulum-content';



@Component({
	selector: 'app-p3-pendulum',
	imports: [CommonModule, RouterLink, MultipleChoice, SingleChoice],
	templateUrl: './p3-pendulum.html',
	styleUrl: './p3-pendulum.css',
})
export class P3Pendulum implements OnInit, AfterViewInit, OnDestroy {
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
    question1 = p3Questions.question1;
    question2 = p3Questions.question2;
    question3 = p3Questions.question3;
    question4 = p3Questions.question4;


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
	pendulumText1a!: SafeHtml;
	pendulumText1b!: SafeHtml;
	pendulumText1c!: SafeHtml;
	pendulumText1d!: SafeHtml;
	pendulumText1e!: SafeHtml;

	pendulumText2a!: SafeHtml;
	pendulumText2b!: SafeHtml;
	pendulumText2c!: SafeHtml;


    ngOnInit() {
        // subscribe to page param so nav-bar jumps update the view reactively
        this.pageSub = this.route.queryParams.subscribe(params => {
            const page = params['page'];
            if (page && ['1','2'].includes(page)) {
                this.currentView = `pendulum${page}`;
                this.renderMath();
            }
        });

        // start tracking this module
        this.trackingService.startModule('p3-pendulum-module');

        // restore completion states from previous session
        this.restoreCompletionState();

		// sanitized strings to enable LaTeX rendering
        this.pendulumText1a = this.sanitizer.bypassSecurityTrustHtml(p3Content.pendulumText1a);
        this.pendulumText1b = this.sanitizer.bypassSecurityTrustHtml(p3Content.pendulumText1b);
        this.pendulumText1c = this.sanitizer.bypassSecurityTrustHtml(p3Content.pendulumText1c);
        this.pendulumText1d = this.sanitizer.bypassSecurityTrustHtml(p3Content.pendulumText1d);
        this.pendulumText1e = this.sanitizer.bypassSecurityTrustHtml(p3Content.pendulumText1e);

        this.pendulumText2a = this.sanitizer.bypassSecurityTrustHtml(p3Content.pendulumText2a);
        this.pendulumText2b = this.sanitizer.bypassSecurityTrustHtml(p3Content.pendulumText2b);
        this.pendulumText2c = this.sanitizer.bypassSecurityTrustHtml(p3Content.pendulumText2c);
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
        const page = this.currentView.replace('pendulum', '');
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page },
            queryParamsHandling: 'merge',
            replaceUrl: true
        });
    }

    // navigation helpers
	currentView: string = 'pendulum1';

    get isFirstPage(): boolean {
        return this.currentView === 'pendulum1';
    }
    get isLastPage(): boolean {
        return this.currentView === 'pendulum2';
    }



    // going back shows the previous subpage / the previous segment (dev mode only)
    goBack() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const page = Number(this.currentView.replace('pendulum', ''));
        if (page === 1) {
            this.router.navigate(['/learning/p2-rotation'], { queryParams: { page: '3' } });
            return;
        }
        this.currentView = `pendulum${page - 1}`;
        this.updateUrl();
        this.renderMath();
    }


    // go forward shows next subpage / page
    goForward() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const page = Number(this.currentView.replace('pendulum', ''));
        if (page === 2) {
            this.router.navigate(['/learning/p4-gyroscope']);
            return;
        }
        this.currentView = `pendulum${page + 1}`;
        this.updateUrl();
        this.renderMath();
    }
}
