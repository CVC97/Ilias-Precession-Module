import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GlossaryBase } from '../glossary-base';



@Component({
    selector: 'app-instantaneous-axis',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './instantaneous-axis.html',
    styleUrl: './instantaneous-axis.css',
})
export class InstantaneousAxis extends GlossaryBase {
    instantaneousAxisText!: SafeHtml;
    instantaneousAxisFormulaText!: SafeHtml;


    constructor(
        private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) platformId: Object,
        route: ActivatedRoute
    ) {
        super(platformId, route);
    }


	// bypassing math rendering errors
    initContent() {
        this.instantaneousAxisText = this.sanitizer.bypassSecurityTrustHtml(`
			Die momentane Drehachse ist die Richtung der Winkelgeschwindigkeit $\\vec{\\omega}$ in einem bestimmten Augenblick.
			Die Punkte des Körpers, die auf ihr liegen, sind in diesem Augenblick in Ruhe.
        `);

        this.instantaneousAxisFormulaText = this.sanitizer.bypassSecurityTrustHtml(`
			Dreht sich ein Körper um eine feste Achse, ist die momentane Drehachse immer dieselbe.
			Beim Kreisel kann sie sich dagegen ständig ändern: Rotiert er nicht genau um seine Figurenachse, wandert $\\vec{\\omega}$ –
			vom Raum aus gesehen auf dem Rastpolkegel, vom Kreisel aus gesehen auf dem Gangpolkegel.<br><br>
			Weil die Trägheitsmomente um verschiedene Achsen verschieden sind, zeigt $\\vec{L}$ im Allgemeinen nicht in Richtung der momentanen Drehachse.
        `);
    }
}
