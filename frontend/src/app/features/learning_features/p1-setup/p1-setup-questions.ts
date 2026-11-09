import { SingleChoiceQuestion, MultipleChoiceQuestion } from '../../../shared/evaluation/question.types';

export const question1: MultipleChoiceQuestion = {
    "questionId": "p1-setup-1-kreisel-teile",
    "question": "Der Kreisel schwenkt mit eingehängtem Zusatzgewicht um den Unterstützungspunkt. Welche Teile folgen dieser Bewegung des ganzen Kreisels? Betrachten Sie hier nicht die zusätzliche Drehung des Rades um seine eigene Achse.",
    "options": [
        {
            "value": "answer1",
            "label": "Rad"
        },
        {
            "value": "answer2",
            "label": "Achse"
        },
        {
            "value": "answer3",
            "label": "Ausgleichsgewicht"
        },
        {
            "value": "answer4",
            "label": "eingehängtes Zusatzgewicht"
        },
        {
            "value": "answer5",
            "label": "Lichtschranke"
        },
        {
            "value": "answer6",
            "label": "Stoppuhr"
        },
        {
            "value": "answer7",
            "label": "Pendelgewichte (nicht eingeschraubt)"
        }
    ],
    "correctAnswers": [
        "answer1",
        "answer2",
        "answer3",
        "answer4"
    ],
    "containerId": "question1-container",
    "successMessage": "Das Rad folgt mit seiner Lagerung der schwenkenden Achse; Ausgleichsgewicht und Zusatzgewicht bewegen sich ebenfalls mit. Die getrennt aufgestellten Messgeräte und die nicht eingeschraubten Pendelgewichte gehören nicht zu diesem bewegten System.",
    "incompleteMessage": "Verfolgen Sie in der Aufbauzeichnung, welche Teile von der schwenkenden Achse getragen werden.",
    "incorrectMessage": "Verfolgen Sie in der Aufbauzeichnung, welche Teile von der schwenkenden Achse getragen werden.",
    "answerFeedback": {
        "answer1": {
            "conceptId": "carried-by-axle",
            "order": 1,
            "message": "Betrachten Sie die Lagerung des Rades und die Befestigung der Gewichte. Welche Teile werden von der Achse getragen, auch wenn sich das Rad zusätzlich in seiner Lagerung dreht?",
            "paragraphId": "reasoning"
        },
        "answer2": {
            "conceptId": "carried-by-axle",
            "order": 1,
            "message": "Betrachten Sie die Lagerung des Rades und die Befestigung der Gewichte. Welche Teile werden von der Achse getragen, auch wenn sich das Rad zusätzlich in seiner Lagerung dreht?",
            "paragraphId": "reasoning"
        },
        "answer3": {
            "conceptId": "carried-by-axle",
            "order": 1,
            "message": "Betrachten Sie die Lagerung des Rades und die Befestigung der Gewichte. Welche Teile werden von der Achse getragen, auch wenn sich das Rad zusätzlich in seiner Lagerung dreht?",
            "paragraphId": "reasoning"
        },
        "answer4": {
            "conceptId": "carried-by-axle",
            "order": 1,
            "message": "Betrachten Sie die Lagerung des Rades und die Befestigung der Gewichte. Welche Teile werden von der Achse getragen, auch wenn sich das Rad zusätzlich in seiner Lagerung dreht?",
            "paragraphId": "reasoning"
        },
        "answer5": {
            "conceptId": "separate-instruments",
            "order": 2,
            "message": "Prüfen Sie, ob das jeweilige Messgerät an der schwenkenden Achse befestigt ist oder unabhängig von ihr aufgestellt wird.",
            "paragraphId": "equipment"
        },
        "answer6": {
            "conceptId": "separate-instruments",
            "order": 2,
            "message": "Prüfen Sie, ob das jeweilige Messgerät an der schwenkenden Achse befestigt ist oder unabhängig von ihr aufgestellt wird.",
            "paragraphId": "equipment"
        },
        "answer7": {
            "conceptId": "unused-weights",
            "order": 3,
            "message": "Beachten Sie den angegebenen Zustand der Pendelgewichte: Sind sie in diesem Versuchsteil überhaupt am Kreisel befestigt?",
            "paragraphId": "equipment"
        }
    }
};

