// js/systems/CameraController.js

let camera;

let targetZ = 12;

const MIN_Z = 7;
const MAX_Z = 18;

const CAMERA_SMOOTH = 0.08;

//----------------------------------
// ESTADO
//----------------------------------

let focusMode = false;
let zoomLocked = false;

//----------------------------------
// CONFIGURACIÓN DEL ENFOQUE
//----------------------------------

const FOCUS_Z_DESKTOP = 8.2;
const FOCUS_Z_MOBILE = 9.5;

function getFocusZ() {

    if (window.innerWidth <= 600) {
        return FOCUS_Z_MOBILE;
    }

    return FOCUS_Z_DESKTOP;

}
const FOCUS_SMOOTH = 0.045;

//----------------------------------
// INICIALIZAR
//----------------------------------

export function setupCameraController(cam) {

    camera = cam;

    targetZ = camera.position.z;

    window.addEventListener(
        "wheel",
        onWheel,
        { passive: true }
    );

    animate();

}

//----------------------------------
// ZOOM MANUAL
//----------------------------------

function onWheel(e) {

    // Si estamos en focus, no permitimos
    // que el usuario modifique la cámara.
    if (focusMode || zoomLocked) return;

    targetZ += e.deltaY * 0.01;

    targetZ = Math.max(
        MIN_Z,
        Math.min(
            MAX_Z,
            targetZ
        )
    );

}

//----------------------------------
// BLOQUEAR ZOOM
//----------------------------------

export function lockCameraZoom() {

    zoomLocked = true;

}

//----------------------------------
// DESBLOQUEAR ZOOM
//----------------------------------

export function unlockCameraZoom() {

    zoomLocked = false;

}

//----------------------------------
// ENTRAR EN FOCUS
//----------------------------------

export function enterCameraFocus() {

    focusMode = true;

}

//----------------------------------
// SALIR DEL FOCUS
//----------------------------------

export function exitCameraFocus() {

    focusMode = false;

    targetZ = 12;

}

//----------------------------------
// ANIMACIÓN
//----------------------------------

function animate() {

    requestAnimationFrame(animate);

    if (!camera) return;

    //----------------------------------
    // OBJETIVO
    //----------------------------------

    const desiredZ = focusMode
        ? getFocusZ()
        : targetZ;

    //----------------------------------
    // MOVIMIENTO SUAVE
    //----------------------------------

    camera.position.z +=

        (desiredZ - camera.position.z)

        * (

            focusMode
                ? FOCUS_SMOOTH
                : CAMERA_SMOOTH

        );

}