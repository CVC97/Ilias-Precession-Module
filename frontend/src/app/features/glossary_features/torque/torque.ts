import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GlossaryBase } from '../glossary-base';



@Component({
    selector: 'app-torque',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './torque.html',
    styleUrl: './torque.css',
})
export class Torque extends GlossaryBase {
    torqueText!: SafeHtml;
    torqueFormulaText!: SafeHtml;


    constructor(
        private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) platformId: Object,
        route: ActivatedRoute
    ) {
        super(platformId, route);
    }


	// bypassing math rendering errors
    initContent() {
        this.torqueText = this.sanitizer.bypassSecurityTrustHtml(`
			Das Drehmoment $\\vec{D}$ beschreibt die Drehwirkung einer Kraft auf einen Körper.
			Es spielt bei Drehbewegungen die Rolle, die die Kraft bei geradlinigen Bewegungen spielt:
			So wie eine Kraft den Impuls ändert, ändert ein Drehmoment den Drehimpuls.
			Ein Drehmoment entsteht, wenn eine Kraft im Abstand $r$ von der Drehachse angreift.
			Je größer dieser Abstand und je größer die Kraft, desto größer ist das Drehmoment.
        `);

        this.torqueFormulaText = this.sanitizer.bypassSecurityTrustHtml(`
			Greift die Kraft $\\vec{F}$ am Ort $\\vec{r}$ (gemessen vom Drehpunkt) an, ist das Drehmoment das Kreuzprodukt
			$$\\vec{D} = \\vec{r} \\times \\vec{F}, \\qquad |\\vec{D}| = r\\,F\\,\\sin\\alpha,$$
			wobei $\\alpha$ der Winkel zwischen $\\vec{r}$ und $\\vec{F}$ ist.
			$\\vec{D}$ steht senkrecht auf $\\vec{r}$ und $\\vec{F}$; seine Richtung ergibt sich aus der Rechte-Hand-Regel.<br><br>

			Das Drehmoment bestimmt, wie sich der Drehimpuls $\\vec{L}$ zeitlich ändert:
			$$\\frac{\\mathrm{d}\\vec{L}}{\\mathrm{d}t} = \\vec{D}.$$
			Die Änderung von $\\vec{L}$ zeigt also immer in Richtung des Drehmoments, nicht unbedingt in Richtung von $\\vec{L}$ selbst.<br><br>

			Bezeichnung: Im Versuchsskript heißt das Drehmoment $\\vec{D}$. In vielen Lehrbüchern und in den Abbildungen des Skripts
			wird es auch $\\vec{M}$ bzw. $\\vec{T}$ (engl. <i>torque</i>) genannt.
        `);
    }
}
