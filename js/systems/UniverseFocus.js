//js\systems\UniverseFocus.js
let active = false;

let stars;
let wordSphere;
let core;

let fade = 0;

export function setupUniverseFocus(data) {

    stars = data.stars;
    wordSphere = data.wordSphere;
    core = data.core;

}

export function isUniverseBusy() {

    return active;

}

export function beginUniverseFocus(){

    active = true;

    wordSphere.fadeOut();

}

export function endUniverseFocus(){

    active = false;

    wordSphere.fadeIn();

}

export function updateUniverseFocus() {

    if (active) {

        fade += (1 - fade) * 0.08;

    } else {

        fade += (0 - fade) * 0.08;

    }

}

export function getUniverseFade(){

    return fade;

}