//js\systems\InteractionManager.js

let isDragging = false;

let previousX = 0;
let previousY = 0;

let velocityX = 0;
let velocityY = 0;

export function setupInteraction(target){

    const canvas = document.querySelector("canvas");

    canvas.addEventListener("pointerdown",startDrag);

    window.addEventListener("pointermove",moveDrag);

    window.addEventListener("pointerup",endDrag);

    function startDrag(e){

        isDragging = true;

        previousX = e.clientX;
        previousY = e.clientY;

    }

    function moveDrag(e){

        if(!isDragging) return;

        const dx = e.clientX - previousX;
        const dy = e.clientY - previousY;

        previousX = e.clientX;
        previousY = e.clientY;

        velocityX = dx * 0.003;
        velocityY = dy * 0.003;

        target.rotation.y += velocityX;
        target.rotation.x += velocityY;

    }

    function endDrag(){

        isDragging = false;

    }

    function animate(){

        requestAnimationFrame(animate);

        if(isDragging) return;

        velocityX *= 0.97;
        velocityY *= 0.97;

        target.rotation.y += velocityX;
        target.rotation.x += velocityY;

    }

    animate();

}