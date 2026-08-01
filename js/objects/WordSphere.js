//js\objects\WordSphere.js

import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";
import {

    getUniverseFade

} from "../systems/UniverseFocus.js";
import { createTextSprite } from "./TextSprite.js";
import { UniverseData } from "../config/UniverseData.js";

export function createWordSphere(scene) {

    const group = new THREE.Group();

    const generatedWords = UniverseData;

    const radius = 4;

    const total = 180;

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    const points = [];

    for (let i = 0; i < total; i++) {

        const y = 1 - (i / (total - 1)) * 2;

        const r = Math.sqrt(1 - y * y);

        const theta = goldenAngle * i;

        const x = Math.cos(theta) * r;

        const z = Math.sin(theta) * r;

        const data = generatedWords[
            i % generatedWords.length
        ];

        const mesh = createTextSprite(data);

        mesh.position.set(

            x * radius,

            y * radius,

            z * radius

        );

        group.add(mesh);

        points.push({

            mesh,

            index: i,

            position: new THREE.Vector3(

                x,

                y,

                z

            )

        });

    }

    return {

        object: group,

        points,

        fadeOut() {

            points.forEach(point => {

                point.mesh.userData.targetOpacity = 0.08;

            });

        },

        fadeIn() {

            points.forEach(point => {

                point.mesh.userData.targetOpacity = 1;

            });

        },

        update(camera) {

            points.forEach(point => {

                const mesh = point.mesh;

                if (mesh.userData.targetOpacity === undefined) {

                    mesh.userData.targetOpacity = 1;

                }

                mesh.material.opacity +=

                    (

                        mesh.userData.targetOpacity

                        -

                        mesh.material.opacity

                    ) * 0.08;

            });

        }

    };

}