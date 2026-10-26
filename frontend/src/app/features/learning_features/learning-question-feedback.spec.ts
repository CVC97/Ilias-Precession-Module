/// <reference types="node" />
// Generic port of the Pohl module's question checks: templates, report registry
// and question files must agree, and feedback must follow the module's conventions.
// Add each new learning page to PAGES.
import { describe, expect, it } from 'vitest';
import * as p1Questions from './p1-setup/p1-setup-questions';
import * as p2Questions from './p2-rotation/p2-rotation-questions';
import * as p3Questions from './p3-pendulum/p3-pendulum-questions';
import * as p4Questions from './p4-gyroscope/p4-gyroscope-questions';
import * as p5Questions from './p5-precession/p5-precession-questions';
import * as p6Questions from './p6-nutation/p6-nutation-questions';
import * as p7Questions from './p7-measurement/p7-measurement-questions';
import { PAGE_REGISTRY } from '../../core/services/learning-report-registry';
import { AdaptiveAnswerHint, AnyQuestion } from '../../shared/evaluation/question.types';
import { buildSelectionErrorMessage } from '../../shared/evaluation/multiple-choice-feedback';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ASTWithSource, parseTemplate, TmplAstElement, TmplAstIfBlock, TmplAstNode } from '@angular/compiler';

type FeedbackQuestion = Extract<AnyQuestion, { correctAnswers: string[] }>;

function isFeedbackQuestion(question: AnyQuestion): question is FeedbackQuestion {
    return 'correctAnswers' in question;
}

const PAGES: { directory: string; prefix: string; questions: Record<string, AnyQuestion> }[] = [
    { directory: 'p1-setup', prefix: 'p1-setup-', questions: p1Questions },
    { directory: 'p2-rotation', prefix: 'p2-rotation-', questions: p2Questions },
    { directory: 'p3-pendulum', prefix: 'p3-pendulum-', questions: p3Questions },
    { directory: 'p4-gyroscope', prefix: 'p4-gyroscope-', questions: p4Questions },
    { directory: 'p5-precession', prefix: 'p5-precession-', questions: p5Questions },
    { directory: 'p6-nutation', prefix: 'p6-nutation-', questions: p6Questions },
    { directory: 'p7-measurement', prefix: 'p7-measurement-', questions: p7Questions },
];

const definitions = PAGES.flatMap(page => Object.values(page.questions));
const registryIds = PAGE_REGISTRY.flatMap(page => page.blocks)
    .filter(block => block.type === 'question').map(block => block.questionId);
const multipleChoiceQuestions = definitions.filter(isFeedbackQuestion);

function templateQuestionIds(page: typeof PAGES[number]): string[] {
    const filename = join(process.cwd(), 'src/app/features/learning_features', page.directory, `${page.directory}.html`);
    const parsed = parseTemplate(readFileSync(filename, 'utf8'), filename);
    expect(parsed.errors).toBeNull();
    const ids: string[] = [];
    function visit(nodes: TmplAstNode[]) {
        for (const node of nodes) {
            if (node instanceof TmplAstIfBlock) {
                for (const branch of node.branches) {
                    const expression = branch.expression instanceof ASTWithSource ? branch.expression.source : '';
                    if (expression !== 'false') visit(branch.children);
                }
            } else if (node instanceof TmplAstElement) {
                const binding = node.inputs.find(input => input.name === 'questionId');
                if (binding) {
                    const name = binding.value instanceof ASTWithSource ? binding.value.source?.split('.')[0] ?? '' : '';
                    ids.push(page.questions[name].questionId);
                }
                visit(node.children);
            }
        }
    }
    visit(parsed.nodes);
    return ids;
}

