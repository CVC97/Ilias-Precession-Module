import { MultipleChoiceQuestion, SingleChoiceQuestion } from '../../../shared/evaluation/question.types';

export const question1: SingleChoiceQuestion = {
    "questionId": "p7-measurement-1-tr-vorher-nachher",
    "question": "Warum bestimmen Sie die Umlaufdauer $T_R$ unmittelbar vor und nach der Präzessionsmessung, statt nur einmal davor?",
    "options": [
        {
            "value": "answer1",
            "label": "Weil Reibung die Raddrehung während der Messung verlangsamt und die beiden Werte eine näherungsweise Zuordnung von $\\omega_R$ zur Präzessionsmessung ermöglichen."
        },
        {
            "value": "answer2",
            "label": "Um zu prüfen, ob die Lichtschranke zuverlässig funktioniert."
        },
        {
            "value": "answer3",
            "label": "Weil das Zusatzgewicht das Rad während der Präzession beschleunigt."
        },
        {
            "value": "answer4",
            "label": "Um mehr Messwerte für die Statistik zu erhalten."
        }
    ],
    "correctAnswer": "answer1",
    "containerId": "question1-container",
    "successMessage": "Reibung lässt $T_R$ wachsen und $\\omega_R=2\\pi/T_R$ sinken. Die Messungen vor und nach der Präzession erfassen diese Änderung. Bei geringer Änderung liefern die gemittelten Winkelgeschwindigkeiten einen Näherungswert für die Messzeit; das Umrechnen eines gemittelten $T_R$ ist damit nicht exakt identisch.",
    "incorrectMessage": "Überlegen Sie, wie sich die Winkelgeschwindigkeit $\\omega_R$ des Rades während der Präzessionsmessung verändert.",
    "answerFeedback": {
        "answer2": "Eine Prüfung der Lichtschranke erklärt noch nicht die Wahl zweier Zeitpunkte beiderseits der Präzessionsmessung. Welche Eigenschaft der Raddrehung ändert sich währenddessen?",
        "answer3": "Unterscheiden Sie das Drehmoment, das die Achse seitlich bewegt, vom bremsenden Reibungsmoment um die Radachse. Welche Wirkung verändert $T_R$ fortlaufend?",
        "answer4": "Für eine größere Stichprobe könnten Sie unmittelbar nacheinander mehrfach messen. Überlegen Sie, welche zeitliche Veränderung durch die Messpunkte vor und nach der Präzession erfasst wird."
    }
};

export const question2: SingleChoiceQuestion = {
    "questionId": "p7-measurement-2-halbe-umdrehung",
    "question": "Für eine halbe gleichmäßige Präzessionsumdrehung messen Sie $t_{1/2}=12\\,\\mathrm{s}$. Welche Winkelgeschwindigkeit $\\omega_P$ ergibt sich?",
    "options": [
        {
            "value": "answer1",
            "label": "$\\omega_P\\approx0{,}26\\,\\mathrm{rad/s}$"
        },
        {
            "value": "answer2",
            "label": "$\\omega_P\\approx0{,}52\\,\\mathrm{rad/s}$"
        },
        {
            "value": "answer3",
            "label": "$\\omega_P\\approx0{,}042\\,\\mathrm{rad/s}$"
        },
        {
            "value": "answer4",
            "label": "$\\omega_P\\approx0{,}083\\,\\mathrm{rad/s}$"
        }
    ],
    "correctAnswer": "answer1",
    "containerId": "question2-container",
    "successMessage": "Eine volle Umdrehung dauert $T_P=24\\,\\mathrm{s}$. Damit ist $\\omega_P=2\\pi/T_P=\\pi/t_{1/2}\\approx0{,}26\\,\\mathrm{rad/s}$. Die gewöhnliche Frequenz wäre dagegen $f_P=1/T_P\\approx0{,}042\\,\\mathrm{Hz}$.",
    "incorrectMessage": "Bestimmen Sie zuerst die volle Präzessionsdauer $T_P$ und dann $\\omega_P = 2\\pi/T_P$.",
    "answerFeedback": {
        "answer2": "Prüfen Sie, ob Sie die gemessene Zeit für einen Winkel von $\\pi$ oder von $2\\pi$ verwenden. Welche Zeit gehört zu einer vollständigen Umdrehung?",
        "answer3": "Vergleichen Sie die Definitionen von gewöhnlicher Frequenz $f_P=1/T_P$ und Winkelgeschwindigkeit $\\omega_P=2\\pi/T_P$. Welche Größe ist gefragt?",
        "answer4": "Prüfen Sie zwei Schritte getrennt: die Umrechnung einer halben Umdrehung in die volle Periode $T_P$ und anschließend die Umrechnung von $1/T_P$ in $\\omega_P$."
    }
};

