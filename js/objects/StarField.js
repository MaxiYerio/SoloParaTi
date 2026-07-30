import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export function createStarField(scene) {

    const geometry = new THREE.BufferGeometry();

    const starCount = 3000;

    const positions = [];

    const colors = [];

    const colorPalette = [

        new THREE.Color("#ffffff"),
        new THREE.Color("#E9D5FF"),
        new THREE.Color("#C084FC"),
        new THREE.Color("#D8B4FE")

    ];

    for (let i = 0; i < starCount; i++) {

        positions.push(

            (Math.random() - 0.5) * 250,
            (Math.random() - 0.5) * 250,
            (Math.random() - 0.5) * 250

        );

        const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];

        colors.push(c.r, c.g, c.b);

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

        size: 0.4,

        vertexColors: true,

        transparent: true,

        opacity: 0.9,

        sizeAttenuation: true

    });

    const stars = new THREE.Points(

        geometry,

        material

    );

    scene.add(stars);

    return stars;

}