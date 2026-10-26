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
            title: 'Newtonsche Notation',
            definition: 'Die Newtonsche Notation kennzeichnet Ableitungen einer Größe nach der Zeit durch Punkte über dem Formelzeichen. Ein Punkt steht für die erste Zeitableitung und zwei Punkte stehen für die zweite Zeitableitung.',
			link: '/glossary/newton-notation'
        },
        {
            title: 'Trägheitsmoment',
            definition: 'Das Trägheitsmoment I ist ein Maß für den Widerstand, den ein Körper der Änderung seiner Winkelgeschwindigkeit entgegensetzt. Es spielt damit bei einer Drehbewegung die gleiche Rolle wie die (träge) Masse im Verhältnis von Kraft und Beschleunigung (Translationsbewegung).',
			link: '/glossary/moment-of-inertia'
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
