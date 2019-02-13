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