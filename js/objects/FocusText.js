//js\objects\FocusText.js

import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export function createFocusText() {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 2048;
    canvas.height = 512;

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.SpriteMaterial({

        map: texture,

        transparent: true,

        depthWrite: false,

        opacity: 0

    });

    const sprite = new THREE.Sprite(material);

    sprite.visible = false;



    sprite.position.set(

        0,
        0,
        0

    );

    sprite.scale.set(

        0.15,
        0.04,
        1

    );

    let targetOpacity = 0;

    let targetScale = 0.15;

    function draw(text) {

        ctx.clearRect(

            0,
            0,
            canvas.width,
            canvas.height

        );

        ctx.textAlign = "center";

        ctx.textBaseline = "middle";

        ctx.font = "bold 92px Cormorant Garamond";

        ctx.fillStyle = "#FFFFFF";

        ctx.shadowColor = "#B987FF";

        ctx.shadowBlur = 40;

        ctx.fillText(

            text,

            canvas.width / 2,

            canvas.height / 2

        );

        texture.needsUpdate = true;

    }

    return {

        object: sprite,

        show(text) {

            draw(text);

            sprite.visible = true;

            sprite.scale.set(

                0.15,

                0.04,

                1

            );

            material.opacity = 0;

            targetOpacity = 1;

            targetScale = 2.4;

        },

        hide() {

            targetOpacity = 0;

            targetScale = 0.15;

        },

        update() {

            material.opacity +=

                (

                    targetOpacity

                    -

                    material.opacity

                ) * 0.08;

            const next =

                sprite.scale.x +

                (

                    targetScale

                    -

                    sprite.scale.x

                ) * 0.08;

            sprite.scale.set(

                next,

                next * 0.26,

                1

            );

            if (

                material.opacity < 0.01

                &&

                targetOpacity === 0

            ) {

                sprite.visible = false;

            }

        }

    };

}