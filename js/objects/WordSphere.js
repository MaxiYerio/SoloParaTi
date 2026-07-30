import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";
import { createTextSprite } from "./TextSprite.js";
import { words } from "../data/words.js";

export function createWordSphere(scene) {

    const group = new THREE.Group();

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

        const mesh = createTextSprite(

            words[i % words.length]

        );

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

        update() {

            group.rotation.y += 0.0015;

            group.rotation.x += 0.0003;

        }

    };

}