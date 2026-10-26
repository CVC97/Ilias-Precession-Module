import { MultipleChoiceQuestion, SingleChoiceQuestion } from '../../../shared/evaluation/question.types';

export const question1: SingleChoiceQuestion = {
    "questionId": "p3-pendulum-1-traegheitsmoment",
    "question": "Lösen Sie $T = 2\\pi\\sqrt{(I + I_p)/(m_p g d)}$ nach dem Trägheitsmoment $I$ des Rades auf. Welcher Ausdruck ergibt sich?",
    "options": [
        { "value": "answer1", "label": "$I = \\dfrac{m_p g d\\,T^2}{4\\pi^2} - I_p$" },
        { "value": "answer2", "label": "$I = \\dfrac{m_p g d\\,T^2}{4\\pi^2}$" },
        { "value": "answer3", "label": "$I = \\dfrac{4\\pi^2\\,m_p g d}{T^2} - I_p$" },
        { "value": "answer4", "label": "$I = \\dfrac{m_p g d\\,T}{2\\pi} - I_p$" }
    ],
    "correctAnswer": "answer1",
    "containerId": "question1-container",
    "successMessage": "Quadrieren, mit $m_p g d/(4\\pi^2)$ multiplizieren und $I_p$ abziehen. Aus der gemessenen Periodendauer erhalten Sie so das Trägheitsmoment des Rades.",
    "incorrectMessage": "Quadrieren Sie beide Seiten der Gleichung und isolieren Sie dann $I$.",
    "answerFeedback": {
        "answer2": "Dieser Ausdruck ist das Trägheitsmoment von Rad und Pendelgewicht zusammen. Gesucht ist das des Rades allein.",
        "answer3": "Prüfen Sie die Einheiten: Ein Trägheitsmoment hat die Einheit $\\mathrm{kg\\,m^2}$. Welche Einheit hat Ihr Ausdruck?",
        "answer4": "Die Periodendauer steht unter einer Wurzel. Um $I$ zu isolieren, müssen Sie beide Seiten quadrieren."
    }
};

export const question2: MultipleChoiceQuestion = {
    "questionId": "p3-pendulum-2-annahmen",
    "question": "Welche Annahmen stecken in der Formel $T = 2\\pi\\sqrt{(I + I_p)/(m_p g d)}$?",
    "options": [
        { "value": "answer1", "label": "Die Auslenkung ist klein, sodass $\\sin\\varphi \\approx \\varphi$ gilt." },
        { "value": "answer2", "label": "Die Reibung in der Lagerung des Rades ist vernachlässigbar." },
        { "value": "answer3", "label": "Das Rad allein hat seinen Schwerpunkt auf der Drehachse." },
        { "value": "answer4", "label": "Das Pendelgewicht ist so leicht, dass sein eigenes Trägheitsmoment keine Rolle spielt." },
        { "value": "answer5", "label": "Die Periodendauer wird mit wachsender Amplitude deutlich kürzer." }
    ],
    "correctAnswers": [
        "answer1", "answer2", "answer3"
    ],
    "containerId": "question2-container",
    "successMessage": "Kleine Auslenkung, keine Reibung, ausgewuchtetes Rad. Das Trägheitsmoment des Pendelgewichts ist dagegen in der Formel enthalten ($I_p$).",
    "incompleteMessage": "Gehen Sie die Herleitung Schritt für Schritt durch: Welche Drehmomente wurden berücksichtigt, welche Näherung wurde gemacht?",
    "incorrectMessage": "Gehen Sie die Herleitung Schritt für Schritt durch: Welche Drehmomente wurden berücksichtigt, welche Näherung wurde gemacht?",
    "answerFeedback": {
        "answer1": {
            "conceptId": "small-angle",
            "order": 1,
            "message": "Erst die Näherung $\\sin\\varphi \\approx \\varphi$ macht die Bewegungsgleichung harmonisch. Bei harmonischen Schwingungen hängt die Periodendauer nicht von der Amplitude ab."
        },
        "answer2": {
            "conceptId": "torques",
            "order": 2,
            "message": "In der Bewegungsgleichung steht nur das Drehmoment der Gewichtskraft des Pendelgewichts. Welche anderen Drehmomente könnten in der Realität noch wirken?"
        },
        "answer3": {
            "conceptId": "torques",
            "order": 2,
            "message": "In der Bewegungsgleichung steht nur das Drehmoment der Gewichtskraft des Pendelgewichts. Welche anderen Drehmomente könnten in der Realität noch wirken?"
        },
        "answer4": {
            "conceptId": "steiner",
            "order": 3,
            "message": "Schauen Sie sich den Zähler unter der Wurzel an: Das Trägheitsmoment des Pendelgewichts ist dort als $I_p$ enthalten."
        },
        "answer5": {
            "conceptId": "small-angle",
            "order": 1,
            "message": "Erst die Näherung $\\sin\\varphi \\approx \\varphi$ macht die Bewegungsgleichung harmonisch. Bei harmonischen Schwingungen hängt die Periodendauer nicht von der Amplitude ab."
        }
    }
};