export const question2: SingleChoiceQuestion = {
    "questionId": "p1-setup-2-ausgleichsgewicht",
    "question": "Der Kreisel trägt noch kein Zusatzgewicht. Wozu verschieben Sie das Ausgleichsgewicht auf der Achse? Vernachlässigen Sie die Reibung.",
    "options": [
        {
            "value": "answer1",
            "label": "Es bremst das Rad, damit es nicht zu schnell rotiert."
        },
        {
            "value": "answer2",
            "label": "Es verschiebt den Schwerpunkt des Kreisels in den Unterstützungspunkt, sodass die Gewichtskraft kein Drehmoment $\\vec{D}$ auf den Kreisel ausübt."
        },
        {
            "value": "answer3",
            "label": "Es erzeugt das Drehmoment $\\vec{D}$, das den Kreisel im Versuch in Bewegung setzt."
        },
        {
            "value": "answer4",
            "label": "Es vergrößert das Trägheitsmoment $I$ des Rades, damit der Kreisel stabiler läuft."
        }
    ],
    "correctAnswer": "answer2",
    "containerId": "question2-container",
    "successMessage": "Beim ausbalancierten Kreisel verläuft die Wirkungslinie der gesamten Gewichtskraft durch den Unterstützungspunkt. Ihr Drehmoment $\\vec{D}$ um diesen Punkt verschwindet. Ein später angehängtes Zusatzgewicht erzeugt dann das beabsichtigte zusätzliche Drehmoment.",
    "incorrectMessage": "Lesen Sie noch einmal nach, was „ausbalanciert“ für den Schwerpunkt des Kreisels bedeutet.",
    "answerFeedback": {
        "answer1": "Überlegen Sie, ob das Verschieben des Gewichts die Drehung des Rades abbremst oder die Lage des Schwerpunkts verändert.",
        "answer3": "Zeichnen Sie die Gewichtskraft des gesamten Kreisels und den Unterstützungspunkt ein. Welchen Hebelarm soll diese Kraft nach dem Ausbalancieren haben?",
        "answer4": "Unterscheiden Sie die Drehung des Rades um seine eigene Achse vom Schwenken des ganzen Kreisels. Wird beim Verschieben des Ausgleichsgewichts Masse innerhalb des Rades umverteilt?"
    }
};

