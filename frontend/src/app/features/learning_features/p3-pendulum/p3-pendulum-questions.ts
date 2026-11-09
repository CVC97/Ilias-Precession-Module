import { MultipleChoiceQuestion, SingleChoiceQuestion } from '../../../shared/evaluation/question.types';

export const question1: SingleChoiceQuestion = {
    "questionId": "p3-pendulum-1-traegheitsmoment",
    "question": "Die gemessene Periodendauer erfüllt $T=2\\pi\\sqrt{(I+I_p)/(m_pgd)}$. Dabei ist $I$ das Trägheitsmoment des Rades und $I_p$ das des Pendelgewichts um dieselbe Radachse. Welcher Ausdruck liefert $I$?",
    "options": [
        {
            "value": "answer1",
            "label": "$I = \\dfrac{m_p g d\\,T^2}{4\\pi^2} - I_p$"
        },
        {
            "value": "answer2",
            "label": "$I = \\dfrac{m_p g d\\,T^2}{4\\pi^2}$"
        },
        {
            "value": "answer3",
            "label": "$I = \\dfrac{4\\pi^2\\,m_p g d}{T^2} - I_p$"
        },
        {
            "value": "answer4",
            "label": "$I = \\dfrac{m_p g d\\,T}{2\\pi} - I_p$"
        }
    ],
    "correctAnswer": "answer1",
    "containerId": "question1-container",
    "successMessage": "Aus $T^2=4\\pi^2(I+I_p)/(m_pgd)$ folgt $I=m_pgd\\,T^2/(4\\pi^2)-I_p$. Die Schwingung erfasst beide Trägheitsmomente; für das Rad allein wird $I_p$ abgezogen.",
    "incorrectMessage": "Quadrieren Sie beide Seiten der Gleichung und isolieren Sie dann $I$.",
    "answerFeedback": {
        "answer2": "Überlegen Sie, welche Körper gemeinsam schwingen. Liefert der Term mit $T^2$ das Trägheitsmoment des Rades allein oder die Summe der beiden Trägheitsmomente?",
        "answer3": "Prüfen Sie nach dem Quadrieren, ob $T^2$ proportional oder umgekehrt proportional zu $I+I_p$ ist. Kontrollieren Sie zusätzlich die Einheit $\\mathrm{kg\\,m^2}$.",
        "answer4": "Teilen Sie zuerst durch $2\\pi$ und beseitigen Sie dann die Wurzel. Welche Potenz der Periodendauer $T$ entsteht dabei?"
    }
};

export const question2: MultipleChoiceQuestion = {
    "questionId": "p3-pendulum-2-annahmen",
    "question": "Unter welchen Annahmen beschreibt $T=2\\pi\\sqrt{(I+I_p)/(m_pgd)}$ die Schwingung von Rad und eingeschraubtem Pendelgewicht?",
    "options": [
        {
            "value": "answer1",
            "label": "Die Auslenkung ist klein, sodass $\\sin\\varphi \\approx \\varphi$ gilt."
        },
        {
            "value": "answer2",
            "label": "Die Reibung in der Lagerung des Rades ist vernachlässigbar."
        },
        {
            "value": "answer3",
            "label": "Das Rad allein hat seinen Schwerpunkt auf der Drehachse."
        },
        {
            "value": "answer4",
            "label": "Das Pendelgewicht ist so leicht, dass sein eigenes Trägheitsmoment $I_p$ keine Rolle spielt."
        },
        {
            "value": "answer5",
            "label": "Eine größere Auslenkung wird in der Formel durch eine deutlich kürzere Periodendauer $T$ berücksichtigt."
        }
    ],
    "correctAnswers": [
        "answer1",
        "answer2",
        "answer3"
    ],
    "containerId": "question2-container",
    "successMessage": "Die Formel verwendet die Kleinwinkelnäherung, vernachlässigt Lagerreibung und setzt ein um die Radachse ausgewuchtetes Rad voraus. Das Pendelgewicht wird mit seinem Trägheitsmoment $I_p$ ausdrücklich mitgerechnet.",
    "incompleteMessage": "Vergleichen Sie die Bewegungsgleichung mit den möglichen Beiträgen eines realen Aufbaus.",
    "incorrectMessage": "Vergleichen Sie die Bewegungsgleichung mit den möglichen Beiträgen eines realen Aufbaus.",
    "answerFeedback": {
        "answer1": {
            "conceptId": "linearisation",
            "order": 1,
            "message": "Welche Ersetzung macht aus $\\sin\\varphi$ einen linearen Rückstellterm? Prüfen Sie anschließend, ob die angegebene Periodenformel überhaupt eine Amplitude enthält.",
            "paragraphId": "approximation"
        },
        "answer5": {
            "conceptId": "linearisation",
            "order": 1,
            "message": "Welche Ersetzung macht aus $\\sin\\varphi$ einen linearen Rückstellterm? Prüfen Sie anschließend, ob die angegebene Periodenformel überhaupt eine Amplitude enthält.",
            "paragraphId": "approximation"
        },
        "answer2": {
            "conceptId": "friction",
            "order": 2,
            "message": "In der angegebenen Bewegungsgleichung steht kein bremsendes Drehmoment. Unter welcher Bedingung kann dieser Beitrag bei der Periodenberechnung vernachlässigt werden?",
            "paragraphId": "torques"
        },
        "answer3": {
            "conceptId": "wheel-balance",
            "order": 3,
            "message": "Denken Sie an ein Rad, dessen eigener Schwerpunkt neben der Achse liegt. Würde dann nur das Pendelgewicht ein rückstellendes Drehmoment erzeugen?",
            "paragraphId": "torques"
        },
        "answer4": {
            "conceptId": "total-inertia",
            "order": 4,
            "message": "Ordnen Sie die beiden Terme $I+I_p$ den gemeinsam schwingenden Körpern zu. Welche Beiträge werden dadurch bereits berücksichtigt?",
            "paragraphId": "inertia"
        }
    }
};