export const question3: SingleChoiceQuestion = {
    "questionId": "p3-pendulum-3-gegenueber",
    "question": "Warum wird die Messung für zwei Positionen des Pendelgewichts wiederholt, die sich auf dem Rad gegenüberliegen?",
    "options": [
        { "value": "answer1", "label": "Damit sich der Einfluss einer Unwucht des Rades beim Mitteln heraushebt." },
        { "value": "answer2", "label": "Um doppelt so viele Messwerte für die Statistik zu erhalten." },
        { "value": "answer3", "label": "Weil die Periodendauer auch bei einem perfekt ausgewuchteten Rad von der Position des Gewichts abhängt." },
        { "value": "answer4", "label": "Damit das Rad nicht dauerhaft in eine Richtung verdreht bleibt." }
    ],
    "correctAnswer": "answer1",
    "containerId": "question3-container",
    "successMessage": "Das Drehmoment einer Unwucht verstärkt in der einen Position das des Pendelgewichts und schwächt es in der anderen ab. Im Mittel hebt es sich heraus.",
    "incorrectMessage": "Überlegen Sie, was sich zwischen den beiden Positionen ändert, wenn das Rad nicht perfekt ausgewuchtet ist.",
    "answerFeedback": {
        "answer2": "Für mehr Messwerte würde es genügen, an derselben Position öfter zu messen. Die gegenüberliegende Position hat einen anderen Zweck.",
        "answer3": "Bei einem perfekt ausgewuchteten Rad sind beide Positionen gleichwertig: Gleicher Abstand $d$, gleiche Masse, gleiche Periodendauer.",
        "answer4": "Nach der Messung kehrt das Rad in seine Ruhelage zurück, egal wo das Gewicht sitzt. Überlegen Sie, was ein nicht ganz ausgewuchtetes Rad ändert."
    }
};

export const question4: SingleChoiceQuestion = {
    "questionId": "p3-pendulum-4-zehn-perioden",
    "question": "Die Zeitmessung von Hand hat eine Unsicherheit von insgesamt etwa 0,2&nbsp;s, eine Periode dauert etwa 2&nbsp;s. Wie groß ist ungefähr die relative Unsicherheit der Periodendauer, wenn Sie 10 Perioden auf einmal messen?",
    "options": [
        { "value": "answer1", "label": "etwa 1 %" },
        { "value": "answer2", "label": "etwa 10 %" },
        { "value": "answer3", "label": "etwa 0,1 %" },
        { "value": "answer4", "label": "etwa 2 %" }
    ],
    "correctAnswer": "answer1",
    "containerId": "question4-container",
    "successMessage": "0,2&nbsp;s Unsicherheit auf 20&nbsp;s Messdauer ergeben 1&nbsp;%. Bei einer einzelnen Periode wären es 10&nbsp;%.",
    "incorrectMessage": "Beziehen Sie die Unsicherheit der Zeitmessung auf die gesamte gemessene Zeit.",
    "answerFeedback": {
        "answer2": "Das ist die relative Unsicherheit für eine einzelne Periode (0,2&nbsp;s von 2&nbsp;s). Gemessen wird aber über 10 Perioden.",
        "answer3": "Die Unsicherheit von 0,2&nbsp;s fällt einmal an, die gemessene Zeit beträgt 20&nbsp;s. Rechnen Sie das Verhältnis noch einmal nach.",
        "answer4": "Die Unsicherheit von 0,2&nbsp;s fällt einmal an, die gemessene Zeit beträgt 20&nbsp;s. Rechnen Sie das Verhältnis noch einmal nach."
    }
};
