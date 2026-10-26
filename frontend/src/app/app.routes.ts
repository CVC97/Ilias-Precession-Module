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
import { AngularVelocity } from './features/glossary_features/angular-velocity/angular-velocity';
import { CrossProduct } from './features/glossary_features/cross-product/cross-product';
import { FigureAxis } from './features/glossary_features/figure-axis/figure-axis';
import { InstantaneousAxis } from './features/glossary_features/instantaneous-axis/instantaneous-axis';
import { Nutation } from './features/glossary_features/nutation/nutation';
import { Precession } from './features/glossary_features/precession/precession';
import { ParallelAxis } from './features/glossary_features/parallel-axis/parallel-axis';
import { PhysicalPendulum } from './features/glossary_features/physical-pendulum/physical-pendulum';
import { Cones } from './features/glossary_features/cones/cones';

// learning features
import { P1Setup } from './features/learning_features/p1-setup/p1-setup';
import { P2Rotation } from './features/learning_features/p2-rotation/p2-rotation';
import { P3Pendulum } from './features/learning_features/p3-pendulum/p3-pendulum';
import { P4Gyroscope } from './features/learning_features/p4-gyroscope/p4-gyroscope';
import { P5Precession } from './features/learning_features/p5-precession/p5-precession';
import { P6Nutation } from './features/learning_features/p6-nutation/p6-nutation';
import { P7Measurement } from './features/learning_features/p7-measurement/p7-measurement';

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
    { path: 'glossary/angular-velocity',    component: AngularVelocity,     title: 'Winkelgeschwindigkeit' },
    { path: 'glossary/cross-product',       component: CrossProduct,        title: 'Kreuzprodukt und Rechte-Hand-Regel' },
    { path: 'glossary/figure-axis',         component: FigureAxis,          title: 'Figurenachse' },
    { path: 'glossary/instantaneous-axis',  component: InstantaneousAxis,   title: 'Momentane Drehachse' },
    { path: 'glossary/nutation',            component: Nutation,            title: 'Nutation' },
    { path: 'glossary/precession',          component: Precession,          title: 'Präzession' },
    { path: 'glossary/parallel-axis',       component: ParallelAxis,        title: 'Steinerscher Satz' },
    { path: 'glossary/physical-pendulum',   component: PhysicalPendulum,    title: 'Physikalisches Pendel' },
    { path: 'glossary/cones',               component: Cones,               title: 'Nutations-, Rastpol- und Gangpolkegel' },

    // learning pages
    { path: 'learning/p1-setup',           component: P1Setup,             title: 'Einstieg: Versuchsaufbau' },
    { path: 'learning/p2-rotation',        component: P2Rotation,          title: 'Grundlagen der Rotation' },
    { path: 'learning/p3-pendulum',        component: P3Pendulum,          title: 'Trägheitsmoment: physikalisches Pendel' },
    { path: 'learning/p4-gyroscope',       component: P4Gyroscope,         title: 'Der Kreisel' },
    { path: 'learning/p5-precession',      component: P5Precession,        title: 'Präzession' },
    { path: 'learning/p6-nutation',        component: P6Nutation,          title: 'Nutation' },
    { path: 'learning/p7-measurement',     component: P7Measurement,       title: 'Messstrategie und Fehlerquellen' },

    // target pages
    { path: 'target/tar-precession', component: TarPrecession, title: 'Anleitung: Kreiselpräzession' },
];
