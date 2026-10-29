// ── Page 1: Winkelgeschwindigkeit ──────────────────────────────────────────

export const rotationText1a = `
    Bei einer geradlinigen Bewegung genügt eine Richtung im Raum, um die Bewegung zu beschreiben.
    Bei einer Drehung ist das anders: Jeder Punkt des Rades bewegt sich in eine andere Richtung.
    Gemeinsam ist allen Punkten nur die <strong>Drehachse</strong> und wie schnell sich der Körper um sie dreht.<br><br>
    Genau das fasst die
    <a data-glossary="angular-velocity" class="glossary-link">Winkelgeschwindigkeit</a>
    $\\vec{\\omega}$ zusammen:
    <ul>
        <li>Ihr <strong>Betrag</strong> gibt an, welchen Winkel der Körper pro Zeit überstreicht:
            $\\omega = \\mathrm{d}\\varphi/\\mathrm{d}t = \\dot{\\varphi}$ (zur Punkt-Schreibweise siehe
            <a data-glossary="newton-notation" class="glossary-link">Newtonsche Notation</a>).
            Für eine gleichmäßige Drehung mit der Umlaufdauer $T$ ist $\\omega = 2\\pi/T$.</li>
        <li>Ihre <strong>Richtung</strong> liegt auf der Drehachse. Welche der beiden Richtungen entlang der Achse gemeint ist,
            legt die <a data-glossary="cross-product" class="glossary-link">Rechte-Hand-Regel</a> fest:
            Krümmen Sie die Finger der rechten Hand in Drehrichtung, dann zeigt der Daumen in Richtung von $\\vec{\\omega}$.</li>
    </ul>
`;

export const rotationText1b = `
    Das Rad dreht sich – von oben gesehen – gegen den Uhrzeigersinn. Nach der Rechte-Hand-Regel zeigt $\\vec{\\omega}$ nach oben.
`;

export const rotationText1c = `
    Die Winkelgeschwindigkeit ist ein Vektor entlang der Drehachse. Ihr Betrag ist die Drehgeschwindigkeit,
    ihre Richtung folgt aus der Rechte-Hand-Regel.
`;


// ── Page 2: Drehimpuls ─────────────────────────────────────────────────────

export const rotationText2a = `
    Ein rotierender Körper hat einen
    <a data-glossary="angular-momentum" class="glossary-link">Drehimpuls</a>
    $\\vec{L}$. Er spielt für Drehungen die Rolle, die der Impuls $\\vec{p} = m\\vec{v}$ für geradlinige Bewegungen spielt.
    Für einen starren Körper, der sich um eine seiner Symmetrieachsen dreht – wie das Rad im Versuch um seine Achse –, gilt:
`;

export const rotationText2b = `
    $$\\vec{L} = I\\,\\vec{\\omega}$$
    Der Drehimpuls zeigt in dieselbe Richtung wie die Winkelgeschwindigkeit.
    Sein Betrag wächst mit dem Trägheitsmoment $I$ und mit der Drehgeschwindigkeit.
`;

export const rotationText2c = `
    Das <a data-glossary="moment-of-inertia" class="glossary-link">Trägheitsmoment</a>
    beschreibt, wie die Masse um die Drehachse verteilt ist:
    $$I = \\int r_\\perp^2\\,\\mathrm{d}m,$$
    mit dem Abstand $r_\\perp$ jedes Massenelements $\\mathrm{d}m$ von der Achse. Masse weit außen zählt quadratisch stärker.
    Für eine homogene Scheibe der Masse $m$ und des Radius $R$ ist $I = \\tfrac{1}{2} m R^2$,
    für einen dünnen Ring derselben Masse $I = m R^2$.<br><br>
    Trägheitsmomente sind auch Thema von Versuch 2 (Trägheitsmomente). Neu ist hier vor allem der Vektorcharakter:
    Der Drehimpuls hat eine Richtung, und diese Richtung spielt im Folgenden die Hauptrolle.
`;

