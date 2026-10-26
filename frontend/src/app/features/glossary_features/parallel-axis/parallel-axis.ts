import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GlossaryBase } from '../glossary-base';



@Component({
    selector: 'app-parallel-axis',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './parallel-axis.html',
    styleUrl: './parallel-axis.css',
})
export class ParallelAxis extends GlossaryBase {
    parallelAxisText!: SafeHtml;
    parallelAxisFormulaText!: SafeHtml;


    constructor(
        private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) platformId: Object,
        route: ActivatedRoute
    ) {
        super(platformId, route);
    }


	// bypassing math rendering errors
    initContent() {
        this.parallelAxisText = this.sanitizer.bypassSecurityTrustHtml(`
			Der Steinersche Satz verknüpft das Trägheitsmoment eines Körpers bezüglich einer beliebigen Achse
			mit dem bezüglich einer dazu parallelen Achse durch seinen Schwerpunkt.
        `);

        this.parallelAxisFormulaText = this.sanitizer.bypassSecurityTrustHtml(`
			$$I = I_S + m\\,a^2$$
			Dabei ist $I_S$ das Trägheitsmoment bezüglich der Schwerpunktachse, $m$ die Masse des Körpers und $a$ der Abstand der beiden parallelen Achsen.
			Bezüglich der Schwerpunktachse ist das Trägheitsmoment also am kleinsten.<br><br>
			Im Versuch brauchen Sie den Satz für das Pendelgewicht: Es sitzt im Abstand $d$ von der Radachse und trägt
			$I_p = I_{p,S} + m_p d^2$ zum Trägheitsmoment bei.
        `);
    }
}
