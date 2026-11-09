import { MultipleChoiceQuestion, SingleChoiceQuestion } from '../../../shared/evaluation/question.types';

export const question1: SingleChoiceQuestion = {
    "questionId": "p5-precession-1-drehmoment-richtung",
    "question": "Die Achse liegt waagrecht. Der Ortsvektor $\\vec{r}$ zeigt vom Unterstützungspunkt entlang der Achse zum Zusatzgewicht, dessen Gewichtskraft $\\vec{F}$ nach unten zeigt. Wie liegt das Drehmoment $\\vec{D}=\\vec{r}\\times\\vec{F}$ zu diesen Richtungen? Gesucht ist die Orientierung, nicht die Unterscheidung zwischen den beiden seitlichen Richtungen.",
    "options": [
        {
            "value": "answer1",
            "label": "Waagrecht und quer zur Achse."
        },
        {
            "value": "answer2",
            "label": "Senkrecht nach unten, wie die Gewichtskraft $\\vec{F}$."
        },
        {
            "value": "answer3",
            "label": "Entlang der Achse."
        },
        {
            "value": "answer4",
            "label": "Senkrecht nach oben."
        }
    ],
    "correctAnswer": "answer1",
    "containerId": "question1-container",
    "successMessage": "Das Kreuzprodukt $\\vec{D}$ steht senkrecht auf der von $\\vec{r}$ und $\\vec{F}$ aufgespannten vertikalen Ebene. Es liegt daher waagrecht und quer zur Achse. Die genaue seitliche Richtung würde zusätzlich mit der Rechte-Hand-Regel bestimmt.",
    "incorrectMessage": "Das Kreuzprodukt steht senkrecht auf beiden Faktoren. Bestimmen Sie die Richtungen von $\\vec{r}$ und $\\vec{F}$.",
    "answerFeedback": {
        "answer2": "Unterscheiden Sie die angreifende Kraft $\\vec{F}$ von ihrem Drehmoment $\\vec{D}$. Welche geometrische Eigenschaft hat ein Kreuzprodukt gegenüber jedem seiner beiden Faktoren?",
        "answer3": "Der Ortsvektor $\\vec{r}$ liegt entlang der Achse. Prüfen Sie, ob das Kreuzprodukt entlang eines seiner Faktoren liegen kann.",
        "answer4": "Eine Richtung nach oben ist antiparallel zur Gewichtskraft $\\vec{F}$. Prüfen Sie, ob das zur Senkrechtstellung eines Kreuzprodukts auf beide Faktoren passt."
    }
};

export const question2: SingleChoiceQuestion = {
    "questionId": "p5-precession-2-betrag-l",
    "question": "Betrachten Sie die gleichmäßige Präzession eines schnellen Kreisels ohne Reibung und ohne überlagerte Nutation. Das Drehmoment $\\vec{D}$ steht dabei stets senkrecht zum Drehimpuls $\\vec{L}$. Wie ändert sich dessen Betrag $L$?",
    "options": [
        {
            "value": "answer1",
            "label": "Er bleibt gleich, nur die Richtung von $\\vec{L}$ ändert sich."
        },
        {
            "value": "answer2",
            "label": "Er wächst, weil ständig ein Drehmoment $\\vec{D}$ wirkt."
        },
        {
            "value": "answer3",
            "label": "Er nimmt ab, weil das Drehmoment $\\vec{D}$ das Rad bremst."
        },
        {
            "value": "answer4",
            "label": "Er schwankt periodisch mit der Präzessionsdauer."
        }
    ],
    "correctAnswer": "answer1",
    "containerId": "question2-container",
    "successMessage": "Bei stets senkrechtem Drehmoment ist die momentane Änderung von $\\vec{L}$ quer zu $\\vec{L}$ gerichtet. Der Betrag $L$ bleibt konstant, während sich seine Richtung gleichmäßig dreht. Die Aussage bezieht sich auf die beschriebene gleichmäßige Präzession.",
    "incorrectMessage": "Überlegen Sie, wie $\\mathrm{d}\\vec{L}$ relativ zu $\\vec{L}$ gerichtet ist.",
    "answerFeedback": {
        "answer2": "Ein nicht verschwindendes Drehmoment kann Betrag oder Richtung verändern. Welche Komponente von $\\vec{D}$ wäre für eine Änderung des Betrags $L$ erforderlich?",
        "answer3": "Zeichnen Sie die Richtung eines bremsenden Drehmoments relativ zu $\\vec{L}$ ein und vergleichen Sie sie mit der im Aufgabentext vorausgesetzten Richtung.",
        "answer4": "Es ist eine gleichmäßige Präzession ohne Nutation vorausgesetzt. Überlegen Sie, ob dabei zu irgendeinem Zeitpunkt eine Drehmomentkomponente entlang $\\vec{L}$ vorhanden ist."
    }
};

