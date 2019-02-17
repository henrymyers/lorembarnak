(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swears = [
    "de calisse",
    "de tabarnak",
    "d'ostie",
    "de saint-ciboire",
    "de crisse",
    "de torrieux",
    "de cimonaque",
    "de batince",
    "de b\u00E2tard",
    "de calvaire",
    "de ciboire",
    "de mosus",
    "de maudit",
    "de sacrament",
    "de viarge",
    "de mautadit",
    "de saint-cimonaque",
    "de cibouleau",
    "de sacr\u00E9fice",
    "de cibolac",
    "de tabarnouche",
    "de tabarouette",
    "de taboire",
    "de cibole",
    "d'enfant d'chienne",
    "de verrat",
    "de marde",
    "de maudite marde",
    "de sainte-viarge",
    "de tabarslaque",
    "de boswell",
    "de c\u00E2lique",
    "de c\u00E2line de bine",
    "de christie",
    "de c\u00E2line",
    "de maudine",
    "de sacristi",
    "de sapristi",
    "de j\u00E9sus de pl\u00E2tre",
    "de torvisse",
    "de patente \u00E0 gosse",
    "de viande \u00E0 chien",
    "de bout d'crisse",
    "de crime",
    "d'astie",
    "de bapt\u00EAme",
    "de calvince",
    "d'estique",
    "de g\u00E9riboire",
    "de bout d'viarge",
    "d'ostifie",
    "de cul",
    "de j\u00E9sus marie joseph",
    "d'esprit",
    "de charrue",
];
/**
 * Generates a chain of Québécois obscenities.
 * @param {number} [nbSwears] Optional number of swears to chain
 * @return {string}
 */
function getText(nbSwears) {
    nbSwears = nbSwears || (randomInt(6) + 4);
    var unused = swears.slice();
    var result = "";
    var previous = "";
    for (var i = 0; i < nbSwears; i++) {
        var current = void 0;
        // If we've run out of unused swears, reinitialize unused.
        if (!unused.length) {
            unused = swears.slice();
        }
        // Choose a random swear that isn't the previous one.
        do {
            current = unused.splice(randomInt(unused.length), 1)[0];
        } while (current === previous);
        // Save the chosen swear and append it to the result.
        previous = current;
        result += current + " ";
    }
    // Remove the 1st swear prefix and capitalize the 1st letter
    result = capitalize(result.replace(/^d[e']/, '').trim());
    result += '.';
    return result;
}
exports.getText = getText;
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
}

if (window.addEventListener) {
    window.addEventListener("load", run, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", run);
} else {
    window.onload = run;
}
},{"../dist":1}]},{},[2]);