describe('learning-question data', () => {
    it('uses unique, prefixed question IDs', () => {
        const ids = definitions.map(q => q.questionId);
        expect(new Set(ids).size).toBe(ids.length);
        for (const page of PAGES) {
            for (const q of Object.values(page.questions)) expect(q.questionId.startsWith(page.prefix)).toBe(true);
        }
    });

    it('shows every defined question exactly once in a template and in the report registry', () => {
        const templateIds = PAGES.flatMap(templateQuestionIds);
        expect(new Set(templateIds).size).toBe(templateIds.length);
        expect([...templateIds].sort()).toEqual(definitions.map(q => q.questionId).sort());
        expect([...registryIds].sort()).toEqual([...templateIds].sort());
    });

    it.each(definitions)('$questionId has a nontrivial, valid answer set and formal feedback', question => {
        const correct = 'correctAnswers' in question ? question.correctAnswers : [question.correctAnswer];
        expect(correct.length).toBeGreaterThan(0);
        expect(correct.length).toBeLessThan(question.options.length);
        expect(new Set(correct).size).toBe(correct.length);
        expect(correct.every(value => question.options.some(option => option.value === value))).toBe(true);
        expect(question.successMessage).not.toMatch(/Falsche Wahl|Versuchen Sie es nochmals|Völlig richtig|\b(?:du|dein|dich|dir)\b/i);
        if ('correctAnswers' in question) {
            expect(question.incompleteMessage).toBe(question.incorrectMessage);
            expect(question.incorrectMessage).not.toMatch(/fehlt|falsch|richtige Antwort|noch nicht|Mindestens/i);
        } else {
            // single choice: one hint per wrong option
            expect(Object.keys(question.answerFeedback ?? {}).sort()).toEqual(
                question.options.map(o => o.value).filter(v => v !== question.correctAnswer).sort()
            );
        }
    });

    it.each(multipleChoiceQuestions)('$questionId has a short hint for every answer option', question => {
        expect(Object.keys(question.answerFeedback ?? {}).sort()).toEqual(
            question.options.map(option => option.value).sort()
        );
        for (const hint of Object.values(question.answerFeedback ?? {})) {
            for (const block of Array.isArray(hint) ? hint : [hint]) {
                const message = typeof block === 'string' ? block : block.message;
                expect(message.trim()).not.toBe('');
                expect(message.length).toBeLessThan(650);
                expect(message).not.toMatch(/\b(?:richtig|falsch|korrekt)\b/i);
                expect(message).not.toMatch(/\bAntwort(?:möglichkeit)?\s*\d+/i);
            }
        }
    });

    it.each(multipleChoiceQuestions)(
        '$questionId composes every possible selection without repetition, omissions or untriggered concepts',
        question => {
            const concepts = new Map<string, AdaptiveAnswerHint>();
            const byAnswer = new Map<string, AdaptiveAnswerHint[]>();
            for (const [answer, feedback] of Object.entries(question.answerFeedback!)) {
                const hints = (Array.isArray(feedback) ? feedback : [feedback]).map(h =>
                    typeof h === 'string' ? { message: h } : h);
                byAnswer.set(answer, hints);
                for (const hint of hints) {
                    const id = hint.conceptId ?? hint.message;
                    if (concepts.has(id)) expect(hint).toEqual(concepts.get(id));
                    concepts.set(id, hint);
                }
            }
            for (let mask = 0; mask < 2 ** question.options.length; mask++) {
                const selected = question.options.filter((_, i) => mask & (1 << i)).map(o => o.value);
                const mismatches = question.options.filter(o =>
                    selected.includes(o.value) !== question.correctAnswers.includes(o.value));
                const correct = mismatches.length === 0;
                const message = buildSelectionErrorMessage(selected, question.correctAnswers,
                    correct ? question.successMessage! : question.incorrectMessage!, question.answerFeedback);
                if (!selected.length) {
                    expect(message).toBe('Bitte wählen Sie mindestens eine Antwort aus.');
                    continue;
                }
                if (correct) {
                    expect(message).toBe(`Anzahl der Fehler: 0.<br><br>${question.successMessage}`);
                    continue;
                }
                const triggered = new Set(mismatches.flatMap(o => byAnswer.get(o.value)!)
                    .map(h => h.conceptId ?? h.message));
                for (const [id, hint] of concepts) {
                    if (triggered.has(id)) expect(message.split(hint.message)).toHaveLength(2);
                    else expect(message).not.toContain(hint.message);
                }
                expect(message).toContain(`Anzahl der Fehler: ${mismatches.length}.`);
            }
        }
    );
});
