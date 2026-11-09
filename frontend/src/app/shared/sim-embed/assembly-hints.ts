import { SimAssemblyMessage } from './sim-presets';

// The hint under the assembly game (p1-assembly), written by the page from the sim's event, part and marker, so the
// texts stay page text (editable without a sim release). Adapted from the sim's own panel texts (AssemblyMode.Texts,
// Melissa Atik), which only the standalone build shows. The hints guide, they never name the answer.

// marker of each part (0: fits nowhere)
const SLOT: Record<string, number> = { pivot: 1, axle: 2, wheel: 3, counterweight: 4, lightgate: 5, weight: 6, pendulum: 0 };

export const ASSEMBLY_HINTS = {
    start: 'Bauen Sie den Kreisel auf: Ziehen Sie ein Teil vom Tisch auf eine leuchtende Markierung, '
        + 'oder klicken Sie erst das Teil und dann die Markierung.',
    back: 'Das Teil liegt wieder auf dem Tisch. Legen Sie es auf eine leuchtende Markierung.',
    chooseFirst: 'Wählen Sie zuerst ein Teil aus.',
    unavailable: 'Diese Markierung ist gerade nicht frei.',
    pendulum: 'Das Pendelgewicht gehört zum Pendelversuch, nicht hierher.',
    balance: 'Alle Teile sitzen. Die Achse kippt aber zur Seite des Rades. '
        + 'Verschieben Sie das Ausgleichsgewicht mit dem Regler, bis die Achse in jeder Lage stehen bleibt.',
    balanced: 'Ausbalanciert: Die Achse bleibt in jeder Lage stehen. Jetzt fehlt noch das Zusatzgewicht.',
    notReadyToSpin: 'Zuerst muss der Kreisel fertig sein: ausbalanciert und mit Zusatzgewicht.',
    spinning: 'Sie halten die Achse waagrecht und drehen das Rad an. Die Lichtschranke leuchtet bei jeder Umdrehung kurz auf.',
    ready: 'Das Rad dreht sich schnell. Lassen Sie los, wenn Sie bereit sind.',
    released: 'Beobachten Sie die Achse. Mit „Zurücksetzen“ bauen Sie den Kreisel noch einmal auf.',
};

const PLACED: Record<string, string> = {
    pivot: 'Richtig. Im Lagerbock kann die Achse kippen und sich drehen.',
    axle: 'Richtig. Die Achse liegt im Lager.',
    wheel: 'Richtig. Das Rad sitzt auf der Achse.',
    counterweight: 'Richtig. Das Ausgleichsgewicht sitzt auf der Achse.',
    lightgate: 'Richtig. Der Streifen am Radrand läuft durch die Gabel der Lichtschranke.',
    weight: 'Richtig. Das Zusatzgewicht hängt in der Kerbe. Ohne Drehung kippt die Achse damit einfach nach unten. '
        + 'Was passiert wohl, wenn sich das Rad schnell dreht? Drehen Sie es an.',
};

// the part's own marker is shown, but it went onto another one
function wrong(part: string, slot: number): string {
    switch (part) {
        case 'pivot': return 'Der Lagerbock ist das Lager der Achse. Er braucht selbst einen festen Halt.';
        case 'axle': return 'Die Achse muss in einem Lager liegen, in dem sie kippen und sich drehen kann.';
        case 'wheel': return slot === 4
            ? 'Auf dieser Seite hat die Achse eine Kerbe. Was muss dort später noch Platz haben?'
            : 'Das Rad dreht sich um die Achse. Wo kann es auf der Achse sitzen?';
        case 'counterweight': return slot === 3
            ? 'Das Ausgleichsgewicht soll sich entlang der Achse verschieben lassen. Ist auf dieser Seite genug Platz dafür?'
            : 'Das Ausgleichsgewicht gleicht das Rad aus. Wo muss es dafür sitzen?';
        case 'lightgate': return 'Die Lichtschranke misst die Umlaufdauer des Rades: Der Streifen am Radrand muss durch ihre Gabel laufen.';
        default: return 'Das Zusatzgewicht hängt an einem Faden. Wo an der Achse lässt es sich einhängen?';
    }
}

// the part's own marker isn't there yet
function notYet(part: string): string {
    switch (part) {
        case 'axle': return 'Die Achse braucht zuerst ein Lager.';
        case 'wheel':
        case 'counterweight': return 'Dafür muss zuerst die Achse im Lager liegen.';
        case 'lightgate': return 'Die Lichtschranke misst am Rad. Ist das Rad schon eingebaut?';
        default: return 'Das Zusatzgewicht kommt erst dran, wenn der Kreisel ausbalanciert ist.';
    }
}

// selecting, grabbing and the end of the game keep the previous hint
export function assemblyHint(m: SimAssemblyMessage, previous: string): string {
    switch (m.event) {
        case 'begin': return ASSEMBLY_HINTS.start;
        case 'back': return ASSEMBLY_HINTS.back;
        case 'place': return PLACED[m.part] ?? previous;
        case 'wrong':
            if (m.part === 'pendulum') return ASSEMBLY_HINTS.pendulum;
            return m.slots.includes(SLOT[m.part]) ? wrong(m.part, m.slot) : notYet(m.part);
        case 'unavailable':
            if (m.part) return ASSEMBLY_HINTS.unavailable;
            return m.slot ? ASSEMBLY_HINTS.chooseFirst : ASSEMBLY_HINTS.notReadyToSpin;
        case 'phase': return m.phase === 'balance' ? ASSEMBLY_HINTS.balance : previous;
        case 'balanced': return ASSEMBLY_HINTS.balanced;
        case 'spin': return ASSEMBLY_HINTS.spinning;
        case 'spun': return ASSEMBLY_HINTS.ready;
        case 'release': return ASSEMBLY_HINTS.released;
        default: return previous;
    }
}
