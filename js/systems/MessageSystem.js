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

    if (!container) return;

    container.innerHTML = text;

    // Detectar mensajes largos
    if (text.length > 35) {

        container.classList.add("long-message");

    } else {

        container.classList.remove("long-message");

    }

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

export function wait(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}

export function hideMessage() {

    container.classList.remove("show");

}