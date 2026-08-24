// js/objects/TextSprite.js

import * as THREE from
    "https://unpkg.com/three@0.179.1/build/three.module.js";


export function createTextSprite(data) {

    const canvas =
        document.createElement("canvas");

    const ctx =
        canvas.getContext("2d");


    //--------------------------------------------------
    // CANVAS
    //--------------------------------------------------

    canvas.width = 1024;
    canvas.height = 256;


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    //--------------------------------------------------
    // CONFIGURACIÓN
    //--------------------------------------------------

    const fitText =
        data.fitText === true;

    const maxWidth =
        data.maxWidth || 920;

    const maxLines =
        data.maxLines || 2;

    const maxFontSize =
        data.fontSize || 72;

    const minFontSize =
        data.minFontSize || 44;

    const fontFamily =
        data.fontFamily || "Poppins";


    //--------------------------------------------------
    // CALCULAR LÍNEAS
    //--------------------------------------------------

    function getLines(text, fontSize) {

        ctx.font =
            `bold ${fontSize}px ${fontFamily}`;

        const words =
            text.trim().split(/\s+/);

        const lines = [];

        let currentLine = "";


        for (const word of words) {

            const testLine =
                currentLine
                    ? `${currentLine} ${word}`
                    : word;

            const width =
                ctx.measureText(testLine).width;


            if (
                width <= maxWidth ||
                !currentLine
            ) {

                currentLine =
                    testLine;

            } else {

                lines.push(
                    currentLine
                );

                currentLine =
                    word;

            }

        }


        if (currentLine) {

            lines.push(
                currentLine
            );

        }


        return lines;

    }


    //--------------------------------------------------
    // PREPARAR TEXTO
    //--------------------------------------------------

    let fontSize =
        maxFontSize;

    let lines = [];


    if (fitText) {

        //--------------------------------------------------
        // INTENTAR MANTENER EL TAMAÑO
        //--------------------------------------------------

        while (
            fontSize > minFontSize
        ) {

            lines =
                getLines(
                    data.text,
                    fontSize
                );


            if (
                lines.length <= maxLines
            ) {

                break;

            }


            fontSize -= 2;

        }


        //--------------------------------------------------
        // SEGURIDAD
        //--------------------------------------------------

        lines =
            getLines(
                data.text,
                fontSize
            );


        //--------------------------------------------------
        // SI TODAVÍA HAY DEMASIADAS LÍNEAS
        //--------------------------------------------------

        if (
            lines.length > maxLines
        ) {

            fontSize =
                minFontSize;

            lines =
                getLines(
                    data.text,
                    fontSize
                );

        }

    } else {

        lines = [
            data.text
        ];

    }


    //--------------------------------------------------
    // FUENTE
    //--------------------------------------------------

    ctx.font =
        `bold ${fontSize}px ${fontFamily}`;

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";


    //--------------------------------------------------
    // BORDE OSCURO
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

    ctx.strokeStyle = "rgba(235, 210, 255, 0.85)";
    ctx.lineWidth = 3;

    //--------------------------------------------------
    // DIBUJAR TEXTO
    //--------------------------------------------------

    if (fitText && lines.length > 1) {

        const lineHeight =
            fontSize * 1.05;

        const totalHeight =
            lineHeight *
            lines.length;

        const startY =
            (canvas.height - totalHeight) / 2 +
            lineHeight / 2;


        lines.forEach(
            (line, index) => {

                ctx.strokeText(
                    line,
                    canvas.width / 2,
                    startY + index * lineHeight
                );

                ctx.fillText(
                    line,
                    canvas.width / 2,
                    startY + index * lineHeight
                );

            }
        );

    } else {

        ctx.strokeText(
            data.text,
            canvas.width / 2,
            canvas.height / 2
        );

        ctx.fillText(
            data.text,
            canvas.width / 2,
            canvas.height / 2
        );

    }


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