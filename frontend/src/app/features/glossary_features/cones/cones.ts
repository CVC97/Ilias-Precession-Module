import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GlossaryBase } from '../glossary-base';



@Component({
    selector: 'app-cones',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './cones.html',
    styleUrl: './cones.css',
})
export class Cones extends GlossaryBase {
    conesText!: SafeHtml;
    conesFormulaText!: SafeHtml;


    constructor(
        private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) platformId: Object,
        route: ActivatedRoute
    ) {
        super(platformId, route);
    }


	// bypassing math rendering errors
    initContent() {
        this.conesText = this.sanitizer.bypassSecurityTrustHtml(`
			Die Bewegung eines kräftefreien symmetrischen Kreisels lässt sich mit drei Kegeln beschreiben, auf denen sich seine Achsen bewegen.
        `);

        this.conesFormulaText = this.sanitizer.bypassSecurityTrustHtml(`
			<ul>
				<li><strong>Nutationskegel:</strong> Die Figurenachse läuft um die raumfeste Drehimpulsachse.</li>
				<li><strong>Rastpolkegel</strong> (auch Spurkegel): Die momentane Drehachse läuft um die Drehimpulsachse. Der Kegel ist raumfest.</li>
				<li><strong>Gangpolkegel</strong> (auch Polkegel): Die momentane Drehachse läuft um die Figurenachse.
					Der Kegel ist körperfest, er bewegt sich mit dem Kreisel.</li>
			</ul>
			Der Gangpolkegel rollt ohne zu gleiten auf dem Rastpolkegel ab. Die Berührungslinie beider Kegel ist die momentane Drehachse.
			Figurenachse, Drehimpulsachse und momentane Drehachse liegen dabei stets in einer Ebene.
        `);
    }
}
