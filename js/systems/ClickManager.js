// js\systems\ClickManager.js

import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";
import {

    showMessage,
    hideMessage

} from "./MessageSystem.js";

import {

    playSequence

} from "./UniverseFocus.js";

import {

    isUniverseBusy

} from "./UniverseFocus.js";

const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

export function setupClick(renderer, camera, scene) {

    renderer.domElement.addEventListener(

        "click",

        event => {

            if (isUniverseBusy()) return;

            mouse.x =

                (event.clientX / window.innerWidth) * 2 - 1;

            mouse.y =

                -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(

                mouse,

                camera

            );

            const intersects = raycaster.intersectObjects(

                scene.children,

                true

            );

            if (!intersects.length) return;

            const object = intersects[0].object;

            const data = object.userData.data;

            console.log(data);

            if (!data) return;
            
            if (data.type == "memory") {

                playSequence(

                    data.sequence

                );

                return;

            }

            showMessage(

                data.text

            );

            setTimeout(() => {

                hideMessage();

            }, 1800);

        }

    );

}