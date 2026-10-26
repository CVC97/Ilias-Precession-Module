import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GlossaryBase } from '../glossary-base';



declare global {
    interface Window {
        MathJax: any;
    }
}


@Component({
	selector: 'app-moment-of-inertia',
	standalone: true,
    imports: [RouterLink, CommonModule],
	templateUrl: './moment-of-inertia.html',
	styleUrl: './moment-of-inertia.css',
})
export class MomentOfInertia extends GlossaryBase {
    moiText!: SafeHtml;
    moiFormulaText!: SafeHtml;
	moiPlotText!: SafeHtml;


    constructor(
        private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) platformId: Object,
        route: ActivatedRoute
    ) {
        super(platformId, route);
    }


	// bypassing math rendering errors
    initContent() {
        this.moiText = this.sanitizer.bypassSecurityTrustHtml(`
            Das Trägheitsmoment $I$ ist ein Maß für den Widerstand, den ein Körper der Änderung seiner Winkelgeschwindigkeit entgegensetzt.
			Es spielt damit bei einer Drehbewegung die gleiche Rolle wie die (träge) Masse im Verhältnis von Kraft und Beschleunigung (Translationsbewegung).
			Es hängt nicht nur von der Masse ab, sondern auch davon, wie weit die Masse von der Drehachse entfernt ist.
        `);

        this.moiFormulaText = this.sanitizer.bypassSecurityTrustHtml(`
            Das Trägheitsmoment $I$ bezüglich einer Drehachse ist definiert als

			$$I=\\int_V r_\\perp^2\\,\\rho(\\vec{r})\\,\\mathrm{d}V.$$

			Dabei ist $\\rho(\\vec{r})$ die Dichte des Körpers und $r_\\perp$ der senkrechte Abstand des Volumenelements $\\mathrm{d}V$ von der Drehachse.
			Masse weit außen trägt also quadratisch stärker bei als Masse nahe der Achse.<br><br>

			Beispiel: Eine homogene Scheibe (Masse $m$, Radius $R$) hat bezüglich ihrer Symmetrieachse das Trägheitsmoment $I = \\tfrac{1}{2} m R^2$.<br><br>

			Bezeichnung: In vielen Lehrbüchern wird das Trägheitsmoment auch $\\Theta$ oder $J$ genannt.
        `);
    }
}
