let lorembarnak = require('../dist');

function addLorem() {
    const elementsToFill = document.getElementsByClassName('lorem');

    Array.from(elementsToFill).forEach((elem, i) => {
        const nbSwears = elem.classList.contains('short') ? 8 : 15;
        elem.textContent = `${i+1}. ${lorembarnak.getText(nbSwears)}`;
    });
}

if (window.addEventListener) {
    window.addEventListener("load", addLorem, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", addLorem);
} else {
    window.onload = addLorem;
}