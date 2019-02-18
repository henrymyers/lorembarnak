(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAllSwears() {
    return [
        ["tabarnak", "tabarnouche", "tabarouette", "taboire", "tabarslaque"],
        ["c\u00E2lisse", "c\u00E2lique", "c\u00E2line", "c\u00E2line de bine", "c\u00E2liboire"],
        ["crisse", "christie", "crime"],
        ["ostie", "astie", "estique", "ostifie", "esprit"],
        ["ciboire", "saint-ciboire"],
        ["torrieux"],
        ["cimonaque", "saint-cimonaque"],
        ["bapt\u00EAme", "batince"],
        ["b\u00E2tard"],
        ["calvaire", "calvince"],
        ["mosus"],
        ["maudit", "mautadit", "maudine"],
        ["sacrament"],
        ["viarge", "sainte-viarge", "bout d'viarge"],
        ["cibouleau"],
        ["sacr\u00E9fice"],
        ["cibole", "cibolac"],
        ["enfant d'chienne"],
        ["verrat"],
        ["marde", "maudite marde"],
        ["boswell"],
        ["sacristi", "sapristi"],
        ["j\u00E9sus de pl\u00E2tre"],
        ["torvisse"],
        ["patente \u00E0 gosse"],
        ["viande \u00E0 chien"],
        ["bout d'crisse"],
        ["cul"],
        ["j\u00E9sus marie joseph"],
        ["charrue"],
        ["charogne"],
        ["g\u00E9riboire"],
    ];
}
/**
 * Generates a chain of Québécois obscenities.
 * @param {number} [nbRequested] Optional number of swears to chain
 * @return {string}
 */
function getText(nbRequested) {
    nbRequested = nbRequested || (randomInt(4) + 6);
    var remaining = getAllSwears();
    var result = "";
    var previousSwear = "";
    var previousIndex = null;
    for (var i = 0; i < nbRequested; i++) {
        var family = void 0;
        var current = void 0;
        var currentIndex = void 0;
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
exports.getText = getText;
var startsWithPrefix = /^(de\s|d')/;
var startsWithVowel = /^[aeiouhyAEIOUHYÀ-ÖØ-öø-ÿ]/;
function withArticle(str) {
    var prefix;
    if (startsWithPrefix.test(str)) {
        // If it already starts with `de` or `d'`, don't add another.
        prefix = '';
    }
    else if (startsWithVowel.test(str)) {
        // If it starts with a vowel, prepend with `d'`
        prefix = "d'";
    }
    else {
        // Otherwise prepend with `de`
        prefix = 'de ';
    }
    return "" + prefix + str;
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

},{}],2:[function(require,module,exports){
let lorembarnak = require('../dist');

function addLorem() {
    const elementsToFill = document.getElementsByClassName('lorem');

    Array.from(elementsToFill).forEach((elem) => {
        elem.textContent = lorembarnak.getText();
    });
}

function run() {
    addLorem();

    const refreshButton = document.getElementById('refreshButton');
    if (refreshButton) {
        refreshButton.onclick = addLorem;
    }

    // Add it to the window so people can test it
    window.getText = lorembarnak.getText;
}

if (window.addEventListener) {
    window.addEventListener("load", run, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", run);
} else {
    window.onload = run;
}
},{"../dist":1}]},{},[2]);