export const question3: SingleChoiceQuestion = {
    "questionId": "p3-pendulum-3-gegenueber",
    "question": "Warum messen Sie bei kleiner Unwucht des Rades auch mit dem Pendelgewicht an der diametral gegenüberliegenden Position und gleichem Abstand von der Radachse?",
    "options": [
        {
            "value": "answer1",
            "label": "Damit sich der Einfluss einer kleinen Unwucht beim Mitteln näherungsweise heraushebt."
        },
        {
            "value": "answer2",
            "label": "Um doppelt so viele Messwerte für die Statistik zu erhalten."
        },
        {
            "value": "answer3",
            "label": "Weil die Periodendauer $T$ auch bei einem perfekt ausgewuchteten Rad von der Position des Gewichts abhängt."
        },
        {
            "value": "answer4",
            "label": "Damit das Rad nicht dauerhaft in eine Richtung verdreht bleibt."
        }
    ],
    "correctAnswer": "answer1",
    "containerId": "question3-container",
    "successMessage": "Die Unwucht verändert das rückstellende Drehmoment in den beiden Positionen gegensinnig. Bei kleiner Unwucht vermindert das Mitteln den Einfluss in erster Näherung; es ist keine exakte Kompensation beliebiger Unwuchten.",
    "incorrectMessage": "Überlegen Sie, was sich zwischen den beiden Positionen ändert, wenn das Rad nicht perfekt ausgewuchtet ist.",
    "answerFeedback": {
        "answer2": "Zusätzliche Wiederholungen wären auch an derselben Position möglich. Überlegen Sie, welche systematische Eigenschaft des Aufbaus sich durch den Positionswechsel relativ zum Pendelgewicht umkehrt.",
        "answer3": "Vergleichen Sie bei einem ausgewuchteten Rad die Masse $m_p$, den Abstand $d$ und die Trägheitsmomente in beiden Positionen. Welche Größe in der Periodenformel würde sich ändern?",
        "answer4": "Betrachten Sie das zusätzliche Drehmoment eines leicht versetzten Radschwerpunkts relativ zum Pendelgewicht. Wie unterscheidet sich dieser Einfluss bei gegenüberliegenden Positionen?"
    }
};

export const question4: SingleChoiceQuestion = {
    "questionId": "p3-pendulum-4-zehn-perioden",
    "question": "Sie messen die Gesamtzeit für genau 10 Perioden. Jede Periode dauert ungefähr 2 s; die Unsicherheit der gesamten Start-Stopp-Zeitmessung beträgt 0,2 s. Wie groß ist ungefähr die relative Unsicherheit der daraus bestimmten Periodendauer $T$?",
    "options": [
        {
            "value": "answer1",
            "label": "etwa 1 %"
        },
        {
            "value": "answer2",
            "label": "etwa 10 %"
        },
        {
            "value": "answer3",
            "label": "etwa 0,1 %"
        },
        {
            "value": "answer4",
            "label": "etwa 2 %"
        }
    ],
    "correctAnswer": "answer1",
    "containerId": "question4-container",
    "successMessage": "Die Gesamtzeit ist etwa 20 s: $0{,}2/20=0{,}01=1\\,\\%$. Beim Teilen durch zehn werden sowohl die Gesamtzeit als auch ihre absolute Unsicherheit geteilt. Die relative Unsicherheit der Periodendauer $T$ bleibt deshalb 1 %.",
    "incorrectMessage": "Beziehen Sie die Unsicherheit der Zeitmessung auf die gesamte gemessene Zeit.",
    "answerFeedback": {
        "answer2": "Die angegebene Unsicherheit gehört zur gesamten Zeitmessung. Beziehen Sie sie deshalb auf die Dauer aller zehn Perioden.",
        "answer3": "Berechnen Sie zunächst das Verhältnis von Zeitunsicherheit zu Gesamtzeit. Wenn Sie beide Größen anschließend durch zehn teilen, was passiert mit ihrem Verhältnis?",
        "answer4": "Die 0,2 s gelten bereits für das gesamte Start-Stopp-Intervall. Prüfen Sie das Verhältnis zur Gesamtzeit und die Umrechnung in Prozent."
    }
};
