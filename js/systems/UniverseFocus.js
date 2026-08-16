//js\systems\UniverseFocus.js

import { wait } from "./MessageSystem.js";

let active = false;

let stars;
let wordSphere;
let core;
let focusWord;

let fade = 0;

export function setupUniverseFocus(objects) {

    stars = objects.stars;

    wordSphere = objects.wordSphere;

    core = objects.core;

    focusWord = objects.focusWord;

}

export function isUniverseBusy() {

    return active;

}

export function beginUniverseFocus() {


    active = true;

    stars.fadeOut();

    wordSphere.fadeOut();

    core.focus();

}

export function endUniverseFocus() {

    active = false;

    stars.fadeIn?.();

    wordSphere.fadeIn();

    core.unfocus();

    focusWord.hide();
}

export function updateUniverseFocus() {

    if (active) {

        fade += (1 - fade) * 0.08;

    } else {

        fade += (0 - fade) * 0.08;

    }

}

export function getUniverseFade() {

    return fade;

}

export async function playSequence(
    sequence,
    alreadyFocused = false
) {

    if (!alreadyFocused) {

        beginUniverseFocus();

    }

    await wait(800);

    for (const text of sequence) {

        focusWord.show(text);

        await wait(2200);

        focusWord.hide();

        await wait(700);

    }

    if (!alreadyFocused) {

        endUniverseFocus();

    }

}