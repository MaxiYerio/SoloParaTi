// js\systems\InteractionManager.js

let isDragging = false;

let previousX = 0;
let previousY = 0;

let velocityX = 0;
let velocityY = 0;

//----------------------------------
// CONFIGURACIÓN
//----------------------------------

const SENSITIVITY = 0.0022;     // sensibilidad al arrastrar
const FRICTION = 0.90;          // cuánto tarda en frenarse
const STOP_THRESHOLD = 0.00001; // velocidad mínima antes de detenerse

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

        // Si la esfera venía girando,
        // al tocarla se detiene inmediatamente.
        velocityX = 0;
        velocityY = 0;

        previousX = e.clientX;
        previousY = e.clientY;

    }

    function moveDrag(e){

        if(!isDragging) return;

        const dx = e.clientX - previousX;
        const dy = e.clientY - previousY;

        previousX = e.clientX;
        previousY = e.clientY;

        // Solo actualizamos la velocidad
        // si realmente hubo movimiento.
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

    }

    function animate(){

        requestAnimationFrame(animate);

        if(isDragging) return;

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

    }

    animate();

}