export const question3: SingleChoiceQuestion = {
    "questionId": "p5-precession-3-drehzahl",
    "question": "Ein schneller Kreisel präzediert näherungsweise gleichmäßig mit waagrechter Achse. Die Winkelgeschwindigkeit $\\omega_R$ des Rades wird verdoppelt; Zusatzmasse $m_z$, Hebelarm $r$ und Trägheitsmoment $I$ bleiben gleich. Wie ändert sich die Präzessionsgeschwindigkeit $\\omega_P$ in dieser Näherung?",
    "options": [
        {
            "value": "answer1",
            "label": "Sie halbiert sich."
        },
        {
            "value": "answer2",
            "label": "Sie verdoppelt sich."
        },
        {
            "value": "answer3",
            "label": "Sie bleibt gleich, weil das Drehmoment $D$ gleich bleibt."
        },
        {
            "value": "answer4",
            "label": "Sie sinkt auf ein Viertel."
        }
    ],
    "correctAnswer": "answer1",
    "containerId": "question3-container",
    "successMessage": "In $\\omega_P=m_zgr/(I\\omega_R)$ verdoppelt sich nur der Nenner. Die Präzessionsgeschwindigkeit $\\omega_P$ halbiert sich.",
    "incorrectMessage": "Setzen Sie die doppelte Winkelgeschwindigkeit $\\omega_R$ in $\\omega_P = m_z g r/(I\\omega_R)$ ein.",
    "answerFeedback": {
        "answer2": "Vergleichen Sie bei unverändertem Drehmoment $D$ die Richtungsänderung eines kleineren und eines größeren Drehimpulses $L$. Prüfen Sie dazu die Position von $\\omega_R$ in der Formel.",
        "answer3": "Das Drehmoment $D$ bleibt gleich. Prüfen Sie aber auch den Drehimpulsbetrag $L=I\\omega_R$, der bei waagrechter Achse in $\\omega_P=D/L$ eingeht.",
        "answer4": "Prüfen Sie, mit welcher Potenz $\\omega_R$ in die Formel eingeht. Setzen Sie $2\\omega_R$ ein, ohne eine zusätzliche Potenz zu ergänzen."
    }
};

export const question4: SingleChoiceQuestion = {
    "questionId": "p5-precession-4-steigung",
    "question": "Für zwei Kreiselräder tragen Sie $\\omega_P$ gegen $1/\\omega_R$ auf. Zusatzmasse $m_z$ und Hebelarm $r$ sind gleich; beide Messreihen liegen im Bereich der schnellen, gleichmäßigen Präzession. Rad A ergibt eine flachere Gerade als Rad B. Was folgt für die Trägheitsmomente um die Radachse?",
    "options": [
        {
            "value": "answer1",
            "label": "Rad A hat das größere Trägheitsmoment $I$."
        },
        {
            "value": "answer2",
            "label": "Rad B hat das größere Trägheitsmoment $I$."
        },
        {
            "value": "answer3",
            "label": "Beide Trägheitsmomente $I$ sind gleich, weil dieselbe Zusatzmasse verwendet wird."
        },
        {
            "value": "answer4",
            "label": "Aus dem Unterschied der Steigungen lässt sich bei gleichen übrigen Größen nichts über die Trägheitsmomente $I$ sagen."
        }
    ],
    "correctAnswer": "answer1",
    "containerId": "question4-container",
    "successMessage": "Bei gleichem $1/\\omega_R$ liegt die flachere Gerade tiefer: Rad A präzediert unter demselben Drehmoment langsamer. In der verwendeten Näherung bedeutet das ein größeres Trägheitsmoment $I$.",
    "incorrectMessage": "Vergleichen Sie die beiden Geraden bei demselben Wert auf der horizontalen Achse.",
    "answerFeedback": {
        "answer2": "Wählen Sie denselben horizontalen Wert für beide Geraden. Welches Rad hat dort die kleinere Präzessionsgeschwindigkeit $\\omega_P$, und wie hängt diese bei sonst gleichen Größen von $I$ ab?",
        "answer3": "Dieselbe Zusatzmasse erzeugt bei gleichem Hebelarm dasselbe Drehmoment. Bestimmt sie aber auch die Masseverteilung der beiden Kreiselräder?",
        "answer4": "Alle anderen Größen sind festgelegt. Prüfen Sie in der Präzessionsformel, welche verbleibende Größe unterschiedliche Steigungen erklären kann."
    }
};

