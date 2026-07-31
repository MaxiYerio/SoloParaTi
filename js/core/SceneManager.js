//js\core\SceneManager.js

import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";
import { createStarField } from "../objects/StarField.js";
import { createCoreSphere } from "../objects/CoreSphere.js";
import { createWordSphere } from "../objects/WordSphere.js";
import { createTextSprite } from "../objects/TextSprite.js";
import { setupInteraction } from "../systems/InteractionManager.js";

let scene;
let camera;
let renderer;
let stars;
let core;
let wordSphere;
let ambientLight;
let pointLight;
let hemisphereLight;

export function initScene() {

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0x0B0515);

    //----------------------------------
    // LUCES
    //----------------------------------

    ambientLight = new THREE.AmbientLight(

        0xffffff,

        0.18

    );

    scene.add(ambientLight);

    hemisphereLight = new THREE.HemisphereLight(

        0xd6b8ff,

        0x08070d,

        0.35

    );

    scene.add(hemisphereLight);

    pointLight = new THREE.PointLight(

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

    scene.add(pointLight);

    stars = createStarField(scene);

    scene.add(stars.object);

    core = createCoreSphere(scene);

    scene.add(core.object);

    wordSphere = createWordSphere(scene);

    scene.add(wordSphere.object);

    camera = new THREE.PerspectiveCamera(

        60,

        window.innerWidth / window.innerHeight,

        0.1,

        1000

    );

    camera.position.z = 12;

    renderer = new THREE.WebGLRenderer({

        antialias: true,

        alpha: true

    });

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

    renderer.setPixelRatio(

        window.devicePixelRatio

    );

    document
        .getElementById("scene")
        .appendChild(renderer.domElement);

    // Ahora el canvas ya existe
    setupInteraction(wordSphere.object);

    animate();

}

function animate() {

    requestAnimationFrame(animate);

    stars.update();

    core.update();

    wordSphere.update(camera);

    pointLight.intensity =

        6.8 +

        Math.sin(

            performance.now() * 0.0015

        ) * 0.6;

    renderer.render(scene, camera);

}

window.addEventListener("resize", () => {

    if (!camera) return;

    camera.aspect =

        window.innerWidth /

        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

});