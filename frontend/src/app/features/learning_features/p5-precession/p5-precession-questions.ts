import { MultipleChoiceQuestion, SingleChoiceQuestion } from '../../../shared/evaluation/question.types';

export const question1: SingleChoiceQuestion = {
    "questionId": "p5-precession-1-drehmoment-richtung",
    "question": "Die Achse des Kreisels liegt waagrecht, das Zusatzgewicht hängt an der Achse. In welche Richtung zeigt das Drehmoment $\\vec{D} = \\vec{r}\\times\\vec{F}$?",
    "options": [
        { "value": "answer1", "label": "Waagrecht und quer zur Achse." },
        { "value": "answer2", "label": "Senkrecht nach unten, wie die Gewichtskraft." },
        { "value": "answer3", "label": "Entlang der Achse." },
        { "value": "answer4", "label": "Senkrecht nach oben." }
    ],
    "correctAnswer": "answer1",
    "containerId": "question1-container",
    "successMessage": "$\\vec{D}$ steht senkrecht auf $\\vec{r}$ (waagrecht entlang der Achse) und auf $\\vec{F}$ (senkrecht nach unten). Es bleibt nur die waagrechte Richtung quer zur Achse – senkrecht zu $\\vec{L}$.",
    "incorrectMessage": "Das Kreuzprodukt steht senkrecht auf beiden Faktoren. Bestimmen Sie die Richtungen von $\\vec{r}$ und $\\vec{F}$.",
    "answerFeedback": {
        "answer2": "Das Drehmoment ist ein Kreuzprodukt und steht senkrecht auf $\\vec{F}$. Es kann also nicht in Richtung der Gewichtskraft zeigen.",
        "answer3": "$\\vec{r}$ liegt entlang der Achse. Das Kreuzprodukt $\\vec{r}\\times\\vec{F}$ steht senkrecht auf $\\vec{r}$.",
        "answer4": "Das Kreuzprodukt steht senkrecht auf $\\vec{F}$. Eine senkrechte Richtung – nach oben oder unten – ist parallel zu $\\vec{F}$."
    }
};

export const question2: SingleChoiceQuestion = {
    "questionId": "p5-precession-2-betrag-l",
    "question": "Wie ändert sich der Betrag des Drehimpulses während der Präzession, wenn man die Reibung vernachlässigt?",
    "options": [
        { "value": "answer1", "label": "Er bleibt gleich, nur die Richtung von $\\vec{L}$ ändert sich." },
        { "value": "answer2", "label": "Er wächst, weil ständig ein Drehmoment wirkt." },
        { "value": "answer3", "label": "Er nimmt ab, weil das Drehmoment das Rad bremst." },
        { "value": "answer4", "label": "Er schwankt periodisch mit der Präzessionsdauer." }
    ],
    "correctAnswer": "answer1",
    "containerId": "question2-container",
    "successMessage": "Weil $\\mathrm{d}\\vec{L}$ stets senkrecht auf $\\vec{L}$ steht, ändert sich nur die Richtung – wie bei der Geschwindigkeit in einer gleichförmigen Kreisbewegung.",
    "incorrectMessage": "Überlegen Sie, wie $\\mathrm{d}\\vec{L}$ relativ zu $\\vec{L}$ gerichtet ist.",
    "answerFeedback": {
        "answer2": "Ein Drehmoment ändert den Betrag von $\\vec{L}$ nur, wenn es eine Komponente parallel zu $\\vec{L}$ hat. Wie ist $\\vec{D}$ hier relativ zu $\\vec{L}$ gerichtet?",
        "answer3": "Bremsend wirkt nur ein Drehmoment antiparallel zu $\\vec{L}$, etwa durch Reibung. Wie ist das Drehmoment des Zusatzgewichts relativ zu $\\vec{L}$ gerichtet?",
        "answer4": "Das Drehmoment steht während der ganzen Präzession senkrecht auf $\\vec{L}$ – es gibt keinen Moment, in dem es $\\vec{L}$ verlängert oder verkürzt."
    }
};

export const question3: SingleChoiceQuestion = {
    "questionId": "p5-precession-3-drehzahl",
    "question": "Die Drehzahl des Rades wird verdoppelt, das Zusatzgewicht bleibt gleich. Was passiert mit der Präzessionsgeschwindigkeit $\\omega_P$?",
    "options": [
        { "value": "answer1", "label": "Sie halbiert sich." },
        { "value": "answer2", "label": "Sie verdoppelt sich." },
        { "value": "answer3", "label": "Sie bleibt gleich, weil das Drehmoment gleich bleibt." },
        { "value": "answer4", "label": "Sie sinkt auf ein Viertel." }
    ],
    "correctAnswer": "answer1",
    "containerId": "question3-container",
    "successMessage": "Wegen $\\omega_P = m_z g r/(I\\omega_R)$ ist die Präzessionsgeschwindigkeit umgekehrt proportional zur Winkelgeschwindigkeit des Rades.",
    "incorrectMessage": "Setzen Sie die doppelte Winkelgeschwindigkeit $\\omega_R$ in $\\omega_P = m_z g r/(I\\omega_R)$ ein.",
    "answerFeedback": {
        "answer2": "Ein größerer Drehimpuls lässt sich durch dasselbe Drehmoment schwerer drehen. Wo steht $\\omega_R$ in der Formel – im Zähler oder im Nenner?",
        "answer3": "Das Drehmoment bleibt gleich, aber der Drehimpuls verdoppelt sich. Beides geht in $\\omega_P = D/L$ ein.",
        "answer4": "$\\omega_R$ steht linear im Nenner, nicht quadratisch."
    }
};

