import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GlossaryBase } from '../glossary-base';



@Component({
    selector: 'app-cross-product',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './cross-product.html',
    styleUrl: './cross-product.css',
})
export class CrossProduct extends GlossaryBase {
    crossProductText!: SafeHtml;
    crossProductFormulaText!: SafeHtml;


    constructor(
        private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) platformId: Object,
        route: ActivatedRoute
    ) {
        super(platformId, route);
    }


	// bypassing math rendering errors
    initContent() {
        this.crossProductText = this.sanitizer.bypassSecurityTrustHtml(`
			Das Kreuzprodukt $\\vec{a}\\times\\vec{b}$ zweier Vektoren ist ein Vektor, der senkrecht auf beiden steht.
			Bei Drehbewegungen taucht es überall auf: im Drehmoment, im Drehimpuls und in der Bahngeschwindigkeit.
        `);

        this.crossProductFormulaText = this.sanitizer.bypassSecurityTrustHtml(`
			<strong>Betrag:</strong> $|\\vec{a}\\times\\vec{b}| = a\\,b\\,\\sin\\alpha$, mit dem Winkel $\\alpha$ zwischen den Vektoren.
			Er ist am größten, wenn die Vektoren senkrecht aufeinander stehen, und null, wenn sie parallel sind.<br><br>
			<strong>Richtung (Rechte-Hand-Regel):</strong> Zeigt der Daumen der rechten Hand in Richtung von $\\vec{a}$ und der Zeigefinger
			in Richtung von $\\vec{b}$, dann zeigt der Mittelfinger in Richtung von $\\vec{a}\\times\\vec{b}$. Vertauscht man die Reihenfolge,
			kehrt sich die Richtung um: $\\vec{b}\\times\\vec{a} = -\\vec{a}\\times\\vec{b}$.<br><br>
			Für Drehungen gibt es eine zweite Form der Regel: Krümmen sich die Finger der rechten Hand in Drehrichtung,
			zeigt der Daumen in Richtung der Winkelgeschwindigkeit.<br><br>
			<strong>In Komponenten:</strong>
			$$\\vec{a}\\times\\vec{b} = \\begin{pmatrix} a_y b_z - a_z b_y \\\\ a_z b_x - a_x b_z \\\\ a_x b_y - a_y b_x \\end{pmatrix}$$
			Beispiele: $\\vec{D} = \\vec{r}\\times\\vec{F}$, $\\vec{L} = \\vec{r}\\times\\vec{p}$, $\\vec{v} = \\vec{\\omega}\\times\\vec{r}$.
        `);
    }
}
