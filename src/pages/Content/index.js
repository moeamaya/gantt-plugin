// https://stackoverflow.com/a/46012210/1470535

import { doc } from 'prettier';
import React from 'react';
import { render } from 'react-dom';
import Newtab from '../Newtab/Newtab';
import './content.styles.css';


console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');


const main = document.querySelector('main.content');
const color = main.style.getPropertyValue('--project-color');

const gtt = document.createElement("div");
gtt.classList.add("gtt");
gtt.style.setProperty('--project-color', color);
document.body.appendChild(gtt);



const bff = document.createElement("div");
bff.classList.add("bff");
main.appendChild(bff);

const phasesData = [];

const phases = document.querySelectorAll("[class^='phase-module__phaseInfo']");
phases.forEach((phase) => {
    const dates = phase.querySelectorAll('.DateInput_input');
    const name = phase.querySelector("[class^='calculator-module__heading']").textContent;
    const phaseData = {
        id: name,
        name,
        start: new Date(dates[0].value),
        startDOM: dates[0],
        end: new Date(dates[1].value),
        endDOM: dates[1],
        progress: 0,
    }
    phasesData.push(phaseData)
});

render(<Newtab phases={phasesData} />, window.document.querySelector('.gtt'));