import { SingleChoiceQuestion, MultipleChoiceQuestion } from '../../../shared/evaluation/question.types';

export const question1: MultipleChoiceQuestion = {
    "questionId": "p1-setup-1-kreisel-teile",
    "question": "Ein Zusatzgewicht ist an der Achse eingehängt, und der Kreisel bewegt sich als Ganzes um den Unterstützungspunkt. Welche Teile bewegen sich dabei mit?",
    "options": [
        { "value": "answer1", "label": "Rad" },
        { "value": "answer2", "label": "Achse" },
        { "value": "answer3", "label": "Ausgleichsgewicht" },
        { "value": "answer4", "label": "eingehängtes Zusatzgewicht" },
        { "value": "answer5", "label": "Lichtschranke" },
        { "value": "answer6", "label": "Stoppuhr" },
        { "value": "answer7", "label": "Pendelgewichte (nicht eingeschraubt)" }
    ],
    "correctAnswers": [
        "answer1", "answer2", "answer3", "answer4"
    ],
    "containerId": "question1-container",
    "successMessage": "Rad, Achse, Ausgleichsgewicht und das eingehängte Zusatzgewicht bilden zusammen den beweglichen Kreisel. Die übrigen Teile stehen fest auf dem Tisch.",
    "incompleteMessage": "Überlegen Sie für jedes Teil, ob es mit der Achse verbunden ist oder getrennt davon auf dem Tisch steht.",
    "incorrectMessage": "Überlegen Sie für jedes Teil, ob es mit der Achse verbunden ist oder getrennt davon auf dem Tisch steht.",
    "answerFeedback": {
        "answer1": {
            "conceptId": "attached-to-axle",
            "order": 1,
            "message": "Alles, was fest mit der Achse verbunden ist oder an ihr hängt, bewegt sich mit, wenn sich die Achse um den Unterstützungspunkt dreht."
        },
        "answer2": {
            "conceptId": "attached-to-axle",
            "order": 1,
            "message": "Alles, was fest mit der Achse verbunden ist oder an ihr hängt, bewegt sich mit, wenn sich die Achse um den Unterstützungspunkt dreht."
        },
        "answer3": {
            "conceptId": "attached-to-axle",
            "order": 1,
            "message": "Alles, was fest mit der Achse verbunden ist oder an ihr hängt, bewegt sich mit, wenn sich die Achse um den Unterstützungspunkt dreht."
        },
        "answer4": {
            "conceptId": "attached-to-axle",
            "order": 1,
            "message": "Alles, was fest mit der Achse verbunden ist oder an ihr hängt, bewegt sich mit, wenn sich die Achse um den Unterstützungspunkt dreht."
        },
        "answer5": {
            "conceptId": "standing-on-table",
            "order": 2,
            "message": "Die Messgeräte stehen auf eigenen Stativen bzw. auf dem Tisch. Sie messen die Bewegung, ohne an ihr teilzunehmen."
        },
        "answer6": {
            "conceptId": "standing-on-table",
            "order": 2,
            "message": "Die Messgeräte stehen auf eigenen Stativen bzw. auf dem Tisch. Sie messen die Bewegung, ohne an ihr teilzunehmen."
        },
        "answer7": {
            "conceptId": "pendulum-weights",
            "order": 3,
            "message": "Die Pendelgewichte werden nur für den Pendelversuch in das Rad geschraubt, nicht für den Präzessionsversuch."
        }
    }
};

export const question2: SingleChoiceQuestion = {
    "questionId": "p1-setup-2-ausgleichsgewicht",
    "question": "Wozu dient das Ausgleichsgewicht?",
    "options": [
        { "value": "answer1", "label": "Es bremst das Rad, damit es nicht zu schnell rotiert." },
        { "value": "answer2", "label": "Es verschiebt den Schwerpunkt des Kreisels in den Unterstützungspunkt, sodass die Gewichtskraft kein Drehmoment auf den Kreisel ausübt." },
        { "value": "answer3", "label": "Es erzeugt das Drehmoment, das den Kreisel im Versuch in Bewegung setzt." },
        { "value": "answer4", "label": "Es vergrößert das Trägheitsmoment des Rades, damit der Kreisel stabiler läuft." }
    ],
    "correctAnswer": "answer2",
    "containerId": "question2-container",
    "successMessage": "Der ausbalancierte Kreisel ist frei von Drehmomenten durch die Schwerkraft. Das Drehmoment im Versuch stammt allein vom Zusatzgewicht – und ist dadurch genau bekannt.",
    "incorrectMessage": "Lesen Sie noch einmal nach, was „ausbalanciert“ für den Schwerpunkt des Kreisels bedeutet.",
    "answerFeedback": {
        "answer1": "Das Ausgleichsgewicht sitzt auf der Achse, nicht am Rad, und berührt das Rad nicht. Bremsend wirkt im Versuch nur die Reibung.",
        "answer3": "Ein Drehmoment entsteht durch eine Kraft mit Hebelarm. Fragen Sie sich, wo der Schwerpunkt des ausbalancierten Kreisels liegt und welchen Hebelarm die Gewichtskraft dann hat.",
        "answer4": "Das Ausgleichsgewicht dreht sich nicht mit dem Rad um dessen Achse. Für das Trägheitsmoment des Rades spielt es keine Rolle."
    }
};

