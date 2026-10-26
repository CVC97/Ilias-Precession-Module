import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GlossaryBase } from '../glossary-base';



@Component({
    selector: 'app-figure-axis',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './figure-axis.html',
    styleUrl: './figure-axis.css',
})
export class FigureAxis extends GlossaryBase {
    figureAxisText!: SafeHtml;
    figureAxisFormulaText!: SafeHtml;


    constructor(
        private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) platformId: Object,
        route: ActivatedRoute
    ) {
        super(platformId, route);
    }


	// bypassing math rendering errors
    initContent() {
        this.figureAxisText = this.sanitizer.bypassSecurityTrustHtml(`
			Die Figurenachse ist die Symmetrieachse eines rotationssymmetrischen Kreisels – im Versuch die Achse, auf der das Rad sitzt.
			Sie ist fest mit dem Kreisel verbunden und bewegt sich mit ihm.
        `);

        this.figureAxisFormulaText = this.sanitizer.bypassSecurityTrustHtml(`
			Beim Kreisel unterscheidet man drei Achsen: die Figurenachse, die Drehimpulsachse (Richtung von $\\vec{L}$)
			und die momentane Drehachse (Richtung von $\\vec{\\omega}$). Sie fallen nur zusammen, wenn der Kreisel genau um seine Figurenachse rotiert.<br><br>
			Beim schnellen Kreisel liegen Drehimpulsachse und momentane Drehachse nahe an der Figurenachse.
        `);
    }
}
