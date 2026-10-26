import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



// properties of each glossary term
interface GlossaryTerm {
    title: string;
    definition: string;
    link?: string;
}



@Component({
    selector: 'app-glossary',
    standalone: true,
    imports: [RouterLink, CommonModule, FormsModule],
    templateUrl: './glossary.html',
    styleUrl: './glossary.css',
})



export class Glossary {
    searchTerm: string = '';
    
    terms: GlossaryTerm[] = [
        {
            title: 'Drehimpuls',
            definition: 'Der Drehimpuls L ist das Gegenstück zum Impuls bei Drehbewegungen. Er ist ein Vektor, dessen Richtung die Drehachse angibt. Für einen um eine Symmetrieachse rotierenden starren Körper gilt L = I·ω. Ohne äußeres Drehmoment bleibt er nach Betrag und Richtung erhalten.',
			link: '/glossary/angular-momentum'
        },
        {
            title: 'Drehmoment',
            definition: 'Das Drehmoment D beschreibt die Drehwirkung einer Kraft auf einen Körper: D = r × F. Es spielt bei Drehbewegungen die Rolle der Kraft und ändert den Drehimpuls in seine eigene Richtung: dL/dt = D.',
			link: '/glossary/torque'
        },
        {
            title: 'Figurenachse',
            definition: 'Die Figurenachse ist die Symmetrieachse eines rotationssymmetrischen Kreisels – im Versuch die Achse, auf der das Rad sitzt. Sie ist fest mit dem Kreisel verbunden.',
			link: '/glossary/figure-axis'
        },
        {
            title: 'Kreuzprodukt und Rechte-Hand-Regel',
            definition: 'Das Kreuzprodukt a × b zweier Vektoren steht senkrecht auf beiden; sein Betrag ist a·b·sin α. Die Richtung folgt aus der Rechte-Hand-Regel. Drehmoment, Drehimpuls und Bahngeschwindigkeit sind Kreuzprodukte.',
			link: '/glossary/cross-product'
        },
        {
            title: 'Momentane Drehachse',
            definition: 'Die momentane Drehachse ist die Richtung der Winkelgeschwindigkeit ω in einem bestimmten Augenblick. Die Punkte des Körpers auf ihr sind in diesem Augenblick in Ruhe.',
			link: '/glossary/instantaneous-axis'
        },
        {
            title: 'Newtonsche Notation',
            definition: 'Die Newtonsche Notation kennzeichnet Ableitungen einer Größe nach der Zeit durch Punkte über dem Formelzeichen. Ein Punkt steht für die erste Zeitableitung und zwei Punkte stehen für die zweite Zeitableitung.',
			link: '/glossary/newton-notation'
        },
        {
            title: 'Nutation',
            definition: 'Nutation ist eine Bewegung der Figurenachse eines Kreisels um die Richtung seines Drehimpulses. Beim kräftefreien Kreisel läuft die Figurenachse auf dem Nutationskegel um die raumfeste Drehimpulsachse.',
			link: '/glossary/nutation'
        },
        {
            title: 'Nutations-, Rastpol- und Gangpolkegel',
            definition: 'Die Bewegung des kräftefreien Kreisels lässt sich mit drei Kegeln beschreiben: Nutationskegel (Figurenachse um L), Rastpolkegel (ω um L, raumfest) und Gangpolkegel (ω um die Figurenachse, körperfest).',
			link: '/glossary/cones'
        },
        {
            title: 'Physikalisches Pendel',
            definition: 'Ein physikalisches Pendel ist ein starrer Körper, der um eine Achse außerhalb seines Schwerpunkts schwingt. Für kleine Auslenkungen gilt T = 2π·√(I/(m·g·d)).',
			link: '/glossary/physical-pendulum'
        },
        {
            title: 'Präzession',
            definition: 'Präzession ist die Drehung der Drehimpulsachse eines Kreisels unter einem Drehmoment senkrecht zu seinem Drehimpuls. Statt zu kippen, weicht der Kreisel seitlich aus; die Präzessionsgeschwindigkeit ist ω_P = D/(L sin θ).',
			link: '/glossary/precession'
        },
        {
            title: 'Steinerscher Satz',
            definition: 'Der Steinersche Satz I = I_S + m·a² verknüpft das Trägheitsmoment bezüglich einer Achse mit dem bezüglich einer dazu parallelen Achse durch den Schwerpunkt (Abstand a).',
			link: '/glossary/parallel-axis'
        },
        {
            title: 'Trägheitsmoment',
            definition: 'Das Trägheitsmoment I ist ein Maß für den Widerstand, den ein Körper der Änderung seiner Winkelgeschwindigkeit entgegensetzt. Es spielt damit bei einer Drehbewegung die gleiche Rolle wie die (träge) Masse im Verhältnis von Kraft und Beschleunigung (Translationsbewegung).',
			link: '/glossary/moment-of-inertia'
        },
        {
            title: 'Winkelgeschwindigkeit',
            definition: 'Die Winkelgeschwindigkeit ω beschreibt, wie schnell und um welche Achse sich ein Körper dreht. Ihr Betrag ist der überstrichene Winkel pro Zeit (ω = 2π/T), ihre Richtung liegt auf der Drehachse (Rechte-Hand-Regel).',
			link: '/glossary/angular-velocity'
        }
    ];

    filteredTerms: GlossaryTerm[] = [...this.terms];

    filterTerms() {
        if (!this.searchTerm) {
            this.filteredTerms = [...this.terms];
            return;
        }

        const search = this.searchTerm.toLowerCase();
        this.filteredTerms = this.terms.filter(term => 
            term.title.toLowerCase().includes(search) || 
            term.definition.toLowerCase().includes(search)
        );
    }
}
