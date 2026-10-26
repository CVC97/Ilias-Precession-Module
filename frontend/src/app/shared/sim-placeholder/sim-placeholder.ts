import { Component, Input } from '@angular/core';
import { DevModeService } from '../../core/services/dev-mode';
import { SIM_PRESETS, SimPresetPlan } from './sim-presets';



// Stands in for the Unity embed until Phase 6 (same size as the later iframe).
// Students see a neutral notice; dev mode also shows the planned preset.
@Component({
    selector: 'app-sim-placeholder',
    imports: [],
    templateUrl: './sim-placeholder.html',
    styleUrl: './sim-placeholder.css',
})
export class SimPlaceholder {
    @Input() presetId!: string;

    constructor(public devMode: DevModeService) {}

    get preset(): SimPresetPlan | undefined {
        return SIM_PRESETS[this.presetId];
    }

    get settingsText(): string {
        const s = this.preset?.settings ?? {};
        return Object.entries(s).map(([k, v]) => `${k} = ${v}`).join(', ');
    }
}
