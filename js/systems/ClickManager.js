// js/systems/ClickManager.js

import * as THREE from
    "https://unpkg.com/three@0.179.1/build/three.module.js";

import {
    showMessage,
    hideMessage
} from "./MessageSystem.js";

import {
    wasDragging
} from "./InteractionManager.js";

import {
    interactWithWord
} from "./WordInteraction.js";

import {
    playSequence,
    beginUniverseFocus,
    endUniverseFocus,
    isUniverseBusy
} from "./UniverseFocus.js";

import {
    enterCameraFocus,
    exitCameraFocus,
    lockCameraZoom,
    unlockCameraZoom
} from "./CameraController.js";

import {
    startChihiro
} from "../music.js";

const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

//----------------------------------
// REFERENCIAS
//----------------------------------

let camera;
let scene;
let renderer;

//----------------------------------
// CONFIGURACIÓN
//----------------------------------

const MESSAGE_DURATION = 1800;

//----------------------------------
// SETUP
//----------------------------------

export function setupClick(
    rendererInstance,
    cameraInstance,
    sceneInstance
) {

    renderer = rendererInstance;

    camera = cameraInstance;

    scene = sceneInstance;

    renderer.domElement.addEventListener(
        "click",
        handleClick
    );

}

//----------------------------------
// CLICK
//----------------------------------

async function handleClick(event) {


    if (wasDragging()) {

        return;

    }

    //----------------------------------
    // Si el universo está ocupado
    //----------------------------------

    if (isUniverseBusy()) return;

    //----------------------------------
    // Iniciar Chihiro
    //----------------------------------

    startChihiro();

    //----------------------------------
    // POSICIÓN DEL MOUSE
    //----------------------------------

    mouse.x =
        (event.clientX / window.innerWidth) * 2 - 1;

    mouse.y =
        -(event.clientY / window.innerHeight) * 2 + 1;

    //----------------------------------
    // RAYCAST
    //----------------------------------

    raycaster.setFromCamera(
        mouse,
        camera
    );

    //----------------------------------
    // BUSCAR OBJETO
    //----------------------------------

    const intersects =
        raycaster.intersectObjects(
            scene.children,
            true
        );

    if (!intersects.length) return;

    //----------------------------------
    // OBJETO CLICKEADO
    //----------------------------------

    const object =
        intersects[0].object;

    const data =
        object.userData.data;

    if (!data) return;

    console.log("CLICK:", data);

    //----------------------------------
    // BLOQUEAR CÁMARA
    //----------------------------------

    lockCameraZoom();

    beginUniverseFocus();

    enterCameraFocus();

    //----------------------------------
    // PEQUEÑA PAUSA
    //----------------------------------

    await wait(500);

    //----------------------------------
    // MEMORY
    //----------------------------------

    if (data.type === "memory") {

        await playSequence(
            data.sequence,
            true
        );

        exitCameraFocus();

        unlockCameraZoom();

        endUniverseFocus();

        return;

    }

    //----------------------------------
    // FOLDER
    //----------------------------------

    //----------------------------------
    // FOLDER
    //----------------------------------

    if (data.type === "folder") {

        // El menú de canciones NO debe dejar
        // el universo bloqueado/enfocado.

        interactWithWord(data);

        exitCameraFocus();
        unlockCameraZoom();
        endUniverseFocus();

        return;

    }

    //----------------------------------
    // SECRET
    //----------------------------------

    if (data.type === "secret") {

        interactWithWord(data);

        await wait(300);

        exitCameraFocus();

        unlockCameraZoom();

        endUniverseFocus();

        return;

    }

    //----------------------------------
    // PALABRA NORMAL
    //----------------------------------

    showMessage(
        data.text
    );

    await wait(
        MESSAGE_DURATION
    );

    hideMessage();

    await wait(300);

    exitCameraFocus();

    unlockCameraZoom();

    endUniverseFocus();

}

//----------------------------------
// WAIT
//----------------------------------

function wait(ms) {

    return new Promise(
        resolve => {

            setTimeout(
                resolve,
                ms
            );

        }
    );

}