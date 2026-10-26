import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GlossaryBase } from '../glossary-base';



@Component({
    selector: 'app-precession',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './precession.html',
    styleUrl: './precession.css',
})
export class Precession extends GlossaryBase {
    precessionText!: SafeHtml;
    precessionFormulaText!: SafeHtml;


    constructor(
        private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) platformId: Object,
        route: ActivatedRoute
    ) {
        super(platformId, route);
    }


	// bypassing math rendering errors
    initContent() {
        this.precessionText = this.sanitizer.bypassSecurityTrustHtml(`
			Präzession ist die Drehung der Drehimpulsachse eines Kreisels, wenn ein Drehmoment senkrecht zu seinem Drehimpuls wirkt.
			Statt der Kraft nachzugeben und zu kippen, weicht der Kreisel seitlich aus.
        `);

        this.precessionFormulaText = this.sanitizer.bypassSecurityTrustHtml(`
			Aus $\\mathrm{d}\\vec{L}/\\mathrm{d}t = \\vec{D}$ folgt für ein Drehmoment senkrecht zu $\\vec{L}$: Der Betrag von $\\vec{L}$ bleibt gleich,
			nur seine Richtung dreht sich. Für die Präzessionsgeschwindigkeit gilt
			$$\\vec{D} = \\vec{\\omega}_P\\times\\vec{L}, \\qquad \\omega_P = \\frac{D}{L\\sin\\theta},$$
			wobei $\\theta$ der Winkel zwischen $\\vec{L}$ und der Präzessionsachse ist.<br><br>
			Beispiele: ein Kreisel oder ein rotierendes Fahrradrad unter seiner Gewichtskraft; die Präzession der Erdachse
			(Periode etwa 26&nbsp;000 Jahre), verursacht durch die Drehmomente von Sonne und Mond auf die abgeplattete Erde;
			die Larmor-Präzession magnetischer Momente im Magnetfeld.
        `);
    }
}
