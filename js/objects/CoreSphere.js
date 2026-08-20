// js/objects/CoreSphere.js

import * as THREE from
    "https://unpkg.com/three@0.179.1/build/three.module.js";

import {
    initCoreColor,
    nextCoreColor,
    getCurrentCoreColor
} from "../systems/CoreColorManager.js";

import {
    getAudioData
} from "../music.js";

let focus = false;
let guillotineMode = false;
let musicVisualizerMode = false;

//--------------------------------------------------
// SHADER DEL NÚCLEO
//--------------------------------------------------

const vertexShader = `

    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {

        vNormal = normalize(normalMatrix * normal);

        vPosition = position;

        gl_Position =
            projectionMatrix *
            modelViewMatrix *
            vec4(position, 1.0);

    }

`;

const fragmentShader = `

    uniform vec3 uColor;
    uniform float uTime;
    uniform float uFocus;

    varying vec3 vNormal;
    varying vec3 vPosition;

    //--------------------------------------------------
    // RUIDO SIMPLE
    //--------------------------------------------------

    float hash(vec3 p) {

        p = fract(p * 0.3183099 + 0.1);

        p *= 17.0;

        return fract(
            p.x *
            p.y *
            p.z *
            (p.x + p.y + p.z)
        );

    }

    float noise(vec3 p) {

        vec3 i = floor(p);
        vec3 f = fract(p);

        f = f * f * (3.0 - 2.0 * f);

        return mix(

            mix(
                mix(
                    hash(i),
                    hash(i + vec3(1,0,0)),
                    f.x
                ),

                mix(
                    hash(i + vec3(0,1,0)),
                    hash(i + vec3(1,1,0)),
                    f.x
                ),

                f.y
            ),

            mix(

                mix(
                    hash(i + vec3(0,0,1)),
                    hash(i + vec3(1,0,1)),
                    f.x
                ),

                mix(
                    hash(i + vec3(0,1,1)),
                    hash(i + vec3(1,1,1)),
                    f.x
                ),

                f.y
            ),

            f.z
        );

    }

    //--------------------------------------------------
    // MAIN
    //--------------------------------------------------

    void main() {

        vec3 normal =
            normalize(vNormal);

        //--------------------------------------------------
        // LUZ DE BORDE
        //--------------------------------------------------

        float fresnel =
            pow(
                1.0 - max(
                    dot(
                        normal,
                        vec3(0.0, 0.0, 1.0)
                    ),
                    0.0
                ),
                2.5
            );

        //--------------------------------------------------
        // ENERGÍA INTERNA
        //--------------------------------------------------

        vec3 p =
            vPosition * 2.8;

        p.z += uTime * 0.12;

        float n1 =
            noise(
                p +
                vec3(
                    uTime * 0.08,
                    -uTime * 0.05,
                    0.0
                )
            );

        float n2 =
            noise(
                p * 2.2 -
                vec3(
                    uTime * 0.12,
                    uTime * 0.07,
                    0.0
                )
            );

        float energy =
            n1 * 0.65 +
            n2 * 0.35;

        //--------------------------------------------------
        // MANCHAS DE ENERGÍA
        //--------------------------------------------------

        float energyMask =
            smoothstep(
                0.28,
                0.78,
                energy
            );

        //--------------------------------------------------
        // COLOR
        //--------------------------------------------------

        vec3 baseColor =
            uColor;

        vec3 brightColor =
            mix(
                baseColor,
                vec3(1.0),
                0.35
            );

        vec3 finalColor =
            mix(
                baseColor * 0.35,
                brightColor,
                energyMask
            );

        //--------------------------------------------------
        // BORDE CÓSMICO
        //--------------------------------------------------

        finalColor +=
            baseColor *
            fresnel *
            (1.5 + uFocus * 1.5);

        //--------------------------------------------------
        // PEQUEÑO BRILLO INTERNO
        //--------------------------------------------------

        finalColor +=
            brightColor *
            energyMask *
            0.12;

        //--------------------------------------------------
        // OPACIDAD
        //--------------------------------------------------

        float alpha =
            0.72 +
            fresnel * 0.28;

        //--------------------------------------------------
        // FOCUS
        //--------------------------------------------------

        alpha +=
            uFocus * 0.12;

        gl_FragColor =
            vec4(
                finalColor,
                alpha
            );

    }

`;

