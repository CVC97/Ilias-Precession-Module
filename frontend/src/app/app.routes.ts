import { Component } from '@angular/core';
import { CanActivateFn, Routes } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

import { Home } from './features/home/home';
import { Glossary } from './features/glossary/glossary';

// glossary features
import { AngularMomentum } from './features/glossary_features/angular-momentum/angular-momentum';
import { MomentOfInertia } from './features/glossary_features/moment-of-inertia/moment-of-inertia';


// learning features

// decision features

// test features

// simulation features

// target features



export const routes: Routes = [
    { path: '', component: Home, title: 'Kreiselpräzession' },
    { path: 'glossary', component: Glossary, title: 'Kreiselpräzession - Begriffe' },

    // glossary pages
    { path: 'glossary/angular-momentum',    component: AngularMomentum,     title: 'Drehmoment' },
    { path: 'glossary/moment-of-inertia',   component: MomentOfInertia,     title: 'Trägheitsmoment' },



    // conventional learning module pages
    
    // decision pages
   
    // test pages
    
    // simulation pages
    
    // target pages
];
