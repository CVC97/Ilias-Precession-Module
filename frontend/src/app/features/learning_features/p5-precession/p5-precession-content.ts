// ── Page 1: Drehmoment senkrecht zum Drehimpuls ────────────────────────────

export const precessionText1a = `
    Jetzt haben Sie alle Bausteine, um das Verhalten aus dem ersten Abschnitt zu erklären.
    Das Rad rotiert schnell, die Achse liegt waagrecht. Beim schnellen Kreisel liegt $\\vec{L}$ nahezu auf der Figurenachse,
    zeigt also ebenfalls waagrecht.<br><br>
    Nun hängen Sie im Abstand $r$ vom Unterstützungspunkt ein Zusatzgewicht der Masse $m_z$ an die Achse.
    Seine Gewichtskraft $\\vec{F} = m_z\\vec{g}$ zeigt senkrecht nach unten und erzeugt das
    <a data-glossary="torque" class="glossary-link">Drehmoment</a>
    $$\\vec{D} = \\vec{r}\\times\\vec{F}.$$
`;

export const precessionText1b = `
    Links: Bei der Neigung $\\theta$ ändert sich $\\vec{L}$ im Zeitabschnitt $\\mathrm{d}t$ um $\\mathrm{d}\\vec{L} = \\vec{D}\\,\\mathrm{d}t$,
    die Spitze von $\\vec{L}$ dreht sich um $\\mathrm{d}\\phi$. Rechts: der Versuchskreisel mit Zusatzgewicht,
    Drehimpuls $\\vec{L}$, Drehmoment $\\vec{D}$ und Präzessionsgeschwindigkeit $\\vec{\\omega}_P$.
    (Im Versuchsskript, Bild 4.3, heißt das Drehmoment $\\vec{T}$.)
`;

export const precessionText1c = `
    Nach $\\mathrm{d}\\vec{L} = \\vec{D}\\,\\mathrm{d}t$ ändert sich $\\vec{L}$ in Richtung von $\\vec{D}$, also senkrecht zu $\\vec{L}$ selbst.
    Wie im Abschnitt „Grundlagen der Rotation“ besprochen, ändert sich dadurch nicht der Betrag von $\\vec{L}$, sondern nur seine Richtung:
    $\\vec{L}$ – und mit ihm die Achse des Kreisels – dreht sich seitlich weg, statt nach unten zu kippen.
    Weil $\\vec{D}$ immer quer zur Achse steht, dreht es sich mit, und die Bewegung hält an.
    Diese Bewegung heißt <a data-glossary="precession" class="glossary-link">Präzession</a>.<br><br>
    Wie schnell präzediert der Kreisel? Steht die Achse unter dem Winkel $\\theta$ zur Senkrechten, läuft die Spitze von $\\vec{L}$
    auf einem Kreis mit dem Radius $L\\sin\\theta$ (Abbildung oben, links). Im Zeitabschnitt $\\mathrm{d}t$ dreht sie sich um den Winkel
    $\\mathrm{d}\\phi = \\mathrm{d}L/(L\\sin\\theta) = D\\,\\mathrm{d}t/(L\\sin\\theta)$. Für die Präzessionsgeschwindigkeit $\\omega_P = \\mathrm{d}\\phi/\\mathrm{d}t$ folgt:
`;

export const precessionText1d = `
    $$\\vec{D} = \\vec{\\omega}_P\\times\\vec{L}, \\qquad \\omega_P = \\frac{D}{L\\sin\\theta}$$
    Ein Drehmoment senkrecht zum Drehimpuls lässt den Kreisel präzedieren. Je größer der Drehimpuls, desto langsamer die Präzession.
`;


// ── Page 2: Präzession im Versuch ──────────────────────────────────────────

