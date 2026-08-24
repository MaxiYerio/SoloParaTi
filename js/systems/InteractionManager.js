// js/systems/InteractionManager.js

let isDragging = false;
let hasDragged = false;

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

// Distancia mínima para considerar
// que realmente hubo un arrastre.
const DRAG_THRESHOLD = 6;

//----------------------------------
// AUTO ROTACIÓN
//----------------------------------

const IDLE_DELAY = 6000;
const AUTO_SPEED = 0.00045;

let lastInteraction = performance.now();

//----------------------------------
// ESTADO DEL CLICK
//----------------------------------

export function wasDragging() {
    return hasDragged;
}

//----------------------------------
// SETUP
//----------------------------------

export function setupInteraction(target) {

    const canvas =
        document.querySelector("canvas");

    if (!canvas) {

        console.warn(
            "[Interaction] Canvas no encontrado."
        );

        return;

    }

    //----------------------------------
    // POINTER DOWN
    //----------------------------------

    canvas.addEventListener(
        "pointerdown",
        startDrag
    );

    //----------------------------------
    // POINTER MOVE
    //----------------------------------

    window.addEventListener(
        "pointermove",
        moveDrag
    );

    //----------------------------------
    // POINTER UP
    //----------------------------------

    window.addEventListener(
        "pointerup",
        endDrag
    );

    //----------------------------------
    // POINTER CANCEL
    //----------------------------------

    window.addEventListener(
        "pointercancel",
        endDrag
    );

    //----------------------------------
    // INICIAR
    //----------------------------------

    function startDrag(e) {

        isDragging = true;

        hasDragged = false;

        velocityX = 0;
        velocityY = 0;

        lastInteraction =
            performance.now();

        previousX =
            e.clientX;

        previousY =
            e.clientY;

    }

    //----------------------------------
    // MOVER
    //----------------------------------

    function moveDrag(e) {

        if (!isDragging) return;

        const dx =
            e.clientX -
            previousX;

        const dy =
            e.clientY -
            previousY;

        //----------------------------------
        // DETECTAR ARRRASTRE REAL
        //----------------------------------

        if (
            Math.abs(
                e.clientX -
                previousX
            ) > 0.1 ||
            Math.abs(
                e.clientY -
                previousY
            ) > 0.1
        ) {

            const distance =
                Math.sqrt(
                    Math.pow(
                        e.clientX -
                        previousX,
                        2
                    ) +
                    Math.pow(
                        e.clientY -
                        previousY,
                        2
                    )
                );

            if (
                distance >=
                DRAG_THRESHOLD
            ) {

                hasDragged = true;

            }

        }

        //----------------------------------
        // ACTUALIZAR POSICIÓN
        //----------------------------------

        previousX =
            e.clientX;

        previousY =
            e.clientY;

        lastInteraction =
            performance.now();

        //----------------------------------
        // VELOCIDAD
        //----------------------------------

        if (
            Math.abs(dx) > 0.1 ||
            Math.abs(dy) > 0.1
        ) {

            velocityX =
                dx *
                SENSITIVITY;

            velocityY =
                dy *
                SENSITIVITY;

        }

        //----------------------------------
        // ROTAR
        //----------------------------------

        target.rotation.y +=
            velocityX;

        target.rotation.x +=
            velocityY;

    }

    //----------------------------------
    // TERMINAR
    //----------------------------------

    function endDrag() {

        isDragging = false;

        lastInteraction =
            performance.now();

    }

    //----------------------------------
    // ANIMACIÓN
    //----------------------------------

    function animate() {

        requestAnimationFrame(
            animate
        );

        //----------------------------------
        // MIENTRAS ARRASTRA
        //----------------------------------

        if (isDragging) return;

        //----------------------------------
        // INERCIA
        //----------------------------------

        velocityX *=
            FRICTION;

        velocityY *=
            FRICTION;

        if (
            Math.abs(
                velocityX
            ) <
            STOP_THRESHOLD
        ) {

            velocityX = 0;

        }

        if (
            Math.abs(
                velocityY
            ) <
            STOP_THRESHOLD
        ) {

            velocityY = 0;

        }

        target.rotation.y +=
            velocityX;

        target.rotation.x +=
            velocityY;

        //----------------------------------
        // AUTO ROTACIÓN
        //----------------------------------

        const idleTime =
            performance.now() -
            lastInteraction;

        if (
            idleTime >
            IDLE_DELAY &&
            velocityX === 0 &&
            velocityY === 0
        ) {

            target.rotation.y +=
                AUTO_SPEED;

        }

    }

    animate();

}