export const rotationText2d = `
    <strong>Aufgabe:</strong> In der Simulation sind $\\vec{L}$ und $\\vec{\\omega}$ als Pfeile eingeblendet.
    Verändern Sie die Drehzahl. Wie ändern sich die Längen der beiden Pfeile, und in welche Richtung zeigen sie?<br><br>
    Dass sich die Achse dabei langsam um die Senkrechte dreht, ist die Präzession. Sie ist Thema des Abschnitts „Präzession“;
    achten Sie hier nur auf die beiden Pfeile.
`;


// ── Page 3: Drehmoment ─────────────────────────────────────────────────────

export const rotationText3a = `
    Was ändert den Drehimpuls? Für geradlinige Bewegungen gilt das zweite Newtonsche Gesetz
    $\\mathrm{d}\\vec{p}/\\mathrm{d}t = \\vec{F}$. Das Gegenstück für Drehungen lautet:
`;

export const rotationText3b = `
    $$\\frac{\\mathrm{d}\\vec{L}}{\\mathrm{d}t} = \\vec{D}, \\qquad \\vec{D} = \\vec{r} \\times \\vec{F}$$
    Ein Drehmoment $\\vec{D}$ ändert den Drehimpuls – und zwar in Richtung des Drehmoments.
`;

export const rotationText3c = `
    Das <a data-glossary="torque" class="glossary-link">Drehmoment</a>
    entsteht, wenn eine Kraft $\\vec{F}$ am Ort $\\vec{r}$ (gemessen vom Drehpunkt) angreift.
    Als <a data-glossary="cross-product" class="glossary-link">Kreuzprodukt</a>
    steht es senkrecht auf $\\vec{r}$ und $\\vec{F}$; sein Betrag ist $D = rF\\sin\\alpha$.<br><br>
    In einem kurzen Zeitabschnitt $\\Delta t$ ändert sich der Drehimpuls um $\\Delta\\vec{L} = \\vec{D}\\,\\Delta t$.
    Der neue Drehimpuls ist die Vektorsumme $\\vec{L} + \\Delta\\vec{L}$. Daraus folgen zwei Grenzfälle:
    <ul>
        <li><strong>$\\vec{D}$ parallel zu $\\vec{L}$:</strong> $\\Delta\\vec{L}$ verlängert oder verkürzt $\\vec{L}$.
            Der Körper dreht sich schneller oder langsamer, die Achse bleibt, wo sie ist.
            So bringen Sie mit der Antriebsschnur das Rad auf Drehzahl, und so bremst die Reibung es wieder ab.</li>
        <li><strong>$\\vec{D}$ senkrecht zu $\\vec{L}$:</strong> $\\Delta\\vec{L}$ steht senkrecht auf $\\vec{L}$.
            Der Betrag von $\\vec{L}$ bleibt dabei (in erster Ordnung in $\\Delta t$) gleich, nur seine Richtung dreht sich ein wenig.
            Bleibt das Drehmoment immer senkrecht zu $\\vec{L}$, dreht sich $\\vec{L}$ immer weiter.</li>
    </ul>
`;

export const rotationText3d = `
    <strong>Vergleich mit der Kreisbewegung:</strong> Bei einer gleichförmigen Kreisbewegung steht die Zentripetalkraft
    immer senkrecht auf der Geschwindigkeit. Sie ändert nicht den Betrag der Geschwindigkeit, sondern nur ihre Richtung.
    Ein Drehmoment, das immer senkrecht auf $\\vec{L}$ steht, wirkt auf den Drehimpuls genauso.
`;

export const rotationText3e = `
    Im Versuch liefert das Zusatzgewicht genau so ein Drehmoment senkrecht zum Drehimpuls.
    Was daraus folgt, sehen Sie im Abschnitt „Präzession“. Zuvor lernen Sie im nächsten Abschnitt,
    wie man das Trägheitsmoment des Rades mit einem Pendel misst.
`;