export const question3: MultipleChoiceQuestion = {
    "questionId": "p1-setup-3-messgeraete",
    "question": "Welche Aussagen ordnen den Messgeräten ihre Messaufgabe und den Gewichten ihre Funktion im Versuch zu?",
    "options": [
        {
            "value": "answer1",
            "label": "Mit der Lichtschranke wird die Umlaufdauer $T_R$ des Rades gemessen."
        },
        {
            "value": "answer2",
            "label": "Mit der Stoppuhr wird die Dauer der langsamen Bewegung des ganzen Kreisels gemessen."
        },
        {
            "value": "answer3",
            "label": "Mit der Lichtschranke wird die Dauer der langsamen Bewegung des ganzen Kreisels gemessen."
        },
        {
            "value": "answer4",
            "label": "Die Pendelgewichte werden beim Präzessionsversuch an die Achse gehängt und erzeugen das Drehmoment $\\vec{D}$."
        },
        {
            "value": "answer5",
            "label": "Das Zusatzgewicht hängt im Abstand $r$ vom Unterstützungspunkt und erzeugt ein bekanntes Drehmoment $\\vec{D}$."
        }
    ],
    "correctAnswers": [
        "answer1",
        "answer2",
        "answer5"
    ],
    "containerId": "question3-container",
    "successMessage": "Die Lichtschranke erfasst die Umlaufdauer $T_R$ der schnellen Raddrehung. Mit der Stoppuhr werden die langsameren Bewegungen vermessen. Das eingehängte Zusatzgewicht erzeugt das Drehmoment $\\vec{D}$; die eingeschraubten Pendelgewichte werden im Pendelversuch verwendet.",
    "incompleteMessage": "Verfolgen Sie, welches Bauteil das Messsignal auslöst und wo die jeweiligen Gewichte befestigt werden.",
    "incorrectMessage": "Verfolgen Sie, welches Bauteil das Messsignal auslöst und wo die jeweiligen Gewichte befestigt werden.",
    "answerFeedback": {
        "answer1": {
            "conceptId": "light-barrier",
            "order": 1,
            "message": "Der Papierstreifen am Rad unterbricht den Lichtstrahl. Welcher wiederkehrenden Bewegung entspricht der Abstand zwischen zwei solchen Signalen?",
            "paragraphId": "reasoning"
        },
        "answer3": {
            "conceptId": "light-barrier",
            "order": 1,
            "message": "Der Papierstreifen am Rad unterbricht den Lichtstrahl. Welcher wiederkehrenden Bewegung entspricht der Abstand zwischen zwei solchen Signalen?",
            "paragraphId": "reasoning"
        },
        "answer2": {
            "conceptId": "stopwatch",
            "order": 2,
            "message": "Vergleichen Sie, welche Bewegung Sie mit dem Auge über einen festgelegten Winkel verfolgen und von Hand zeitlich erfassen können.",
            "paragraphId": "reasoning"
        },
        "answer4": {
            "conceptId": "weight-functions",
            "order": 3,
            "message": "Ordnen Sie die Befestigung der Gewichte zu: Gewindeloch im Rad oder Kerbe an der Achse. Welche Bewegung wird jeweils untersucht?",
            "paragraphId": "weights"
        },
        "answer5": {
            "conceptId": "weight-functions",
            "order": 3,
            "message": "Ordnen Sie die Befestigung der Gewichte zu: Gewindeloch im Rad oder Kerbe an der Achse. Welche Bewegung wird jeweils untersucht?",
            "paragraphId": "weights"
        }
    }
};

export const question4: SingleChoiceQuestion = {
    "questionId": "p1-setup-4-erwartung",
    "question": "Beobachten Sie in der Simulation den schnell rotierenden, zunächst ausbalancierten Kreisel. Hängen Sie mit dem Regler ein Zusatzgewicht an. Welche Beschreibung trifft auf die Bewegung der Achse bei hoher Winkelgeschwindigkeit $\\omega_R$ am besten zu?",
    "options": [
        {
            "value": "answer1",
            "label": "Die Achse kippt auf der Seite des Zusatzgewichts nach unten, wie bei einer Balkenwaage."
        },
        {
            "value": "answer2",
            "label": "Die Achse bleibt nahezu waagrecht und dreht sich langsam seitlich um die senkrechte Richtung."
        },
        {
            "value": "answer3",
            "label": "Es passiert nichts: Die Achse bleibt in Ruhe, weil das Rad sie stabilisiert."
        },
        {
            "value": "answer4",
            "label": "Das Rad rotiert schneller, die Achse bleibt in Ruhe."
        }
    ],
    "correctAnswer": "answer2",
    "containerId": "question4-container",
    "successMessage": "Die Achse schwenkt seitlich um die Senkrechte und bleibt dabei näherungsweise waagrecht. Diese Bewegung heißt Präzession. Im weiteren Lernweg erklären Sie sie mithilfe des Drehimpulses und des Drehmoments.",
    "incorrectMessage": "Beobachten Sie bei hoher Drehzahl einige Sekunden lang das Achsenende und vergleichen Sie seine Bahn mit den Beschreibungen.",
    "answerFeedback": {
        "answer1": "Beobachten Sie die Bewegung über mehrere Sekunden: Sinkt die belastete Seite nur nach unten, oder wandert das Achsenende auch seitlich um das Stativ?",
        "answer3": "Nutzen Sie einen festen Punkt am Stativ als Bezug. Bleibt das Achsenende relativ zu diesem Punkt tatsächlich am selben Ort?",
        "answer4": "Unterscheiden Sie die schnelle Raddrehung von der langsameren Bewegung der ganzen Achse. Welche dieser Bewegungen verändert sich beim Anhängen?"
    }
};
