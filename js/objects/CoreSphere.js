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
// PALETA MUSICAL
//--------------------------------------------------

let musicColors = [];

let currentMusicColor = new THREE.Color();

let targetMusicColor = new THREE.Color();

let musicColorIndex = 0;

let musicColorTimer = 0;

const MUSIC_COLOR_CHANGE_TIME = 2.8;
const MUSIC_COLOR_SMOOTH = 0.035;

let lastMusicUpdate = performance.now();

//--------------------------------------------------
// COLOR ORIGINAL
//--------------------------------------------------

let originalColor = new THREE.Color();

let hasMusicColor = false;

//--------------------------------------------------
// SHADER DEL NÚCLEO
//--------------------------------------------------

const vertexShader = `

    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {

        vNormal =
            normalize(
                normalMatrix * normal
            );

        vPosition =
            position;

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
    uniform float uMusicEnergy;

    varying vec3 vNormal;
    varying vec3 vPosition;

    //--------------------------------------------------
    // RUIDO
    //--------------------------------------------------

    float hash(vec3 p) {

        p = fract(
            p * 0.3183099 + 0.1
        );

        p *= 17.0;

        return fract(
            p.x *
            p.y *
            p.z *
            (p.x + p.y + p.z)
        );

    }

    float noise(vec3 p) {

        vec3 i =
            floor(p);

        vec3 f =
            fract(p);

        f =
            f *
            f *
            (3.0 - 2.0 * f);

        return mix(

            mix(
                mix(
                    hash(i),

                    hash(
                        i +
                        vec3(1,0,0)
                    ),

                    f.x
                ),

                mix(
                    hash(
                        i +
                        vec3(0,1,0)
                    ),

                    hash(
                        i +
                        vec3(1,1,0)
                    ),

                    f.x
                ),

                f.y
            ),

            mix(

                mix(
                    hash(
                        i +
                        vec3(0,0,1)
                    ),

                    hash(
                        i +
                        vec3(1,0,1)
                    ),

                    f.x
                ),

                mix(
                    hash(
                        i +
                        vec3(0,1,1)
                    ),

                    hash(
                        i +
                        vec3(1,1,1)
                    ),

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
                1.0 -
                max(
                    dot(
                        normal,
                        vec3(
                            0.0,
                            0.0,
                            1.0
                        )
                    ),
                    0.0
                ),
                2.5
            );

        //--------------------------------------------------
        // ENERGÍA INTERNA
        //--------------------------------------------------

        vec3 p =
            vPosition *
            2.8;

        p.z +=
            uTime *
            0.12;

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

        //--------------------------------------------------
        // ENERGÍA NORMAL
        //--------------------------------------------------

        float energy =
            n1 * 0.65 +
            n2 * 0.35;

        //--------------------------------------------------
        // ENERGÍA MUSICAL
        //--------------------------------------------------

        energy +=
            uMusicEnergy *
            0.45;

        //--------------------------------------------------
        // MANCHAS
        //--------------------------------------------------

        float energyMask =
            smoothstep(
                0.25,
                0.72,
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
                0.42
            );

        vec3 finalColor =
            mix(
                baseColor * 0.35,
                brightColor,
                energyMask
            );

        //--------------------------------------------------
        // FLASH MUSICAL
        //--------------------------------------------------

        finalColor +=
            brightColor *
            uMusicEnergy *
            0.35;

        //--------------------------------------------------
        // BORDE CÓSMICO
        //--------------------------------------------------

        finalColor +=
            baseColor *
            fresnel *
            (
                1.5 +
                uFocus * 1.5 +
                uMusicEnergy * 2.5
            );

        //--------------------------------------------------
        // BRILLO INTERNO
        //--------------------------------------------------

        finalColor +=
            brightColor *
            energyMask *
            (
                0.12 +
                uMusicEnergy * 0.35
            );

        //--------------------------------------------------
        // OPACIDAD
        //--------------------------------------------------

        float alpha =
            0.72 +
            fresnel * 0.28;

        alpha +=
            uFocus * 0.12;

        alpha +=
            uMusicEnergy * 0.08;

        //--------------------------------------------------
        // OUTPUT
        //--------------------------------------------------

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
    // COLOR INICIAL
    //--------------------------------------------------

    const savedColor =
        initCoreColor();

    const color =
        new THREE.Color(
            savedColor
        );

    originalColor.copy(
        color
    );

    currentMusicColor.copy(
        color
    );

    targetMusicColor.copy(
        color
    );

    //--------------------------------------------------
    // MATERIAL DEL NÚCLEO
    //--------------------------------------------------

    const sphereMaterial =
        new THREE.ShaderMaterial({

            uniforms: {

                uColor: {

                    value:
                        color.clone()

                },

                uTime: {

                    value: 0

                },

                uFocus: {

                    value: 0

                },

                uMusicEnergy: {

                    value: 0

                }

            },

            vertexShader,

            fragmentShader,

            transparent:
                true,

            blending:
                THREE.AdditiveBlending,

            depthWrite:
                false,

            side:
                THREE.FrontSide

        });

    //--------------------------------------------------
    // ESFERA
    //--------------------------------------------------

    const sphere =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                1.08,
                64,
                64
            ),

            sphereMaterial

        );

    group.add(
        sphere
    );

    //--------------------------------------------------
    // GLOW INTERNO
    //--------------------------------------------------

    const glowMaterial =
        new THREE.MeshBasicMaterial({

            color:
                color.clone(),

            transparent:
                true,

            opacity:
                0.08,

            blending:
                THREE.AdditiveBlending,

            depthWrite:
                false,

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

    group.add(
        glow
    );

    //--------------------------------------------------
    // HALO EXTERIOR
    //--------------------------------------------------

    const haloMaterial =
        new THREE.MeshBasicMaterial({

            color:
                color.clone(),

            transparent:
                true,

            opacity:
                0.035,

            blending:
                THREE.AdditiveBlending,

            depthWrite:
                false,

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

    group.add(
        halo
    );

    //--------------------------------------------------
    // PARTÍCULAS
    //--------------------------------------------------

    const particleCount =
        90;

    const positions =
        new Float32Array(
            particleCount * 3
        );

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
            Math.random() *
            0.75;

        const y =
            (
                Math.random() -
                0.5
            ) *
            1.8;

        const x =
            Math.cos(angle) *
            radius;

        const z =
            Math.sin(angle) *
            radius;

        positions[
            i * 3
        ] =
            x;

        positions[
            i * 3 + 1
        ] =
            y;

        positions[
            i * 3 + 2
        ] =
            z;

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

            color:
                color.clone(),

            size:
                0.035,

            transparent:
                true,

            opacity:
                0.7,

            blending:
                THREE.AdditiveBlending,

            depthWrite:
                false

        });

    const particles =
        new THREE.Points(

            particleGeometry,

            particleMaterial

        );

    group.add(
        particles
    );

    //--------------------------------------------------
    // APLICAR COLOR A TODO EL NÚCLEO
    //--------------------------------------------------

    function applyColor(
        newColor
    ) {

        const threeColor =
            new THREE.Color(
                newColor
            );

        sphereMaterial
            .uniforms
            .uColor
            .value
            .copy(
                threeColor
            );

        glow.material.color.copy(
            threeColor
        );

        halo.material.color.copy(
            threeColor
        );

        particles.material.color.copy(
            threeColor
        );

    }

    //--------------------------------------------------
    // CAMBIAR COLOR NORMAL
    //--------------------------------------------------

    function setColor(
        newColor
    ) {

        applyColor(
            newColor
        );

        originalColor.set(
            newColor
        );

    }

    //--------------------------------------------------
    // SIGUIENTE COLOR
    //--------------------------------------------------

    function changeColor() {

        const newColor =
            nextCoreColor();

        setColor(
            newColor
        );

        // Actualizar inmediatamente los colores visuales
        currentMusicColor.copy(
            new THREE.Color(newColor)
        );

        targetMusicColor.copy(
            new THREE.Color(newColor)
        );

    }

    //--------------------------------------------------
    // CONFIGURAR COLORES DE MÚSICA
    //--------------------------------------------------

    function setMusicColors(
        colors
    ) {

        if (
            !Array.isArray(colors) ||
            colors.length === 0
        ) {

            return;

        }

        musicColors =
            colors.map(
                color =>
                    new THREE.Color(color)
            );

        musicColorIndex = 0;

        musicColorTimer = 0;

        lastMusicUpdate = performance.now();

        hasMusicColor = true;

        currentMusicColor.copy(
            musicColors[0]
        );

        targetMusicColor.copy(
            musicColors[0]
        );

        applyColor(
            currentMusicColor
        );

    }

    //--------------------------------------------------
    // SIGUIENTE COLOR MUSICAL
    //--------------------------------------------------

    function nextMusicColor() {

        if (
            musicColors.length <= 1
        ) {

            return;

        }

        musicColorIndex++;

        if (
            musicColorIndex >=
            musicColors.length
        ) {

            musicColorIndex = 0;

        }

        targetMusicColor.copy(
            musicColors[
            musicColorIndex
            ]
        );

    }

    //--------------------------------------------------
    // RESTAURAR COLOR ORIGINAL
    //--------------------------------------------------

    function resetMusicColors() {

        hasMusicColor = false;

        musicColors = [];

        musicColorIndex = 0;

        musicColorTimer = 0;

        targetMusicColor.copy(
            originalColor
        );

        currentMusicColor.copy(
            originalColor
        );

        applyColor(
            originalColor
        );

    }

    //--------------------------------------------------
    // UPDATE
    //--------------------------------------------------

    function update() {

        const time =
            performance.now() *
            0.001;

        //--------------------------------------------------
        // AUDIO
        //--------------------------------------------------

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
        // BANDAS
        //--------------------------------------------------

        const bass =
            audio.bass;

        const mid =
            audio.mid;

        const treble =
            audio.treble;

        const overall =
            audio.overall;

        //--------------------------------------------------
        // BOOM
        //--------------------------------------------------

        const bassBoom =
            Math.pow(
                bass,
                1.35
            );

        //--------------------------------------------------
        // ENERGÍA TOTAL
        //--------------------------------------------------

        const musicEnergy =
            Math.min(

                1,

                bassBoom * 0.70 +
                mid * 0.20 +
                overall * 0.10

            );

        //--------------------------------------------------
        // COLOR MUSICAL
        //--------------------------------------------------

        if (
            musicVisualizerMode &&
            hasMusicColor &&
            musicColors.length > 0
        ) {

            const now = performance.now();

            const deltaTime =
                (now - lastMusicUpdate) / 1000;

            lastMusicUpdate = now;

            musicColorTimer += deltaTime;

            //--------------------------------------------------
            // CAMBIO DE COLOR
            //--------------------------------------------------

            if (
                musicColorTimer >=
                MUSIC_COLOR_CHANGE_TIME
            ) {

                musicColorTimer = 0;

                nextMusicColor();

            }

            //--------------------------------------------------
            // TRANSICIÓN
            //--------------------------------------------------

            currentMusicColor.lerp(
                targetMusicColor,
                MUSIC_COLOR_SMOOTH
            );

            applyColor(
                currentMusicColor
            );

        }
        else {

            //--------------------------------------------------
            // VOLVER AL COLOR NORMAL
            //--------------------------------------------------

            currentMusicColor.lerp(
                targetMusicColor,
                0.025
            );

            if (
                !hasMusicColor
            ) {

                applyColor(
                    currentMusicColor
                );

            }

        }

        //--------------------------------------------------
        // SHADER
        //--------------------------------------------------

        sphereMaterial
            .uniforms
            .uTime
            .value =
            time;

        sphereMaterial
            .uniforms
            .uMusicEnergy
            .value +=

            (
                musicEnergy -

                sphereMaterial
                    .uniforms
                    .uMusicEnergy
                    .value

            ) *
            0.22;

        //--------------------------------------------------
        // FOCUS
        //--------------------------------------------------

        const targetFocus =
            focus
                ? 1
                : 0;

        sphereMaterial
            .uniforms
            .uFocus
            .value +=

            (
                targetFocus -

                sphereMaterial
                    .uniforms
                    .uFocus
                    .value

            ) *
            0.06;

//--------------------------------------------------
// PULSO NORMAL
// Desactivado durante Guillotine.
// La reacción musical se mantiene separada.
//--------------------------------------------------

const pulseSpeed =
    focus
        ? 1.4
        : 1.8;

const pulseAmount =
    focus
        ? 0.045
        : 0.018;

const normalPulse =
    guillotineMode
        ? 0
        : Math.sin(
            time *
            pulseSpeed
        ) *
        pulseAmount;

        //--------------------------------------------------
        // PULSO MUSICAL
        //--------------------------------------------------

        const musicPulse =
            musicVisualizerMode

                ? bassBoom * 0.34

                : 0;

        //--------------------------------------------------
        // PULSO FINAL
        //--------------------------------------------------

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

                    ? 1.04 +
                    overall * 0.28 +
                    bassBoom * 0.18

                    : focus

                        ? 1.16

                        : 1.04;

        glow.scale.x +=
            (
                targetGlow -
                glow.scale.x
            ) *
            0.07;

        glow.scale.y +=
            (
                targetGlow -
                glow.scale.y
            ) *
            0.07;

        glow.scale.z +=
            (
                targetGlow -
                glow.scale.z
            ) *
            0.07;

        //--------------------------------------------------
        // HALO
        //--------------------------------------------------

        const targetHalo =
            guillotineMode

                ? 1.22

                : musicVisualizerMode

                    ? 1.02 +
                    overall * 0.18 +
                    bassBoom * 0.14

                    : focus

                        ? 1.12

                        : 1.02;

        halo.scale.x +=
            (
                targetHalo -
                halo.scale.x
            ) *
            0.06;

        halo.scale.y +=
            (
                targetHalo -
                halo.scale.y
            ) *
            0.06;

        halo.scale.z +=
            (
                targetHalo -
                halo.scale.z
            ) *
            0.06;

        //--------------------------------------------------
        // OPACIDAD GLOW
        //--------------------------------------------------

        const targetGlowOpacity =
            guillotineMode

                ? 0.16

                : musicVisualizerMode

                    ? 0.075 +
                    overall * 0.09 +
                    bassBoom * 0.10

                    : focus

                        ? 0.14

                        : 0.075;

        glow.material.opacity +=
            (
                targetGlowOpacity -
                glow.material.opacity
            ) *
            0.08;

        //--------------------------------------------------
        // OPACIDAD HALO
        //--------------------------------------------------

        const targetHaloOpacity =
            guillotineMode

                ? 0.08

                : musicVisualizerMode

                    ? 0.035 +
                    overall * 0.04 +
                    bassBoom * 0.055

                    : focus

                        ? 0.06

                        : 0.035;

        halo.material.opacity +=
            (
                targetHaloOpacity -
                halo.material.opacity
            ) *
            0.06;

        //--------------------------------------------------
        // PARTÍCULAS
        //--------------------------------------------------

        particles.rotation.y +=

            guillotineMode

                ? 0.004

                : musicVisualizerMode

                    ? 0.001 +
                    mid * 0.006 +
                    bassBoom * 0.003

                    : focus

                        ? 0.0025

                        : 0.001;

        particles.rotation.x +=

            guillotineMode

                ? 0.001

                : musicVisualizerMode

                    ? 0.0004 +
                    treble * 0.0025 +
                    bassBoom * 0.001

                    : 0.0004;

        //--------------------------------------------------
        // TAMAÑO DE PARTÍCULAS
        //--------------------------------------------------

        const targetParticleSize =
            musicVisualizerMode

                ? 0.035 +
                bassBoom * 0.035 +
                treble * 0.025

                : 0.035;

        particles.material.size +=
            (
                targetParticleSize -
                particles.material.size
            ) *
            0.12;

        //--------------------------------------------------
        // OPACIDAD DE PARTÍCULAS
        //--------------------------------------------------

        const targetParticleOpacity =
            musicVisualizerMode

                ? 0.7 +
                bassBoom * 0.25 +
                treble * 0.15

                : 0.7;

        particles.material.opacity +=
            (
                targetParticleOpacity -
                particles.material.opacity
            ) *
            0.12;

        //--------------------------------------------------
        // ROTACIÓN DEL NÚCLEO
        //--------------------------------------------------

        group.rotation.y +=

            focus

                ? 0.0015

                : musicVisualizerMode

                    ? 0.0005 +
                    mid * 0.002

                    : 0.0005;

    }

    //--------------------------------------------------
    // API
    //--------------------------------------------------

    return {

        object:
            group,

        focus() {

            focus =
                true;

        },

        unfocus() {

            focus =
                false;

        },

        startGuillotine() {

            guillotineMode =
                true;

        },

        stopGuillotine() {

            guillotineMode =
                false;

        },

        startMusicVisualizer() {

            musicVisualizerMode =
                true;

        },

        stopMusicVisualizer() {

            musicVisualizerMode =
                false;

        },

        //----------------------------------
        // MÚSICA
        //----------------------------------

        setMusicColors,

        resetMusicColors,

        //----------------------------------
        // COLOR NORMAL
        //----------------------------------

        changeColor,

        setColor,
        
        getColor() {

            return sphereMaterial
                .uniforms
                .uColor
                .value
                .getHex();

        },

        update

    };

}