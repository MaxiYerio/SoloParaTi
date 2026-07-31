//js\objects\CoreSphere.js

import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

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

        update() {

            const t = performance.now() * 0.001;

            const pulse = 1 + Math.sin(t * 2) * 0.02;

            sphere.scale.setScalar(pulse);

            halo.scale.setScalar(
                1.03 + Math.sin(t * 2) * 0.015
            );

            halo.material.opacity =
                0.08 +
                Math.sin(t * 2.5) * 0.03;

            group.rotation.y += 0.001;

        }

    };

}