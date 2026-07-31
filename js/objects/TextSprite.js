//js\objects\TextSprite.js

import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export function createTextSprite(data) {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 1024;
    canvas.height = 256;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 72px Poppins";

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // brillo suave
    ctx.shadowColor = "#B987FF";
    ctx.shadowBlur = 18;

    ctx.fillStyle = data.color || "#FFFFFF";

    ctx.fillText(

        data.text,

        canvas.width / 2,

        canvas.height / 2

    );

    const texture = new THREE.CanvasTexture(canvas);

    texture.needsUpdate = true;

    const material = new THREE.SpriteMaterial({

        map: texture,

        transparent: true,

        depthWrite: false

    });

    const sprite = new THREE.Sprite(material);
    
    const size = data.size || 1;

    sprite.scale.set(

        2.5 * size,

        0.6 * size,

        1

    );

    return sprite;

}