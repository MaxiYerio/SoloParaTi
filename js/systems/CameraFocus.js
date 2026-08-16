// js/systems/CameraFocus.js

import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

//--------------------------------------------------
// ESTADO
//--------------------------------------------------

let camera = null;

let focusedObject = null;

let isFocusing = false;
let isReturning = false;

//--------------------------------------------------
// POSICIONES
//--------------------------------------------------

const targetPosition = new THREE.Vector3();
const targetLookAt = new THREE.Vector3();

const originalPosition = new THREE.Vector3();
const originalLookAt = new THREE.Vector3();

//--------------------------------------------------
// VECTORES REUTILIZABLES
//--------------------------------------------------

const objectWorldPosition = new THREE.Vector3();
const cameraDirection = new THREE.Vector3();

const currentLookAt = new THREE.Vector3();

//--------------------------------------------------
// CONFIGURACIÓN
//--------------------------------------------------

const FOCUS_DISTANCE = 6.5;

const FOCUS_SPEED = 0.055;

const RETURN_SPEED = 0.065;

const LOOK_SPEED = 0.08;

//--------------------------------------------------
// INICIALIZAR
//--------------------------------------------------

export function setupCameraFocus(cam){

    camera = cam;

    originalPosition.copy(camera.position);

    camera.getWorldDirection(cameraDirection);

    originalLookAt
        .copy(camera.position)
        .add(
            cameraDirection.multiplyScalar(10)
        );

    currentLookAt.copy(originalLookAt);

}

//--------------------------------------------------
// ¿ESTÁ ENFOCANDO?
//--------------------------------------------------

export function isCameraFocused(){

    return (

        isFocusing ||

        isReturning

    );

}

//--------------------------------------------------
// ENFOCAR OBJETO
//--------------------------------------------------

export function focusOn(object){

    if(!camera || !object) return;

    focusedObject = object;

    isFocusing = true;
    isReturning = false;

    //--------------------------------------------------
    // Posición mundial de la palabra
    //--------------------------------------------------

    object.getWorldPosition(

        objectWorldPosition

    );

    //--------------------------------------------------
    // Dirección desde la palabra hacia la cámara
    //--------------------------------------------------

    cameraDirection

        .subVectors(

            camera.position,

            objectWorldPosition

        )

        .normalize();

    //--------------------------------------------------
    // Guardamos posición actual
    //--------------------------------------------------

    originalPosition.copy(

        camera.position

    );

    //--------------------------------------------------
    // Guardamos hacia dónde estaba mirando
    //--------------------------------------------------

    camera.getWorldDirection(

        cameraDirection

    );

    originalLookAt

        .copy(camera.position)

        .add(

            cameraDirection.clone().multiplyScalar(10)

        );

    //--------------------------------------------------
    // Nueva posición
    //--------------------------------------------------

    targetPosition

        .copy(objectWorldPosition)

        .add(

            cameraDirection.clone()

                .multiplyScalar(

                    FOCUS_DISTANCE

                )

        );

    //--------------------------------------------------
    // Queremos mirar directamente a la palabra
    //--------------------------------------------------

    targetLookAt.copy(

        objectWorldPosition

    );

}

//--------------------------------------------------
// VOLVER
//--------------------------------------------------

export function restoreCamera(){

    if(!camera) return;

    isFocusing = false;

    isReturning = true;

    focusedObject = null;

}

//--------------------------------------------------
// ACTUALIZACIÓN
//--------------------------------------------------

export function updateCameraFocus(){

    if(!camera) return;

    //--------------------------------------------------
    // ENTRANDO AL FOCO
    //--------------------------------------------------

    if(isFocusing){

        camera.position.lerp(

            targetPosition,

            FOCUS_SPEED

        );

        currentLookAt.lerp(

            targetLookAt,

            LOOK_SPEED

        );

        camera.lookAt(

            currentLookAt

        );

        //--------------------------------------------------
        // Cuando llegamos suficientemente cerca
        //--------------------------------------------------

        if(

            camera.position.distanceTo(

                targetPosition

            ) < 0.02

        ){

            camera.position.copy(

                targetPosition

            );

            currentLookAt.copy(

                targetLookAt

            );

            camera.lookAt(

                currentLookAt

            );

        }

        return;

    }

    //--------------------------------------------------
    // VOLVIENDO
    //--------------------------------------------------

    if(isReturning){

        camera.position.lerp(

            originalPosition,

            RETURN_SPEED

        );

        currentLookAt.lerp(

            originalLookAt,

            LOOK_SPEED

        );

        camera.lookAt(

            currentLookAt

        );

        //--------------------------------------------------
        // Terminamos
        //--------------------------------------------------

        if(

            camera.position.distanceTo(

                originalPosition

            ) < 0.02

        ){

            camera.position.copy(

                originalPosition

            );

            currentLookAt.copy(

                originalLookAt

            );

            camera.lookAt(

                currentLookAt

            );

            isReturning = false;

        }

    }

}