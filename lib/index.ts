type swearVariants = Array<string>;

function getAllSwears(): Array<swearVariants> {
    return [
        [`tabarnak`, `tabarnouche`, `tabarouette`, `taboire`, `tabarslaque`],
        [`câlisse`, `câlique`, `câline`, `câline de bine`, `câliboire`, `caltor`],
        [`crisse`, `christie`, `crime`],
        [`ostie`, `astie`, `estique`, `ostifie`, `esprit`],
        [`ciboire`, `saint-ciboire`],
        [`torrieux`],
        [`cimonaque`, `saint-cimonaque`],
        [`baptême`, `batince`],
        [`bâtard`],
        [`calvaire`, `calvince`],
        [`mosus`],
        [`maudit`, `mautadit`, `maudine`],
        [`sacrament`, `saint-sacrament`],
        [`viarge`, `sainte-viarge`, `bout d'viarge`],
        [`cibouleau`],
        [`sacréfice`],
        [`cibole`, `cibolac`],
        [`enfant d'chienne`],
        [`verrat`],
        [`marde`, `maudite marde`, `mangeux d'marde`],
        [`boswell`],
        [`sacristi`, `sapristi`],
        [`jésus de plâtre`],
        [`torvisse`],
        [`patente à gosse`],
        [`viande à chien`],
        [`bout d'crisse`],
        [`cul`],
        [`jésus marie joseph`],
        [`charrue`],
        [`charogne`],
        [`gériboire`],
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
