// ── Page 1: Das physikalische Pendel ───────────────────────────────────────

export const pendulumText1a = `
    Die erste Messmethode für das Trägheitsmoment des Rades kommt ohne Kreiselbewegung aus.
    Der Kreisel wird festgestellt, sodass sich nur noch das Rad um seine Achse drehen kann.
    Dann wird ein Pendelgewicht der Masse $m_p$ im Abstand $d$ von der Achse in das Rad geschraubt.<br><br>
    Das ausbalancierte Rad allein hat seinen Schwerpunkt auf der Achse und bleibt in jeder Stellung in Ruhe.
    Erst das Pendelgewicht verschiebt den Schwerpunkt nach außen: Rad und Pendelgewicht schwingen nun gemeinsam als
    <a data-glossary="physical-pendulum" class="glossary-link">physikalisches Pendel</a>
    um die Radachse.
`;

export const pendulumText1b = `
    Rad mit eingeschraubtem Pendelgewicht, um den Winkel $\\varphi$ aus der Ruhelage ausgelenkt.
`;

export const pendulumText1c = `
    Bei der Auslenkung $\\varphi$ übt die Gewichtskraft des Pendelgewichts ein rücktreibendes Drehmoment
    $D = -m_p g d \\sin\\varphi$ aus. Das gesamte Trägheitsmoment um die Radachse setzt sich aus dem des Rades ($I$, gesucht)
    und dem des Pendelgewichts ($I_p$) zusammen. Die Bewegungsgleichung lautet damit
    $$(I + I_p)\\,\\ddot{\\varphi} = -m_p g d\\,\\sin\\varphi.$$
    Für kleine Auslenkungen ist $\\sin\\varphi \\approx \\varphi$, und es ergibt sich eine harmonische Schwingung mit der Periodendauer
`;

export const pendulumText1d = `
    $$T = 2\\pi\\sqrt{\\frac{I + I_p}{m_p\\,g\\,d}}$$
`;

export const pendulumText1e = `
    Das Pendelgewicht ist kein Massenpunkt. Sein Trägheitsmoment um die Radachse erhalten Sie mit dem
    <a data-glossary="parallel-axis" class="glossary-link">Steinerschen Satz</a>:
    $$I_p = I_{p,S} + m_p d^2.$$
    Dabei ist $I_{p,S}$ das Trägheitsmoment des Pendelgewichts um eine parallele Achse durch seinen eigenen Schwerpunkt.
`;


// ── Page 2: Messung und Fehlerquellen ──────────────────────────────────────

export const pendulumText2a = `
    Im Versuch messen Sie mit der Stoppuhr die Dauer von 10 Perioden, dreimal hintereinander,
    und das für zwei Positionen des Pendelgewichts, die sich auf dem Rad genau gegenüberliegen.
    Jeder dieser Schritte hat einen Grund:
    <ul>
        <li><strong>10 Perioden auf einmal:</strong> Die Unsicherheit beim Starten und Stoppen der Uhr fällt nur einmal an,
            egal wie viele Perioden Sie messen. Bezogen auf eine einzelne Periode wird sie dadurch zehnmal kleiner.</li>
        <li><strong>Dreimal wiederholen:</strong> Aus den Wiederholungen bilden Sie einen Mittelwert und schätzen ab,
            wie stark die Messwerte streuen.</li>
        <li><strong>Zwei gegenüberliegende Positionen:</strong> Kein Rad ist perfekt ausgewuchtet. Liegt der Schwerpunkt
            des Rades selbst ein wenig neben der Achse (Unwucht), erzeugt auch er ein kleines Drehmoment. In der einen Position
            verstärkt es das Drehmoment des Pendelgewichts, in der gegenüberliegenden schwächt es dieses ab.
            Mittelt man über beide Positionen, hebt sich der Einfluss der Unwucht in erster Näherung heraus.</li>
        <li><strong>Kleine Auslenkung:</strong> Nur dann gilt $\\sin\\varphi \\approx \\varphi$ und damit die Formel für $T$.</li>
    </ul>
`;

export const pendulumText2b = `
    Viele Perioden auf einmal messen verringert den Einfluss der Reaktionszeit. Zwei gegenüberliegende Positionen
    heben eine Unwucht des Rades heraus. Kleine Auslenkungen halten die Näherung $\\sin\\varphi \\approx \\varphi$ gültig.
`;

export const pendulumText2c = `
    Damit kennen Sie neben der Berechnung aus der Geometrie die zweite Methode für das Trägheitsmoment.
    Die dritte Methode nutzt die Kreiselbewegung selbst. Dafür sehen Sie sich im nächsten Abschnitt an,
    was einen Kreisel von einem einfach rotierenden Rad unterscheidet.
`;
