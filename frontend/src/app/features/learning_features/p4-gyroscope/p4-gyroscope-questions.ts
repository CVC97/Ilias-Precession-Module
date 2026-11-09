import { MultipleChoiceQuestion, SingleChoiceQuestion } from '../../../shared/evaluation/question.types';

export const question1: SingleChoiceQuestion = {
    "questionId": "p4-gyroscope-1-l-richtung",
    "question": "Wie in der Abbildung sei das Trägheitsmoment senkrecht zur Figurenachse größer: $I_2=2I_1$. Für die beiden positiven Komponenten gelte $\\omega_1=\\omega_2>0$, sodass $\\vec{\\omega}$ unter 45° zur Figurenachse steht. Wo liegt der Drehimpuls $\\vec{L}$?",
    "options": [
        {
            "value": "answer1",
            "label": "Zwischen $\\vec{\\omega}$ und der Figurenachse, näher an der Figurenachse als $\\vec{\\omega}$."
        },
        {
            "value": "answer2",
            "label": "Genau in Richtung von $\\vec{\\omega}$."
        },
        {
            "value": "answer3",
            "label": "Weiter von der Figurenachse entfernt als $\\vec{\\omega}$."
        },
        {
            "value": "answer4",
            "label": "Senkrecht zu $\\vec{\\omega}$."
        }
    ],
    "correctAnswer": "answer3",
    "containerId": "question1-container",
    "successMessage": "Aus $L_1=I_1\\omega_1$ und $L_2=2I_1\\omega_1$ folgt $L_2/L_1=2$. Der Drehimpuls $\\vec{L}$ steht unter etwa 63° zur Figurenachse und damit weiter von ihr entfernt als $\\vec{\\omega}$ mit 45°.",
    "incorrectMessage": "Berechnen Sie die beiden Komponenten $L_1 = I_1\\omega_1$ und $L_2 = I_2\\omega_2$ und vergleichen Sie ihr Verhältnis mit dem von $\\omega_1$ und $\\omega_2$.",
    "answerFeedback": {
        "answer1": "Berechnen Sie $L_1=I_1\\omega_1$ und $L_2=I_2\\omega_2$. Welche der beiden Komponenten wird hier durch das größere Trägheitsmoment stärker gewichtet?",
        "answer2": "Die Winkelgeschwindigkeitskomponenten sind gleich, die zugehörigen Trägheitsmomente dagegen nicht. Vergleichen Sie das Verhältnis $L_2/L_1$ mit $\\omega_2/\\omega_1$.",
        "answer4": "Beide Komponenten sind positiv. Skizzieren Sie die beiden Vektoren im selben Koordinatensystem und prüfen Sie, ob sie dann einen rechten Winkel einschließen können."
    }
};

