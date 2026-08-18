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
            title: 'Drehmoment',
            definition: 'Das Drehmoment beschreibt die Drehwirkung einer Kraft auf einen Körper. Es verhält sich analog zur Kraft in geradlinigen Bewegungen und kann somit beschleunigend oder abbremsend wirken. Ein Drehmoment entsteht, wenn eine Kraft mit einem Hebelarm auf einen Körper wirkt.',
			link: '/glossary/angular-momentum'
		},
        {
            title: 'Trägheitsmoment',
            definition: 'Das Trägheitsmoment Θ ist ein Maß für den Widerstand, den ein Körper der Änderung seiner Winkelgeschwindigkeit entgegensetzt. Es spielt damit bei einer Drehbewegung die gleiche Rolle wie die (träge) Masse im Verhältnis von Kraft und Beschleunigung (Translationsbewegeung).',
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
