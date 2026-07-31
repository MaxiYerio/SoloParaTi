//js\objects\StarField.js

import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export function createStarField(scene) {

    const group = new THREE.Group();

    createLayer(group, 1800, 0.08, 260, [
        "#ffffff",
        "#f8f8ff",
        "#efe9ff"
    ]);

    createLayer(group, 900, 0.16, 190, [
        "#ffffff",
        "#e8d5ff",
        "#dcb8ff"
    ]);

    createLayer(group, 350, 0.28, 120, [
        "#ffffff",
        "#d8b4fe",
        "#c084fc"
    ]);

    return {

        object: group,

        update() {

            group.rotation.y += 0.00008;

            group.rotation.x += 0.00002;

        }

    };

}

function createLayer(group, amount, size, radius, palette) {

    const geometry = new THREE.BufferGeometry();

    const positions = [];
    const colors = [];

    for (let i = 0; i < amount; i++) {

        positions.push(

            (Math.random() - 0.5) * radius,
            (Math.random() - 0.5) * radius,
            (Math.random() - 0.5) * radius

        );

        const color = new THREE.Color(

            palette[Math.floor(Math.random() * palette.length)]

        );

        colors.push(color.r, color.g, color.b);

    }

    geometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(positions, 3)

    );

    geometry.setAttribute(

        "color",

        new THREE.Float32BufferAttribute(colors, 3)

    );

    const material = new THREE.PointsMaterial({

        size,

        vertexColors: true,

        transparent: true,

        opacity: 0.9,

        depthWrite: false,

        sizeAttenuation: true

    });

    const stars = new THREE.Points(geometry, material);

    group.add(stars);

}