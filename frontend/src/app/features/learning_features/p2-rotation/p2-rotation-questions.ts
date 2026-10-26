import { ImageChoiceQuestion, MultipleChoiceQuestion, SingleChoiceQuestion } from '../../../shared/evaluation/question.types';

export const question1: ImageChoiceQuestion = {
    "questionId": "p2-rotation-1-omega-richtung",
    "question": "Dieses Rad dreht sich – von oben gesehen – im Uhrzeigersinn (Pfeil am Rand). Welcher Pfeil gibt die Richtung der Winkelgeschwindigkeit $\\vec{\\omega}$ an?",
    "options": [
        { "value": "answer1", "imageSrc": "assets/images/p2_rotation/omega_frage_1.svg" },
        { "value": "answer2", "imageSrc": "assets/images/p2_rotation/omega_frage_2.svg" },
        { "value": "answer3", "imageSrc": "assets/images/p2_rotation/omega_frage_3.svg" },
        { "value": "answer4", "imageSrc": "assets/images/p2_rotation/omega_frage_4.svg" }
    ],
    "correctAnswers": [
        "answer2"
    ],
    "containerId": "question1-container",
    "successMessage": "Im Uhrzeigersinn von oben gesehen heißt: Der Daumen der rechten Hand zeigt nach unten. $\\vec{\\omega}$ liegt auf der Drehachse und zeigt nach unten.",
    "incompleteMessage": "Wenden Sie die Rechte-Hand-Regel an: Finger in Drehrichtung, der Daumen zeigt die Richtung von $\\vec{\\omega}$.",
    "incorrectMessage": "Wenden Sie die Rechte-Hand-Regel an: Finger in Drehrichtung, der Daumen zeigt die Richtung von $\\vec{\\omega}$.",
    "answerFeedback": {
        "answer1": {
            "conceptId": "right-hand",
            "order": 2,
            "message": "Krümmen Sie die Finger der rechten Hand in die Drehrichtung des Rades. Achten Sie darauf, dass sich dieses Rad von oben gesehen im Uhrzeigersinn dreht."
        },
        "answer2": {
            "conceptId": "right-hand",
            "order": 2,
            "message": "Krümmen Sie die Finger der rechten Hand in die Drehrichtung des Rades. Achten Sie darauf, dass sich dieses Rad von oben gesehen im Uhrzeigersinn dreht."
        },
        "answer3": {
            "conceptId": "on-axis",
            "order": 1,
            "message": "$\\vec{\\omega}$ liegt immer auf der Drehachse. Pfeile in der Ebene des Rades beschreiben die Bewegung einzelner Punkte, nicht die Drehung des ganzen Rades."
        },
        "answer4": {
            "conceptId": "on-axis",
            "order": 1,
            "message": "$\\vec{\\omega}$ liegt immer auf der Drehachse. Pfeile in der Ebene des Rades beschreiben die Bewegung einzelner Punkte, nicht die Drehung des ganzen Rades."
        }
    }
};

export const question2: SingleChoiceQuestion = {
    "questionId": "p2-rotation-2-drehzahl-drehimpuls",
    "question": "Die Drehzahl des Rades wird verdoppelt. Wie ändert sich der Betrag seines Drehimpulses?",
    "options": [
        { "value": "answer1", "label": "Er verdoppelt sich." },
        { "value": "answer2", "label": "Er vervierfacht sich." },
        { "value": "answer3", "label": "Er bleibt gleich, weil sich das Trägheitsmoment nicht ändert." },
        { "value": "answer4", "label": "Er halbiert sich." }
    ],
    "correctAnswer": "answer1",
    "containerId": "question2-container",
    "successMessage": "Wegen $L = I\\omega$ ist der Drehimpuls proportional zur Winkelgeschwindigkeit.",
    "incorrectMessage": "Setzen Sie die doppelte Winkelgeschwindigkeit in $L = I\\omega$ ein.",
    "answerFeedback": {
        "answer2": "Quadratisch mit $\\omega$ wächst die Rotationsenergie $E = \\tfrac{1}{2} I \\omega^2$. Der Drehimpuls $L = I\\omega$ hängt linear von $\\omega$ ab.",
        "answer3": "Das Trägheitsmoment bleibt tatsächlich gleich. Der Drehimpuls hängt aber auch von der Winkelgeschwindigkeit ab: $L = I\\omega$.",
        "answer4": "Verwechseln Sie nicht Drehzahl und Umlaufdauer: Die Umlaufdauer halbiert sich. Was folgt daraus für $\\omega = 2\\pi/T$?"
    }
};

export const question3: SingleChoiceQuestion = {
    "questionId": "p2-rotation-3-ring-scheibe",
    "question": "Eine homogene Scheibe und ein dünner Ring haben dieselbe Masse und denselben Radius und drehen sich gleich schnell um ihre Symmetrieachse. Welcher Körper hat den größeren Drehimpuls?",
    "options": [
        { "value": "answer1", "label": "Der Ring." },
        { "value": "answer2", "label": "Die Scheibe." },
        { "value": "answer3", "label": "Beide haben denselben Drehimpuls, weil Masse, Radius und Drehzahl gleich sind." },
        { "value": "answer4", "label": "Das hängt davon ab, in welche Richtung sie sich drehen." }
    ],
    "correctAnswer": "answer1",
    "containerId": "question3-container",
    "successMessage": "Beim Ring sitzt die ganze Masse im Abstand $R$ von der Achse: $I = mR^2$ statt $\\tfrac{1}{2}mR^2$ bei der Scheibe. Bei gleicher Winkelgeschwindigkeit ist sein Drehimpuls also doppelt so groß.",
    "incorrectMessage": "Vergleichen Sie, wie weit die Masse bei beiden Körpern von der Achse entfernt ist.",
    "answerFeedback": {
        "answer2": "Bei der Scheibe ist ein Teil der Masse nahe an der Achse. Vergleichen Sie $I = \\tfrac{1}{2}mR^2$ (Scheibe) mit $I = mR^2$ (Ring).",
        "answer3": "Masse und Radius allein bestimmen das Trägheitsmoment nicht. Entscheidend ist, wie weit die Masse von der Achse entfernt ist: $I = \\int r_\\perp^2\\,\\mathrm{d}m$.",
        "answer4": "Die Drehrichtung bestimmt die Richtung des Drehimpulses, nicht seinen Betrag. Gefragt ist der Betrag."
    }
};

