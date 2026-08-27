import * as THREE from
    "https://unpkg.com/three@0.179.1/build/three.module.js";

import { createTextSprite } from "../objects/TextSprite.js";

let group = null;

let activeElements = [];

let running = false;


//--------------------------------------------------
// TIMELINE
//--------------------------------------------------
//
// Los textos de la letra los completamos con los que
// ya tenés. Los tiempos son los que me pasaste.
//
//--------------------------------------------------

const timeline = [

    //==================================================
    // PRIMER VERSO
    //==================================================

    {
        start: 13,
        end: 17,
        side: "left",
        text: "Sleep on me"
    },

    {
        start: 17,
        end: 23,
        side: "right",
        text: "Feel the rhythm in my chest, just breathe"
    },

    {
        start: 23,
        end: 28,
        side: "left",
        text: "I will stay"
    },

    {
        start: 28,
        end: 34,
        side: "right",
        text: "So the lantern in your heart won't fade"
    },

    {
        start: 34,
        end: 39,
        side: "left",
        text: "The secrets you tell me I'll take to my grave"
    },

    {
        start: 39,
        end: 42,
        side: "right",
        text: "There's bones in my closet, but you hang stuff anyway"
    },

    {
        start: 42,
        end: 46,
        side: "left",
        text: "And if you have nightmares, we'll dance on the bed"
    },

    {
        start: 46,
        end: 49,
        side: "right",
        text: "I know that you love me, love me"
    },

    {
        start: 49,
        end: 53,
        side: "left",
        text: "Even when I lose my head"
    },

    {
        start: 53,
        end: 57,
        side: "right",
        text: "Guillotine, guillotine"
    },

    {
        start: 57,
        end: 61,
        side: "left",
        text: "Even when I lose my head"
    },

    {
        start: 61,
        end: 65,
        side: "right",
        text: "Guillotine, guillotine"
    },

    {
        start: 65,
        end: 69,
        side: "left",
        text: "Even when I lose my head"
    },


    //==================================================
    // VOCALIZACIONES
    //==================================================

    {
        start: 65,
        end: 69,
        side: "bottom",
        text: "bum-ba-dim • bum-ba-bum-dim"
    },


    //==================================================
    // SEGUNDO VERSO
    //==================================================

    {
        start: 69,
        end: 73,
        side: "left",
        text: "Kiss my lips"
    },

    {
        start: 73,
        end: 79,
        side: "right",
        text: "Feel the rhythm of your heart and hips"
    },

    {
        start: 79,
        end: 83,
        side: "left",
        text: "I will pray"
    },

    {
        start: 83,
        end: 89,
        side: "right",
        text: "So the castle that we've built won't cave"
    },

    {
        start: 89,
        end: 94,
        side: "left",
        text: "The secrets you tell me I'll take to my grave"
    },

    {
        start: 94,
        end: 98,
        side: "right",
        text: "There's bones in my closet, but you hang stuff anyway"
    },

    {
        start: 98,
        end: 102,
        side: "left",
        text: "And if you have nightmares, we'll dance on the bed"
    },

    {
        start: 102,
        end: 106,
        side: "right",
        text: "I know that you love me, love me"
    },

    {
        start: 106,
        end: 110,
        side: "left",
        text: "Even when I lose my head"
    },

    {
        start: 110,
        end: 114,
        side: "right",
        text: "Guillotine, guillotine"
    },

    {
        start: 114,
        end: 118,
        side: "left",
        text: "Even when I lose my head"
    },

    {
        start: 118,
        end: 122,
        side: "right",
        text: "Guillotine, guillotine"
    },

    {
        start: 122,
        end: 126,
        side: "left",
        text: "Even when I lose my head"
    },


    //==================================================
    // VOCALIZACIONES
    //==================================================

    {
        start: 122,
        end: 126,
        side: "bottom",
        text: "bum-ba-dum • bum-ba-bum-dim"
    },


    //==================================================
    // PUENTE
    //==================================================

    {
        start: 126,
        end: 131,
        side: "left",
        text: "You fill me up, you fill me up"
    },

    {
        start: 131,
        end: 135,
        side: "right",
        text: "You set my soul ablaze"
    },

    {
        start: 135,
        end: 140,
        side: "left",
        text: "You fill me up, you fill me up"
    },

    {
        start: 140,
        end: 144,
        side: "right",
        text: "Your love is so amazing"
    },

    {
        start: 144,
        end: 149,
        side: "left",
        text: "You fill me up, you fill me up"
    },

    {
        start: 149,
        end: 153,
        side: "right",
        text: "You set my soul ablaze"
    },

    {
        start: 153,
        end: 158,
        side: "left",
        text: "You fill me up even when I lose my head"
    },


    //==================================================
    // ÚLTIMO ESTRIBILLO
    //==================================================

    {
        start: 158,
        end: 162,
        side: "left",
        text: "Guillotine, guillotine"
    },

    {
        start: 162,
        end: 166,
        side: "right",
        text: "Even when I lose my head"
    },

    {
        start: 166,
        end: 170,
        side: "left",
        text: "Guillotine, guillotine"
    },

    {
        start: 170,
        end: 174,
        side: "right",
        text: "Even when I lose my head"
    },

    {
        start: 174,
        end: 178,
        side: "left",
        text: "Guillotine"
    },

    {
        start: 178,
        end: 182,
        side: "right",
        text: "Even when I lose my head"
    },

    {
        start: 182,
        end: 186,
        side: "left",
        text: "Guillotine, guillotine"
    },

    {
        start: 186,
        end: 190,
        side: "right",
        text: "Even when I lose my head"
    },


    //==================================================
    // VOCALIZACIONES
    //==================================================

    {
        start: 182,
        end: 190,
        side: "bottom",
        text: "bum-ba-dim • bum-ba-bum-dim"
    },


    //==================================================
    // OUTRO
    //==================================================

    {
        start: 190,
        end: 195,
        side: "left",
        text: "You fill me up, you fill me up"
    },

    {
        start: 195,
        end: 199,
        side: "right",
        text: "You set my soul ablaze"
    },

    {
        start: 199,
        end: 203,
        side: "left",
        text: "You fill me up, you fill me up"
    },

    {
        start: 203,
        end: 207,
        side: "right",
        text: "Your love is so amazing"
    },

    {
        start: 207,
        end: 211,
        side: "left",
        text: "You fill me up, you fill me up"
    },

    {
        start: 211,
        end: 214,
        side: "right",
        text: "You set my soul ablaze"
    },

    {
        start: 214,
        end: 216,
        side: "left",
        text: "You fill me up even when I lose my head"
    }

];