export const precessionText2a = `
    Im Versuch liegt die Achse waagrecht: $\\theta = 90°$, $\\sin\\theta = 1$. Das Drehmoment des Zusatzgewichts ist $D = m_z g r$,
    der Drehimpuls des schnellen Kreisels $L = I\\omega_R$ mit dem Trägheitsmoment $I$ des Rades um seine Achse.
    Eingesetzt ergibt sich:
`;

export const precessionText2b = `
    $$\\omega_P = \\frac{m_z\\,g\\,r}{I\\,\\omega_R}$$
`;

export const precessionText2c = `
    Die Präzession ist also umso langsamer, je schneller das Rad rotiert: $\\omega_P \\propto 1/\\omega_R$.
    Trägt man für ein festes Zusatzgewicht die gemessenen Werte von $\\omega_P$ gegen $1/\\omega_R$ auf, erwartet man eine Gerade
    durch den Ursprung. Aus ihrer Steigung erhalten Sie das Trägheitsmoment $I$ – das ist die dritte Methode aus dem Messprogramm.
    Weil Sie die Messung für mehrere Zusatzgewichte durchführen, erhalten Sie mehrere unabhängige Werte für $I$.
`;

export const precessionText2d = `
    <strong>Gültigkeit:</strong> Die Formel setzt einen schnellen Kreisel voraus, also $\\omega_P \\ll \\omega_R$.
    Präzediert der Kreisel zu schnell – bei kleiner Drehzahl oder großem Zusatzgewicht –, trägt die Präzessionsbewegung selbst merklich
    zum Drehimpuls bei, und die Näherung $L = I\\omega_R$ wird ungenau.
`;


// ── Page 3: Präzession in der Simulation ───────────────────────────────────

export const precessionText3a = `
    <strong>Aufgaben:</strong> In der Simulation sehen Sie den Versuchskreisel mit Zusatzgewicht. Eingeblendet sind $\\vec{L}$,
    das Drehmoment $\\vec{D}$, die senkrechte Drehachse der Präzession und der Kegel, den die Achse dabei überstreicht.
    Unter der Simulation werden $\\omega_R$ und $\\omega_P$ angezeigt.
    <ol>
        <li>Verändern Sie die Drehzahl und beobachten Sie, wie schnell der Kreisel präzediert. Bestätigt sich $\\omega_P \\propto 1/\\omega_R$?</li>
        <li>Verändern Sie bei gleicher Drehzahl den Neigungswinkel $\\theta_0$ der Achse. Hängt die Präzessionsgeschwindigkeit vom Winkel ab?</li>
        <li>Achten Sie auf die Pfeile: In welche Richtung zeigt $\\vec{D}$ relativ zu $\\vec{L}$, und in welche Richtung präzediert der Kreisel?</li>
    </ol>
`;

export const precessionText3b = `
    Zur zweiten Aufgabe: Das Zusatzgewicht hängt im Abstand $r$ vom Unterstützungspunkt an der Achse.
    Seine Gewichtskraft zeigt immer senkrecht nach unten, ihr Hebelarm ist der waagrechte Abstand $r\\sin\\theta$.
    Das Drehmoment hängt also selbst vom Neigungswinkel ab: $D = m_z g r\\sin\\theta$. Eingesetzt in
    $\\omega_P = D/(L\\sin\\theta)$ kürzt sich der Winkel heraus:
    $$\\omega_P = \\frac{m_z g r}{L}.$$
    Dasselbe gilt für jeden Kreisel, dessen Drehmoment von einer Gewichtskraft an seiner Achse stammt.
    Die Präzessionsgeschwindigkeit eines schnellen Kreisels hängt also nicht davon ab, wie stark seine Achse geneigt ist.
`;

export const precessionText3c = `
    Die Simulation startet den Kreisel jedes Mal genau mit der passenden Präzessionsgeschwindigkeit.
    Lässt man ihn dagegen einfach los, nickt die Achse zusätzlich auf und ab.
    Diese Bewegung ist die Nutation – Thema des nächsten Abschnitts.
`;
