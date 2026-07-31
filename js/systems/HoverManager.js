import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

let hovered = null;
let previous = null;

export function setupHover(renderer, camera, scene) {

    renderer.domElement.addEventListener(

        "pointermove",

        event => {

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

            if (previous) {

                previous.scale.set(

                    previous.userData.baseScale.x,

                    previous.userData.baseScale.y,

                    1

                );

                previous.material.color.set(

                    previous.userData.baseColor

                );

            }

            if (intersects.length) {

                hovered = intersects[0].object;

                if (hovered.userData.baseScale) {

                    hovered.scale.set(

                        hovered.userData.baseScale.x * 1.15,

                        hovered.userData.baseScale.y * 1.15,

                        1

                    );

                    hovered.material.color.set("#FFFFFF");

                    previous = hovered;

                }

            }
            else {

                hovered = null;

                previous = null;

            }

        }

    );

}

export function getHoveredObject() {

    return hovered;

}