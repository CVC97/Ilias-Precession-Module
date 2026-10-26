import { MultipleChoiceQuestion, SingleChoiceQuestion } from '../../../shared/evaluation/question.types';

export const question1: SingleChoiceQuestion = {
    "questionId": "p7-measurement-1-tr-vorher-nachher",
    "question": "Warum wird die Umlaufdauer $T_R$ sowohl vor als auch nach der Präzessionsmessung bestimmt?",
    "options": [
        { "value": "answer1", "label": "Weil das Rad durch Reibung langsamer wird; der Mittelwert schätzt die Drehzahl während der Präzessionsmessung." },
        { "value": "answer2", "label": "Um zu prüfen, ob die Lichtschranke zuverlässig funktioniert." },
        { "value": "answer3", "label": "Weil das Zusatzgewicht das Rad während der Präzession beschleunigt." },
        { "value": "answer4", "label": "Um mehr Messwerte für die Statistik zu erhalten." }
    ],
    "correctAnswer": "answer1",
    "containerId": "question1-container",
    "successMessage": "Die Drehzahl ändert sich während der Messung. Der Mittelwert aus vorher und nachher ist die beste Schätzung für die Drehzahl, die zur gemessenen Präzession gehört.",
    "incorrectMessage": "Überlegen Sie, wie sich die Drehzahl des Rades während der Präzessionsmessung verändert.",
    "answerFeedback": {
        "answer2": "Dafür würde eine Kontrollmessung genügen. Der zeitliche Abstand zur Präzessionsmessung spielt hier eine Rolle: Was passiert mit dem Rad in dieser Zeit?",
        "answer3": "Das Drehmoment des Zusatzgewichts steht senkrecht zu $\\vec{L}$ und ändert die Drehzahl nicht. Welche Kraft wirkt aber ständig auf das Rad?",
        "answer4": "Für mehr Messwerte könnten Sie $T_R$ auch mehrmals hintereinander messen. Entscheidend ist hier, wann gemessen wird."
    }
};

export const question2: SingleChoiceQuestion = {
    "questionId": "p7-measurement-2-halbe-umdrehung",
    "question": "Für eine halbe Präzessionsumdrehung messen Sie $t_{1/2} = 12\\,\\mathrm{s}$. Welche Präzessionskreisfrequenz $\\omega_P$ ergibt sich?",
    "options": [
        { "value": "answer1", "label": "$\\omega_P \\approx 0{,}26\\,\\mathrm{s^{-1}}$" },
        { "value": "answer2", "label": "$\\omega_P \\approx 0{,}52\\,\\mathrm{s^{-1}}$" },
        { "value": "answer3", "label": "$\\omega_P \\approx 0{,}042\\,\\mathrm{s^{-1}}$" },
        { "value": "answer4", "label": "$\\omega_P \\approx 0{,}083\\,\\mathrm{s^{-1}}$" }
    ],
    "correctAnswer": "answer1",
    "containerId": "question2-container",
    "successMessage": "$T_P = 2 \\cdot 12\\,\\mathrm{s} = 24\\,\\mathrm{s}$, also $\\omega_P = 2\\pi/T_P \\approx 0{,}26\\,\\mathrm{s^{-1}}$.",
    "incorrectMessage": "Bestimmen Sie zuerst die volle Präzessionsdauer $T_P$ und dann $\\omega_P = 2\\pi/T_P$.",
    "answerFeedback": {
        "answer2": "Gemessen wurde nur eine halbe Umdrehung. Die volle Präzessionsdauer ist doppelt so lang.",
        "answer3": "Sie haben den Faktor $2\\pi$ vergessen: $1/T_P$ ist die Frequenz, gesucht ist die Kreisfrequenz $\\omega_P = 2\\pi/T_P$.",
        "answer4": "Sie haben den Faktor $2\\pi$ vergessen und nur eine halbe Umdrehung als Periode genommen. Rechnen Sie mit $T_P = 2\\,t_{1/2}$ und $\\omega_P = 2\\pi/T_P$."
    }
};