export const question5: MultipleChoiceQuestion = {
    "questionId": "p5-precession-5-abhaengigkeiten",
    "question": "Welche Aussagen gelten in der Näherung der gleichmäßigen Präzession eines schnellen Versuchskreisels? Das Drehmoment stammt vom Zusatzgewicht $m_z$ an der Achse im Abstand $r$; der Neigungswinkel $\\theta$ liegt zwischen 60° und 120°.",
    "options": [
        {
            "value": "answer1",
            "label": "Die Präzessionsgeschwindigkeit $\\omega_P$ hängt nicht vom Neigungswinkel $\\theta$ der Achse ab."
        },
        {
            "value": "answer2",
            "label": "Je schneller das Rad rotiert, desto langsamer präzediert der Kreisel."
        },
        {
            "value": "answer3",
            "label": "Ein größeres Zusatzgewicht lässt den Kreisel schneller präzedieren."
        },
        {
            "value": "answer4",
            "label": "Je stärker die Achse geneigt ist, desto schneller präzediert der Kreisel."
        },
        {
            "value": "answer5",
            "label": "Bei einem ausbalancierten Kreisel ohne Zusatzgewicht bleibt der Drehimpuls $\\vec{L}$ auch ohne äußeres Drehmoment nicht raumfest."
        }
    ],
    "correctAnswers": [
        "answer1",
        "answer2",
        "answer3"
    ],
    "containerId": "question5-container",
    "successMessage": "Mit $D=m_zgr\\sin\\theta$ und $\\omega_P=D/(L\\sin\\theta)$ kürzt sich der Winkel in dieser Näherung heraus. Größeres $\\omega_R$ verlangsamt, größeres $m_z$ beschleunigt die Präzession. Ohne äußeres Drehmoment bleibt $\\vec{L}$ raumfest; eine Nutation kann dennoch bestehen.",
    "incompleteMessage": "Verändern Sie gedanklich jeweils nur eine Größe und beachten Sie die Voraussetzungen der verwendeten Näherung.",
    "incorrectMessage": "Verändern Sie gedanklich jeweils nur eine Größe und beachten Sie die Voraussetzungen der verwendeten Näherung.",
    "answerFeedback": {
        "answer1": {
            "conceptId": "tilt-cancellation",
            "order": 1,
            "message": "Ändert sich die Neigung, verändert sich auch der Hebelarm der Gewichtskraft: $D=m_zgr\\sin\\theta$. Setzen Sie diesen Ausdruck in $\\omega_P=D/(L\\sin\\theta)$ ein.",
            "paragraphId": "parameters"
        },
        "answer4": {
            "conceptId": "tilt-cancellation",
            "order": 1,
            "message": "Ändert sich die Neigung, verändert sich auch der Hebelarm der Gewichtskraft: $D=m_zgr\\sin\\theta$. Setzen Sie diesen Ausdruck in $\\omega_P=D/(L\\sin\\theta)$ ein.",
            "paragraphId": "parameters"
        },
        "answer2": {
            "conceptId": "spin-dependence",
            "order": 2,
            "message": "Vergleichen Sie für dasselbe Rad $L=I\\omega_R$ bei zwei Winkelgeschwindigkeiten. Wo geht dieser Drehimpulsbetrag in die Präzessionsgeschwindigkeit ein?",
            "paragraphId": "parameters"
        },
        "answer3": {
            "conceptId": "mass-dependence",
            "order": 3,
            "message": "Halten Sie $r$, $\\theta$ und die Raddrehung fest. Wie verändert eine größere Zusatzmasse die Gewichtskraft und damit das Drehmoment?",
            "paragraphId": "parameters"
        },
        "answer5": {
            "conceptId": "torque-free",
            "order": 4,
            "message": "Setzen Sie für den ausbalancierten Kreisel ohne Zusatzgewicht $\\vec{D}=0$ in die Bewegungsgleichung ein. Unterscheiden Sie die daraus folgende Bewegung von $\\vec{L}$ von einer möglichen Bewegung der Figurenachse.",
            "paragraphId": "conservation"
        }
    }
};
