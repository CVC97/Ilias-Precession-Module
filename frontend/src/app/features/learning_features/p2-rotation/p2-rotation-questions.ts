import { ImageChoiceQuestion, MultipleChoiceQuestion, SingleChoiceQuestion } from '../../../shared/evaluation/question.types';

export const question1: ImageChoiceQuestion = {
    "questionId": "p2-rotation-1-omega-richtung",
    "question": "Das Rad dreht sich von oben gesehen im Uhrzeigersinn; der gekrümmte Pfeil zeigt die Drehrichtung. Welche Darstellung zeigt die Richtung der Winkelgeschwindigkeit $\\vec{\\omega}$? Wählen Sie genau eine Darstellung.",
    "options": [
        {
            "value": "answer1",
            "imageSrc": "assets/images/p2_rotation/omega_frage_1.svg",
            "alt": "Rad mit Drehpfeil im Uhrzeigersinn von oben gesehen; gerader Pfeil auf der Drehachse nach oben."
        },
        {
            "value": "answer2",
            "imageSrc": "assets/images/p2_rotation/omega_frage_2.svg",
            "alt": "Rad mit Drehpfeil im Uhrzeigersinn von oben gesehen; gerader Pfeil auf der Drehachse nach unten."
        },
        {
            "value": "answer3",
            "imageSrc": "assets/images/p2_rotation/omega_frage_3.svg",
            "alt": "Rad mit Drehpfeil im Uhrzeigersinn von oben gesehen; gerader Pfeil quer zur Drehachse in der Radebene."
        }
    ],
    "correctAnswers": [
        "answer2"
    ],
    "containerId": "question1-container",
    "successMessage": "Die gekrümmten Finger folgen der Drehrichtung von oben gesehen. Der Daumen zeigt nach unten: Das ist die Richtung des axialen Vektors $\\vec{\\omega}$, nicht die Bewegungsrichtung eines einzelnen Randpunkts.",
    "incompleteMessage": "Prüfen Sie zuerst die Lage des Vektors und dann die Orientierung nach der Rechte-Hand-Regel.",
    "incorrectMessage": "Prüfen Sie zuerst die Lage des Vektors und dann die Orientierung nach der Rechte-Hand-Regel.",
    "answerFeedback": {
        "answer3": {
            "conceptId": "rotation-axis",
            "order": 1,
            "message": "Eine Drehung wird durch ihre Achse beschrieben. Unterscheiden Sie diese Achse von den wechselnden Bewegungsrichtungen einzelner Punkte am Rad.",
            "paragraphId": "reasoning"
        },
        "answer1": {
            "conceptId": "right-hand",
            "order": 2,
            "message": "Schauen Sie gedanklich von oben auf das Rad. Krümmen Sie die Finger Ihrer rechten Hand in die eingezeichnete Drehrichtung und vergleichen Sie die Richtung des Daumens mit den axialen Pfeilen.",
            "paragraphId": "reasoning"
        },
        "answer2": {
            "conceptId": "right-hand",
            "order": 2,
            "message": "Schauen Sie gedanklich von oben auf das Rad. Krümmen Sie die Finger Ihrer rechten Hand in die eingezeichnete Drehrichtung und vergleichen Sie die Richtung des Daumens mit den axialen Pfeilen.",
            "paragraphId": "reasoning"
        }
    }
};

export const question2: SingleChoiceQuestion = {
    "questionId": "p2-rotation-2-drehzahl-drehimpuls",
    "question": "Dasselbe Rad rotiert um dieselbe Symmetrieachse; seine Masseverteilung bleibt unverändert. Die Winkelgeschwindigkeit $\\omega$ wird verdoppelt. Wie ändert sich der Betrag $L$ seines Drehimpulses?",
    "options": [
        {
            "value": "answer1",
            "label": "Er verdoppelt sich."
        },
        {
            "value": "answer2",
            "label": "Er vervierfacht sich."
        },
        {
            "value": "answer3",
            "label": "Er bleibt gleich, weil sich das Trägheitsmoment $I$ nicht ändert."
        },
        {
            "value": "answer4",
            "label": "Er halbiert sich."
        }
    ],
    "correctAnswer": "answer1",
    "containerId": "question2-container",
    "successMessage": "Bei unverändertem Trägheitsmoment $I$ gilt $L=I\\omega$. Der Betrag $L$ verdoppelt sich deshalb zusammen mit der Winkelgeschwindigkeit $\\omega$.",
    "incorrectMessage": "Setzen Sie die doppelte Winkelgeschwindigkeit $\\omega$ in $L = I\\omega$ ein.",
    "answerFeedback": {
        "answer2": "Schreiben Sie $L=I\\omega$ auf und prüfen Sie, mit welcher Potenz die Winkelgeschwindigkeit $\\omega$ eingeht.",
        "answer3": "Das Trägheitsmoment $I$ bleibt konstant. Welche weitere Größe bestimmt nach $L=I\\omega$ den Drehimpulsbetrag $L$?",
        "answer4": "Setzen Sie $2\\omega$ für die bisherige Winkelgeschwindigkeit in $L=I\\omega$ ein und vergleichen Sie den Ausdruck mit dem Ausgangswert."
    }
};