export const question2: MultipleChoiceQuestion = {
    "questionId": "p4-gyroscope-2-schneller-kreisel",
    "question": "Ein symmetrischer Kreisel hat $I_1\\ne I_2$ und schwenkt zusätzlich zu seiner schnellen Rotation, also $\\omega_2\\ne0$. Es gilt $I_1\\omega_1\\gg I_2\\omega_2$ und $\\omega_1\\gg\\omega_2>0$. Welche Aussagen treffen zu?",
    "options": [
        {
            "value": "answer1",
            "label": "$\\vec{L}$ liegt nahezu auf der Figurenachse."
        },
        {
            "value": "answer2",
            "label": "Näherungsweise gilt $\\vec{L} \\approx I_1\\,\\vec{\\omega}_R$."
        },
        {
            "value": "answer3",
            "label": "$\\vec{L}$ und $\\vec{\\omega}$ zeigen exakt in dieselbe Richtung."
        },
        {
            "value": "answer4",
            "label": "Figurenachse, Drehimpulsachse und momentane Drehachse fallen exakt zusammen, sobald sich das Rad überhaupt dreht."
        }
    ],
    "correctAnswers": [
        "answer1",
        "answer2"
    ],
    "containerId": "question2-container",
    "successMessage": "Die axiale Komponente dominiert den Drehimpuls $\\vec{L}$, sodass $\\vec{L}\\approx I_1\\vec{\\omega}_R$ gilt. Wegen der verbleibenden Querbewegung und der ungleichen Trägheitsmomente fallen die drei Achsen dennoch nicht exakt zusammen.",
    "incompleteMessage": "Vergleichen Sie die Komponenten und unterscheiden Sie eine Näherung von einer exakten Gleichheit.",
    "incorrectMessage": "Vergleichen Sie die Komponenten und unterscheiden Sie eine Näherung von einer exakten Gleichheit.",
    "answerFeedback": {
        "answer1": {
            "conceptId": "dominant-component",
            "order": 1,
            "message": "Zerlegen Sie $\\vec{L}$ in $L_1=I_1\\omega_1$ und $L_2=I_2\\omega_2$. Welcher Anteil bleibt in führender Näherung übrig, wenn $L_2/L_1$ sehr klein ist?",
            "paragraphId": "reasoning"
        },
        "answer2": {
            "conceptId": "dominant-component",
            "order": 1,
            "message": "Zerlegen Sie $\\vec{L}$ in $L_1=I_1\\omega_1$ und $L_2=I_2\\omega_2$. Welcher Anteil bleibt in führender Näherung übrig, wenn $L_2/L_1$ sehr klein ist?",
            "paragraphId": "reasoning"
        },
        "answer3": {
            "conceptId": "finite-transverse-motion",
            "order": 2,
            "message": "Die Querkomponente ist klein, aber ausdrücklich nicht null. Vergleichen Sie bei $I_1\\ne I_2$ das Komponentenverhältnis von $\\vec{L}$ mit dem von $\\vec{\\omega}$. Reicht eine große Drehzahl für exakte Gleichheit der Richtungen?",
            "paragraphId": "reasoning"
        },
        "answer4": {
            "conceptId": "finite-transverse-motion",
            "order": 2,
            "message": "Die Querkomponente ist klein, aber ausdrücklich nicht null. Vergleichen Sie bei $I_1\\ne I_2$ das Komponentenverhältnis von $\\vec{L}$ mit dem von $\\vec{\\omega}$. Reicht eine große Drehzahl für exakte Gleichheit der Richtungen?",
            "paragraphId": "reasoning"
        }
    }
};

export const question3: SingleChoiceQuestion = {
    "questionId": "p4-gyroscope-3-raumfest",
    "question": "Ein ausbalancierter symmetrischer Kreisel mit ungleichen Trägheitsmomenten wird kurz angestoßen und rotiert anschließend nicht mehr um eine Hauptträgheitsachse. Nach dem Ende des Stoßes sei das gesamte äußere Drehmoment $\\vec{D}=0$. Welche Achse bleibt danach im Laborsystem fest?",
    "options": [
        {
            "value": "answer1",
            "label": "Die Drehimpulsachse."
        },
        {
            "value": "answer2",
            "label": "Die Figurenachse."
        },
        {
            "value": "answer3",
            "label": "Die momentane Drehachse."
        },
        {
            "value": "answer4",
            "label": "Keine der drei Achsen."
        }
    ],
    "correctAnswer": "answer1",
    "containerId": "question3-container",
    "successMessage": "Nach dem Stoß gilt $\\mathrm{d}\\vec{L}/\\mathrm{d}t=0$. Deshalb bleibt die Drehimpulsachse im Laborsystem fest. Die Figurenachse und die momentane Drehachse bewegen sich bei der hier vorausgesetzten freien Kreiselbewegung.",
    "incorrectMessage": "Welche Größe bleibt erhalten, wenn kein Drehmoment $\\vec{D}$ wirkt?",
    "answerFeedback": {
        "answer2": "Die Figurenachse ist körperfest. Der Kreisel rotiert nach dem Stoß aber nicht allein um diese Achse. Prüfen Sie, welche Erhaltungsgröße stattdessen aus $\\vec{D}=0$ folgt.",
        "answer3": "Vergleichen Sie $\\omega_1=L_1/I_1$ und $\\omega_2=L_2/I_2$ im mitbewegten System. Die Erhaltung des raumfesten $\\vec{L}$ bedeutet bei ungleichen Trägheitsmomenten nicht automatisch die Erhaltung von $\\vec{\\omega}$.",
        "answer4": "Betrachten Sie nur die Zeit nach dem Stoß. Welche Vektorgröße hat nach $\\mathrm{d}\\vec{L}/\\mathrm{d}t=0$ eine verschwindende Änderungsrate?"
    }
};