export const question3: MultipleChoiceQuestion = {
    "questionId": "p7-measurement-3-sanft-einleiten",
    "question": "Warum sollen Sie den Kreisel nach dem Anhängen des Zusatzgewichts vorsichtig mit der Hand in die Präzession führen?",
    "options": [
        { "value": "answer1", "label": "Damit die Achse von Anfang an ungefähr mit der Präzessionsgeschwindigkeit läuft." },
        { "value": "answer2", "label": "Damit die Nutation klein bleibt und sich die Präzessionszeit genauer messen lässt." },
        { "value": "answer3", "label": "Weil der Kreisel ohne Hilfe gar nicht präzedieren würde." },
        { "value": "answer4", "label": "Um dem Rad zusätzlichen Drehimpuls um seine Figurenachse zu geben." }
    ],
    "correctAnswers": [
        "answer1", "answer2"
    ],
    "containerId": "question3-container",
    "successMessage": "Losgelassen aus dem Stillstand startet die Achse ohne Präzessionsgeschwindigkeit und nutiert stark. Mit der Hand geführt, bleibt die Nutation klein.",
    "incompleteMessage": "Vergleichen Sie die beiden Bahnen in der Abbildung: Was unterscheidet den Start aus dem Stillstand vom geführten Start?",
    "incorrectMessage": "Vergleichen Sie die beiden Bahnen in der Abbildung: Was unterscheidet den Start aus dem Stillstand vom geführten Start?",
    "answerFeedback": {
        "answer1": {
            "conceptId": "initial-velocity",
            "order": 1,
            "message": "Beim Loslassen aus dem Stillstand fehlt der Achse die Geschwindigkeit, mit der sie präzedieren müsste. Die Hand gibt sie ihr mit."
        },
        "answer2": {
            "conceptId": "initial-velocity",
            "order": 1,
            "message": "Beim Loslassen aus dem Stillstand fehlt der Achse die Geschwindigkeit, mit der sie präzedieren müsste. Die Hand gibt sie ihr mit."
        },
        "answer3": {
            "conceptId": "precesses-anyway",
            "order": 2,
            "message": "Auch losgelassen präzediert der Kreisel – das Drehmoment sorgt dafür. Die Bahn ist dann aber von starker Nutation überlagert."
        },
        "answer4": {
            "conceptId": "spin-unchanged",
            "order": 3,
            "message": "Die Hand bewegt nur die Achse seitlich. Den Drehimpuls um die Figurenachse erhält das Rad allein durch die Antriebsschnur."
        }
    }
};

export const question4: MultipleChoiceQuestion = {
    "questionId": "p7-measurement-4-fehlerquellen",
    "question": "Welche Maßnahmen verringern systematische Fehler bei der Bestimmung von $I$ aus der Präzession?",
    "options": [
        { "value": "answer1", "label": "Den Kreisel vor dem Anhängen des Zusatzgewichts sorgfältig ausbalancieren." },
        { "value": "answer2", "label": "Den Abstand $r$ der Kerbe vom Unterstützungspunkt genau messen." },
        { "value": "answer3", "label": "Ein möglichst großes Zusatzgewicht bei möglichst kleiner Drehzahl wählen, damit die Präzession schnell und gut sichtbar ist." },
        { "value": "answer4", "label": "Die Achse exakt waagrecht halten, weil $\\omega_P$ stark vom Neigungswinkel abhängt." }
    ],
    "correctAnswers": [
        "answer1", "answer2"
    ],
    "containerId": "question4-container",
    "successMessage": "Ein Rest-Drehmoment und ein falsches $r$ verfälschen jedes Ergebnis in dieselbe Richtung. Große Präzessionsgeschwindigkeiten verletzen dagegen die Näherung $\\omega_P \\ll \\omega_R$, und der Neigungswinkel kürzt sich heraus.",
    "incompleteMessage": "Gehen Sie von $\\omega_P = m_z g r/(I\\omega_R)$ und ihren Voraussetzungen aus: Welche Größen gehen direkt ein, welche Näherung wurde gemacht?",
    "incorrectMessage": "Gehen Sie von $\\omega_P = m_z g r/(I\\omega_R)$ und ihren Voraussetzungen aus: Welche Größen gehen direkt ein, welche Näherung wurde gemacht?",
    "answerFeedback": {
        "answer1": {
            "conceptId": "known-torque",
            "order": 1,
            "message": "Die Formel setzt voraus, dass das Drehmoment allein vom Zusatzgewicht stammt. Was bewirkt ein zusätzliches, unbekanntes Drehmoment?"
        },
        "answer2": {
            "conceptId": "known-torque",
            "order": 1,
            "message": "Die Formel setzt voraus, dass das Drehmoment allein vom Zusatzgewicht stammt. Was bewirkt ein zusätzliches, unbekanntes Drehmoment?"
        },
        "answer3": {
            "conceptId": "fast-gyro",
            "order": 2,
            "message": "Die Formel gilt nur für den schnellen Kreisel, $\\omega_P \\ll \\omega_R$. Was passiert mit dieser Bedingung bei großem Zusatzgewicht und kleiner Drehzahl?"
        },
        "answer4": {
            "conceptId": "theta",
            "order": 3,
            "message": "Erinnern Sie sich an den Abschnitt „Präzession“: Auch das Drehmoment des Zusatzgewichts hängt vom Neigungswinkel ab."
        }
    }
};
