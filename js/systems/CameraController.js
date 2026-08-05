//js\systems\CameraController.js

let camera;

let targetZ = 12;

const MIN_Z = 6;
const MAX_Z = 18;

export function setupCameraController(cam){

    camera = cam;

    targetZ = camera.position.z;

    window.addEventListener(

        "wheel",

        onWheel,

        { passive:true }

    );

    animate();

}

function onWheel(e){

    targetZ += e.deltaY * 0.01;

    targetZ = Math.max(

        MIN_Z,

        Math.min(

            MAX_Z,

            targetZ

        )

    );

}

function animate(){

    requestAnimationFrame(animate);

    if(!camera) return;

    camera.position.z +=

        (targetZ - camera.position.z)

        * 0.08;

}