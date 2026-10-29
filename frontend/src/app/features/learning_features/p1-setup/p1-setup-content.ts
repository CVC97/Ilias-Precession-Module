// ── Page 1: Einführung ─────────────────────────────────────────────────────

export const setupText1a = `
    Ein Kreisel ist ein starrer Körper, der sich schnell um eine Achse dreht und dabei in einem festen Punkt gelagert ist.
    In diesem Versuch untersuchen Sie, wie ein solcher Kreisel auf ein äußeres
    <a data-glossary="torque" class="glossary-link">Drehmoment</a>
    reagiert. Dabei bestimmen Sie das
    <a data-glossary="moment-of-inertia" class="glossary-link">Trägheitsmoment</a>
    des Kreiselrades auf mehreren, voneinander unabhängigen Wegen.<br><br>
    Machen Sie sich zunächst mit dem Versuchsaufbau vertraut.
`;

export const setupText1b = `
    Der Versuch „Kreiselpräzession“ mit Zubehör (Bild 4.1 aus dem Versuchsskript).
`;

export const setupText1c = `
    Der eigentliche Kreisel besteht aus dem <strong>Rad</strong> und der <strong>Achse</strong>, auf der sich das Rad dreht.
    Die Achse liegt in einem Punkt auf dem Stativ auf, dem <strong>Unterstützungspunkt</strong>.
    Um diesen Punkt kann sich der ganze Kreisel frei bewegen: seitlich um die senkrechte Richtung herum
    und kippend nach oben oder unten. Auf der dem Rad gegenüberliegenden Seite sitzt das <strong>Ausgleichsgewicht</strong>.<br><br>
    Alle übrigen Teile – Lichtschranke, Stoppuhr, Antriebsschnur, Zusatz- und Pendelgewichte – brauchen Sie,
    um den Kreisel in Bewegung zu setzen, ihn gezielt zu belasten und seine Bewegung zu vermessen.
`;


// ── Page 2: Komponenten ────────────────────────────────────────────────────

export const setupText2a = `
    Jedes Bauteil hat im Versuch eine bestimmte Aufgabe:
    <ul>
        <li><strong>Rad:</strong> der rotierende Körper. Seine schnelle Drehung verleiht dem Kreisel einen großen
            <a data-glossary="angular-momentum" class="glossary-link">Drehimpuls</a>.</li>
        <li><strong>Ausgleichsgewicht:</strong> lässt sich auf der Achse verschieben. Damit wird der Kreisel so ausbalanciert,
            dass er mit waagrechter Achse in Ruhe bleibt.</li>
        <li><strong>Zusatzgewichte</strong> (Masse $m_z$ zwischen 10 und 60&nbsp;g): werden an einer Kerbe der Achse im Abstand $r$
            vom Unterstützungspunkt eingehängt und belasten den Kreisel gezielt auf einer Seite.</li>
        <li><strong>Antriebsschnur:</strong> wird um die Achse des Rades gewickelt und abgezogen. So bringen Sie das Rad auf eine hohe Drehzahl.</li>
        <li><strong>Lichtschranke</strong> mit dem <strong>Streifen</strong> am Rad: Der Streifen unterbricht bei jeder Umdrehung den Lichtstrahl.
            So messen Sie die Umlaufdauer $T_R$ des Rades.</li>
        <li><strong>Stoppuhr:</strong> für die langsamen Bewegungen des Kreisels als Ganzes, die Sie mit dem Auge verfolgen können.</li>
        <li><strong>Pendelgewichte:</strong> werden in das Rad eingeschraubt, wenn der Kreisel festgestellt ist.
            Das Rad schwingt dann als Pendel um seine Achse.</li>
    </ul>
`;

export const setupText2b = `
    Ist der Kreisel ausbalanciert, liegt sein Schwerpunkt genau im Unterstützungspunkt.
    Die Gewichtskraft greift dann im Unterstützungspunkt an und hat keinen Hebelarm:
    Sie übt kein Drehmoment auf den Kreisel aus. Erst ein Zusatzgewicht erzeugt ein Drehmoment, und zwar ein genau bekanntes.
`;


// ── Page 3: Messprogramm ───────────────────────────────────────────────────

export const setupText3a = `
    Im Versuch bestimmen Sie das Trägheitsmoment $I$ des Rades bezüglich seiner Drehachse. Das klingt zunächst nach einer einzigen Zahl.
    Der Reiz des Versuchs liegt darin, dass Sie diese Zahl auf drei voneinander unabhängigen Wegen erhalten und vergleichen:
    <ol>
        <li><strong>Aus der Geometrie:</strong> Sie messen Abmessungen und Masse des Rades und berechnen $I$.</li>
        <li><strong>Aus Pendelschwingungen:</strong> Der Kreisel wird festgestellt, ein Pendelgewicht in das Rad geschraubt.
            Aus der Schwingungsdauer des Pendels folgt $I$.</li>
        <li><strong>Aus der Präzession:</strong> Sie lassen das Rad schnell rotieren, hängen ein Zusatzgewicht an und messen,
            wie sich der Kreisel daraufhin bewegt. Gemessen werden die Umlaufdauer $T_R$ des Rades mit der Lichtschranke
            und die Dauer $T_P$ der Präzessionsbewegung mit der Stoppuhr, für mehrere Zusatzgewichte.</li>
    </ol>
    Zum Schluss untersuchen Sie eine zweite Bewegungsform des Kreisels, die <strong>Nutation</strong>, und messen ihre Periode $T_N$.
`;

export const setupText3b = `
    Aus den gemessenen Zeiten erhalten Sie Winkelgeschwindigkeiten über
    $$\\omega = \\frac{2\\pi}{T},$$
    also zum Beispiel $\\omega_R = 2\\pi/T_R$ für das Rad und $\\omega_P = 2\\pi/T_P$ für die Präzession.
`;

export const setupText3c = `
    Bevor es an die Physik geht, verschaffen Sie sich einen ersten Eindruck davon, wie sich ein Kreisel bewegt.
    Beantworten Sie dazu zuerst die folgende Frage aus Ihrer Erwartung heraus, und probieren Sie es dann in der Simulation aus.
`;

export const setupText3d = `
    <strong>Aufgabe:</strong> Die Simulation zeigt den Versuchskreisel mit schnell rotierendem Rad.
    Hängen Sie mit dem Schalter unter der Simulation das Zusatzgewicht an und beobachten Sie die Achse.
    Verringern Sie dann die Drehzahl schrittweise: Was ändert sich?<br><br>
    Mit gedrückter Maustaste können Sie die Ansicht drehen, mit dem Mausrad zoomen.
`;

export const setupText3e = `
    Warum sich der Kreisel so verhält, erarbeiten Sie in den nächsten Abschnitten.
    Dafür brauchen Sie zuerst die Grundlagen der Rotation: Winkelgeschwindigkeit, Drehimpuls und Drehmoment als Vektoren.
`;