export const question4: SingleChoiceQuestion = {
    "questionId": "p5-precession-4-steigung",
    "question": "Sie tragen für ein Zusatzgewicht $\\omega_P$ gegen $1/\\omega_R$ auf und erhalten eine Gerade. Welche Steigung erwarten Sie?",
    "options": [
        { "value": "answer1", "label": "$\\dfrac{m_z g r}{I}$" },
        { "value": "answer2", "label": "$\\dfrac{I}{m_z g r}$" },
        { "value": "answer3", "label": "$m_z g r\\,I$" },
        { "value": "answer4", "label": "$m_z g r$" }
    ],
    "correctAnswer": "answer1",
    "containerId": "question4-container",
    "successMessage": "Aus $\\omega_P = \\dfrac{m_z g r}{I}\\cdot\\dfrac{1}{\\omega_R}$ lesen Sie die Steigung direkt ab. Mit bekanntem $m_z$, $g$ und $r$ folgt daraus $I$.",
    "incorrectMessage": "Schreiben Sie die Formel für $\\omega_P$ in der Form „Steigung mal $1/\\omega_R$“.",
    "answerFeedback": {
        "answer2": "Prüfen Sie, wo $I$ in der Formel für $\\omega_P$ steht: Ein größeres Trägheitsmoment macht die Präzession langsamer.",
        "answer3": "Prüfen Sie, wo $I$ in der Formel für $\\omega_P$ steht: Ein größeres Trägheitsmoment macht die Präzession langsamer.",
        "answer4": "In $\\omega_P = m_z g r/(I\\omega_R)$ steht neben $\\omega_R$ noch eine zweite Größe im Nenner."
    }
};

export const question5: MultipleChoiceQuestion = {
    "questionId": "p5-precession-5-abhaengigkeiten",
    "question": "Welche Aussagen gelten für einen schnellen Kreisel, dessen Drehmoment von einer Gewichtskraft an der Figurenachse stammt?",
    "options": [
        { "value": "answer1", "label": "Die Präzessionsgeschwindigkeit hängt nicht vom Neigungswinkel $\\theta$ der Achse ab." },
        { "value": "answer2", "label": "Je schneller das Rad rotiert, desto langsamer präzediert der Kreisel." },
        { "value": "answer3", "label": "Ein größeres Zusatzgewicht lässt den Kreisel schneller präzedieren." },
        { "value": "answer4", "label": "Je stärker die Achse geneigt ist, desto schneller präzediert der Kreisel." },
        { "value": "answer5", "label": "Nimmt man das Zusatzgewicht ab, präzediert der ausbalancierte Kreisel mit derselben Geschwindigkeit weiter." }
    ],
    "correctAnswers": [
        "answer1", "answer2", "answer3"
    ],
    "containerId": "question5-container",
    "successMessage": "Die Präzessionsgeschwindigkeit ist Drehmoment durch Drehimpuls; der Neigungswinkel kürzt sich heraus. Ohne Drehmoment gibt es keine Präzession.",
    "incompleteMessage": "Gehen Sie von $\\omega_P = D/(L\\sin\\theta)$ aus und überlegen Sie für jede Aussage, welche Größe sich ändert.",
    "incorrectMessage": "Gehen Sie von $\\omega_P = D/(L\\sin\\theta)$ aus und überlegen Sie für jede Aussage, welche Größe sich ändert.",
    "answerFeedback": {
        "answer1": {
            "conceptId": "theta-cancels",
            "order": 1,
            "message": "Auch das Drehmoment hängt vom Neigungswinkel ab: $D = m g l\\sin\\theta$. Setzen Sie es in $\\omega_P = D/(L\\sin\\theta)$ ein."
        },
        "answer2": {
            "conceptId": "inverse-l",
            "order": 2,
            "message": "Der Drehimpuls steht im Nenner von $\\omega_P = D/(L\\sin\\theta)$."
        },
        "answer3": {
            "conceptId": "torque-prop",
            "order": 3,
            "message": "Das Drehmoment steht im Zähler von $\\omega_P = D/(L\\sin\\theta)$."
        },
        "answer4": {
            "conceptId": "theta-cancels",
            "order": 1,
            "message": "Auch das Drehmoment hängt vom Neigungswinkel ab: $D = m g l\\sin\\theta$. Setzen Sie es in $\\omega_P = D/(L\\sin\\theta)$ ein."
        },
        "answer5": {
            "conceptId": "no-torque",
            "order": 4,
            "message": "Ohne Drehmoment ist $\\mathrm{d}\\vec{L}/\\mathrm{d}t = 0$. Was folgt daraus für die Richtung von $\\vec{L}$?"
        }
    }
};
