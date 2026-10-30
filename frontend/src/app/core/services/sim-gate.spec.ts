import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { SimGateService } from './sim-gate';

describe('SimGateService', () => {
    afterEach(() => sessionStorage.clear());

    it('remembers reached gates for the session', () => {
        TestBed.inject(SimGateService).markReached('p2-vectors');
        expect(TestBed.inject(SimGateService).isReached('p2-vectors')).toBe(true);
        expect(TestBed.inject(SimGateService).isReached('p4-axes')).toBe(false);

        TestBed.resetTestingModule();                       // a new app instance, same browser session
        expect(TestBed.inject(SimGateService).isReached('p2-vectors')).toBe(true);
    });
});
