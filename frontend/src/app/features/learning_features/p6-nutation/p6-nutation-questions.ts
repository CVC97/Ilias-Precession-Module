import { MultipleChoiceQuestion, SingleChoiceQuestion } from '../../../shared/evaluation/question.types';

export const question1: SingleChoiceQuestion = {
    "questionId": "p6-nutation-1-nutationskegel",
    "question": "Ein ausbalancierter symmetrischer Kreisel bewegt sich nach einem kurzen Stoß ohne äußeres Drehmoment. Welche Bewegung beschreibt sein Nutationskegel im Laborsystem?",
    "options": [
        {
            "value": "answer1",
            "label": "Die Figurenachse läuft um die Drehimpulsachse."
        },
        {
            "value": "answer2",
            "label": "Die Drehimpulsachse läuft um die senkrechte Richtung."
        },
        {
            "value": "answer3",
            "label": "Die momentane Drehachse läuft um die Figurenachse."
        },
        {
            "value": "answer4",
            "label": "Das Rad dreht sich um seine Figurenachse."
        }
    ],
    "correctAnswer": "answer1",
    "containerId": "question1-container",
    "successMessage": "Der Drehimpuls $\\vec{L}$ ist im Laborsystem konstant. Die Figurenachse umläuft diese feste Richtung und beschreibt dabei den Nutationskegel.",
    "incorrectMessage": "Beim kräftefreien Kreisel ist $\\vec{L}$ im Raum fest. Welche Achse bewegt sich um $\\vec{L}$?",
    "answerFeedback": {
        "answer2": "Prüfen Sie mit $\\mathrm{d}\\vec{L}/\\mathrm{d}t=0$, ob die Drehimpulsachse im betrachteten Laborsystem überhaupt umlaufen kann.",
        "answer3": "Unterscheiden Sie die Achse, auf der das Rad sitzt, von der momentanen Drehachse. Welche dieser Achsen beschreibt nach der Definition den Nutationskegel?",
        "answer4": "Die Drehung des Rades ist auch bei stillstehender Figurenachse möglich. Die gesuchte Bewegung beschreibt dagegen die wechselnde Orientierung einer Achse im Raum."
    }
};

export const question2: MultipleChoiceQuestion = {
    "questionId": "p6-nutation-2-kegel",
    "question": "Welche Aussagen beschreiben die drei Kegel eines kräftefreien symmetrischen Kreisels? Unterscheiden Sie dabei das Laborsystem vom körperfesten Bezugssystem.",
    "options": [
        {
            "value": "answer1",
            "label": "Der Rastpolkegel ist raumfest."
        },
        {
            "value": "answer2",
            "label": "Der Gangpolkegel ist fest mit dem Kreisel verbunden."
        },
        {
            "value": "answer3",
            "label": "Die momentane Drehachse ist die Linie, entlang der sich Gangpolkegel und Rastpolkegel berühren."
        },
        {
            "value": "answer4",
            "label": "Die Drehimpulsachse läuft im Raum auf dem Nutationskegel um die Figurenachse."
        },
        {
            "value": "answer5",
            "label": "Die Drehimpulsachse bewegt sich im Raum auf dem Rastpolkegel."
        }
    ],
    "correctAnswers": [
        "answer1",
        "answer2",
        "answer3"
    ],
    "containerId": "question2-container",
    "successMessage": "Der Rastpolkegel bleibt im Laborsystem fest, der Gangpolkegel im Körper. Ihre gemeinsame Berührungslinie ist die momentane Drehachse. Die Drehimpulsachse bleibt wegen $\\vec{D}=0$ im Laborsystem unverändert.",
    "incompleteMessage": "Ordnen Sie jedem Kegel sein Bezugssystem zu und verfolgen Sie die jeweils umlaufende Achse.",
    "incorrectMessage": "Ordnen Sie jedem Kegel sein Bezugssystem zu und verfolgen Sie die jeweils umlaufende Achse.",
    "answerFeedback": {
        "answer1": {
            "conceptId": "space-cone",
            "order": 1,
            "message": "Verfolgen Sie die momentane Drehachse relativ zum raumfesten Drehimpuls $\\vec{L}$. In welchem Bezugssystem bleibt die von ihr überstrichene Kegelfläche an derselben Stelle?",
            "paragraphId": "frames"
        },
        "answer2": {
            "conceptId": "body-cone",
            "order": 2,
            "message": "Betrachten Sie dieselbe momentane Drehachse nun aus dem mitrotierenden Kreisel. Zu welcher körperfesten Achse gehört die dort überstrichene Kegelfläche?",
            "paragraphId": "frames"
        },
        "answer3": {
            "conceptId": "contact-line",
            "order": 3,
            "message": "Beim Abrollen ohne Gleiten sind die Punkte auf der gemeinsamen Berührungslinie momentan in Ruhe. Welche Drehachse wird durch diese Eigenschaft definiert?",
            "paragraphId": "rolling"
        },
        "answer4": {
            "conceptId": "angular-momentum",
            "order": 4,
            "message": "Prüfen Sie zuerst mit $\\vec{D}=0$, welche Achse im Laborsystem festbleibt. Unterscheiden Sie diese Achse von den Achsen, die die Kegelflächen überstreichen.",
            "paragraphId": "conservation"
        },
        "answer5": {
            "conceptId": "angular-momentum",
            "order": 4,
            "message": "Prüfen Sie zuerst mit $\\vec{D}=0$, welche Achse im Laborsystem festbleibt. Unterscheiden Sie diese Achse von den Achsen, die die Kegelflächen überstreichen.",
            "paragraphId": "conservation"
        }
    }
};

