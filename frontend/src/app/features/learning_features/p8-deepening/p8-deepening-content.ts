// ── Page 1: Freies Experimentieren ─────────────────────────────────────────

export const deepeningText1a = `
    Sie haben sich mit dem Versuchsaufbau, der Physik des Kreisels und der Messstrategie vertraut gemacht.
    Hier können Sie den Versuch noch einmal frei ausprobieren: am Versuchskreisel, ohne eingeblendete Pfeile,
    Kegel und Beschriftungen, so wie Sie ihn im Praktikum sehen werden. Drehzahl, Zusatzgewicht und Neigung
    lassen sich beliebig einstellen. Die Lagerreibung bremst das Rad ab; bei 1&nbsp;× verliert es etwa so schnell an Winkelgeschwindigkeit $\\omega_R$ wie im Versuch.
    „Stoß“ stößt die Achse an, „Zurücksetzen“ startet den Kreisel neu.
`;


// ── Page 2: Kreisel im Kosmos ──────────────────────────────────────────────
// Placeholder until the matching task (images ↔ concepts) is built.

export const deepeningText2a = `
    Präzession, Nutation und die Erhaltung des Drehimpulses $\\vec L$ begegnen Ihnen nicht nur im Praktikum.
    Einige Beispiele aus der Astrophysik und der Raumfahrt:
    <ul>
        <li><strong>Präzession der Erdachse:</strong> Die Erde ist an den Polen abgeplattet und ihre Achse um etwa 23,4° gegen die Senkrechte zur Bahnebene geneigt.
            Sonne und Mond ziehen am Äquatorwulst und üben so ein Drehmoment $\\vec D$ senkrecht zum Drehimpuls $\\vec L$ der Erde aus.
            Die Erdachse beschreibt deshalb einen Präzessionskegel, für einen Umlauf braucht sie etwa 25&nbsp;800 Jahre.
            Der Himmelspol wandert dabei: Heute liegt er nahe am Polarstern, in rund 12&nbsp;000 Jahren nahe an der Wega.</li>
        <li><strong>Warum so langsam?</strong> Nach $\\omega_P = D/(L \\sin\\theta)$ ist die Präzession umso langsamer, je größer der Drehimpuls ist –
            und der Drehimpuls der Erde ist riesig.</li>
        <li><strong>Nutation der Erdachse:</strong> Die Bahnebene des Mondes dreht sich in 18,6 Jahren einmal herum, sodass sich das Drehmoment periodisch ändert.
            Der Präzession der Erdachse ist deshalb ein kleines Nicken überlagert. Anders als die Nutation im Versuch, die nach einem Stoß von selbst auftritt,
            wird diese Nutation von außen erzwungen.</li>
        <li><strong>Pulsare:</strong> Kollabiert der Kern eines massereichen Sterns zu einem Neutronenstern, bleibt sein Drehimpuls $L = I\\omega$ erhalten.
            Das Trägheitsmoment $I$ wird dabei sehr viel kleiner, die Winkelgeschwindigkeit $\\omega$ entsprechend größer: Pulsare drehen sich bis zu mehrere hundert Mal pro Sekunde.</li>
        <li><strong>Drallstabilisierte Raumsonden:</strong> Eine rotierende Sonde behält wegen ihres großen Drehimpulses die Richtung ihrer Achse im Raum.
            Kleine Störmomente lassen die Achse nur langsam präzedieren.</li>
        <li><strong>Präzedierende Jets:</strong> Im Doppelsternsystem SS&nbsp;433 stößt eine Akkretionsscheibe zwei Materiestrahlen aus.
            Die Scheibe präzediert, und mit ihr beschreiben die Jets in etwa 162 Tagen einen Kegel.</li>
        <li><strong>Zur Abgrenzung – die Periheldrehung des Merkur:</strong> Hier dreht sich die Bahnellipse des Planeten, nicht die Achse eines rotierenden Körpers.
            Trotz des ähnlichen Namens ist das keine Kreiselpräzession.</li>
    </ul>
`;
