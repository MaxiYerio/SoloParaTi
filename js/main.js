import { initScene } from "./scene.js";

const intro = document.getElementById("intro");

let started = false;

window.addEventListener("pointerdown", () => {

    if(started) return;

    started = true;

    intro.style.opacity = "0";

    setTimeout(()=>{

        intro.style.display = "none";

        initScene();

    },1200);

});