export const question4: SingleChoiceQuestion = {
    "questionId": "p2-rotation-4-antriebsschnur",
    "question": "Sie ziehen die Antriebsschnur ab und bringen so das Rad auf eine hohe Drehzahl. Wie ist das Drehmoment der Schnur relativ zum Drehimpuls des Rades gerichtet?",
    "options": [
        { "value": "answer1", "label": "Parallel zum Drehimpuls." },
        { "value": "answer2", "label": "Antiparallel zum Drehimpuls." },
        { "value": "answer3", "label": "Senkrecht zum Drehimpuls." },
        { "value": "answer4", "label": "Die Schnur übt kein Drehmoment aus, sie zieht nur am Rad." }
    ],
    "correctAnswer": "answer1",
    "containerId": "question4-container",
    "successMessage": "Die Schnur vergrößert den Betrag des Drehimpulses, ohne seine Richtung zu ändern. Dazu muss das Drehmoment parallel zu $\\vec{L}$ zeigen.",
    "incorrectMessage": "Überlegen Sie, wie sich der Drehimpuls beim Andrehen ändert – im Betrag oder in der Richtung?",
    "answerFeedback": {
        "answer2": "Ein Drehmoment antiparallel zu $\\vec{L}$ verkürzt den Drehimpuls. So wirkt die Reibung, die das Rad abbremst.",
        "answer3": "Ein Drehmoment senkrecht zu $\\vec{L}$ würde vor allem die Richtung der Achse ändern. Beim Andrehen ändert sich aber nur die Drehzahl.",
        "answer4": "Die Schnur greift im Abstand von der Achse an. Kraft mal Hebelarm ergibt ein Drehmoment – sonst würde sich das Rad nicht schneller drehen."
    }
};

export const question5: MultipleChoiceQuestion = {
    "questionId": "p2-rotation-5-drehmoment-aussagen",
    "question": "Welche Aussagen über $\\mathrm{d}\\vec{L}/\\mathrm{d}t = \\vec{D}$ treffen zu?",
    "options": [
        { "value": "answer1", "label": "Die Änderung des Drehimpulses zeigt in Richtung des Drehmoments." },
        { "value": "answer2", "label": "Ein Drehmoment senkrecht zu $\\vec{L}$ ändert die Richtung von $\\vec{L}$, aber nicht seinen Betrag." },
        { "value": "answer3", "label": "Der Drehimpuls zeigt immer in Richtung des Drehmoments." },
        { "value": "answer4", "label": "Ohne Drehmoment bleibt der Drehimpuls nach Betrag und Richtung erhalten." },
        { "value": "answer5", "label": "Ein Drehmoment ändert immer den Betrag des Drehimpulses." }
    ],
    "correctAnswers": [
        "answer1", "answer2", "answer4"
    ],
    "containerId": "question5-container",
    "successMessage": "Das Drehmoment legt fest, in welche Richtung sich $\\vec{L}$ ändert. Steht es senkrecht auf $\\vec{L}$, dreht es den Drehimpuls, ohne ihn zu verlängern.",
    "incompleteMessage": "Unterscheiden Sie zwischen dem Drehimpuls $\\vec{L}$ und seiner Änderung $\\mathrm{d}\\vec{L}$.",
    "incorrectMessage": "Unterscheiden Sie zwischen dem Drehimpuls $\\vec{L}$ und seiner Änderung $\\mathrm{d}\\vec{L}$.",
    "answerFeedback": {
        "answer1": {
            "conceptId": "change-vs-vector",
            "order": 1,
            "message": "Die Gleichung legt nur die Richtung der Änderung $\\mathrm{d}\\vec{L}$ fest. $\\vec{L}$ selbst kann in eine ganz andere Richtung zeigen als $\\vec{D}$."
        },
        "answer2": {
            "conceptId": "perpendicular",
            "order": 2,
            "message": "Zeichnen Sie die Vektorsumme $\\vec{L} + \\Delta\\vec{L}$ für den Fall, dass $\\Delta\\vec{L}$ senkrecht auf $\\vec{L}$ steht. Vergleichen Sie mit der Zentripetalkraft bei der Kreisbewegung."
        },
        "answer3": {
            "conceptId": "change-vs-vector",
            "order": 1,
            "message": "Die Gleichung legt nur die Richtung der Änderung $\\mathrm{d}\\vec{L}$ fest. $\\vec{L}$ selbst kann in eine ganz andere Richtung zeigen als $\\vec{D}$."
        },
        "answer4": {
            "conceptId": "conservation",
            "order": 3,
            "message": "Setzen Sie in $\\mathrm{d}\\vec{L}/\\mathrm{d}t = \\vec{D}$ ein verschwindendes Drehmoment ein."
        },
        "answer5": {
            "conceptId": "perpendicular",
            "order": 2,
            "message": "Zeichnen Sie die Vektorsumme $\\vec{L} + \\Delta\\vec{L}$ für den Fall, dass $\\Delta\\vec{L}$ senkrecht auf $\\vec{L}$ steht. Vergleichen Sie mit der Zentripetalkraft bei der Kreisbewegung."
        }
    }
};
