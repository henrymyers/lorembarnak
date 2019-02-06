
const swears: string[] = [
    `de calisse`,
    `de tabarnak`,
    `d'ostie`,
    `de saint-ciboire`,
    `de crisse`,
    `de torrieux`,
    `de cimonaque`,
    `de batince`,
    `de bâtard`,
    `de calvaire`,
    `de ciboire`,
    `de mosus`,
    `de maudit`,
    `de sacrament`,
    `de viarge`,
    `de mautadit`,
    `de saint-cimonaque`,
    `de cibouleau`,
    `de sacréfice`,
    `de cibolac`,
    `de tabarnouche`,
    `de tabarouette`,
    `de taboire`,
    `de cibole`,
    `d'enfant d'chienne`,
    `de verrat`,
    `de marde`,
    `de maudite marde`,
    `de sainte-viarge`,
    `de tabarslaque`,
    `de boswell`,
    `de câlique`,
    `de câline de bine`,
    `de christie`,
    `de câline`,
    `de maudine`,
    `de sacristi`,
    `de sapristi`,
    `de jésus de plâtre`,
    `de torvisse`,
    `de patente à gosse`,
    `de viande à chien`,
    `de bout d'crisse`,
    `de crime`,
    `d'astie`,
    `de baptême`,
    `de calvince`,
    `d'estique`,
    `de gériboire`,
    `de bout d'viarge`,
    `d'ostifie`,
    `de cul`,
    `de jésus marie joseph`,
    `d'esprit`,
];

/**
 * Generates a chain of Québécois obscenities.
 * @param {number} [nbSwears] Optional number of swears to chain
 * @return {string}
 */
export function getText(nbSwears?: number): string {
    nbSwears = nbSwears || (randomInt(8) + 6);

    let unused = [...swears];
    let result = "";
    let previous = "";

    for (let i = 0; i < nbSwears; i++) {
        let current: string;

        // If we've run out of unused swears, reinitialize unused.
        if (!unused.length) {
            unused = [...swears];
        }

        // Choose a random swear that isn't the previous one.
        do {
            current = unused.splice(randomInt(unused.length), 1)[0];
        } while (current === previous);

        // Save the chosen swear and append it to the result.
        previous = current;
        result += `${current} `;
    }

    // Remove the 1st swear prefix and capitalize the 1st letter
    return capitalize(result.replace(/^d[e']/, '').trim());
}

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function randomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}