//--------------------------------------------------
// CREAR
//--------------------------------------------------

export function createGuillotineLyrics(scene) {

    group =
        new THREE.Group();

    group.visible = false;

    group.renderOrder = 9999;

    scene.add(group);

    return {

        object: group,

        start() {

            running = true;

            group.visible = true;

        },

        stop() {

            running = false;

            clearElements();

            group.visible = false;

        },

        update(time) {

            if (!running) return;

            updateTimeline(time);

        }

    };

}


//--------------------------------------------------
// TIMELINE
//--------------------------------------------------

function updateTimeline(time) {

    const visible = [];

    for (const item of timeline) {

        if (
            time >= item.start &&
            time < item.end
        ) {

            visible.push(item);

        }

    }

    //--------------------------------------------------
    // CREAR LOS QUE CORRESPONDEN
    //--------------------------------------------------

    for (const item of visible) {

        const exists =
            activeElements.find(
                element =>
                    element.data === item
            );

        if (!exists) {

            createElement(item);

        }

    }

    //--------------------------------------------------
    // ELIMINAR LOS QUE TERMINARON
    //--------------------------------------------------

    for (
        let i = activeElements.length - 1;
        i >= 0;
        i--
    ) {

        const element =
            activeElements[i];

        if (!visible.includes(element.data)) {

            removeElement(element);

        }

    }

}


//--------------------------------------------------
// CREAR TEXTO
//--------------------------------------------------

function createElement(data) {

    console.log(
        "[Guillotine Lyrics] CREANDO:",
        data.text,
        "SIDE:",
        data.side
    );

    const sprite =
        createTextSprite({

            text: data.text,

            color: "#FFFFFF",

            size: 0.75

        });

    //--------------------------------------------------
    // POSICIÓN
    //--------------------------------------------------

    if (data.side === "left") {

        sprite.position.set(
            -3.6,
            0.7,
            2
        );

    }

    else if (data.side === "right") {

        sprite.position.set(
            3.6,
            -0.7,
            2
        );

    }

    else if (data.side === "bottom") {

        sprite.position.set(
            0,
            -4.0,
            2
        );

    }

    //--------------------------------------------------
    // ANIMACIÓN
    //--------------------------------------------------

    sprite.scale.multiplyScalar(0.01);

    sprite.material.opacity = 0;

    sprite.userData.targetOpacity = 1;

    sprite.userData.targetScale =
        sprite.userData.baseScale.clone();

    group.add(sprite);

    activeElements.push({

        data,

        sprite

    });

}


//--------------------------------------------------
// ELIMINAR
//--------------------------------------------------

function removeElement(element) {

    if (!element.sprite) return;

    group.remove(
        element.sprite
    );

    element.sprite.material.map.dispose();

    element.sprite.material.dispose();

    activeElements =
        activeElements.filter(
            item =>
                item !== element
        );

}


//--------------------------------------------------
// ANIMACIÓN
//--------------------------------------------------

export function updateGuillotineLyrics() {

    for (const element of activeElements) {

        const sprite =
            element.sprite;

        const target =
            element.sprite.userData
                .targetScale;

        sprite.scale.lerp(
            target,
            0.08
        );

        sprite.material.opacity +=
            (
                element.sprite.userData
                    .targetOpacity -
                sprite.material.opacity
            ) * 0.08;

    }

}


//--------------------------------------------------
// LIMPIAR
//--------------------------------------------------

function clearElements() {

    for (const element of activeElements) {

        group.remove(
            element.sprite
        );

        element.sprite.material.map.dispose();

        element.sprite.material.dispose();

    }

    activeElements = [];

}