export const question3: MultipleChoiceQuestion = {
    "questionId": "p7-measurement-3-sanft-einleiten",
    "question": "Warum führen Sie die Achse des schnell rotierenden Kreisels nach dem Anhängen des Zusatzgewichts vorsichtig seitlich in die Präzessionsbewegung?",
    "options": [
        {
            "value": "answer1",
            "label": "Damit die Achse von Anfang an ungefähr mit der Präzessionsgeschwindigkeit $\\omega_P$ läuft."
        },
        {
            "value": "answer2",
            "label": "Damit die Nutation klein bleibt und sich die Präzessionszeit genauer messen lässt."
        },
        {
            "value": "answer3",
            "label": "Weil der Kreisel ohne Hilfe gar nicht präzedieren würde."
        },
        {
            "value": "answer4",
            "label": "Um dem Rad zusätzlichen Drehimpuls $\\vec{L}$ um seine Figurenachse zu geben."
        }
    ],
    "correctAnswers": [
        "answer1",
        "answer2"
    ],
    "containerId": "question3-container",
    "successMessage": "Beim geführten Start erhält die Achse ungefähr die zugehörige Präzessionsgeschwindigkeit $\\omega_P$. Dadurch wird weniger Nutation angeregt, und die Zeit für den festgelegten Präzessionswinkel lässt sich besser bestimmen. Auch ohne Führung beginnt eine Kreiselbewegung, jedoch mit ausgeprägter Nutation.",
    "incompleteMessage": "Vergleichen Sie die Anfangsbewegung, die anschließende Achsenbahn und deren Bedeutung für die Zeitmessung.",
    "incorrectMessage": "Vergleichen Sie die Anfangsbewegung, die anschließende Achsenbahn und deren Bedeutung für die Zeitmessung.",
    "answerFeedback": {
        "answer1": {
            "conceptId": "starting-motion",
            "order": 1,
            "message": "Vergleichen Sie die seitliche Anfangsgeschwindigkeit der Achse beim Loslassen und beim geführten Start mit der Geschwindigkeit einer gleichmäßigen Präzession.",
            "paragraphId": "start"
        },
        "answer2": {
            "conceptId": "measurement-quality",
            "order": 2,
            "message": "Verfolgen Sie die auf- und abgehende Bewegung in beiden Achsenbahnen. Welche Bahn erlaubt einen gleichmäßigeren Durchgang durch die Anfangs- und Endrichtung der Zeitmessung?",
            "paragraphId": "start"
        },
        "answer3": {
            "conceptId": "unassisted-motion",
            "order": 3,
            "message": "Beobachten Sie nach „Loslassen“ den seitlichen Weg der Achse über mehrere Sekunden. Das Drehmoment des Zusatzgewichts wirkt auch ohne eine führende Hand.",
            "paragraphId": "distinctions"
        },
        "answer4": {
            "conceptId": "spin-and-slew",
            "order": 4,
            "message": "Unterscheiden Sie die schnelle Rotation um die Radachse von der langsamen seitlichen Bewegung der ganzen Achse. Welche dieser Bewegungen führt die Hand aus?",
            "paragraphId": "distinctions"
        }
    }
};

export const question4: MultipleChoiceQuestion = {
    "questionId": "p7-measurement-4-fehlerquellen",
    "question": "Welche Maßnahmen begrenzen im beschriebenen Präzessionsversuch systematische Abweichungen oder Unsicherheiten bei der Bestimmung des Trägheitsmoments $I$?",
    "options": [
        {
            "value": "answer1",
            "label": "Den Kreisel vor dem Anhängen des Zusatzgewichts sorgfältig ausbalancieren."
        },
        {
            "value": "answer2",
            "label": "Den Abstand $r$ der Kerbe vom Unterstützungspunkt genau messen."
        },
        {
            "value": "answer3",
            "label": "Ein möglichst großes Zusatzgewicht bei möglichst kleiner Winkelgeschwindigkeit $\\omega_R$ wählen, damit die Präzession schnell und gut sichtbar ist."
        },
        {
            "value": "answer4",
            "label": "Die Achse exakt waagrecht halten, weil $\\omega_P$ stark vom Neigungswinkel abhängt."
        }
    ],
    "correctAnswers": [
        "answer1",
        "answer2"
    ],
    "containerId": "question4-container",
    "successMessage": "Ausbalancieren begrenzt ein zusätzliches unbekanntes Drehmoment; sorgfältiges Messen von $r$ begrenzt die Unsicherheit dieses Eingangsparameters. Ein langsames Rad mit großer Zusatzmasse kann die Näherung für den schnellen Kreisel verletzen. Der Neigungswinkel kürzt sich nur innerhalb der verwendeten Näherung heraus.",
    "incompleteMessage": "Unterscheiden Sie ein unbekanntes Drehmoment, die Bestimmung der Eingangsgrößen und die Gültigkeit der Modellnäherung.",
    "incorrectMessage": "Unterscheiden Sie ein unbekanntes Drehmoment, die Bestimmung der Eingangsgrößen und die Gültigkeit der Modellnäherung.",
    "answerFeedback": {
        "answer1": {
            "conceptId": "balance",
            "order": 1,
            "message": "Welche Voraussetzung über die Herkunft des Drehmoments macht die Formel $\\omega_P=m_zgr/(I\\omega_R)$? Prüfen Sie, wie eine verbleibende Unwucht diese Voraussetzung verändert.",
            "paragraphId": "measurement"
        },
        "answer2": {
            "conceptId": "lever-arm",
            "order": 2,
            "message": "Stellen Sie die Formel nach $I$ um. Wie geht der gemessene Abstand $r$ ein, und wie wirkt sich eine Abweichung dieses Eingangswerts auf das Ergebnis aus?",
            "paragraphId": "measurement"
        },
        "answer3": {
            "conceptId": "fast-limit",
            "order": 3,
            "message": "Prüfen Sie die Bedingung $\\omega_P\\ll\\omega_R$. Wie verändern eine größere Zusatzmasse und eine kleinere Winkelgeschwindigkeit $\\omega_R$ das Verhältnis der beiden Geschwindigkeiten?",
            "paragraphId": "model"
        },
        "answer4": {
            "conceptId": "tilt",
            "order": 4,
            "message": "Berücksichtigen Sie die Neigung sowohl in $D=m_zgr\\sin\\theta$ als auch in $\\omega_P=D/(L\\sin\\theta)$. Prüfen Sie dann die behauptete starke Winkelabhängigkeit innerhalb dieser Näherung.",
            "paragraphId": "model"
        }
    }
};
