// js\objects\FocusWord.js

import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";
import { createTextSprite } from "./TextSprite.js";

export function createFocusWord() {

    const group = new THREE.Group();

    group.visible = false;

    let sprite = null;

    let targetScale = 0;

    let targetOpacity = 0;

    return {

        object: group,

        show(text) {

            if (sprite) {

                group.remove(sprite);

            }

            sprite = createTextSprite({

                text,

                color: "#FFFFFF",

                size: 1.5

            });

            sprite.material.depthTest = false;

            sprite.position.set(0, 0, 0);

            sprite.scale.set(

                0.01,

                0.01,

                1

            );

            sprite.material.opacity = 0;

            group.add(sprite);

            group.visible = true;

            targetScale = 1;

            targetOpacity = 1;

        },

        hide() {

            targetScale = 0;

            targetOpacity = 0;

        },

        update() {

            if (!sprite) return;

            sprite.scale.lerp(

                new THREE.Vector3(

                    2.8 * targetScale,

                    0.7 * targetScale,

                    1

                ),

                0.08

            );

            sprite.material.opacity +=

                (

                    targetOpacity

                    -

                    sprite.material.opacity

                ) * 0.08;

            if (

                targetOpacity === 0 &&

                sprite.material.opacity < 0.01

            ) {

                group.visible = false;

            }

        }

    };

}