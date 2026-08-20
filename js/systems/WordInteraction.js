// js/systems/WordInteraction.js

import { showMessage } from "./MessageSystem.js";

import { beginUniverseFocus, endUniverseFocus } from "./UniverseFocus.js";

import { enterCameraFocus, exitCameraFocus } from "./CameraController.js";

import {
    playSong,
    playGuillotine
} from "../music.js";

let folderContainer = null;
let core = null;

//--------------------------------------------------
// CONFIGURAR NÚCLEO
//--------------------------------------------------

export function setupWordInteractionCore(
    coreObject
) {

    core = coreObject;

}

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

            handleSecret(word);

            break;

        default:

            showNormalWord(word);

            break;

    }

}

//--------------------------------------------------
// SECRETOS
//--------------------------------------------------

function handleSecret(word) {

    if (!word) return;

    //----------------------------------
    // CAMBIAR COLOR DEL NÚCLEO
    //----------------------------------

    if (
        word.action ===
        "changeCoreColor"
    ) {

        if (!core) {

            console.warn(
                "CoreSphere no está conectado a WordInteraction."
            );

            return;

        }

        core.changeColor();

        return;

    }

    //----------------------------------
    // OTROS SECRETOS
    //----------------------------------

    if (
        word.action ===
        "guillotine"
    ) {

        console.log(
            "[Secret] Guillotine"
        );

        if (core) {

            core.startGuillotine();

        }

        playGuillotine(() => {

            if (core) {

                core.stopGuillotine();

            }

        });

        return;

    }

    if (word.text === "24/08") {

        console.log(
            "Secret 24/08"
        );

        return;

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

                    if (core) {

                        core.startMusicVisualizer();

                    }

                    playSong(
                        child.audio,
                        () => {

                            if (core) {

                                core.stopMusicVisualizer();

                            }

                        }
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