export const question3: SingleChoiceQuestion = {
    "questionId": "p2-rotation-3-ring-scheibe",
    "question": "Eine homogene dünne Scheibe und ein dünner Ring haben dieselbe Masse $m$, denselben Radius $R$ und dieselbe Winkelgeschwindigkeit $\\omega$ um ihre jeweilige zentrale Symmetrieachse. Welcher Körper hat den größeren Drehimpulsbetrag $L$?",
    "options": [
        {
            "value": "answer1",
            "label": "Der Ring."
        },
        {
            "value": "answer2",
            "label": "Die Scheibe."
        },
        {
            "value": "answer3",
            "label": "Beide haben denselben Drehimpuls, weil Masse, Radius und Winkelgeschwindigkeit $\\omega$ gleich sind."
        },
        {
            "value": "answer4",
            "label": "Das hängt davon ab, in welche Richtung sie sich drehen."
        }
    ],
    "correctAnswer": "answer1",
    "containerId": "question3-container",
    "successMessage": "Für den Ring gilt $I=mR^2$, für die Scheibe $I=\\tfrac12mR^2$. Mit $L=I\\omega$ hat der Ring bei gleichem $\\omega$ den doppelten Drehimpulsbetrag $L$.",
    "incorrectMessage": "Vergleichen Sie, wie weit die Masse bei beiden Körpern von der Achse entfernt ist.",
    "answerFeedback": {
        "answer2": "Vergleichen Sie die Abstände der Massenelemente von der Drehachse. In $I=\\int r_\\perp^2\\,\\mathrm{d}m$ werden größere Abstände stärker gewichtet.",
        "answer3": "Vergleichen Sie die radiale Masseverteilung trotz gleicher Gesamtmasse und gleichen Außenradius. Was bedeutet dieser Unterschied für das Trägheitsmoment $I$?",
        "answer4": "Eine Umkehr der Drehrichtung kehrt $\\vec{L}$ um. Ändert sich dadurch auch sein hier gefragter Betrag $L$?"
    }
};

export const question4: SingleChoiceQuestion = {
    "questionId": "p2-rotation-4-antriebsschnur",
    "question": "Das Rad dreht sich bereits. Sie ziehen die Antriebsschnur so ab, dass es bei festgehaltener Achse in derselben Richtung schneller wird. Wie ist das Drehmoment $\\vec{D}$ der Schnur relativ zum bisherigen Drehimpuls $\\vec{L}$ gerichtet?",
    "options": [
        {
            "value": "answer1",
            "label": "Parallel zum Drehimpuls."
        },
        {
            "value": "answer2",
            "label": "Antiparallel zum Drehimpuls."
        },
        {
            "value": "answer3",
            "label": "Senkrecht zum Drehimpuls."
        },
        {
            "value": "answer4",
            "label": "Die Schnur übt kein Drehmoment aus, sie zieht nur am Rad."
        }
    ],
    "correctAnswer": "answer1",
    "containerId": "question4-container",
    "successMessage": "Der Drehimpulsbetrag $L$ wächst bei unveränderter Richtung. Die Änderung $\\mathrm{d}\\vec{L}$ und damit das Drehmoment $\\vec{D}$ zeigen deshalb parallel zum bisherigen Drehimpuls $\\vec{L}$.",
    "incorrectMessage": "Überlegen Sie, wie sich der Drehimpuls $\\vec{L}$ beim Andrehen ändert – im Betrag oder in der Richtung?",
    "answerFeedback": {
        "answer2": "Zeichnen Sie einen kleinen Änderungsvektor entgegen dem bisherigen $\\vec{L}$. Würde die Summe einen größeren oder kleineren Drehimpulsbetrag $L$ ergeben?",
        "answer3": "Überlegen Sie, ob eine seitliche Änderung von $\\vec{L}$ zur beschriebenen festen Achse passt. Welche Eigenschaft von $\\vec{L}$ soll beim Andrehen zunehmen?",
        "answer4": "Verfolgen Sie die Wirkungslinie der Zugkraft relativ zur Radachse. Hat die Kraft einen Hebelarm und damit ein Drehmoment $\\vec{D}$?"
    }
};

