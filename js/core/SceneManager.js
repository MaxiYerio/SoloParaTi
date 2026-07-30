import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";
import { createStarField } from "../particles.js";

let scene;
let camera;
let renderer;
let stars;

export function initScene(){

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0x0B0515);

    stars = createStarField(scene);

    camera = new THREE.PerspectiveCamera(

        60,

        window.innerWidth/window.innerHeight,

        0.1,

        1000

    );

    camera.position.z = 12;

    renderer = new THREE.WebGLRenderer({

        antialias:true,

        alpha:true

    });

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

    renderer.setPixelRatio(

        window.devicePixelRatio

    );

    document
    .getElementById("scene")
    .appendChild(renderer.domElement);

    animate();

}

function animate() {

    requestAnimationFrame(animate);

    stars.rotation.y += 0.00025;

    stars.rotation.x += 0.00005;

    renderer.render(scene, camera);

}

window.addEventListener("resize",()=>{

    if(!camera) return;

    camera.aspect=

        window.innerWidth/

        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

});