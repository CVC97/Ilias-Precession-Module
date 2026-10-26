import { MultipleChoiceQuestion, SingleChoiceQuestion } from '../../../shared/evaluation/question.types';

export const question1: SingleChoiceQuestion = {
    "questionId": "p4-gyroscope-1-l-richtung",
    "question": "Ein Kreisel hat um seine Figurenachse das doppelte Trägheitsmoment wie senkrecht dazu ($I_1 = 2I_2$). Er dreht sich so, dass $\\omega_1 = \\omega_2$ gilt, $\\vec{\\omega}$ also unter 45° zur Figurenachse steht. Wo liegt $\\vec{L}$?",
    "options": [
        { "value": "answer1", "label": "Zwischen $\\vec{\\omega}$ und der Figurenachse, näher an der Figurenachse als $\\vec{\\omega}$." },
        { "value": "answer2", "label": "Genau in Richtung von $\\vec{\\omega}$." },
        { "value": "answer3", "label": "Weiter von der Figurenachse entfernt als $\\vec{\\omega}$." },
        { "value": "answer4", "label": "Senkrecht zu $\\vec{\\omega}$." }
    ],
    "correctAnswer": "answer1",
    "containerId": "question1-container",
    "successMessage": "Mit $L_1 = 2I_2\\omega_1$ und $L_2 = I_2\\omega_1$ ist die Komponente entlang der Figurenachse doppelt so groß wie die senkrechte. $\\vec{L}$ steht also unter etwa 27° zur Figurenachse, $\\vec{\\omega}$ unter 45°.",
    "incorrectMessage": "Berechnen Sie die beiden Komponenten $L_1 = I_1\\omega_1$ und $L_2 = I_2\\omega_2$ und vergleichen Sie ihr Verhältnis mit dem von $\\omega_1$ und $\\omega_2$.",
    "answerFeedback": {
        "answer2": "Das gilt nur, wenn beide Trägheitsmomente gleich sind. Berechnen Sie $L_1$ und $L_2$ mit $I_1 = 2I_2$.",
        "answer3": "Welche Komponente von $\\vec{L}$ wird durch das größere Trägheitsmoment verstärkt – die entlang der Figurenachse oder die senkrecht dazu?",
        "answer4": "Beide Komponenten von $\\vec{L}$ haben dasselbe Vorzeichen wie die von $\\vec{\\omega}$. Damit kann $\\vec{L}$ nicht senkrecht auf $\\vec{\\omega}$ stehen."
    }
};

export const question2: MultipleChoiceQuestion = {
    "questionId": "p4-gyroscope-2-schneller-kreisel",
    "question": "Welche Aussagen treffen auf einen schnellen Kreisel ($I_1\\omega_1 \\gg I_2\\omega_2$) zu?",
    "options": [
        { "value": "answer1", "label": "$\\vec{L}$ liegt nahezu auf der Figurenachse." },
        { "value": "answer2", "label": "Näherungsweise gilt $\\vec{L} \\approx I_1\\,\\vec{\\omega}_R$." },
        { "value": "answer3", "label": "$\\vec{L}$ und $\\vec{\\omega}$ zeigen exakt in dieselbe Richtung." },
        { "value": "answer4", "label": "Figurenachse, Drehimpulsachse und momentane Drehachse fallen exakt zusammen, sobald sich das Rad überhaupt dreht." }
    ],
    "correctAnswers": [
        "answer1", "answer2"
    ],
    "containerId": "question2-container",
    "successMessage": "Beim schnellen Kreisel dominiert die Drehung um die Figurenachse. Exakt zusammen fallen die Achsen aber nur, wenn die Achse gar nicht schwenkt.",
    "incompleteMessage": "Unterscheiden Sie zwischen „nahezu“ und „exakt“: Was gilt, solange $\\omega_2$ nicht genau null ist?",
    "incorrectMessage": "Unterscheiden Sie zwischen „nahezu“ und „exakt“: Was gilt, solange $\\omega_2$ nicht genau null ist?",
    "answerFeedback": {
        "answer1": {
            "conceptId": "dominant-component",
            "order": 1,
            "message": "Ist $L_1 = I_1\\omega_1$ viel größer als $L_2 = I_2\\omega_2$, bestimmt fast allein die Komponente entlang der Figurenachse die Richtung von $\\vec{L}$."
        },
        "answer2": {
            "conceptId": "dominant-component",
            "order": 1,
            "message": "Ist $L_1 = I_1\\omega_1$ viel größer als $L_2 = I_2\\omega_2$, bestimmt fast allein die Komponente entlang der Figurenachse die Richtung von $\\vec{L}$."
        },
        "answer3": {
            "conceptId": "approx-vs-exact",
            "order": 2,
            "message": "Solange $\\omega_2$ nicht genau null ist und $I_1 \\neq I_2$ gilt, bleibt ein kleiner Winkel zwischen $\\vec{L}$, $\\vec{\\omega}$ und der Figurenachse – er wird nur sehr klein."
        },
        "answer4": {
            "conceptId": "approx-vs-exact",
            "order": 2,
            "message": "Solange $\\omega_2$ nicht genau null ist und $I_1 \\neq I_2$ gilt, bleibt ein kleiner Winkel zwischen $\\vec{L}$, $\\vec{\\omega}$ und der Figurenachse – er wird nur sehr klein."
        }
    }
};

export const question3: SingleChoiceQuestion = {
    "questionId": "p4-gyroscope-3-raumfest",
    "question": "Der ausbalancierte Kreisel (kein Drehmoment) rotiert schnell und wird kurz angestoßen, sodass er nicht mehr genau um seine Figurenachse rotiert. Welche Achse bleibt danach im Raum fest?",
    "options": [
        { "value": "answer1", "label": "Die Drehimpulsachse." },
        { "value": "answer2", "label": "Die Figurenachse." },
        { "value": "answer3", "label": "Die momentane Drehachse." },
        { "value": "answer4", "label": "Keine der drei Achsen." }
    ],
    "correctAnswer": "answer1",
    "containerId": "question3-container",
    "successMessage": "Ohne Drehmoment ist $\\vec{L}$ erhalten. Figurenachse und momentane Drehachse bewegen sich um die feste Drehimpulsachse.",
    "incorrectMessage": "Welche Größe bleibt erhalten, wenn kein Drehmoment wirkt?",
    "answerFeedback": {
        "answer2": "Die Figurenachse ist fest mit dem Kreisel verbunden. Nach dem Stoß rotiert er nicht mehr genau um sie, sie bewegt sich also mit. Welche Größe bleibt ohne Drehmoment erhalten?",
        "answer3": "Die Richtung von $\\vec{\\omega}$ ist nicht erhalten, denn $\\vec{\\omega}$ und $\\vec{L}$ sind nicht mehr parallel. Welche Größe bleibt ohne Drehmoment erhalten?",
        "answer4": "Nach dem Stoß wirkt kein Drehmoment mehr. Setzen Sie $\\vec{D} = 0$ in $\\mathrm{d}\\vec{L}/\\mathrm{d}t = \\vec{D}$ ein."
    }
};
