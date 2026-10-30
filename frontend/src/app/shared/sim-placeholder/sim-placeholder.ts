import { Component, Input } from '@angular/core';
import { DevModeService } from '../../core/services/dev-mode';
import { SIM_PRESETS, SimEmbedConfig } from '../sim-embed/sim-presets';



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

    get preset(): SimEmbedConfig | undefined {
        return SIM_PRESETS[this.presetId];
    }
}
