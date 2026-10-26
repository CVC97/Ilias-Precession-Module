import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GlossaryBase } from '../glossary-base';



@Component({
    selector: 'app-angular-momentum',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './angular-momentum.html',
    styleUrl: './angular-momentum.css',
})
export class AngularMomentum extends GlossaryBase {
    angular_momentumText!: SafeHtml;
    angular_momentumFormulaText!: SafeHtml;


    constructor(
        private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) platformId: Object,
        route: ActivatedRoute
    ) {
        super(platformId, route);
    }


	// bypassing math rendering errors
    initContent() {
        this.angular_momentumText = this.sanitizer.bypassSecurityTrustHtml(`
			Der Drehimpuls $\\vec{L}$ ist das Gegenstück zum Impuls bei Drehbewegungen.
			Er ist ein Vektor: Sein Betrag gibt an, wie viel Rotation in einem Körper steckt, seine Richtung gibt an, um welche Achse er rotiert.
			Wirkt kein äußeres Drehmoment, bleibt der Drehimpuls nach Betrag und Richtung erhalten.
        `);

        this.angular_momentumFormulaText = this.sanitizer.bypassSecurityTrustHtml(`
			Für einen Massenpunkt mit Ortsvektor $\\vec{r}$ und Impuls $\\vec{p} = m\\vec{v}$ gilt
			$$\\vec{L} = \\vec{r} \\times \\vec{p}.$$
			Für einen starren Körper, der um eine seiner Symmetrieachsen rotiert, ist der Drehimpuls das Produkt aus
			Trägheitsmoment $I$ bezüglich dieser Achse
			und Winkelgeschwindigkeit $\\vec{\\omega}$:
			$$\\vec{L} = I\\,\\vec{\\omega}.$$
			In diesem Fall zeigen $\\vec{L}$ und $\\vec{\\omega}$ in dieselbe Richtung. Dreht sich der Körper nicht um eine Symmetrieachse,
			sind die beiden Vektoren im Allgemeinen nicht parallel.<br><br>

			Ein äußeres Drehmoment $\\vec{D}$ ändert den Drehimpuls:
			$$\\frac{\\mathrm{d}\\vec{L}}{\\mathrm{d}t} = \\vec{D}.$$
        `);
    }
}
