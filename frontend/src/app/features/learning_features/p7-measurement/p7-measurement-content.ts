// ── Page 1: Reibung und Drehzahl ───────────────────────────────────────────

export const measureText1a = `
    Reibung in den Lagern und der Luftwiderstand bremsen das Rad ständig ab: $\\omega_R$ nimmt während jeder Messung ab.
    Nach $\\omega_P = m_z g r/(I\\omega_R)$ wird die Präzession dabei schneller.
    Für die Auswertung brauchen Sie aber zu jeder Präzessionsmessung den passenden Wert von $\\omega_R$.<br><br>
    Deshalb messen Sie $T_R$ unmittelbar <strong>vor und nach</strong> der Präzessionsmessung und verwenden den Mittelwert.
    Nimmt die Drehzahl während der kurzen Messung ungefähr gleichmäßig ab, entspricht der Mittelwert gerade der Drehzahl
    in der Mitte der Messung.
`;

export const measureText1b = `
    <strong>Halbe Präzessionsumdrehung:</strong> Mit der Stoppuhr messen Sie die Zeit $t_{1/2}$ für eine halbe Präzessionsumdrehung;
    die Präzessionsdauer ist dann $T_P = 2\\,t_{1/2}$. Je kürzer die Messung, desto weniger ändert sich $\\omega_R$ währenddessen,
    und desto besser passt der Mittelwert aus den beiden Messungen von $T_R$.
`;


// ── Page 2: Präzession sauber starten ──────────────────────────────────────

export const measureText2a = `
    Hängen Sie das Zusatzgewicht an und lassen den Kreisel einfach los, präzediert er nicht sofort gleichmäßig.
    Im Moment des Loslassens steht die Achse still – sie hat noch nicht die Geschwindigkeit, mit der sie präzedieren müsste.
    Der Kreisel sackt deshalb zuerst ein Stück ab, gerät in eine kräftige
    <a data-glossary="nutation" class="glossary-link">Nutation</a>
    und nickt während der Präzession deutlich auf und ab. Die Zeit für eine halbe Umdrehung lässt sich dann nur ungenau ablesen.<br><br>
    Das Versuchsskript empfiehlt deshalb, den Kreisel vorsichtig mit der Hand in die Präzessionsbewegung zu führen:
    Sie geben der Achse von Anfang an ungefähr die passende Präzessionsgeschwindigkeit mit. Dann bleibt die Nutation klein,
    und der Kreisel präzediert gleichmäßig.
`;

export const measureText2b = `
    Bahn des Achsenendes, schematisch: oben losgelassen ohne Anfangsbewegung, unten sanft in die Präzession geführt.
`;

export const measureText2c = `
    <strong>Aufgabe:</strong> Starten Sie den Kreisel in der Simulation zweimal mit derselben Drehzahl:
    einmal ohne Anfangsgeschwindigkeit der Achse ($\\dot{\\varphi}_0 = 0$), einmal mit einer Anfangsgeschwindigkeit,
    die ungefähr der Präzessionsgeschwindigkeit entspricht. Vergleichen Sie die Bewegung der Achse.
`;


// ── Page 3: Weitere Fehlerquellen ──────────────────────────────────────────

export const measureText3a = `
    Weitere Punkte, die Sie bei der Durchführung beachten sollten:
    <ul>
        <li><strong>Ausbalancieren:</strong> Bleibt ohne Zusatzgewicht ein Rest-Drehmoment, präzediert der Kreisel schon ohne Belastung,
            und alle gemessenen $\\omega_P$ sind verfälscht. Prüfen Sie, ob der Kreisel ohne Zusatzgewicht mit waagrechter Achse in Ruhe bleibt.</li>
        <li><strong>Abstand $r$:</strong> $I$ ist proportional zu $r$. Messen Sie den Abstand der Kerbe vom Unterstützungspunkt sorgfältig.</li>
        <li><strong>Schneller Kreisel:</strong> Die Formel setzt $\\omega_P \\ll \\omega_R$ voraus. Wählen Sie die Drehzahl nicht zu klein
            und das Zusatzgewicht nicht zu groß.</li>
        <li><strong>Umlaufdauer $T_R$:</strong> Halten Sie den Kreisel für diese Messung so, dass der Streifen am Rad durch die Lichtschranke läuft.</li>
        <li><strong>Stoppuhr:</strong> Mehrere Messungen von $T_P$ verringern den Einfluss Ihrer Reaktionszeit.</li>
    </ul>
    Eine leichte Neigung der Achse ist dagegen unkritisch: Wie Sie im Abschnitt „Präzession“ gesehen haben,
    kürzt sich der Neigungswinkel heraus.
`;

export const measureText3b = `
    Damit sind Sie gut vorbereitet. Auf der nächsten Seite finden Sie die Versuchsanleitung und eine Zusammenfassung Ihres Lernwegs.
`;
