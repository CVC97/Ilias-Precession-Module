import { TestBed } from '@angular/core/testing';

import { STORAGE_PREFIX } from './storage-prefix';
import { ResultsTracking } from './results-tracking';
import { AttemptOutbox, AttemptRow } from './attempt-outbox';

describe('ResultsTracking', () => {
  let service: ResultsTracking;

  const backendRow = (attemptNo: number, isCorrect: boolean): AttemptRow => ({
    kind: 'learning', unitId: 'mod', questionId: 'q', attemptNo, isCorrect, answer: ['a'], correctAnswer: ['a'],
    texts: { questionText: 'Frage?', answerTexts: ['Antwort'], correctAnswerTexts: ['Antwort'] },
    answeredAt: Date.UTC(2026, 10, 1)
  });

  const asStudent = (id: string) => {
    localStorage.setItem(STORAGE_PREFIX + 'framework_session_id', id);
    TestBed.resetTestingModule();
    return TestBed.inject(ResultsTracking);
  };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultsTracking);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('queues every attempt for the server, numbered', () => {
    const tracking = asStudent('student-a');
    tracking.startModule('mod');
    tracking.trackQuestionResult('q', false, ['b'], ['a']);
    tracking.trackQuestionResult('q', true, ['a'], ['a']);
    const rows = TestBed.inject(AttemptOutbox).getAll();
    expect(rows.map(r => [r.kind, r.attemptNo, r.isCorrect, r.answer])).toEqual([
      ['learning', 1, false, ['b']],
      ['learning', 2, true, ['a']],
    ]);
  });

  it('updates the latest key and counts on retry while preserving historical outbox evidence', () => {
    const tracking = asStudent('student-a');
    tracking.startModule('mod');
    tracking.trackQuestionResult('q', true, ['old'], ['old'], {
      questionText: 'Old task', questionRevision: 'q1-old', correctAnswerTexts: ['Old answer']
    });
    tracking.trackQuestionResult('q', false, ['old'], ['current'], {
      questionText: 'Current task', questionRevision: 'q1-current', correctAnswerTexts: ['Current answer']
    });
    expect(tracking.getModuleResults('mod')).toMatchObject({ questionsAnswered: 1, questionsCorrect: 0 });
    expect(tracking.getQuestionResult('q')).toMatchObject({
      correctAnswers: ['current'], questionRevision: 'q1-current', attemptCount: 2
    });
    const attempts = TestBed.inject(AttemptOutbox).getAll();
    expect(attempts[0]).toMatchObject({ correctAnswer: ['old'], texts: { questionText: 'Old task', questionRevision: 'q1-old' } });
    expect(attempts[1]).toMatchObject({ correctAnswer: ['current'], texts: { questionRevision: 'q1-current' } });
    tracking.trackQuestionResult('q', true, ['current'], ['current']);
    tracking.trackQuestionResult('q', true, ['current'], ['current']);
    expect(tracking.getModuleResults('mod')?.questionsCorrect).toBe(1);
  });

  it('does not inherit the answers of another student on the same browser', () => {
    const a = asStudent('student-a');
    a.startModule('mod');
    a.trackQuestionResult('q', true, ['a'], ['a']);
    expect(asStudent('student-b').getAllResults()).toEqual([]);
    expect(TestBed.inject(AttemptOutbox).getAll()).toEqual([]);
  });

  it('keeps the answers of a student for their next visit', () => {
    const a = asStudent('student-a');
    a.startModule('mod');
    a.trackQuestionResult('q', true, ['a'], ['a']);
    asStudent('student-b');
    expect(asStudent('student-a').getModuleResults('mod')?.results.length).toBe(1);
  });

  describe('restoring from the backend', () => {
    it('restores the state of the latest attempt, with its texts', () => {
      service.restoreFromBackend([backendRow(2, true)]);
      service.startModule('mod');
      expect(service.isQuestionCompleted('q')).toBe(true);
      const result = service.getQuestionResult('q')!;
      expect(result.attemptCount).toBe(2);
      expect(result.questionText).toBe('Frage?');
      expect(result.selectedAnswerTexts).toEqual(['Antwort']);
    });

    it('restores revision metadata from backend texts', () => {
      const row = backendRow(2, true);
      row.texts.questionRevision = 'q1-current';
      service.restoreFromBackend([row]);
      service.startModule('mod');
      expect(service.getQuestionResult('q')?.questionRevision).toBe('q1-current');
    });

    it('keeps a newer local attempt that was not saved yet', () => {
      service.startModule('mod');
      service.trackQuestionResult('q', false, ['b'], ['a']);
      service.trackQuestionResult('q', true, ['a'], ['a']);
      service.restoreFromBackend([backendRow(1, false)]);
      expect(service.isQuestionCompleted('q')).toBe(true);
      expect(service.getQuestionResult('q')?.attemptCount).toBe(2);
    });

    it('takes a newer attempt from another device', () => {
      service.startModule('mod');
      service.trackQuestionResult('q', false, ['b'], ['a']);
      service.restoreFromBackend([backendRow(2, true)]);
      expect(service.isQuestionCompleted('q')).toBe(true);
      expect(service.getModuleResults('mod')?.results.length).toBe(1);
    });
  });
});
