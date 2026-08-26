// js/systems/CameraController.js

let camera;

let targetZ = 12;


//--------------------------------------------------
// LÍMITES DEL ZOOM
//--------------------------------------------------

const MIN_Z = 7;
const MAX_Z = 18;


//--------------------------------------------------
// SUAVIZADO
//--------------------------------------------------

const CAMERA_SMOOTH = 0.08;


//--------------------------------------------------
// ESTADO
//--------------------------------------------------

let focusMode = false;

let zoomLocked = false;


//--------------------------------------------------
// CONFIGURACIÓN DEL ENFOQUE
//--------------------------------------------------

//--------------------------------------------------
// FOCUS ADAPTATIVO
//--------------------------------------------------

const FOCUS_Z_DESKTOP = 8.2;
const FOCUS_Z_TABLET = 8.8;
const FOCUS_Z_MOBILE = 9.4;


//--------------------------------------------------
// OBTENER Z DE FOCUS SEGÚN PANTALLA
//--------------------------------------------------

function getFocusZ() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    //--------------------------------------------------
    // CELULAR
    //--------------------------------------------------

    if (width <= 600) {

        // Vertical
        if (height > width) {

            return FOCUS_Z_MOBILE;

        }

        // Horizontal
        return FOCUS_Z_TABLET;

    }


    //--------------------------------------------------
    // TABLET
    //--------------------------------------------------

    if (width <= 1024) {

        return FOCUS_Z_TABLET;

    }


    //--------------------------------------------------
    // PC
    //--------------------------------------------------

    return FOCUS_Z_DESKTOP;

}

const FOCUS_SMOOTH = 0.045;


//--------------------------------------------------
// INICIALIZAR
//--------------------------------------------------

export function setupCameraController(cam) {

    camera = cam;

    targetZ =
        camera.position.z;


    //--------------------------------------------------
    // ZOOM CON RUEDA
    //--------------------------------------------------

    window.addEventListener(
        "wheel",
        onWheel,
        {
            passive: true
        }
    );


    animate();

}


//--------------------------------------------------
// ZOOM CON RUEDA
//--------------------------------------------------

function onWheel(e) {

    //--------------------------------------------------
    // DURANTE FOCUS NO SE PUEDE HACER ZOOM
    //--------------------------------------------------

    if (
        focusMode ||
        zoomLocked
    ) {

        return;

    }


    //--------------------------------------------------
    // ZOOM
    //--------------------------------------------------

    changeZoom(
        e.deltaY * 0.01
    );

}


//--------------------------------------------------
// CAMBIAR ZOOM
//--------------------------------------------------

export function changeZoom(amount) {

    //--------------------------------------------------
    // BLOQUEADO
    //--------------------------------------------------

    if (
        focusMode ||
        zoomLocked
    ) {

        return;

    }


    //--------------------------------------------------
    // APLICAR
    //--------------------------------------------------

    targetZ += amount;


    //--------------------------------------------------
    // LIMITAR
    //--------------------------------------------------

    targetZ =
        Math.max(
            MIN_Z,
            Math.min(
                MAX_Z,
                targetZ
            )
        );

}


//--------------------------------------------------
// ZOOM POR PINCH
//--------------------------------------------------

export function pinchZoom(
    previousDistance,
    currentDistance
) {

    //--------------------------------------------------
    // BLOQUEADO
    //--------------------------------------------------

    if (
        focusMode ||
        zoomLocked
    ) {

        return;

    }


    //--------------------------------------------------
    // DIFERENCIA
    //--------------------------------------------------

    const difference =
        previousDistance -
        currentDistance;


    //--------------------------------------------------
    // SENSIBILIDAD
    //--------------------------------------------------

    const sensitivity =
        0.025;


    changeZoom(
        difference *
        sensitivity
    );

}


//--------------------------------------------------
// BLOQUEAR ZOOM
//--------------------------------------------------

export function lockCameraZoom() {

    zoomLocked = true;

}


//--------------------------------------------------
// DESBLOQUEAR ZOOM
//--------------------------------------------------

export function unlockCameraZoom() {

    zoomLocked = false;

}


//--------------------------------------------------
// ENTRAR EN FOCUS
//--------------------------------------------------

export function enterCameraFocus() {

    focusMode = true;

}


//--------------------------------------------------
// SALIR DEL FOCUS
//--------------------------------------------------

export function exitCameraFocus() {

    focusMode = false;


    //--------------------------------------------------
    // VOLVER AL ZOOM NORMAL
    //--------------------------------------------------

    targetZ = 12;

}


//--------------------------------------------------
// ANIMACIÓN
//--------------------------------------------------

function animate() {

    requestAnimationFrame(
        animate
    );


    if (!camera) {

        return;

    }


    //--------------------------------------------------
    // OBJETIVO
    //--------------------------------------------------

    const desiredZ =
        focusMode
            ? getFocusZ()
            : targetZ;


    //--------------------------------------------------
    // MOVIMIENTO SUAVE
    //--------------------------------------------------

    camera.position.z +=

        (
            desiredZ -
            camera.position.z
        )

        *

        (
            focusMode

                ? FOCUS_SMOOTH

                : CAMERA_SMOOTH

        );

}