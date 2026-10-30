import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';



/**
 * Which simulation embeds have released their page's "Weiter" button.
 *
 * SimEmbed marks its presetId when the page's gate rule is met (or the sim
 * fails to load); the page template reads isReached(). Kept in sessionStorage,
 * so coming back to a sub-page within the session doesn't lock it again.
 */
@Injectable({ providedIn: 'root' })
export class SimGateService {
    private readonly KEY = 'simGatesReached';
    private readonly reached = signal<ReadonlySet<string>>(new Set());
    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
        if (this.isBrowser) {
            try {
                const saved = JSON.parse(sessionStorage.getItem(this.KEY) ?? '[]');
                if (Array.isArray(saved)) this.reached.set(new Set(saved));
            } catch { /* corrupt entry: start empty */ }
        }
    }

    isReached(presetId: string): boolean {
        return this.reached().has(presetId);
    }

    markReached(presetId: string) {
        if (this.reached().has(presetId)) return;
        const next = new Set(this.reached()).add(presetId);
        this.reached.set(next);
        if (this.isBrowser) sessionStorage.setItem(this.KEY, JSON.stringify([...next]));
    }
}
