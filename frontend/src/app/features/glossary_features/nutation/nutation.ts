import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GlossaryBase } from '../glossary-base';



@Component({
    selector: 'app-nutation',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './nutation.html',
    styleUrl: './nutation.css',
})
export class Nutation extends GlossaryBase {
    nutationText!: SafeHtml;
    nutationFormulaText!: SafeHtml;


    constructor(
        private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) platformId: Object,
        route: ActivatedRoute
    ) {
        super(platformId, route);
    }


	// bypassing math rendering errors
    initContent() {
        this.nutationText = this.sanitizer.bypassSecurityTrustHtml(`
			Nutation ist eine Bewegung der Figurenachse eines Kreisels um die Richtung seines Drehimpulses.
			Beim kräftefreien Kreisel läuft die Figurenachse dabei auf einem Kegel – dem Nutationskegel – um die raumfeste Drehimpulsachse.
        `);

        this.nutationFormulaText = this.sanitizer.bypassSecurityTrustHtml(`
			Nutation entsteht, wenn der Kreisel nicht genau um seine Figurenachse rotiert, zum Beispiel nach einem Stoß gegen die Achse.
			Wirkt zusätzlich ein Drehmoment, überlagern sich Nutation und Präzession: Die Achse nickt auf und ab, während sie präzediert.<br><br>
			Je schneller der Kreisel rotiert, desto schneller ist die Nutation, und desto enger wird der Nutationskegel bei gleich starkem Stoß.
			Der Name kommt vom lateinischen <i>nutare</i>, nicken.
        `);
    }
}
