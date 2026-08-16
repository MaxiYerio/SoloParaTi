// js/systems/WordInteraction.js

import { showMessage } from "./MessageSystem.js";
import {
    beginUniverseFocus,
    endUniverseFocus
} from "./UniverseFocus.js";

import {
    enterCameraFocus,
    exitCameraFocus
} from "./CameraController.js";


import { playSong } from "../music.js";

let folderContainer = null;

//--------------------------------------------------
// INTERACCIÓN PRINCIPAL
//--------------------------------------------------

export function interactWithWord(word) {

    if (!word) return;

    switch (word.type) {

        case "folder":

            openFolder(word);

            break;

        case "memory":

            console.log("Memory:", word.text);

            break;

        case "secret":

            console.log("Secret:", word.text);

            break;

        default:

            showNormalWord(word);

            break;

    }

}

//--------------------------------------------------
// PALABRA NORMAL
//--------------------------------------------------

function showNormalWord(word) {

    showMessage(word.text);

}

//--------------------------------------------------
// FOLDER
//--------------------------------------------------

function openFolder(word) {

    if (!word.children?.length) {

        console.warn(
            "El folder no tiene contenido:",
            word.text
        );

        return;

    }

    createFolderUI(word);

}

//--------------------------------------------------
// CREAR UI
//--------------------------------------------------

function createFolderUI(folder) {

    closeFolder();

    folderContainer = document.createElement("div");

    folderContainer.id = "folder-system";

    const panel = document.createElement("div");

    panel.className = "folder-panel";

    //----------------------------------
    // TÍTULO
    //----------------------------------

    const title = document.createElement("div");

    title.className = "folder-title";

    title.textContent = folder.text;

    panel.appendChild(title);

    //----------------------------------
    // CONTENIDO
    //----------------------------------

    const list = document.createElement("div");

    list.className = "folder-list";

    folder.children.forEach(child => {

        const item = document.createElement("button");

        item.className = "folder-item";

        item.textContent = "♪ " + child.text;

        item.addEventListener(
            "click",
            () => {

                console.log(
                    "Seleccionado:",
                    child
                );

                if (child.audio) {

                    playSong(
                        child.audio
                    );

                }

            }
        );

        list.appendChild(item);

    });

    panel.appendChild(list);

    //----------------------------------
    // CERRAR
    //----------------------------------

    const closeButton = document.createElement("button");

    closeButton.className = "folder-close";

    closeButton.textContent = "Cerrar";

    closeButton.addEventListener(
        "click",
        closeFolder
    );

    panel.appendChild(closeButton);

    //----------------------------------
    // AGREGAR
    //----------------------------------

    folderContainer.appendChild(panel);

    document.body.appendChild(
        folderContainer
    );

}

//--------------------------------------------------
// CERRAR FOLDER
//--------------------------------------------------

export function closeFolder() {

    if (!folderContainer) return;

    folderContainer.remove();

    folderContainer = null;

    exitCameraFocus();

    endUniverseFocus();

}