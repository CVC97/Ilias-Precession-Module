import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { describe, it, expect, beforeEach } from 'vitest';
import { DevModeService } from '../../core/services/dev-mode';
import { VisitedPages } from '../../core/services/visited-pages';
import { NavBar } from './nav-bar';

@Component({ template: '' })
class EmptyPage {}

// inside a parent, as in the app: the host bindings of a fixture's root component aren't refreshed
@Component({ imports: [NavBar], template: '<app-nav-bar></app-nav-bar>' })
class Parent {}

describe('NavBar', () => {
    let fixture: ComponentFixture<Parent>;
    let router: Router;
    let devMode: { isEnabled: boolean };
    let visited: Set<string>;

    const row = (label: string): HTMLButtonElement => {
        const rows = [...fixture.nativeElement.querySelectorAll('button')] as HTMLButtonElement[];
        const found = rows.find(button => button.textContent!.includes(label));
        if (!found) throw new Error(`no row "${label}"`);
        return found;
    };

    const openAt = async (url: string) => {
        await router.navigateByUrl(url);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    };

    beforeEach(() => {
        devMode = { isEnabled: false };
        visited = new Set(['/|1', '/learning/p1-setup|1', '/learning/p5-precession|1', '/learning/p5-precession|2']);
        TestBed.configureTestingModule({
            imports: [NavBar],
            providers: [
                provideRouter([{ path: '**', component: EmptyPage }]),
                { provide: DevModeService, useValue: devMode },
                { provide: VisitedPages, useValue: { has: (path: string, page = '1') => visited.has(`${path}|${page}`) } },
            ]
        });
        router = TestBed.inject(Router);
        fixture = TestBed.createComponent(Parent);
    });

    it('locks a row that was not visited: disabled and without the box', async () => {
        await openAt('/learning/p5-precession?page=2');
        expect(row('Nutation').disabled).toBe(true);
        expect(row('Nutation').classList).not.toContain('nav-row--open');
        expect(row('Abschluss').disabled).toBe(true);
        expect(row('(3/3) - Simulation').disabled).toBe(true);
    });

    it('opens a visited row', async () => {
        await openAt('/learning/p5-precession?page=2');
        expect(row('Einstieg').disabled).toBe(false);
        expect(row('Einstieg').classList).toContain('nav-row--open');

        row('Einstieg').click();
        await fixture.whenStable();
        expect(router.url).toBe('/learning/p1-setup?page=1');
    });

    it('does not navigate from a locked row', async () => {
        await openAt('/learning/p5-precession?page=2');
        row('Nutation').click();
        await fixture.whenStable();
        expect(router.url).toBe('/learning/p5-precession?page=2');
    });

    it('marks the current segment and sub-page', async () => {
        await openAt('/learning/p5-precession?page=2');
        expect(row('Präzession').getAttribute('aria-current')).toBe('step');
        expect(row('Präzession').classList).toContain('nav-row--active');
        expect(row('(2/3)').getAttribute('aria-current')).toBe('page');
        expect(row('(1/3)').getAttribute('aria-current')).toBeNull();
        expect(row('Der Kreisel').getAttribute('aria-current')).toBeNull();
    });

    it('numbers the segments in the markers, not in the labels', async () => {
        await openAt('/learning/p5-precession?page=2');
        const markers = [...fixture.nativeElement.querySelectorAll('.seg-list > .nav-row .nav-marker')] as HTMLElement[];
        expect(markers.map(marker => marker.textContent!.trim())).toEqual(['1', '2', '3', '4', '5', '6', '7']);
        expect(row('Einstieg').textContent).not.toContain('1.');
    });

    it('opens everything in dev mode', async () => {
        devMode.isEnabled = true;
        await openAt('/learning/p5-precession?page=2');
        expect(row('Nutation').disabled).toBe(false);
        expect(row('Abschluss').disabled).toBe(false);
        expect(row('(3/3) - Simulation').disabled).toBe(false);
        expect(row('Glossar').disabled).toBe(false);
    });

    it('frees the column on the start page', async () => {
        await openAt('/');
        expect(fixture.nativeElement.querySelector('app-nav-bar').classList).toContain('nav-hidden');
    });

    it('keeps the column on the other pages', async () => {
        await openAt('/learning/p1-setup?page=1');
        expect(fixture.nativeElement.querySelector('app-nav-bar').classList).not.toContain('nav-hidden');
    });
});
