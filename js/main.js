//js\main.js

import { startApp } from "./core/App.js";

const intro = document.getElementById("intro");

let started = false;

window.addEventListener("pointerdown", () => {

    if(started) return;

    started = true;

    intro.style.opacity = "0";

    setTimeout(()=>{

        intro.style.display = "none";

        startApp();

    },1200);

});