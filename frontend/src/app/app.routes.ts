import { Component } from '@angular/core';
import { CanActivateFn, Routes } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

import { Home } from './features/home/home';
import { Glossary } from './features/glossary/glossary';

// glossary features
import { AngularMomentum } from './features/glossary_features/angular-momentum/angular-momentum';
import { MomentOfInertia } from './features/glossary_features/moment-of-inertia/moment-of-inertia';
import { NewtonNotation } from './features/glossary_features/newton-notation/newton-notation';
import { Torque } from './features/glossary_features/torque/torque';

// learning features
import { P1Setup } from './features/learning_features/p1-setup/p1-setup';
import { P2Rotation } from './features/learning_features/p2-rotation/p2-rotation';
import { P3Pendulum } from './features/learning_features/p3-pendulum/p3-pendulum';

// target features
import { TarPrecession } from './features/target_features/tar-precession/tar-precession';



export const routes: Routes = [
    { path: '', component: Home, title: 'Kreiselpräzession' },
    { path: 'glossary', component: Glossary, title: 'Kreiselpräzession - Begriffe' },

    // glossary pages
    { path: 'glossary/angular-momentum',    component: AngularMomentum,     title: 'Drehimpuls' },
    { path: 'glossary/torque',              component: Torque,              title: 'Drehmoment' },
    { path: 'glossary/newton-notation',     component: NewtonNotation,      title: 'Newtonsche Notation' },
    { path: 'glossary/moment-of-inertia',   component: MomentOfInertia,     title: 'Trägheitsmoment' },

    // learning pages
    { path: 'learning/p1-setup',           component: P1Setup,             title: 'Einstieg: Versuchsaufbau' },
    { path: 'learning/p2-rotation',        component: P2Rotation,          title: 'Grundlagen der Rotation' },
    { path: 'learning/p3-pendulum',        component: P3Pendulum,          title: 'Trägheitsmoment: physikalisches Pendel' },

    // target pages
    { path: 'target/tar-precession', component: TarPrecession, title: 'Anleitung: Kreiselpräzession' },
];
