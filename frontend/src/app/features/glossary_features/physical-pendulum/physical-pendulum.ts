import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GlossaryBase } from '../glossary-base';



@Component({
    selector: 'app-physical-pendulum',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './physical-pendulum.html',
    styleUrl: './physical-pendulum.css',
})
export class PhysicalPendulum extends GlossaryBase {
    physicalPendulumText!: SafeHtml;
    physicalPendulumFormulaText!: SafeHtml;


    constructor(
        private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) platformId: Object,
        route: ActivatedRoute
    ) {
        super(platformId, route);
    }


	// bypassing math rendering errors
    initContent() {
        this.physicalPendulumText = this.sanitizer.bypassSecurityTrustHtml(`
			Ein physikalisches Pendel ist ein starrer Körper, der um eine feste Achse schwingt, die nicht durch seinen Schwerpunkt geht.
			Anders als beim mathematischen Pendel ist seine Masse nicht in einem Punkt konzentriert.
        `);

        this.physicalPendulumFormulaText = this.sanitizer.bypassSecurityTrustHtml(`
			Liegt der Schwerpunkt im Abstand $d$ von der Drehachse, übt die Gewichtskraft bei der Auslenkung $\\varphi$ das rücktreibende
			Drehmoment $-mgd\\sin\\varphi$ aus. Für kleine Auslenkungen schwingt das Pendel harmonisch mit der Periodendauer
			$$T = 2\\pi\\sqrt{\\frac{I}{m\\,g\\,d}},$$
			wobei $I$ das Trägheitsmoment bezüglich der Drehachse ist. Misst man $T$, $m$ und $d$, lässt sich daraus $I$ bestimmen.<br><br>
			Das mathematische Pendel ist der Sonderfall einer Punktmasse an einem masselosen Faden der Länge $\\ell$:
			Mit $I = m\\ell^2$ und $d = \\ell$ folgt $T = 2\\pi\\sqrt{\\ell/g}$.
        `);
    }
}