//--------------------------------------------------
// CREAR NÚCLEO
//--------------------------------------------------

export function createCoreSphere() {

    const group =
        new THREE.Group();

    //--------------------------------------------------
    // COLOR GUARDADO
    //--------------------------------------------------

    const savedColor =
        initCoreColor();

    const color =
        new THREE.Color(
            savedColor
        );

    //--------------------------------------------------
    // NÚCLEO PRINCIPAL
    //--------------------------------------------------

    const sphereMaterial =
        new THREE.ShaderMaterial({

            uniforms: {

                uColor: {
                    value: color.clone()
                },

                uTime: {
                    value: 0
                },

                uFocus: {
                    value: 0
                }

            },

            vertexShader,

            fragmentShader,

            transparent: true,

            blending:
                THREE.AdditiveBlending,

            depthWrite: false,

            side:
                THREE.FrontSide

        });

    const sphere =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                1.08,
                64,
                64
            ),

            sphereMaterial

        );

    group.add(sphere);

    //--------------------------------------------------
    // GLOW INTERNO
    //--------------------------------------------------

    const glowMaterial =
        new THREE.MeshBasicMaterial({

            color: color.clone(),

            transparent: true,

            opacity: 0.08,

            blending:
                THREE.AdditiveBlending,

            depthWrite: false,

            side:
                THREE.BackSide

        });

    const glow =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                1.35,
                48,
                48
            ),

            glowMaterial

        );

    group.add(glow);

    //--------------------------------------------------
    // HALO EXTERIOR
    //--------------------------------------------------

    const haloMaterial =
        new THREE.MeshBasicMaterial({

            color: color.clone(),

            transparent: true,

            opacity: 0.035,

            blending:
                THREE.AdditiveBlending,

            depthWrite: false,

            side:
                THREE.BackSide

        });

    const halo =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                1.75,
                48,
                48
            ),

            haloMaterial

        );

    group.add(halo);

    //--------------------------------------------------
    // PARTÍCULAS
    //--------------------------------------------------

    const particleCount = 90;

    const positions =
        new Float32Array(
            particleCount * 3
        );

    const particleData = [];

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;

        const radius =
            1.25 +
            Math.random() * 0.75;

        const y =
            (Math.random() - 0.5) *
            1.8;

        const x =
            Math.cos(angle) *
            radius;

        const z =
            Math.sin(angle) *
            radius;

        positions[i * 3] =
            x;

        positions[i * 3 + 1] =
            y;

        positions[i * 3 + 2] =
            z;

        particleData.push({

            angle,

            radius,

            speed:
                0.15 +
                Math.random() * 0.35,

            offset:
                Math.random() *
                Math.PI *
                2

        });

    }

    const particleGeometry =
        new THREE.BufferGeometry();

    particleGeometry.setAttribute(

        "position",

        new THREE.BufferAttribute(
            positions,
            3
        )

    );

    const particleMaterial =
        new THREE.PointsMaterial({

            color: color.clone(),

            size: 0.035,

            transparent: true,

            opacity: 0.7,

            blending:
                THREE.AdditiveBlending,

            depthWrite: false

        });

    const particles =
        new THREE.Points(

            particleGeometry,

            particleMaterial

        );

    group.add(particles);

    //--------------------------------------------------
    // CAMBIAR COLOR
    //--------------------------------------------------

    function setColor(newColor) {

        const threeColor =
            new THREE.Color(
                newColor
            );

        sphereMaterial.uniforms
            .uColor.value
            .copy(threeColor);

        glow.material.color
            .copy(threeColor);

        halo.material.color
            .copy(threeColor);

        particles.material.color
            .copy(threeColor);

    }

    //--------------------------------------------------
    // SIGUIENTE COLOR
    //--------------------------------------------------

    function changeColor() {

        const newColor =
            nextCoreColor();

        setColor(newColor);

    }

    //--------------------------------------------------
    // UPDATE
    //--------------------------------------------------

    function update() {

        const time =
            performance.now() *
            0.001;

        const audio =
            musicVisualizerMode
                ? getAudioData()
                : {
                    bass: 0,
                    mid: 0,
                    treble: 0,
                    overall: 0
                };

        //--------------------------------------------------
        // TIEMPO DEL SHADER
        //--------------------------------------------------

        sphereMaterial.uniforms
            .uTime.value =
            time;

        //--------------------------------------------------
        // FOCUS
        //--------------------------------------------------

        const targetFocus =
            focus ? 1 : 0;

        const targetGuillotine =
            guillotineMode ? 1 : 0;

        sphereMaterial.uniforms
            .uFocus.value +=
            (
                targetFocus -
                sphereMaterial.uniforms
                    .uFocus.value
            ) * 0.06;

        //--------------------------------------------------
        // PULSO
        //--------------------------------------------------

        const musicPulse =
            musicVisualizerMode
                ? audio.bass * 0.22
                : 0;

        const pulseSpeed =
            guillotineMode
                ? 2.8
                : focus
                    ? 1.4
                    : 1.8;

        const pulseAmount =
            guillotineMode
                ? 0.075
                : focus
                    ? 0.045
                    : 0.018;

        const normalPulse =
            Math.sin(
                time * pulseSpeed
            ) *
            pulseAmount;

        const pulse =
            1 +
            normalPulse +
            musicPulse;

        sphere.scale.setScalar(
            pulse
        );

        //--------------------------------------------------
        // GLOW
        //--------------------------------------------------

        const targetGlow =
            guillotineMode
                ? 1.28
                : musicVisualizerMode
                    ? 1.04 + audio.overall * 0.22
                    : focus
                        ? 1.16
                        : 1.04;

        glow.scale.x +=
            (
                targetGlow -
                glow.scale.x
            ) * 0.05;

        glow.scale.y +=
            (
                targetGlow -
                glow.scale.y
            ) * 0.05;

        glow.scale.z +=
            (
                targetGlow -
                glow.scale.z
            ) * 0.05;

        //--------------------------------------------------
        // HALO
        //--------------------------------------------------

        const targetHalo =
            guillotineMode
                ? 1.22
                : focus
                    ? 1.12
                    : 1.02;

        halo.scale.x +=
            (
                targetHalo -
                halo.scale.x
            ) * 0.04;

        halo.scale.y +=
            (
                targetHalo -
                halo.scale.y
            ) * 0.04;

        halo.scale.z +=
            (
                targetHalo -
                halo.scale.z
            ) * 0.04;

        //--------------------------------------------------
        // OPACIDAD
        //--------------------------------------------------

        const targetGlowOpacity =
            guillotineMode
                ? 0.16
                : focus
                    ? 0.14
                    : 0.075;

        glow.material.opacity +=
            (
                targetGlowOpacity -
                glow.material.opacity
            ) * 0.06;

        const targetHaloOpacity =
            focus
                ? 0.06
                : 0.035;

        halo.material.opacity +=
            (
                targetHaloOpacity -
                halo.material.opacity
            ) * 0.05;

        //--------------------------------------------------
        // PARTÍCULAS
        //--------------------------------------------------

        particles.rotation.y +=
            guillotineMode
                ? 0.004
                : musicVisualizerMode
                    ? 0.001 +
                    audio.mid * 0.004
                    : focus
                        ? 0.0025
                        : 0.001;

        particles.rotation.x +=
            guillotineMode
                ? 0.001
                : musicVisualizerMode
                    ? 0.0004 +
                    audio.treble * 0.0015
                    : 0.0004;

        //--------------------------------------------------
        // ROTACIÓN DEL NÚCLEO
        //--------------------------------------------------

        group.rotation.y +=
            focus
                ? 0.0015
                : 0.0005;

    }

    //--------------------------------------------------
    // API
    //--------------------------------------------------

    return {

        object: group,

        focus() {

            focus = true;

        },

        unfocus() {

            focus = false;

        },

        startGuillotine() {

            guillotineMode = true;

        },

        stopGuillotine() {

            guillotineMode = false;

        },

        startMusicVisualizer() {

            musicVisualizerMode = true;

        },

        stopMusicVisualizer() {

            musicVisualizerMode = false;

        },

        changeColor,

        setColor,

        getColor() {

            return getCurrentCoreColor();

        },

        update

    };

}