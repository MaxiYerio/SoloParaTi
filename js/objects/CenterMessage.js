import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

import { createTextSprite } from "./TextSprite.js";

let group;
let sprite;

export function createCenterMessage(scene){

    group = new THREE.Group();

    sprite = createTextSprite({

        text:"",
        color:"#FFFFFF",
        size:1.6

    });

    sprite.material.opacity = 0;

    group.add(sprite);

    scene.add(group);

}

export function setCenterMessage(text){

    group.visible = true;

    group.position.set(

        0,
        0,
        0

    );

    sprite.material.opacity = 1;

    sprite.material.map.dispose();

    group.remove(sprite);

    sprite = createTextSprite({

        text,

        color:"#FFFFFF",

        size:1.6

    });

    group.add(sprite);

}

export function hideCenterMessage(){

    group.visible = false;

}