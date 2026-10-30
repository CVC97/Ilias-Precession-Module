import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { VisitedPages } from './visited-pages';

describe('VisitedPages', () => {
    afterEach(() => localStorage.clear());

    it('keys sub-pages by path and page, page 1 also without the parameter', () => {
        expect(VisitedPages.keyOf('/learning/p2-rotation?page=2')).toBe('/learning/p2-rotation|2');
        expect(VisitedPages.keyOf('/learning/p2-rotation')).toBe('/learning/p2-rotation|1');
        expect(VisitedPages.keyOf('/?session_id=abc')).toBe('/|1');
    });

    it('remembers visited pages, also from the saved progress, for the next app start', () => {
        TestBed.inject(VisitedPages).add(['/learning/p1-setup?page=3', '/target/tar-precession']);
        expect(TestBed.inject(VisitedPages).has('/learning/p1-setup', '3')).toBe(true);
        expect(TestBed.inject(VisitedPages).has('/learning/p1-setup', '2')).toBe(false);

        TestBed.resetTestingModule();                       // a new app instance, same browser and user
        expect(TestBed.inject(VisitedPages).has('/target/tar-precession')).toBe(true);
    });
});
