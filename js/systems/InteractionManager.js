// js/systems/InteractionManager.js

import {
    pinchZoom
} from "./CameraController.js";


//--------------------------------------------------
// ESTADO DE ARRASTRE
//--------------------------------------------------

let isDragging = false;

let hasDragged = false;


//--------------------------------------------------
// POSICIÓN ANTERIOR
//--------------------------------------------------

let previousX = 0;

let previousY = 0;


//--------------------------------------------------
// VELOCIDAD
//--------------------------------------------------

let velocityX = 0;

let velocityY = 0;


//--------------------------------------------------
// CONFIGURACIÓN
//--------------------------------------------------

const SENSITIVITY =
    0.0022;

const FRICTION =
    0.90;

const STOP_THRESHOLD =
    0.00001;


//--------------------------------------------------
// DISTANCIA MÍNIMA
//--------------------------------------------------

const DRAG_THRESHOLD =
    6;


//--------------------------------------------------
// AUTO ROTACIÓN
//--------------------------------------------------

const IDLE_DELAY =
    6000;

const AUTO_SPEED =
    0.00045;


//--------------------------------------------------
// ÚLTIMA INTERACCIÓN
//--------------------------------------------------

let lastInteraction =
    performance.now();


//--------------------------------------------------
// PINCH
//--------------------------------------------------

const activePointers =
    new Map();

let isPinching =
    false;

let previousPinchDistance =
    0;


//--------------------------------------------------
// ESTADO DEL CLICK
//--------------------------------------------------

export function wasDragging() {

    return hasDragged;

}


//--------------------------------------------------
// SETUP
//--------------------------------------------------