export const question3: SingleChoiceQuestion = {
    "questionId": "p6-nutation-3-drehzahl",
    "question": "Vergleichen Sie zwei frisch zurückgesetzte Läufe des ausbalancierten Kreisels: gleicher Startwinkel, keine Reibung und je ein gleich starker Stoß aus derselben Ausgangsbewegung. Im zweiten Lauf ist die Winkelgeschwindigkeit $\\omega_R$ höher. Was beobachten Sie im Bereich des schnellen Kreisels?",
    "options": [
        {
            "value": "answer1",
            "label": "Sie wird schneller, und die Achse weicht weniger weit aus."
        },
        {
            "value": "answer2",
            "label": "Sie wird langsamer, und die Achse weicht weiter aus."
        },
        {
            "value": "answer3",
            "label": "Sie wird schneller, und die Achse weicht weiter aus."
        },
        {
            "value": "answer4",
            "label": "Sie bleibt unverändert, weil der Stoß gleich ist."
        }
    ],
    "correctAnswer": "answer1",
    "containerId": "question3-container",
    "successMessage": "Bei höherem $\\omega_R$ nutiert der Kreisel schneller und der Nutationskegel ist bei diesem kontrollierten Vergleich enger. Derselbe zusätzliche Querimpuls ist gegenüber dem größeren axialen Drehimpuls kleiner. Die genaue Bedeutung der Steigung von $\\omega_N$ gegen $\\omega_R$ untersuchen Sie in der Auswertung.",
    "incorrectMessage": "Vergleichen Sie bei getrennten, zurückgesetzten Läufen zunächst die Umlaufzeit der Figurenachse und dann die Weite ihres Kegels.",
    "answerFeedback": {
        "answer2": "Vergleichen Sie die Zeit für einen Umlauf der Figurenachse in den beiden zurückgesetzten Läufen. Untersuchen Sie getrennt davon das Verhältnis des gleichen zusätzlichen Querimpulses zum axialen Drehimpuls.",
        "answer3": "Betrachten Sie die Weite des Kegels getrennt von seiner Umlaufzeit. Wie verändert sich das Verhältnis des gleichen Querimpulses zu $L\\approx I\\omega_R$, wenn $\\omega_R$ zunimmt?",
        "answer4": "Der zusätzliche Querimpuls ist gleich, der schon vorhandene axiale Drehimpuls dagegen nicht. Prüfen Sie in der Simulation sowohl die Umlaufzeit als auch die Kegelweite."
    }
};
