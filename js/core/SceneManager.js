// js/core/SceneManager.js

import * as THREE from
    "https://unpkg.com/three@0.179.1/build/three.module.js";

import {
    createStarField
} from "../objects/StarField.js";

import {
    createCoreSphere
} from "../objects/CoreSphere.js";

import {
    createWordSphere
} from "../objects/WordSphere.js";

import {
    createFocusWord
} from "../objects/FocusWord.js";

import {
    setupInteraction
} from "../systems/InteractionManager.js";

import {
    setupCameraController
} from "../systems/CameraController.js";

import {
    setupCameraFocus,
    updateCameraFocus
} from "../systems/CameraFocus.js";

import {
    setupHover
} from "../systems/HoverManager.js";

import {
    setupClick
} from "../systems/ClickManager.js";

import {
    initMessageSystem
} from "../systems/MessageSystem.js";

import {
    setupUniverseFocus,
    updateUniverseFocus
} from "../systems/UniverseFocus.js";

import {
    setupWordInteractionCore
} from "../systems/WordInteraction.js";

let scene;
let camera;
let renderer;

let stars;
let core;
let wordSphere;
let focusWord;

let ambientLight;
let pointLight;
let hemisphereLight;

//--------------------------------------------------
// INICIALIZAR ESCENA
//--------------------------------------------------

export function initScene() {

    scene =
        new THREE.Scene();

    scene.background =
        new THREE.Color(
            0x0B0515
        );

    //--------------------------------------------------
    // LUZ AMBIENTE
    //--------------------------------------------------

    ambientLight =
        new THREE.AmbientLight(

            0xffffff,

            0.18

        );

    scene.add(
        ambientLight
    );

    //--------------------------------------------------
    // LUZ HEMISFÉRICA
    //--------------------------------------------------

    hemisphereLight =
        new THREE.HemisphereLight(

            0xd6b8ff,

            0x08070d,

            0.35

        );

    scene.add(
        hemisphereLight
    );

    //--------------------------------------------------
    // LUZ CENTRAL
    //--------------------------------------------------

    pointLight =
        new THREE.PointLight(

            0xb987ff,

            7,

            18,

            2

        );

    pointLight.position.set(
        0,
        0,
        0
    );

    scene.add(
        pointLight
    );

    //--------------------------------------------------
    // ESTRELLAS
    //--------------------------------------------------

    stars =
        createStarField(
            scene
        );

    scene.add(
        stars.object
    );

    //--------------------------------------------------
    // WORD SPHERE
    //--------------------------------------------------

    wordSphere =
        createWordSphere();

    scene.add(
        wordSphere.object
    );

    //--------------------------------------------------
    // CORE
    //--------------------------------------------------

    core =
        createCoreSphere(
            scene
        );

    scene.add(
        core.object
    );

    //--------------------------------------------------
    // CONECTAR WORD INTERACTION
    //--------------------------------------------------

    setupWordInteractionCore(

        core,

        wordSphere

    );

    //--------------------------------------------------
    // PALABRA CENTRAL
    //--------------------------------------------------

    focusWord =
        createFocusWord();

    core.object.add(
        focusWord.object
    );

    //--------------------------------------------------
    // CÁMARA
    //--------------------------------------------------

    camera =
        new THREE.PerspectiveCamera(

            60,

            window.innerWidth /
            window.innerHeight,

            0.1,

            1000

        );

    camera.position.z =
        12;

    //--------------------------------------------------
    // RENDERER
    //--------------------------------------------------

    renderer =
        new THREE.WebGLRenderer({

            antialias:
                true,

            alpha:
                true

        });

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

    renderer.setPixelRatio(
        window.devicePixelRatio
    );

    //--------------------------------------------------
    // CANVAS
    //--------------------------------------------------

    document
        .getElementById("scene")
        .appendChild(
            renderer.domElement
        );

    //--------------------------------------------------
    // INTERACTION
    //--------------------------------------------------

    setupInteraction(
        wordSphere.object
    );

    setupCameraController(
        camera
    );

    setupCameraFocus(
        camera
    );

    setupHover(

        renderer,

        camera,

        scene

    );

    setupClick(

        renderer,

        camera,

        scene

    );

    //--------------------------------------------------
    // MENSAJES
    //--------------------------------------------------

    initMessageSystem();

    //--------------------------------------------------
    // UNIVERSO
    //--------------------------------------------------

    setupUniverseFocus({

        stars,

        wordSphere,

        core,

        focusWord

    });

    //--------------------------------------------------
    // ANIMACIÓN
    //--------------------------------------------------

    animate();

}

//--------------------------------------------------
// ANIMACIÓN
//--------------------------------------------------

function animate() {

    requestAnimationFrame(
        animate
    );

    //--------------------------------------------------
    // FOCUS
    //--------------------------------------------------

    updateUniverseFocus();

    updateCameraFocus();

    //--------------------------------------------------
    // OBJETOS
    //--------------------------------------------------

    stars.update();

    core.update();

    wordSphere.update(
        camera
    );

    focusWord.update();

    //--------------------------------------------------
    // LUZ DEL NÚCLEO
    //--------------------------------------------------

    pointLight.color.setHex(
        core.getColor()
    );

    pointLight.intensity =

        6.8 +

        Math.sin(
            performance.now() *
            0.0015
        ) *
        0.6;

    //--------------------------------------------------
    // RENDER
    //--------------------------------------------------

    renderer.render(
        scene,
        camera
    );

}

//--------------------------------------------------
// RESIZE
//--------------------------------------------------

window.addEventListener(
    "resize",
    () => {

        if (!camera) return;

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    }
);