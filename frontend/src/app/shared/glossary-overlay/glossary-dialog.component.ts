import { Component, Inject, Injector, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { GLOSSARY_IS_OVERLAY } from './glossary-is-overlay.token';

import { AngularMomentum }     from '../../features/glossary_features/angular-momentum/angular-momentum';
import { MomentOfInertia }     from '../../features/glossary_features/moment-of-inertia/moment-of-inertia';

const TERM_MAP: Record<string, Type<any>> = {
    'angular-momentum':     AngularMomentum,
    'moment-of-inertia':    MomentOfInertia,
};

@Component({
    selector: 'app-glossary-dialog',
    standalone: true,
    imports: [NgComponentOutlet],
    templateUrl: './glossary-dialog.component.html',
    styleUrl: './glossary-dialog.component.css',
})
export class GlossaryDialogComponent {
    component: Type<any> | null;
    overlayInjector: Injector;

    constructor(
        @Inject(DIALOG_DATA) public data: { term: string },
        private dialogRef: DialogRef,
        private injector: Injector
    ) {
        this.component = TERM_MAP[data.term] ?? null;

        // Provide GLOSSARY_IS_OVERLAY=true so the glossary component hides its back button.
        this.overlayInjector = Injector.create({
            providers: [{ provide: GLOSSARY_IS_OVERLAY, useValue: true }],
            parent: this.injector,
        });
    }

    close(): void {
        this.dialogRef.close();
    }
}
