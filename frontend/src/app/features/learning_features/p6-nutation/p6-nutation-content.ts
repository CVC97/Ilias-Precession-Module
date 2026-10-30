// ── Page 1: Was ist Nutation? ──────────────────────────────────────────────

export const nutationText1a = `
    Im letzten Abschnitt haben Sie gesehen: Ein Drehmoment senkrecht zu $\\vec{L}$ lässt den Kreisel gleichmäßig präzedieren.
    Das ist aber nur der einfachste Fall. Erhält der Kreisel einen Stoß – oder wird er so losgelassen, dass seine Achse nicht von Anfang an
    mit der passenden Geschwindigkeit präzediert –, kommt eine zweite, schnellere Bewegung der Achse hinzu: die
    <a data-glossary="nutation" class="glossary-link">Nutation</a>.<br><br>
    Am klarsten sieht man sie beim kräftefreien Kreisel, also beim ausbalancierten Kreisel ohne Zusatzgewicht.
    Wie im Abschnitt „Der Kreisel“ besprochen, ist $\\vec{L}$ dann im Raum fest. Rotiert der Kreisel nach einem Stoß nicht mehr genau
    um seine Figurenachse, läuft die Figurenachse auf einem Kegelmantel um die feste Drehimpulsachse herum.
`;

export const nutationText1b = `
    <strong>Nutation:</strong> Die Figurenachse läuft auf einem Kegel, dem Nutationskegel, um die Drehimpulsachse.
    Beim kräftefreien Kreisel steht die Drehimpulsachse dabei fest im Raum.
`;

export const nutationText1c = `
    Präzession und Nutation sind also zwei verschiedene Bewegungen: Bei der Präzession dreht sich $\\vec{L}$ selbst, angetrieben von einem Drehmoment.
    Bei der Nutation bleibt $\\vec{L}$ fest (oder präzediert nur langsam), und die Figurenachse bewegt sich um $\\vec{L}$ herum.
    Hängt ein Zusatzgewicht an der Achse, treten beide gleichzeitig auf: Die Figurenachse nutiert um einen Drehimpuls, der selbst präzediert.
`;


// ── Page 2: Die drei Kegel ─────────────────────────────────────────────────

export const nutationText2a = `
    Nicht nur die Figurenachse bewegt sich, auch die momentane Drehachse. Die Bewegung des kräftefreien symmetrischen Kreisels
    beschreibt man deshalb mit drei
    <a data-glossary="cones" class="glossary-link">Kegeln</a>:
    <ul>
        <li><strong>Nutationskegel:</strong> Die Figurenachse läuft um die Drehimpulsachse.</li>
        <li><strong>Rastpolkegel</strong> (raumfest): Die momentane Drehachse läuft um die Drehimpulsachse.
            Dieser Kegel ruht im Raum – daher der Name.</li>
        <li><strong>Gangpolkegel</strong> (körperfest): Vom Kreisel aus gesehen läuft die momentane Drehachse um die Figurenachse.
            Dieser Kegel ist fest mit dem Kreisel verbunden und bewegt sich mit ihm.</li>
    </ul>
    Figurenachse, Drehimpulsachse und momentane Drehachse liegen dabei zu jedem Zeitpunkt in einer Ebene.
`;

export const nutationText2b = `
    Die drei Kegel des kräftefreien Versuchskreisels. Weil sein Trägheitsmoment senkrecht zur Figurenachse größer ist als um sie,
    liegt $\\vec{\\omega}$ zwischen Figurenachse und $\\vec{L}$. Das Versuchsskript (Bild 4.2) zeigt den umgekehrten Fall eines flachen Kreisels.
`;

export const nutationText2c = `
    Anschaulich: Der Gangpolkegel rollt ohne zu gleiten auf dem Rastpolkegel ab – beim Versuchskreisel an dessen Außenseite.
    Die Linie, entlang der sich beide Kegel gerade berühren, ist die momentane Drehachse. Die Punkte auf ihr sind in diesem Augenblick in Ruhe – genau wie der Auflagepunkt eines rollenden Rades.
`;


// ── Page 3: Nutation im Versuch ────────────────────────────────────────────

export const nutationText3a = `
    Im Versuch erzeugen Sie die Nutation gezielt: Sie bringen das Rad auf Drehzahl und geben der Achse des ausbalancierten Kreisels
    einen kräftigen Stoß. Die Figurenachse beginnt, auf ihrem Nutationskegel zu kreisen. Mit der Stoppuhr messen Sie die Nutationsperiode $T_N$,
    mit der Lichtschranke die Umlaufdauer $T_R$ des Rades – für mehrere Drehzahlen.
`;

export const nutationText3b = `
    <strong>Aufgabe:</strong> Der Kreisel in der Simulation ist ausbalanciert und trägt kein Zusatzgewicht – wie im Versuch.
    Geben Sie der Achse mit „Stoß“ einen kräftigen Stoß und beobachten Sie die Figurenachse (gestrichelt) und den Drehimpuls $\\vec{L}$.
    Erhöhen Sie dann die Drehzahl und stoßen Sie erneut an. Wie ändern sich die Frequenz der Nutation und die Weite des Nutationskegels?<br><br>
    Mit dem Schalter „Alle drei Kegel zeigen“ blenden Sie zusätzlich $\\vec{\\omega}$, den Rastpolkegel und den Gangpolkegel ein.
    Vergleichen Sie mit der Abbildung auf der vorigen Seite.
`;

export const nutationText3c = `
    Für die Auswertung tragen Sie die Nutationskreisfrequenz $\\omega_N = 2\\pi/T_N$ gegen $\\omega_R = 2\\pi/T_R$ auf.
    Der Zusammenhang ist linear, und die Steigung der Geraden ist dimensionslos.
    Was diese Steigung physikalisch bedeutet, sollen Sie in der Auswertung selbst herausfinden.
`;
