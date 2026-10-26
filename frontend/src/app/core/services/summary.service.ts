import { Injectable } from '@angular/core';
import { ResultsTracking } from './results-tracking';
import { TestTracking } from './test-tracking';
import { Analytics } from './analytics';



export interface SummaryPageVisit {
    page: string;
    label: string;
    durationSeconds: number;
}

export interface SummaryQuestion {
    moduleId: string;
    moduleLabel: string;
    questionId: string;
    questionText: string;
    selectedAnswerTexts: string[];
    correctAnswerTexts: string[];
    isCorrect: boolean;
    attemptCount: number;
}

export interface SummaryTestQuestion {
    questionId: string;
    questionInstruction: string;
    questionText: string;
    userAnswerTexts: string[];
    correctAnswerTexts: string[];
    isCorrect: boolean;
    pointsAwarded: number;
    maxPoints: number;
}

export interface SummaryTestResult {
    testId: string;
    testLabel: string;
    pointsEarned: number;
    maxPoints: number;
    percentageScore: number;
    questions: SummaryTestQuestion[];
}

export interface SummaryData {
    sessionId: string;
    generatedAt: string;
    pageVisits: SummaryPageVisit[];
    learningQuestions: SummaryQuestion[];
    tests: SummaryTestResult[];
}



@Injectable({
    providedIn: 'root'
})
export class SummaryService {
    private readonly MODULE_LABELS: Record<string, string> = {
        'p1-setup-module':                      '[1] Einstieg: Versuchsaufbau',
        'p2-rotation-module':                   '[2] Grundlagen der Rotation',
        'p3-pendulum-module':                   '[3] Trägheitsmoment: physikalisches Pendel',
        'p4-gyroscope-module':                  '[4] Der Kreisel',
        'p5-precession-module':                 '[5] Präzession',
        'p6-nutation-module':                   '[6] Nutation',
        'p7-measurement-module':                '[7] Messstrategie und Fehlerquellen',
    };

    private readonly TEST_LABELS: Record<string, string> = {
    };

    private readonly PAGE_TOTALS: Record<string, number> = {
        '/learning/p1-setup':                   3,
        '/learning/p2-rotation':                3,
        '/learning/p3-pendulum':                2,
        '/learning/p4-gyroscope':               3,
        '/learning/p5-precession':              3,
        '/learning/p6-nutation':                3,
        '/learning/p7-measurement':             3,
    };

    private readonly PAGE_LABELS: Record<string, string> = {
        '/':                                                            'Startseite: Kreiselpräzession',
        '/learning/p1-setup':                                           '[1] Einstieg: Versuchsaufbau',
        '/learning/p2-rotation':                                        '[2] Grundlagen der Rotation',
        '/learning/p3-pendulum':                                        '[3] Trägheitsmoment: physikalisches Pendel',
        '/learning/p4-gyroscope':                                       '[4] Der Kreisel',
        '/learning/p5-precession':                                      '[5] Präzession',
        '/learning/p6-nutation':                                        '[6] Nutation',
        '/learning/p7-measurement':                                     '[7] Messstrategie und Fehlerquellen',

        '/target/tar-precession':                                       '[Tar] Anleitung Kreiselpräzession',
    };

    constructor(
        private resultsTracking: ResultsTracking,
        private testTracking: TestTracking,
        private analytics: Analytics,
    ) {}

    getSummaryData(): SummaryData {
        const sessionData = this.analytics.getSessionData();

        const pageVisits: SummaryPageVisit[] = sessionData.visits
            .filter(v => v.duration_s !== undefined && v.duration_s > 2 && !v.page.startsWith('/target/'))
            .map(v => {
                const qIdx = v.page.indexOf('?');
                const basePath = qIdx >= 0 ? v.page.slice(0, qIdx) : v.page;
                const params = qIdx >= 0 ? new URLSearchParams(v.page.slice(qIdx + 1)) : null;
                const pageNum = params?.get('page') ?? (this.PAGE_TOTALS[basePath] !== undefined ? '1' : null);
                const baseLabel = this.PAGE_LABELS[basePath] ?? basePath;
                const total = pageNum ? (this.PAGE_TOTALS[basePath] ?? null) : null;
                const label = pageNum && total ? `${baseLabel} (${pageNum}/${total})` : baseLabel;
                return { page: v.page, label, durationSeconds: Math.round(v.duration_s!) };
            });

        const learningQuestions: SummaryQuestion[] = [];
        for (const module of this.resultsTracking.getSessionResults()) {
            const moduleLabel = this.MODULE_LABELS[module.moduleId] ?? module.moduleId;
            for (const q of module.results) {
                learningQuestions.push({
                    moduleId:            module.moduleId,
                    moduleLabel,
                    questionId:          q.questionId,
                    questionText:        q.questionText ?? q.questionId,
                    selectedAnswerTexts: q.selectedAnswerTexts ?? q.selectedAnswers,
                    correctAnswerTexts:  q.correctAnswerTexts ?? q.correctAnswers,
                    isCorrect:           q.isCorrect,
                    attemptCount:        q.attemptCount,
                });
            }
        }

        const tests: SummaryTestResult[] = this.testTracking.getSessionTests().map(t => ({
            testId:          t.testId,
            testLabel:       this.TEST_LABELS[t.testId] ?? t.testId,
            pointsEarned:    t.pointsEarned,
            maxPoints:       t.maxPoints,
            percentageScore: t.percentageScore ?? (t.maxPoints > 0 ? (t.pointsEarned / t.maxPoints) * 100 : 0),
            questions:       t.results.map(r => ({
                questionId:          r.questionId,
                questionInstruction: r.questionInstruction ?? r.questionId,
                questionText:        r.questionText ?? r.questionInstruction ?? r.questionId,
                userAnswerTexts:     r.userAnswerTexts ?? [],
                correctAnswerTexts:  r.correctAnswerTexts ?? [],
                isCorrect:           r.isCorrect,
                pointsAwarded:       r.pointsAwarded,
                maxPoints:           r.maxPoints,
            })),
        }));

        return {
            sessionId:         sessionData.sessionId,
            generatedAt:       new Date().toISOString(),
            pageVisits,
            learningQuestions,
            tests,
        };
    }
}
