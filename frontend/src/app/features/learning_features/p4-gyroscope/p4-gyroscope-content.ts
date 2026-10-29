// ── Page 1: Drei Achsen ────────────────────────────────────────────────────

export const gyroText1a = `
    Solange sich das Rad nur um seine eigene Achse dreht, ist alles einfach: $\\vec{\\omega}$ und $\\vec{L}$ liegen auf der Achse des Rades.
    Ein Kreisel kann sich aber gleichzeitig noch anders bewegen – seine Achse selbst kann schwenken.
    Dann muss man drei Achsen unterscheiden:
    <ul>
        <li><strong><a data-glossary="figure-axis" class="glossary-link">Figurenachse</a>:</strong>
            die Symmetrieachse des Rades, also die Achse, auf der es sitzt. Sie ist fest mit dem Kreisel verbunden.</li>
        <li><strong>Drehimpulsachse:</strong> die Richtung von $\\vec{L}$ (im Versuchsskript „Impulsachse“).</li>
        <li><strong><a data-glossary="instantaneous-axis" class="glossary-link">Momentane Drehachse</a>:</strong>
            die Richtung von $\\vec{\\omega}$ in diesem Augenblick (im Versuchsskript „Drehachse“).
            Die Punkte des Kreisels auf dieser Achse sind gerade in Ruhe.</li>
    </ul>
`;

export const gyroText1b = `
    Zerlegung von $\\vec{\\omega}$ und $\\vec{L}$ in Komponenten entlang der Figurenachse (Index 1) und senkrecht dazu (Index 2).
    Hier ist das Trägheitsmoment senkrecht zur Figurenachse größer als um sie – wie beim Versuchskreisel, der um den Unterstützungspunkt schwenkt.
`;

export const gyroText1c = `
    Warum zeigen $\\vec{L}$ und $\\vec{\\omega}$ in unterschiedliche Richtungen?
    Zerlegen Sie $\\vec{\\omega}$ in eine Komponente $\\omega_1$ entlang der Figurenachse und eine Komponente $\\omega_2$ senkrecht dazu.
    Für jede Komponente gilt $L = I\\omega$ – aber mit unterschiedlichen Trägheitsmomenten:
    $$L_1 = I_1\\,\\omega_1, \\qquad L_2 = I_2\\,\\omega_2.$$
    $I_1$ ist das Trägheitsmoment um die Figurenachse, $I_2$ das Trägheitsmoment um eine Achse senkrecht dazu durch den Unterstützungspunkt.
`;

export const gyroText1d = `
    Sind $I_1$ und $I_2$ verschieden, ist $\\vec{L}$ nicht parallel zu $\\vec{\\omega}$.
    Nur wenn sich der Kreisel genau um seine Figurenachse dreht ($\\omega_2 = 0$), fallen alle drei Achsen zusammen.
`;


// ── Page 2: Der schnelle Kreisel ───────────────────────────────────────────

export const gyroText2a = `
    <strong>Aufgabe:</strong> In der Simulation sind $\\vec{L}$, $\\vec{\\omega}$ und die Figurenachse (gestrichelt) eingeblendet.
    Der Kreisel startet mit kleiner Drehzahl, und seine Achse erhält zu Beginn einen seitlichen Stoß.
    Vergleichen Sie die Richtungen von $\\vec{L}$, $\\vec{\\omega}$ und der Figurenachse.
    Erhöhen Sie dann die Drehzahl schrittweise: Was passiert mit den Winkeln zwischen den drei Achsen?
`;

export const gyroText2b = `
    Bei kleiner Drehzahl ist die Drehung um die Figurenachse ($\\omega_1$) nicht viel schneller als das Schwenken der Achse ($\\omega_2$).
    Die drei Achsen weichen dann sichtbar voneinander ab. Je schneller das Rad rotiert, desto mehr überwiegt $L_1 = I_1\\omega_1$,
    und desto enger rücken $\\vec{L}$ und $\\vec{\\omega}$ an die Figurenachse heran.
`;

export const gyroText2c = `
    <strong>Schneller Kreisel:</strong> Ist $I_1\\omega_1 \\gg I_2\\omega_2$, liegt $\\vec{L}$ nahezu auf der Figurenachse, und es gilt
    $$\\vec{L} \\approx I_1\\,\\vec{\\omega}_R,$$
    wobei $\\vec{\\omega}_R$ die Drehung des Rades um seine Achse ist. Diese Näherung verwenden Sie bei der Präzession.
`;


// ── Page 3: Raum- und Körpersystem ─────────────────────────────────────────

export const gyroText3a = `
    Die Gleichung $\\mathrm{d}\\vec{L}/\\mathrm{d}t = \\vec{D}$ gilt in einem ruhenden Bezugssystem, dem <strong>raumfesten System</strong> (Laborsystem).
    Für einen Kreisel ist es oft bequemer, mit dem Körper mitzurotieren: Im <strong>körperfesten System</strong> sind die Trägheitsmomente konstant,
    weil sich die Masseverteilung relativ zu den Achsen nicht ändert.<br><br>
    Beide Beschreibungen hängen über die Eulersche Kreiselgleichung zusammen:
`;

export const gyroText3b = `
    $$\\left(\\frac{\\mathrm{d}\\vec{L}}{\\mathrm{d}t}\\right)_{\\text{Raum}} = \\left(\\frac{\\mathrm{d}\\vec{L}}{\\mathrm{d}t}\\right)_{\\text{Körper}} + \\vec{\\omega}\\times\\vec{L}$$
`;

export const gyroText3c = `
    In Worten: Die Änderung von $\\vec{L}$, die ein ruhender Beobachter sieht, setzt sich zusammen aus der Änderung,
    die ein mitrotierender Beobachter sieht, und einem Anteil $\\vec{\\omega}\\times\\vec{L}$, der allein daher kommt,
    dass sich das Bezugssystem selbst dreht. Derselbe Zusammenhang zwischen ruhendem und rotierendem System führt
    in der Mechanik rotierender Bezugssysteme auf die Corioliskraft.<br><br>
    Für den Versuch ist vor allem eine Folgerung wichtig. Beim ausbalancierten Kreisel wirkt kein Drehmoment, $\\vec{D} = 0$.
    Dann ist $\\vec{L}$ im Raum konstant – auch wenn der Kreisel nicht genau um seine Figurenachse rotiert.
    Im körperfesten System dagegen ändert sich $\\vec{L}$ in diesem Fall ständig: Für den mitrotierenden Beobachter wandert die Drehimpulsachse
    um die Figurenachse herum. Für den ruhenden Beobachter ist es umgekehrt: Die Figurenachse bewegt sich um die feste Drehimpulsachse.
    Diese Bewegung heißt Nutation; Sie lernen sie im Abschnitt „Nutation“ genauer kennen.
`;
