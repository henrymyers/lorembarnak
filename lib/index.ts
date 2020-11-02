type swearVariants = Array<string>;

function getAllSwears(): Array<swearVariants> {
    return [
        [`tabarnak`, `tabarnouche`, `tabarouette`, `taboire`, `tabarslaque`, `tabarnane`],
        [`câlisse`, `câlique`, `câline`, `câline de bine`, `câliboire`, `caltor`],
        [`crisse`, `christie`, `crime`, `bout d'crisse`],
        [`ostie`, `astie`, `estique`, `ostifie`, `esprit`],
        [`ciboire`, `saint-ciboire`],
        [`torrieux`, `torvisse`],
        [`cimonaque`, `saint-cimonaque`],
        [`baptême`, `batince`, `batèche`],
        [`bâtard`],
        [`calvaire`, `calvince`, `calvinouche`],
        [`mosus`],
        [`maudit`, `mautadit`, `maudine`],
        [`sacrament`, `sacréfice`, `saint-sacrament`],
        [`viarge`, `sainte-viarge`, `bout d'viarge`],
        [`ciarge`, `saint-ciarge`, `bout d'ciarge`],
        [`cibouleau`],
        [`cibole`, `cibolac`],
        [`enfant d'chienne`],
        [`verrat`],
        [`marde`, `maudite marde`, `mangeux d'marde`, `gros tas d'marde`],
        [`boswell`],
        [`sacristi`, `sapristi`],
        [`Jésus de plâtre`, `Jésus Marie Joseph`, `p'tit Jésus`, `doux Jésus`],
        [`crucifix`],
        [`patente à gosse`, `cochonnerie`, `cossin`],
        [`viande à chien`],
        [`cul`, `trou d'cul`],
        [`purée`],
        [`étole`],
        [`charogne`, `charrue`],
        [`gériboire`, `géritole`],
        [`colon`],
    ];
}

/**
 * Generates a chain of Québécois obscenities.
 * @param {number} [nbRequested] Optional number of swears to chain
 * @return {string}
 */
export function getText(nbRequested?: number): string {
    nbRequested = nbRequested || (randomInt(4) + 6);

    let remaining = getAllSwears();
    let result = "";
    let previousSwear = "";
    let previousIndex = null;

    for (let i = 0; i < nbRequested; i++) {
        let family: swearVariants;
        let current: string;
        let currentIndex;

        // If we've run out of remaining swears or only the previous family remains, reinitialize remaining.
        if (!remaining.length || (remaining.length === 1 && previousIndex !== null)) {
            remaining = getAllSwears();
        }

        // Choose a random swear family that isn't the previous one.
        do {
            currentIndex = randomInt(remaining.length);
        } while (currentIndex === previousIndex || remaining[currentIndex].includes(previousSwear));
        family = remaining[currentIndex];
        previousIndex = currentIndex;

        // Choose a random swear, and delete the family if empty.
        current = family.splice(randomInt(family.length), 1)[0];
        previousSwear = current;
        if (!family.length) {
            remaining.splice(currentIndex, 1);
            previousIndex = null;
        }

        // Capitalize the fist swear, add an article prefix to others.
        result += (i === 0) ? capitalize(current) : withArticle(current);

        // Add a period after the last swear, a space after others.
        result += (i === nbRequested - 1) ? '.' : ' ';
    }

    return result;
}

const startsWithPrefix = /^(de\s|d')/;
const startsWithVowel = /^[aeiouhyAEIOUHYÀ-ÖØ-öø-ÿ]/;

function withArticle(str: string): string {
    let prefix: string;

    if (startsWithPrefix.test(str)) {
        // If it already starts with `de` or `d'`, don't add another.
        prefix = '';

    } else if (startsWithVowel.test(str)) {
        // If it starts with a vowel, prepend with `d'`
        prefix = `d'`;

    } else {
        // Otherwise prepend with `de`
        prefix = 'de ';
    }

    return `${prefix}${str}`;
}

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function randomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}
