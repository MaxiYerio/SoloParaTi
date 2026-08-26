// js/objects/WordSphere.js

import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";
import { createTextSprite } from "./TextSprite.js";
import { UniverseData } from "../config/UniverseData.js";

export function createWordSphere() {

    const group = new THREE.Group();

    const generatedWords = UniverseData;

    //--------------------------------------------------
    // RADIO RESPONSIVE
    //--------------------------------------------------

    function getUniverseRadius() {

        const width =
            window.innerWidth;

        const height =
            window.innerHeight;


        //--------------------------------------------------
        // CELULAR VERTICAL
        //--------------------------------------------------

        if (
            width <= 600 &&
            height > width
        ) {

            return 3.45;

        }


        //--------------------------------------------------
        // CELULAR HORIZONTAL
        //--------------------------------------------------

        if (
            width <= 900 &&
            width > height
        ) {

            return 3.75;

        }


        //--------------------------------------------------
        // PC / TABLET
        //--------------------------------------------------

        return 4;

    }
    const total = 180;

    const goldenAngle =
        Math.PI * (3 - Math.sqrt(5));

    const points = [];

    //--------------------------------------------------
    // RADIO ACTUAL
    //--------------------------------------------------

    let currentRadius =
        getUniverseRadius();

    //--------------------------------------------------
    // ESTADO
    //--------------------------------------------------

    let btsMode = false;

    let normalPoints = [];

    let btsPoints = [];

    let btsCenter = null;

    //--------------------------------------------------
    // VECTORES REUTILIZABLES
    //--------------------------------------------------

    const worldPosition =
        new THREE.Vector3();

    const directionToCamera =
        new THREE.Vector3();

    const wordNormal =
        new THREE.Vector3();

    //--------------------------------------------------
    // CREAR PALABRAS NORMALES
    //--------------------------------------------------

    for (let i = 0; i < total; i++) {

        const y =
            1 -
            (i / (total - 1)) * 2;

        const r =
            Math.sqrt(1 - y * y);

        const theta =
            goldenAngle * i;

        const x =
            Math.cos(theta) * r;

        const z =
            Math.sin(theta) * r;

        const data =
            generatedWords[
            i % generatedWords.length
            ];

        const mesh =
            createTextSprite(data);

        mesh.position.set(
            x * currentRadius,
            y * currentRadius,
            z * currentRadius
        );
        //--------------------------------------------------
        // ESTADO VISUAL
        //--------------------------------------------------

        mesh.userData.targetOpacity = 1;

        //--------------------------------------------------
        // AGREGAR
        //--------------------------------------------------

        group.add(mesh);

        const point = {

            mesh,

            index: i,

            position:
                new THREE.Vector3(
                    x,
                    y,
                    z
                )

        };

        points.push(point);

        normalPoints.push(point);

    }

    //--------------------------------------------------
    // CREAR PALABRAS BTS
    //--------------------------------------------------

    function createBTSPoints(songs) {

        btsPoints.forEach(point => {

            group.remove(
                point.mesh
            );

        });

        btsPoints = [];

        if (
            !songs ||
            songs.length === 0
        ) {

            return;

        }

        const songCount =
            songs.length;

        //--------------------------------------------------
        // BOTÓN BTS CENTRAL
        //--------------------------------------------------

        const btsData = {

            text: "BTS",

            type: "btsReturn"

        };

        btsCenter = createTextSprite(btsData);

        btsCenter.position.set(
            0,
            1.75,
            0
        );

        btsCenter.scale.set(
            2.8,
            0.67,
            1
        );

        btsCenter.material.opacity = 0;

        btsCenter.userData.targetOpacity = 1;

        group.add(btsCenter);

        //--------------------------------------------------
        // DISTRIBUCIÓN ESFÉRICA
        //--------------------------------------------------

        for (
            let i = 0;
            i < songCount;
            i++
        ) {

            const y =
                1 -
                (i / Math.max(
                    songCount - 1,
                    1
                )) * 2;

            const r =
                Math.sqrt(
                    Math.max(
                        0,
                        1 - y * y
                    )
                );

            const theta =
                goldenAngle * i;

            const x =
                Math.cos(theta) * r;

            const z =
                Math.sin(theta) * r;

            //--------------------------------------------------
            // CREAR SPRITE
            //--------------------------------------------------

            const mesh =
                createTextSprite(
                    songs[i]
                );

            //--------------------------------------------------
            // POSICIÓN
            //--------------------------------------------------

            mesh.position.set(

                x * 3.2,

                y * 3.2,

                z * 3.2

            );

            //--------------------------------------------------
            // ESTADO INICIAL
            //--------------------------------------------------

            mesh.userData.targetOpacity = 0;

            mesh.material.opacity = 0;

            //--------------------------------------------------
            // GUARDAR
            //--------------------------------------------------

            group.add(mesh);

            const point = {

                mesh,

                index: i,

                position:
                    new THREE.Vector3(
                        x,
                        y,
                        z
                    )

            };

            btsPoints.push(point);

        }

    }

    //--------------------------------------------------
    // ENTRAR EN MODO BTS
    //--------------------------------------------------

    function enterBTSMode(songs) {

        btsMode = true;

        //--------------------------------------------------
        // CREAR CANCIONES
        //--------------------------------------------------

        createBTSPoints(songs);

        //--------------------------------------------------
        // OCULTAR UNIVERSO NORMAL
        //--------------------------------------------------

        normalPoints.forEach(
            point => {

                point.mesh.userData.targetOpacity =
                    0;

            }
        );

        //--------------------------------------------------
        // MOSTRAR CANCIONES
        //--------------------------------------------------

        btsPoints.forEach(
            point => {

                point.mesh.userData.targetOpacity =
                    1;

            }
        );

    }

    //--------------------------------------------------
    // SALIR DEL MODO BTS
    //--------------------------------------------------

    function exitBTSMode() {

        btsMode = false;

        //--------------------------------------------------
        // OCULTAR CANCIONES
        //--------------------------------------------------

        btsPoints.forEach(
            point => {

                point.mesh.userData.targetOpacity =
                    0;

            }
        );

        //--------------------------------------------------
        // OCULTAR BTS CENTRAL
        //--------------------------------------------------

        if (btsCenter) {

            btsCenter.userData.targetOpacity = 0;

        }

        //--------------------------------------------------
        // MOSTRAR UNIVERSO
        //--------------------------------------------------

        normalPoints.forEach(
            point => {

                point.mesh.userData.targetOpacity =
                    1;

            }
        );

    }

    //--------------------------------------------------
    // FADE GENERAL
    //--------------------------------------------------

    function fadeOut() {

        const activePoints =
            btsMode
                ? btsPoints
                : normalPoints;

        activePoints.forEach(
            point => {

                point.mesh.userData.targetOpacity =
                    0.08;

            }
        );

    }

    //--------------------------------------------------
    // FADE IN GENERAL
    //--------------------------------------------------

    function fadeIn() {

        const activePoints =
            btsMode
                ? btsPoints
                : normalPoints;

        activePoints.forEach(
            point => {

                point.mesh.userData.targetOpacity =
                    1;

            }
        );

    }

    //--------------------------------------------------
    // UPDATE
    //--------------------------------------------------

    function update(camera) {

        //--------------------------------------------------
        // PALABRAS NORMALES
        //--------------------------------------------------

        normalPoints.forEach(
            point => {

                updatePoint(
                    point,
                    camera
                );

            }
        );

        //--------------------------------------------------
        // CANCIONES BTS
        //--------------------------------------------------

        btsPoints.forEach(
            point => {

                updatePoint(
                    point,
                    camera
                );

            }
        );

        //--------------------------------------------------
        // BTS CENTRAL
        //--------------------------------------------------

        if (btsCenter) {

            updatePoint(
                {
                    mesh: btsCenter
                },
                camera
            );

        }

    }

    //--------------------------------------------------
    // ACTUALIZAR UNA PALABRA
    //--------------------------------------------------

    function updatePoint(
        point,
        camera
    ) {

        const mesh =
            point.mesh;

        if (
            mesh.userData.targetOpacity ===
            undefined
        ) {

            mesh.userData.targetOpacity =
                1;

        }

        //--------------------------------------------------
        // POSICIÓN MUNDIAL
        //--------------------------------------------------

        mesh.getWorldPosition(
            worldPosition
        );

        //--------------------------------------------------
        // DIRECCIÓN HACIA CÁMARA
        //--------------------------------------------------

        directionToCamera
            .subVectors(
                camera.position,
                worldPosition
            )
            .normalize();

        //--------------------------------------------------
        // NORMAL
        //--------------------------------------------------

        wordNormal
            .copy(worldPosition)
            .normalize();

        //--------------------------------------------------
        // INTENSIDAD
        //--------------------------------------------------

        const facing =
            wordNormal.dot(
                directionToCamera
            );

        const frontLight =
            THREE.MathUtils.clamp(

                (facing + 1) * 0.5,

                0.45,

                1

            );

        //--------------------------------------------------
        // OPACIDAD
        //--------------------------------------------------

        const targetOpacity =
            mesh.userData.targetOpacity *
            frontLight;

        mesh.material.opacity +=

            (
                targetOpacity -
                mesh.material.opacity
            ) * 0.08;

    }
    //--------------------------------------------------
    // ACTUALIZAR RADIO
    //--------------------------------------------------

    function resize() {

        const newRadius =
            getUniverseRadius();


        //--------------------------------------------------
        // SI NO CAMBIÓ, NO HACEMOS NADA
        //--------------------------------------------------

        if (
            Math.abs(
                newRadius -
                currentRadius
            ) < 0.001
        ) {

            return;

        }


        currentRadius =
            newRadius;


        //--------------------------------------------------
        // ACTUALIZAR PALABRAS NORMALES
        //--------------------------------------------------

        normalPoints.forEach(
            point => {

                const {
                    x,
                    y,
                    z
                } = point.position;


                point.mesh.position.set(

                    x * currentRadius,

                    y * currentRadius,

                    z * currentRadius

                );

            }
        );

    }
    //--------------------------------------------------
    // API
    //--------------------------------------------------

    return {

        object: group,

        points,

        resize,
        
        //--------------------------------------------------
        // BTS
        //--------------------------------------------------

        enterBTSMode,

        exitBTSMode,

        isBTSMode() {

            return btsMode;

        },

        //--------------------------------------------------
        // FADE
        //--------------------------------------------------

        fadeOut,

        fadeIn,

        //--------------------------------------------------
        // UPDATE
        //--------------------------------------------------

        update

    };

}