import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MultipleChoice } from '../../../shared/evaluation/multiple-choice/multiple-choice';
import { SingleChoice } from '../../../shared/evaluation/single-choice/single-choice';
import { ImageChoice } from '../../../shared/evaluation/image-choice/image-choice';
import { SimPlaceholder } from '../../../shared/sim-placeholder/sim-placeholder';
import { ResultsTracking } from '../../../core/services/results-tracking';
import { GlossaryOverlay } from '../../../shared/glossary-overlay/glossary-overlay.service';
import { DevModeService } from '../../../core/services/dev-mode';
import * as p2Questions from './p2-rotation-questions';
import * as p2Content from './p2-rotation-content';



@Component({
	selector: 'app-p2-rotation',
	imports: [CommonModule, RouterLink, MultipleChoice, SingleChoice, ImageChoice, SimPlaceholder],
	templateUrl: './p2-rotation.html',
	styleUrl: './p2-rotation.css',
})
export class P2Rotation implements OnInit, AfterViewInit, OnDestroy {
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
    question1 = p2Questions.question1;
    question2 = p2Questions.question2;
    question3 = p2Questions.question3;
    question4 = p2Questions.question4;
    question5 = p2Questions.question5;


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
	rotationText1a!: SafeHtml;
	rotationText1b!: SafeHtml;
	rotationText1c!: SafeHtml;

	rotationText2a!: SafeHtml;
	rotationText2b!: SafeHtml;
	rotationText2c!: SafeHtml;
	rotationText2d!: SafeHtml;

	rotationText3a!: SafeHtml;
	rotationText3b!: SafeHtml;
	rotationText3c!: SafeHtml;
	rotationText3d!: SafeHtml;
	rotationText3e!: SafeHtml;


    ngOnInit() {
        // subscribe to page param so nav-bar jumps update the view reactively
        this.pageSub = this.route.queryParams.subscribe(params => {
            const page = params['page'];
            if (page && ['1','2','3'].includes(page)) {
                this.currentView = `rotation${page}`;
                this.renderMath();
            }
        });

        // start tracking this module
        this.trackingService.startModule('p2-rotation-module');

        // restore completion states from previous session
        this.restoreCompletionState();

		// sanitized strings to enable LaTeX rendering
        this.rotationText1a = this.sanitizer.bypassSecurityTrustHtml(p2Content.rotationText1a);
        this.rotationText1b = this.sanitizer.bypassSecurityTrustHtml(p2Content.rotationText1b);
        this.rotationText1c = this.sanitizer.bypassSecurityTrustHtml(p2Content.rotationText1c);

        this.rotationText2a = this.sanitizer.bypassSecurityTrustHtml(p2Content.rotationText2a);
        this.rotationText2b = this.sanitizer.bypassSecurityTrustHtml(p2Content.rotationText2b);
        this.rotationText2c = this.sanitizer.bypassSecurityTrustHtml(p2Content.rotationText2c);
        this.rotationText2d = this.sanitizer.bypassSecurityTrustHtml(p2Content.rotationText2d);

        this.rotationText3a = this.sanitizer.bypassSecurityTrustHtml(p2Content.rotationText3a);
        this.rotationText3b = this.sanitizer.bypassSecurityTrustHtml(p2Content.rotationText3b);
        this.rotationText3c = this.sanitizer.bypassSecurityTrustHtml(p2Content.rotationText3c);
        this.rotationText3d = this.sanitizer.bypassSecurityTrustHtml(p2Content.rotationText3d);
        this.rotationText3e = this.sanitizer.bypassSecurityTrustHtml(p2Content.rotationText3e);
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
        const page = this.currentView.replace('rotation', '');
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page },
            queryParamsHandling: 'merge',
            replaceUrl: true
        });
    }

    // navigation helpers
	currentView: string = 'rotation1';

    get isFirstPage(): boolean {
        return this.currentView === 'rotation1';
    }
    get isLastPage(): boolean {
        return this.currentView === 'rotation3';
    }



    // going back shows the previous subpage / the previous segment (dev mode only)
    goBack() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const page = Number(this.currentView.replace('rotation', ''));
        if (page === 1) {
            this.router.navigate(['/learning/p1-setup'], { queryParams: { page: '3' } });
            return;
        }
        this.currentView = `rotation${page - 1}`;
        this.updateUrl();
        this.renderMath();
    }


    // go forward shows next subpage / page
    goForward() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const page = Number(this.currentView.replace('rotation', ''));
        if (page === 3) {
            this.router.navigate(['/learning/p3-pendulum']);
            return;
        }
        this.currentView = `rotation${page + 1}`;
        this.updateUrl();
        this.renderMath();
    }
}
