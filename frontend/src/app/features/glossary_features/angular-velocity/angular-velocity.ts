import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GlossaryBase } from '../glossary-base';



@Component({
    selector: 'app-angular-velocity',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './angular-velocity.html',
    styleUrl: './angular-velocity.css',
})
export class AngularVelocity extends GlossaryBase {
    angularVelocityText!: SafeHtml;
    angularVelocityFormulaText!: SafeHtml;


    constructor(
        private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) platformId: Object,
        route: ActivatedRoute
    ) {
        super(platformId, route);
    }


	// bypassing math rendering errors
    initContent() {
        this.angularVelocityText = this.sanitizer.bypassSecurityTrustHtml(`
			Die Winkelgeschwindigkeit $\\vec{\\omega}$ beschreibt, wie schnell und um welche Achse sich ein Körper dreht.
			Ihr Betrag ist der überstrichene Winkel pro Zeit, ihre Richtung liegt auf der Drehachse.
        `);

        this.angularVelocityFormulaText = this.sanitizer.bypassSecurityTrustHtml(`
			Für den Betrag gilt
			$$\\omega = \\frac{\\mathrm{d}\\varphi}{\\mathrm{d}t} = \\dot{\\varphi}, \\qquad \\omega = \\frac{2\\pi}{T}$$
			für eine gleichmäßige Drehung mit der Umlaufdauer $T$. Drehzahlen werden oft in Umdrehungen pro Minute angegeben:
			$\\omega = 2\\pi n/(60\\,\\mathrm{s})$.<br><br>
			Die Richtung von $\\vec{\\omega}$ folgt aus der Rechte-Hand-Regel: Krümmen sich die Finger der rechten Hand in Drehrichtung,
			zeigt der Daumen in Richtung von $\\vec{\\omega}$.<br><br>
			Ein Punkt am Ort $\\vec{r}$ (gemessen von einem Punkt auf der Drehachse) hat die Geschwindigkeit $\\vec{v} = \\vec{\\omega}\\times\\vec{r}$.
        `);
    }
}
