import { MultipleChoiceQuestion, SingleChoiceQuestion } from '../../../shared/evaluation/question.types';

export const question1: SingleChoiceQuestion = {
    "questionId": "p6-nutation-1-nutationskegel",
    "question": "Welche Bewegung beschreibt der Nutationskegel?",
    "options": [
        { "value": "answer1", "label": "Die Figurenachse läuft um die Drehimpulsachse." },
        { "value": "answer2", "label": "Die Drehimpulsachse läuft um die senkrechte Richtung." },
        { "value": "answer3", "label": "Die momentane Drehachse läuft um die Figurenachse." },
        { "value": "answer4", "label": "Das Rad dreht sich um seine Figurenachse." }
    ],
    "correctAnswer": "answer1",
    "containerId": "question1-container",
    "successMessage": "Beim kräftefreien Kreisel steht $\\vec{L}$ fest, und die Figurenachse läuft auf dem Nutationskegel um sie herum.",
    "incorrectMessage": "Beim kräftefreien Kreisel ist $\\vec{L}$ im Raum fest. Welche Achse bewegt sich um $\\vec{L}$?",
    "answerFeedback": {
        "answer2": "Eine Drehung von $\\vec{L}$ um die Senkrechte ist die Präzession. Sie braucht ein Drehmoment – beim kräftefreien Kreisel steht $\\vec{L}$ fest.",
        "answer3": "Diese Bewegung beschreibt einen der beiden anderen Kegel. Beim Nutationskegel geht es um die Achse, auf der das Rad sitzt.",
        "answer4": "Das ist die schnelle Drehung des Rades selbst. Die Nutation ist eine Bewegung der Achse."
    }
};

export const question2: MultipleChoiceQuestion = {
    "questionId": "p6-nutation-2-kegel",
    "question": "Welche Aussagen zu den drei Kegeln des kräftefreien Kreisels treffen zu?",
    "options": [
        { "value": "answer1", "label": "Der Rastpolkegel ist raumfest." },
        { "value": "answer2", "label": "Der Gangpolkegel ist fest mit dem Kreisel verbunden." },
        { "value": "answer3", "label": "Die momentane Drehachse ist die Linie, entlang der sich Gangpolkegel und Rastpolkegel berühren." },
        { "value": "answer4", "label": "Die Drehimpulsachse läuft im Raum auf dem Nutationskegel um die Figurenachse." },
        { "value": "answer5", "label": "Die Drehimpulsachse bewegt sich im Raum auf dem Rastpolkegel." }
    ],
    "correctAnswers": [
        "answer1", "answer2", "answer3"
    ],
    "containerId": "question2-container",
    "successMessage": "Der körperfeste Gangpolkegel rollt auf dem raumfesten Rastpolkegel ab; beide berühren sich entlang der momentanen Drehachse. Die Drehimpulsachse steht dabei fest.",
    "incompleteMessage": "Klären Sie für jeden Kegel, welche Achse um welche läuft und ob der Kegel im Raum oder im Kreisel fest ist.",
    "incorrectMessage": "Klären Sie für jeden Kegel, welche Achse um welche läuft und ob der Kegel im Raum oder im Kreisel fest ist.",
    "answerFeedback": {
        "answer1": {
            "conceptId": "names",
            "order": 1,
            "message": "Die Namen helfen: „Rast“ steht für Ruhe im Raum, „Gang“ für die Bewegung mit dem Kreisel."
        },
        "answer2": {
            "conceptId": "names",
            "order": 1,
            "message": "Die Namen helfen: „Rast“ steht für Ruhe im Raum, „Gang“ für die Bewegung mit dem Kreisel."
        },
        "answer3": {
            "conceptId": "rolling",
            "order": 2,
            "message": "Denken Sie an ein rollendes Rad: Welche Punkte sind im Augenblick der Berührung in Ruhe, und welche Achse ist durch ruhende Punkte definiert?"
        },
        "answer4": {
            "conceptId": "l-fixed",
            "order": 3,
            "message": "Beim kräftefreien Kreisel ist $\\vec{L}$ konstant. Die Drehimpulsachse bewegt sich im Raum also gar nicht – die anderen Achsen bewegen sich um sie."
        },
        "answer5": {
            "conceptId": "l-fixed",
            "order": 3,
            "message": "Beim kräftefreien Kreisel ist $\\vec{L}$ konstant. Die Drehimpulsachse bewegt sich im Raum also gar nicht – die anderen Achsen bewegen sich um sie."
        }
    }
};

export const question3: SingleChoiceQuestion = {
    "questionId": "p6-nutation-3-drehzahl",
    "question": "Sie erhöhen die Drehzahl des Rades und geben der Achse einen gleich starken Stoß wie zuvor. Wie verändert sich die Nutation?",
    "options": [
        { "value": "answer1", "label": "Sie wird schneller, und die Achse weicht weniger weit aus." },
        { "value": "answer2", "label": "Sie wird langsamer, und die Achse weicht weiter aus." },
        { "value": "answer3", "label": "Sie wird schneller, und die Achse weicht weiter aus." },
        { "value": "answer4", "label": "Sie bleibt unverändert, weil der Stoß gleich ist." }
    ],
    "correctAnswer": "answer1",
    "containerId": "question3-container",
    "successMessage": "Die Nutationsfrequenz wächst mit der Drehzahl. Gleichzeitig macht derselbe Stoß bei größerem Drehimpuls nur eine kleinere Richtungsänderung – der Nutationskegel wird enger.",
    "incorrectMessage": "Überlegen Sie getrennt: Wie hängt die Nutationsfrequenz von der Drehzahl ab, und wie stark ändert derselbe Stoß die Richtung eines größeren Drehimpulses?",
    "answerFeedback": {
        "answer2": "Laut Versuchsskript wächst $\\omega_N$ linear mit $\\omega_R$. Und: Derselbe Stoß ändert einen größeren Drehimpuls in seiner Richtung weniger stark.",
        "answer3": "Die Frequenz stimmt. Überlegen Sie aber, wie stark derselbe Stoß die Richtung eines größeren Drehimpulses ändern kann.",
        "answer4": "Der Stoß ist gleich, aber der Drehimpuls, auf den er wirkt, ist größer. Außerdem wächst die Nutationsfrequenz laut Versuchsskript mit der Drehzahl."
    }
};
