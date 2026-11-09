import { QuestionOption, ImageOption } from './question.types';

type Option = QuestionOption | ImageOption;
interface SavedAnswer {
    questionRevision?: string;
    questionText?: string;
    selectedAnswers: string[];
    selectedAnswerTexts?: string[];
    correctAnswers?: string[];
    correctAnswerTexts?: string[];
}

// Content identity is separate from the answer key: a corrected key can re-evaluate
// unchanged choices, but a changed task must not silently reuse their old meanings.
export function questionRevision(question: string, options: Option[], imageSrc?: string): string {
    const content = JSON.stringify([question, imageSrc, options.map(option => [
        option.value, option.label, 'imageSrc' in option ? option.imageSrc : undefined
    ]).sort((a, b) => String(a[0]).localeCompare(String(b[0])))]);
    let hash = 2166136261;
    for (let i = 0; i < content.length; i++) hash = Math.imul(hash ^ content.charCodeAt(i), 16777619);
    return 'q1-' + (hash >>> 0).toString(16);
}

export function canRestoreAnswer(saved: SavedAnswer, question: string, options: Option[], imageSrc?: string): boolean {
    if (saved.questionRevision) return saved.questionRevision === questionRevision(question, options, imageSrc);
    // Older records have no fingerprint. Compare the evidence that was actually saved.
    if (saved.questionText !== question || !saved.selectedAnswerTexts || !saved.correctAnswerTexts) return false;
    const sameTexts = (ids: string[], texts: string[]) => (
        ids.length === texts.length && ids.every((id, i) => {
            const option = options.find(o => o.value === id);
            const text = option?.label ?? (option && 'imageSrc' in option ? option.imageSrc : id);
            return text === texts[i];
        })
    );
    return sameTexts(saved.selectedAnswers, saved.selectedAnswerTexts)
        && sameTexts(saved.correctAnswers ?? [], saved.correctAnswerTexts);
}
