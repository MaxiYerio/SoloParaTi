// js/systems/InteractionManager.js

let isDragging = false;

let previousX = 0;
let previousY = 0;

let velocityX = 0;
let velocityY = 0;

//----------------------------------
// CONFIGURACIÓN
//----------------------------------

const SENSITIVITY = 0.0022;
const FRICTION = 0.90;
const STOP_THRESHOLD = 0.00001;

//----------------------------------
// AUTO ROTACIÓN
//----------------------------------

const IDLE_DELAY = 6000;      // 6 segundos sin tocar
const AUTO_SPEED = 0.00045;   // velocidad muy lenta

let lastInteraction = performance.now();

export function setupInteraction(target){

    const canvas = document.querySelector("canvas");

    canvas.addEventListener(
        "pointerdown",
        startDrag
    );

    window.addEventListener(
        "pointermove",
        moveDrag
    );

    window.addEventListener(
        "pointerup",
        endDrag
    );

    function startDrag(e){

        isDragging = true;

        // detener completamente la inercia
        velocityX = 0;
        velocityY = 0;

        lastInteraction = performance.now();

        previousX = e.clientX;
        previousY = e.clientY;

    }

    function moveDrag(e){

        if(!isDragging) return;

        const dx = e.clientX - previousX;
        const dy = e.clientY - previousY;

        previousX = e.clientX;
        previousY = e.clientY;

        lastInteraction = performance.now();

        if(

            Math.abs(dx) > 0.1 ||

            Math.abs(dy) > 0.1

        ){

            velocityX = dx * SENSITIVITY;
            velocityY = dy * SENSITIVITY;

        }

        target.rotation.y += velocityX;
        target.rotation.x += velocityY;

    }

    function endDrag(){

        isDragging = false;

        lastInteraction = performance.now();

    }

    function animate(){

        requestAnimationFrame(animate);

        //----------------------------------
        // Mientras arrastra
        //----------------------------------

        if(isDragging) return;

        //----------------------------------
        // Inercia
        //----------------------------------

        velocityX *= FRICTION;
        velocityY *= FRICTION;

        if(Math.abs(velocityX) < STOP_THRESHOLD){

            velocityX = 0;

        }

        if(Math.abs(velocityY) < STOP_THRESHOLD){

            velocityY = 0;

        }

        target.rotation.y += velocityX;
        target.rotation.x += velocityY;

        //----------------------------------
        // Auto rotación
        //----------------------------------

        const idleTime = performance.now() - lastInteraction;

        if(

            idleTime > IDLE_DELAY &&

            velocityX === 0 &&

            velocityY === 0

        ){

            target.rotation.y += AUTO_SPEED;

        }

    }

    animate();

}