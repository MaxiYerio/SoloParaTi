//js\objects\CoreSphere.js

import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

let focus = false;

export function createCoreSphere() {

    const group = new THREE.Group();

    // Núcleo
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.1, 64, 64),
        new THREE.MeshPhysicalMaterial({
            color: 0x18111F,
            roughness: 0.3,
            metalness: 0.15,
            clearcoat: 1,
            clearcoatRoughness: 0
        })
    );

    group.add(sphere);

    // Halo exterior
    const halo = new THREE.Mesh(
        new THREE.SphereGeometry(1.45, 64, 64),
        new THREE.MeshBasicMaterial({
            color: 0xB987FF,
            transparent: true,
            opacity: 0.10,
            side: THREE.BackSide
        })
    );

    group.add(halo);

    return {

        object: group,

        focus() {

            focus = true;

        },

        unfocus() {

            focus = false;

        },

        update() {

            const t = performance.now() * 0.001;

            const speed = focus ? 1 : 2;

            const amount = focus ? 0.05 : 0.02;

            const pulse =

                1 +

                Math.sin(t * speed) * amount;

            sphere.scale.setScalar(pulse);

            const haloScale =

                focus

                    ? 1.08

                    : 1.03;

            halo.scale.x += (haloScale - halo.scale.x) * 0.05;
            halo.scale.y += (haloScale - halo.scale.y) * 0.05;
            halo.scale.z += (haloScale - halo.scale.z) * 0.05;

            const targetOpacity =

                focus

                    ? 0.18

                    : 0.08;

            halo.material.opacity +=

                (

                    targetOpacity

                    -

                    halo.material.opacity

                ) * 0.06;

            group.rotation.y += 0.001;

        }

    };

}