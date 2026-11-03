import { TestBed } from '@angular/core/testing';

import { TestTracking } from './test-tracking';
import { AttemptOutbox } from './attempt-outbox';

describe('TestTracking', () => {
  let service: TestTracking;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestTracking);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('does not inherit the answers of another student on the same browser', () => {
    localStorage.setItem('framework_session_id', 'student-a');
    TestBed.resetTestingModule();
    const a = TestBed.inject(TestTracking);
    a.startTest('t', 1, 10);
    a.trackQuestionResult('q1', true, 'a', 'a', 10, 10);

    localStorage.setItem('framework_session_id', 'student-b');
    TestBed.resetTestingModule();
    expect(TestBed.inject(TestTracking).getAllTests()).toEqual([]);
    expect(TestBed.inject(AttemptOutbox).getAll()).toEqual([]);
  });
});