export const question5: MultipleChoiceQuestion = {
    "questionId": "p2-rotation-5-drehmoment-aussagen",
    "question": "Welche Aussagen folgen im raumfesten Bezugssystem aus $\\mathrm{d}\\vec{L}/\\mathrm{d}t=\\vec{D}$? Mit Drehmoment ist jeweils das gesamte äußere Drehmoment gemeint.",
    "options": [
        {
            "value": "answer1",
            "label": "Die Änderung des Drehimpulses $\\vec{L}$ zeigt in Richtung des Drehmoments $\\vec{D}$."
        },
        {
            "value": "answer2",
            "label": "Bleibt das Drehmoment $\\vec{D}$ während einer Bewegung senkrecht zu $\\vec{L}$, ändert es dessen Richtung, aber nicht den Betrag $L$."
        },
        {
            "value": "answer3",
            "label": "Der Drehimpuls zeigt immer in Richtung des Drehmoments."
        },
        {
            "value": "answer4",
            "label": "Ohne Drehmoment bleibt der Drehimpuls nach Betrag und Richtung erhalten."
        },
        {
            "value": "answer5",
            "label": "Ein Drehmoment ändert immer den Betrag des Drehimpulses."
        }
    ],
    "correctAnswers": [
        "answer1",
        "answer2",
        "answer4"
    ],
    "containerId": "question5-container",
    "successMessage": "Das Drehmoment $\\vec{D}$ bestimmt die momentane Änderung von $\\vec{L}$. Bei stets senkrechtem Drehmoment bleibt der Betrag $L$ erhalten; bei verschwindendem Drehmoment bleibt der gesamte Vektor $\\vec{L}$ konstant.",
    "incompleteMessage": "Unterscheiden Sie den vorhandenen Drehimpuls von seiner momentanen Änderung.",
    "incorrectMessage": "Unterscheiden Sie den vorhandenen Drehimpuls von seiner momentanen Änderung.",
    "answerFeedback": {
        "answer1": {
            "conceptId": "vector-and-change",
            "order": 1,
            "message": "Die Zeitableitung beschreibt die Änderung eines Vektors. Muss der vorhandene Vektor $\\vec{L}$ selbst in dieselbe Richtung wie diese Änderung zeigen?",
            "paragraphId": "reasoning"
        },
        "answer3": {
            "conceptId": "vector-and-change",
            "order": 1,
            "message": "Die Zeitableitung beschreibt die Änderung eines Vektors. Muss der vorhandene Vektor $\\vec{L}$ selbst in dieselbe Richtung wie diese Änderung zeigen?",
            "paragraphId": "reasoning"
        },
        "answer2": {
            "conceptId": "magnitude-change",
            "order": 2,
            "message": "Vergleichen Sie mit einer gleichförmigen Kreisbewegung: Die Änderung der Geschwindigkeit steht dort senkrecht zur Geschwindigkeit. Übertragen Sie diese Unterscheidung zwischen Betrag und Richtung auf $\\vec{L}$.",
            "paragraphId": "reasoning"
        },
        "answer5": {
            "conceptId": "magnitude-change",
            "order": 2,
            "message": "Vergleichen Sie mit einer gleichförmigen Kreisbewegung: Die Änderung der Geschwindigkeit steht dort senkrecht zur Geschwindigkeit. Übertragen Sie diese Unterscheidung zwischen Betrag und Richtung auf $\\vec{L}$.",
            "paragraphId": "reasoning"
        },
        "answer4": {
            "conceptId": "zero-derivative",
            "order": 3,
            "message": "Setzen Sie $\\vec{D}=0$ in die Bewegungsgleichung ein. Was bedeutet eine verschwindende Zeitableitung für Betrag und Richtung eines Vektors?",
            "paragraphId": "conservation"
        }
    }
};