export const question3: MultipleChoiceQuestion = {
    "questionId": "p1-setup-3-messgeraete",
    "question": "Welche Aussagen zu den Messungen sind richtig?",
    "options": [
        { "value": "answer1", "label": "Mit der Lichtschranke wird die Umlaufdauer $T_R$ des Rades gemessen." },
        { "value": "answer2", "label": "Mit der Stoppuhr wird die Dauer der langsamen Bewegung des ganzen Kreisels gemessen." },
        { "value": "answer3", "label": "Mit der Lichtschranke wird die Dauer der langsamen Bewegung des ganzen Kreisels gemessen." },
        { "value": "answer4", "label": "Die Pendelgewichte werden beim Präzessionsversuch an die Achse gehängt und erzeugen das Drehmoment." },
        { "value": "answer5", "label": "Das Zusatzgewicht hängt im Abstand $r$ vom Unterstützungspunkt und erzeugt ein bekanntes Drehmoment." }
    ],
    "correctAnswers": [
        "answer1", "answer2", "answer5"
    ],
    "containerId": "question3-container",
    "successMessage": "Die schnelle Drehung des Rades wird elektronisch gemessen, die langsame Bewegung des ganzen Kreisels von Hand. Das Drehmoment liefert das Zusatzgewicht.",
    "incompleteMessage": "Ordnen Sie jedem Messgerät die Bewegung zu, für die es geeignet ist: die schnelle Drehung des Rades oder die langsame Bewegung des ganzen Kreisels.",
    "incorrectMessage": "Ordnen Sie jedem Messgerät die Bewegung zu, für die es geeignet ist: die schnelle Drehung des Rades oder die langsame Bewegung des ganzen Kreisels.",
    "answerFeedback": {
        "answer1": {
            "conceptId": "fast-vs-slow",
            "order": 1,
            "message": "Das Rad dreht sich so schnell, dass Sie die Umdrehungen nicht mit dem Auge zählen können. Die Bewegung des ganzen Kreisels dagegen ist langsam genug für die Stoppuhr."
        },
        "answer2": {
            "conceptId": "fast-vs-slow",
            "order": 1,
            "message": "Das Rad dreht sich so schnell, dass Sie die Umdrehungen nicht mit dem Auge zählen können. Die Bewegung des ganzen Kreisels dagegen ist langsam genug für die Stoppuhr."
        },
        "answer3": {
            "conceptId": "fast-vs-slow",
            "order": 1,
            "message": "Das Rad dreht sich so schnell, dass Sie die Umdrehungen nicht mit dem Auge zählen können. Die Bewegung des ganzen Kreisels dagegen ist langsam genug für die Stoppuhr."
        },
        "answer4": {
            "conceptId": "weights",
            "order": 2,
            "message": "Unterscheiden Sie die beiden Gewichtssorten: Die einen hängen an der Achse, die anderen werden in das Rad geschraubt. Welche gehören zu welchem Versuchsteil?"
        },
        "answer5": {
            "conceptId": "weights",
            "order": 2,
            "message": "Unterscheiden Sie die beiden Gewichtssorten: Die einen hängen an der Achse, die anderen werden in das Rad geschraubt. Welche gehören zu welchem Versuchsteil?"
        }
    }
};

export const question4: SingleChoiceQuestion = {
    "questionId": "p1-setup-4-erwartung",
    "question": "Das Rad des ausbalancierten Kreisels rotiert schnell, die Achse liegt waagrecht. Nun hängen Sie auf einer Seite ein Zusatzgewicht an die Achse. Was erwarten Sie?",
    "options": [
        { "value": "answer1", "label": "Die Achse kippt auf der Seite des Zusatzgewichts nach unten, wie bei einer Balkenwaage." },
        { "value": "answer2", "label": "Die Achse bleibt nahezu waagrecht und dreht sich langsam seitlich um die senkrechte Richtung." },
        { "value": "answer3", "label": "Es passiert nichts: Die Achse bleibt in Ruhe, weil das Rad sie stabilisiert." },
        { "value": "answer4", "label": "Das Rad rotiert schneller, die Achse bleibt in Ruhe." }
    ],
    "correctAnswer": "answer2",
    "containerId": "question4-container",
    "successMessage": "Genau das passiert: Der Kreisel weicht dem Drehmoment seitlich aus. Diese Bewegung heißt Präzession. Probieren Sie es unten in der Simulation aus.",
    "incorrectMessage": "Das wäre eine plausible Erwartung, aber der rotierende Kreisel verhält sich anders. Probieren Sie es unten in der Simulation aus und vergleichen Sie mit Ihrer Erwartung.",
    "answerFeedback": {
        "answer1": "So verhält sich der Kreisel, solange das Rad stillsteht. Mit schnell rotierendem Rad passiert etwas anderes. Probieren Sie es unten in der Simulation aus und wählen Sie dann erneut.",
        "answer3": "Das Rad stabilisiert die Achse zwar gegen Kippen, aber das Drehmoment des Zusatzgewichts bleibt nicht ohne Wirkung. Probieren Sie es unten in der Simulation aus und wählen Sie dann erneut.",
        "answer4": "Das Zusatzgewicht hängt an der Achse und übt kein Drehmoment um die Achse des Rades aus. Seine Wirkung zeigt sich in der Bewegung der Achse. Probieren Sie es unten in der Simulation aus und wählen Sie dann erneut."
    }
};
