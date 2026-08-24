// js/objects/TextSprite.js

import * as THREE from
    "https://unpkg.com/three@0.179.1/build/three.module.js";

export function createTextSprite(data) {

    const canvas =
        document.createElement("canvas");

    const ctx =
        canvas.getContext("2d");

    canvas.width = 1024;
    canvas.height = 256;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    //--------------------------------------------------
    // FUENTE
    //--------------------------------------------------

    ctx.font =
        "bold 72px Poppins";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    //--------------------------------------------------
    // BORDE OSCURO
    //
    // Esto permite que la palabra siga siendo blanca
    // incluso cuando pasa delante del núcleo.
    //--------------------------------------------------

    ctx.shadowColor =
        "rgba(0, 0, 0, 0.85)";

    ctx.shadowBlur =
        8;

    ctx.shadowOffsetX =
        0;

    ctx.shadowOffsetY =
        0;

    //--------------------------------------------------
    // COLOR
    //--------------------------------------------------

    ctx.fillStyle =
        data.color ||
        "#FFFFFF";

    //--------------------------------------------------
    // TEXTO
    //--------------------------------------------------

    ctx.fillText(

        data.text,

        canvas.width / 2,

        canvas.height / 2

    );

    //--------------------------------------------------
    // TEXTURA
    //--------------------------------------------------

    const texture =
        new THREE.CanvasTexture(
            canvas
        );

    texture.needsUpdate =
        true;

    //--------------------------------------------------
    // MATERIAL
    //--------------------------------------------------

    const material =
        new THREE.SpriteMaterial({

            map:
                texture,

            transparent:
                true,

            depthWrite:
                false,

            depthTest:
                true,

            toneMapped:
                false

        });

    //--------------------------------------------------
    // SPRITE
    //--------------------------------------------------

    const sprite =
        new THREE.Sprite(
            material
        );

    //--------------------------------------------------
    // TAMAÑO
    //--------------------------------------------------

    const size =
        data.size ||
        1;

    sprite.scale.set(

        2.5 * size,

        0.6 * size,

        1

    );

    //--------------------------------------------------
    // DATOS
    //--------------------------------------------------

    sprite.userData.baseScale =
        sprite.scale.clone();

    sprite.userData.baseColor =
        data.color ||
        "#FFFFFF";

    sprite.userData.data =
        data;

    return sprite;

}