export function setupInteraction(
    target
) {

    const canvas =
        document.querySelector(
            "canvas"
        );


    if (!canvas) {

        console.warn(
            "[Interaction] Canvas no encontrado."
        );

        return;

    }


    //--------------------------------------------------
    // POINTER DOWN
    //--------------------------------------------------

    canvas.addEventListener(
        "pointerdown",
        startPointer
    );


    //--------------------------------------------------
    // POINTER MOVE
    //--------------------------------------------------

    window.addEventListener(
        "pointermove",
        movePointer
    );


    //--------------------------------------------------
    // POINTER UP
    //--------------------------------------------------

    window.addEventListener(
        "pointerup",
        endPointer
    );


    //--------------------------------------------------
    // POINTER CANCEL
    //--------------------------------------------------

    window.addEventListener(
        "pointercancel",
        endPointer
    );


    //--------------------------------------------------
    // POINTER LEAVE
    //--------------------------------------------------

    window.addEventListener(
        "pointerout",
        endPointer
    );


    //--------------------------------------------------
    // INICIAR POINTER
    //--------------------------------------------------

    function startPointer(e) {

        //--------------------------------------------------
        // GUARDAR POINTER
        //--------------------------------------------------

        activePointers.set(
            e.pointerId,
            {
                x: e.clientX,
                y: e.clientY
            }
        );


        //--------------------------------------------------
        // SEGUNDO DEDO
        //--------------------------------------------------

        if (
            activePointers.size >= 2
        ) {

            startPinch();

            return;

        }


        //--------------------------------------------------
        // PRIMER DEDO
        //--------------------------------------------------

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


    //--------------------------------------------------
    // INICIAR PINCH
    //--------------------------------------------------

    function startPinch() {

        isPinching = true;


        //--------------------------------------------------
        // UN PINCH NO ES UN CLICK
        //--------------------------------------------------

        hasDragged = true;


        //--------------------------------------------------
        // DETENER INERCIA
        //--------------------------------------------------

        velocityX = 0;

        velocityY = 0;


        //--------------------------------------------------
        // DISTANCIA INICIAL
        //--------------------------------------------------

        previousPinchDistance =
            getPinchDistance();


        lastInteraction =
            performance.now();

    }


    //--------------------------------------------------
    // MOVER POINTER
    //--------------------------------------------------

    function movePointer(e) {

        //--------------------------------------------------
        // ACTUALIZAR POINTER
        //--------------------------------------------------

        if (
            activePointers.has(
                e.pointerId
            )
        ) {

            activePointers.set(
                e.pointerId,
                {
                    x: e.clientX,
                    y: e.clientY
                }
            );

        }


        //--------------------------------------------------
        // PINCH
        //--------------------------------------------------

        if (
            activePointers.size >= 2
        ) {

            if (!isPinching) {

                startPinch();

            }


            //--------------------------------------------------
            // NUEVA DISTANCIA
            //--------------------------------------------------

            const currentDistance =
                getPinchDistance();


            //--------------------------------------------------
            // ZOOM
            //--------------------------------------------------

            pinchZoom(
                previousPinchDistance,
                currentDistance
            );


            //--------------------------------------------------
            // GUARDAR DISTANCIA
            //--------------------------------------------------

            previousPinchDistance =
                currentDistance;


            lastInteraction =
                performance.now();


            return;

        }


        //--------------------------------------------------
        // SI NO ESTÁ ARRASTRANDO
        //--------------------------------------------------

        if (!isDragging) {

            return;

        }


        //--------------------------------------------------
        // DELTA
        //--------------------------------------------------

        const dx =
            e.clientX -
            previousX;

        const dy =
            e.clientY -
            previousY;


        //--------------------------------------------------
        // DETECTAR ARRASTRE REAL
        //--------------------------------------------------

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


        //--------------------------------------------------
        // ACTUALIZAR POSICIÓN
        //--------------------------------------------------

        previousX =
            e.clientX;

        previousY =
            e.clientY;


        lastInteraction =
            performance.now();


        //--------------------------------------------------
        // VELOCIDAD
        //--------------------------------------------------

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


        //--------------------------------------------------
        // ROTAR
        //--------------------------------------------------

        target.rotation.y +=
            velocityX;

        target.rotation.x +=
            velocityY;

    }


    //--------------------------------------------------
    // TERMINAR POINTER
    //--------------------------------------------------

    function endPointer(e) {

        //--------------------------------------------------
        // ELIMINAR POINTER
        //--------------------------------------------------

        activePointers.delete(
            e.pointerId
        );


        //--------------------------------------------------
        // TERMINÓ EL PINCH
        //--------------------------------------------------

        if (
            activePointers.size < 2
        ) {

            if (isPinching) {

                isPinching = false;

                previousPinchDistance =
                    0;

                //--------------------------------------------------
                // NO CONTINUAR ROTANDO
                //--------------------------------------------------

                isDragging = false;

                velocityX = 0;

                velocityY = 0;

                lastInteraction =
                    performance.now();

                return;

            }

        }


        //--------------------------------------------------
        // TERMINÓ TODO
        //--------------------------------------------------

        if (
            activePointers.size === 0
        ) {

            isDragging = false;

            lastInteraction =
                performance.now();

        }

    }


    //--------------------------------------------------
    // DISTANCIA ENTRE LOS DOS DEDOS
    //--------------------------------------------------

    function getPinchDistance() {

        const pointers =
            Array.from(
                activePointers.values()
            );


        if (
            pointers.length < 2
        ) {

            return 0;

        }


        const first =
            pointers[0];

        const second =
            pointers[1];


        const dx =
            first.x -
            second.x;

        const dy =
            first.y -
            second.y;


        return Math.sqrt(
            dx * dx +
            dy * dy
        );

    }


    //--------------------------------------------------
    // ANIMACIÓN
    //--------------------------------------------------

    function animate() {

        requestAnimationFrame(
            animate
        );


        //--------------------------------------------------
        // MIENTRAS ARRASTRA
        //--------------------------------------------------

        if (
            isDragging ||
            isPinching
        ) {

            return;

        }


        //--------------------------------------------------
        // INERCIA
        //--------------------------------------------------

        velocityX *=
            FRICTION;

        velocityY *=
            FRICTION;


        //--------------------------------------------------
        // DETENER X
        //--------------------------------------------------

        if (
            Math.abs(
                velocityX
            ) < STOP_THRESHOLD
        ) {

            velocityX = 0;

        }


        //--------------------------------------------------
        // DETENER Y
        //--------------------------------------------------

        if (
            Math.abs(
                velocityY
            ) < STOP_THRESHOLD
        ) {

            velocityY = 0;

        }


        //--------------------------------------------------
        // APLICAR INERCIA
        //--------------------------------------------------

        target.rotation.y +=
            velocityX;

        target.rotation.x +=
            velocityY;


        //--------------------------------------------------
        // AUTO ROTACIÓN
        //--------------------------------------------------

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