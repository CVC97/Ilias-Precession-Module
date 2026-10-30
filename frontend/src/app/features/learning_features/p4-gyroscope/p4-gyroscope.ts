import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MultipleChoice } from '../../../shared/evaluation/multiple-choice/multiple-choice';
import { SingleChoice } from '../../../shared/evaluation/single-choice/single-choice';
import { SimEmbed } from '../../../shared/sim-embed/sim-embed';
import { ResultsTracking } from '../../../core/services/results-tracking';
import { GlossaryOverlay } from '../../../shared/glossary-overlay/glossary-overlay.service';
import { DevModeService } from '../../../core/services/dev-mode';
import { SimGateService } from '../../../core/services/sim-gate';
import * as p4Questions from './p4-gyroscope-questions';
import * as p4Content from './p4-gyroscope-content';



@Component({
	selector: 'app-p4-gyroscope',
	imports: [CommonModule, MultipleChoice, SingleChoice, SimEmbed],
	templateUrl: './p4-gyroscope.html',
	styleUrl: './p4-gyroscope.css',
})
export class P4Gyroscope implements OnInit, AfterViewInit, OnDestroy {
    constructor(
		private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) private platformId: Object,
        private route: ActivatedRoute,
        private router: Router,
		private trackingService: ResultsTracking,
        public glossaryOverlay: GlossaryOverlay,
        public devMode: DevModeService,
        public simGate: SimGateService
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
    question1 = p4Questions.question1;
    question2 = p4Questions.question2;
    question3 = p4Questions.question3;


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
	gyroText1a!: SafeHtml;
	gyroText1b!: SafeHtml;
	gyroText1c!: SafeHtml;
	gyroText1d!: SafeHtml;

	gyroText2a!: SafeHtml;
	gyroText2b!: SafeHtml;
	gyroText2c!: SafeHtml;

	gyroText3a!: SafeHtml;
	gyroText3b!: SafeHtml;
	gyroText3c!: SafeHtml;


    ngOnInit() {
        // subscribe to page param so nav-bar jumps update the view reactively
        this.pageSub = this.route.queryParams.subscribe(params => {
            const page = params['page'];
            if (page && ['1','2','3'].includes(page)) {
                this.currentView = `gyro${page}`;
                this.renderMath();
            }
        });

        // start tracking this module
        this.trackingService.startModule('p4-gyroscope-module');

        // restore completion states from previous session
        this.restoreCompletionState();

		// sanitized strings to enable LaTeX rendering
        this.gyroText1a = this.sanitizer.bypassSecurityTrustHtml(p4Content.gyroText1a);
        this.gyroText1b = this.sanitizer.bypassSecurityTrustHtml(p4Content.gyroText1b);
        this.gyroText1c = this.sanitizer.bypassSecurityTrustHtml(p4Content.gyroText1c);
        this.gyroText1d = this.sanitizer.bypassSecurityTrustHtml(p4Content.gyroText1d);

        this.gyroText2a = this.sanitizer.bypassSecurityTrustHtml(p4Content.gyroText2a);
        this.gyroText2b = this.sanitizer.bypassSecurityTrustHtml(p4Content.gyroText2b);
        this.gyroText2c = this.sanitizer.bypassSecurityTrustHtml(p4Content.gyroText2c);

        this.gyroText3a = this.sanitizer.bypassSecurityTrustHtml(p4Content.gyroText3a);
        this.gyroText3b = this.sanitizer.bypassSecurityTrustHtml(p4Content.gyroText3b);
        this.gyroText3c = this.sanitizer.bypassSecurityTrustHtml(p4Content.gyroText3c);
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
        const page = this.currentView.replace('gyro', '');
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page },
            queryParamsHandling: 'merge',
            replaceUrl: true
        });
    }

    // navigation helpers
	currentView: string = 'gyro1';

    get isFirstPage(): boolean {
        return this.currentView === 'gyro1';
    }
    get isLastPage(): boolean {
        return this.currentView === 'gyro3';
    }



    // going back shows the previous subpage / the previous segment (dev mode only)
    goBack() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const page = Number(this.currentView.replace('gyro', ''));
        if (page === 1) {
            this.router.navigate(['/learning/p3-pendulum'], { queryParams: { page: '2' } });
            return;
        }
        this.currentView = `gyro${page - 1}`;
        this.updateUrl();
        this.renderMath();
    }


    // go forward shows next subpage / page
    goForward() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const page = Number(this.currentView.replace('gyro', ''));
        if (page === 3) {
            this.router.navigate(['/learning/p5-precession']);
            return;
        }
        this.currentView = `gyro${page + 1}`;
        this.updateUrl();
        this.renderMath();
    }
}
