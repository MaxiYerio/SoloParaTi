//js\systems\MessageSystem.js
import {

    beginUniverseFocus,
    endUniverseFocus

} from "./UniverseFocus.js";

let container;

export function initMessageSystem() {

    container = document.createElement("div");

    container.id = "message-system";

    document.body.appendChild(container);

}

export function showMessage(text) {

    container.textContent = text;

    container.classList.add("show");

}

export async function showSequence(sequence) {

    beginUniverseFocus();

    for (const text of sequence) {

        showMessage(text);

        await wait(1800);

    }

    hideMessage();

    endUniverseFocus();

}

function wait(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}

export function hideMessage() {

    container.classList.remove("show");

}