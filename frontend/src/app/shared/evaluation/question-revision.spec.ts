import { describe, expect, it } from 'vitest';
import { canRestoreAnswer, questionRevision } from './question-revision';

const options = [{ value: 'a', label: 'Along the axis' }, { value: 'b', label: 'Across the axis' }];

describe('saved question compatibility', () => {
    it('keeps content identity independent of display order', () => {
        expect(questionRevision('Direction?', options)).toBe(questionRevision('Direction?', [...options].reverse()));
    });

    it('does not apply an old selection to changed option meanings or a changed task', () => {
        const saved = { selectedAnswers: ['a'], questionRevision: questionRevision('Direction?', options) };
        expect(canRestoreAnswer(saved, 'Direction?', options)).toBe(true);
        expect(canRestoreAnswer(saved, 'Magnitude?', options)).toBe(false);
        expect(canRestoreAnswer(saved, 'Direction?', [{ value: 'a', label: 'Opposite the axis' }, options[1]])).toBe(false);
    });

    it('checks image identities as well as prose', () => {
        const images = [{ value: 'a', imageSrc: 'up.svg' }, { value: 'b', imageSrc: 'down.svg' }];
        const saved = { selectedAnswers: ['a'], questionRevision: questionRevision('Direction?', images, 'wheel.svg') };
        expect(canRestoreAnswer(saved, 'Direction?', images, 'other-wheel.svg')).toBe(false);
        expect(canRestoreAnswer(saved, 'Direction?', [{ value: 'a', imageSrc: 'side.svg' }, images[1]], 'wheel.svg')).toBe(false);
    });

    it('uses recorded text to detect revisions in legacy records without modifying the record', () => {
        const saved = { selectedAnswers: ['a'], questionText: 'Old question', selectedAnswerTexts: ['Along the axis'],
            correctAnswers: ['a'], correctAnswerTexts: ['Along the axis'] };
        const original = structuredClone(saved);
        expect(canRestoreAnswer(saved, 'New question', options)).toBe(false);
        expect(saved).toEqual(original);
        expect(canRestoreAnswer({ ...saved, questionText: 'Direction?' }, 'Direction?', options)).toBe(true);
        expect(canRestoreAnswer({ ...saved, questionText: 'Direction?', selectedAnswerTexts: ['Old meaning'] }, 'Direction?', options)).toBe(false);
        expect(canRestoreAnswer({ selectedAnswers: ['a'] }, 'Direction?', options)).toBe(false);
    });

    it('allows unchanged choices to be re-evaluated when only the key was corrected', () => {
        const saved = { selectedAnswers: ['a'], correctAnswers: ['a'], correctAnswerTexts: ['Along the axis'],
            questionText: 'Direction?', questionRevision: questionRevision('Direction?', options) };
        expect(canRestoreAnswer(saved, 'Direction?', options)).toBe(true);
    });
});
