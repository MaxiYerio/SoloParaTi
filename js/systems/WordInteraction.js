// js/systems/WordInteraction.js

import { showMessage } from "./MessageSystem.js";

import {
    playSong,
    playGuillotine
} from "../music.js";

import {
    startGuillotineLyrics,
    stopGuillotineLyrics
} from "./GuillotineLyricsManager.js";

let folderContainer = null;

let core = null;
let wordSphere = null;

//--------------------------------------------------
// CONFIGURAR NÚCLEO Y WORD SPHERE
//--------------------------------------------------

export function setupWordInteractionCore(
    coreObject,
    wordSphereObject
) {

    core = coreObject;
    wordSphere = wordSphereObject;

}

//--------------------------------------------------
// INTERACCIÓN PRINCIPAL
//--------------------------------------------------

export function interactWithWord(word) {

    if (!word) return;

    console.log(
        "[WordInteraction] Click:",
        word
    );

    //--------------------------------------------------
    // FOLDER
    //--------------------------------------------------

    if (word.type === "folder") {

        openFolder(word);

        return;

    }

    //--------------------------------------------------
    // MEMORY
    //--------------------------------------------------

    if (word.type === "memory") {

        console.log(
            "Memory:",
            word.text
        );

        showMessage(
            word.text
        );

        return;

    }

    //--------------------------------------------------
    // SECRET
    //--------------------------------------------------

    if (word.type === "secret") {

        handleSecret(word);

        return;

    }

    //--------------------------------------------------
    // PALABRA NORMAL
    //--------------------------------------------------

    showNormalWord(word);

}

//--------------------------------------------------
// REPRODUCIR CANCIÓN
//--------------------------------------------------

function playFolderSong(song) {

    if (!song?.audio) {

        console.warn(
            "[Music] Esta canción no tiene audio:",
            song
        );

        return;

    }

    console.log(
        "[Music] Reproduciendo:",
        song.text
    );

    //--------------------------------------------------
    // LIMPIAR ESTADO MUSICAL ANTERIOR
    //--------------------------------------------------

    if (core) {

        core.stopMusicVisualizer();

        core.resetMusicColors();

    }

    //--------------------------------------------------
    // VISUALIZADOR
    //--------------------------------------------------

    if (core) {

        core.startMusicVisualizer();

    }

    //--------------------------------------------------
    // COLORES
    //--------------------------------------------------

    if (
        core &&
        Array.isArray(song.colors) &&
        song.colors.length > 0
    ) {

        core.setMusicColors(
            song.colors
        );

    }

    //--------------------------------------------------
    // REPRODUCIR
    //--------------------------------------------------

    playSong(

        song.audio,

        () => {

            console.log(
                "[Music] Canción terminada:",
                song.text
            );

            if (core) {

                core.stopMusicVisualizer();

                core.resetMusicColors();

            }

        }

    );

}

//--------------------------------------------------
// SECRETOS
//--------------------------------------------------

function handleSecret(word) {

    if (!word) return;

    //--------------------------------------------------
    // CAMBIAR COLOR
    //--------------------------------------------------

    if (
        word.action ===
        "changeCoreColor"
    ) {

        if (!core) {

            console.warn(
                "[Secret] Core no conectado."
            );

            return;

        }

        core.changeColor();

        return;

    }

    //--------------------------------------------------
    // GUILLOTINE
    //--------------------------------------------------

    if (
        word.action ===
        "guillotine"
    ) {

        console.log(
            "[Secret] Guillotine"
        );

        if (core) {

            core.startGuillotine();

            core.startMusicVisualizer();

        }

        startGuillotineLyrics();

        playGuillotine(

            () => {

                stopGuillotineLyrics();

                if (core) {

                    core.stopGuillotine();

                    core.stopMusicVisualizer();

                }

            }

        );

        return;

    }

    //--------------------------------------------------
    // 24/08
    //--------------------------------------------------

    if (
        word.text ===
        "24/08"
    ) {

        console.log(
            "[Secret] 24/08"
        );

        return;

    }

}

//--------------------------------------------------
// PALABRA NORMAL
//--------------------------------------------------

function showNormalWord(word) {

    showMessage(
        word.text
    );

}

//--------------------------------------------------
// ABRIR FOLDER
//--------------------------------------------------

function openFolder(folder) {

    if (
        !folder.children ||
        folder.children.length === 0
    ) {

        console.warn(
            "[Folder] No tiene contenido:",
            folder.text
        );

        return;

    }

    console.log(
        "[Folder] Abriendo:",
        folder.text
    );

    createFolderUI(folder);

}

//--------------------------------------------------
// CREAR UI DEL FOLDER
//--------------------------------------------------

function createFolderUI(folder) {

    //--------------------------------------------------
    // CERRAR ANTERIOR
    //--------------------------------------------------

    closeFolder();

    //--------------------------------------------------
    // CONTENEDOR
    //--------------------------------------------------

    folderContainer =
        document.createElement(
            "div"
        );

    folderContainer.id =
        "folder-system";

    //--------------------------------------------------
    // PANEL
    //--------------------------------------------------

    const panel =
        document.createElement(
            "div"
        );

    panel.className =
        "folder-panel";

    //--------------------------------------------------
    // TÍTULO
    //--------------------------------------------------

    const title =
        document.createElement(
            "div"
        );

    title.className =
        "folder-title";

    title.textContent =
        folder.text;

    panel.appendChild(
        title
    );

    //--------------------------------------------------
    // LISTA
    //--------------------------------------------------

    const list =
        document.createElement(
            "div"
        );

    list.className =
        "folder-list";

    //--------------------------------------------------
    // CANCIONES
    //--------------------------------------------------

    folder.children.forEach(
        song => {

            const item =
                document.createElement(
                    "button"
                );

            item.type =
                "button";

            item.className =
                "folder-item";

            item.textContent =
                "♪ " +
                song.text;

            //--------------------------------------------------
            // COLOR DEL BOTÓN
            //--------------------------------------------------

            if (
                Array.isArray(song.colors) &&
                song.colors.length > 0
            ) {

                item.style.setProperty(
                    "--song-color",
                    song.colors[0]
                );

                item.style.borderColor =
                    song.colors[0];

            }

            //--------------------------------------------------
            // CLICK
            //--------------------------------------------------

            item.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();

                    console.log(
                        "[Folder] Canción seleccionada:",
                        song.text
                    );

                    playFolderSong(
                        song
                    );

                }
            );

            //--------------------------------------------------
            // AGREGAR
            //--------------------------------------------------

            list.appendChild(
                item
            );

        }
    );

    panel.appendChild(
        list
    );

    //--------------------------------------------------
    // BOTÓN CERRAR
    //--------------------------------------------------

    const closeButton =
        document.createElement(
            "button"
        );

    closeButton.type =
        "button";

    closeButton.className =
        "folder-close";

    closeButton.textContent =
        "Cerrar";

    closeButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();

            closeFolder();

        }
    );

    panel.appendChild(
        closeButton
    );

    //--------------------------------------------------
    // AGREGAR PANEL
    //--------------------------------------------------

    folderContainer.appendChild(
        panel
    );

    document.body.appendChild(
        folderContainer
    );

    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    console.log(
        "[Folder] UI creada correctamente."
    );

}

//--------------------------------------------------
// CERRAR FOLDER
//--------------------------------------------------

export function closeFolder() {

    if (!folderContainer) {

        return;

    }

    folderContainer.remove();

    folderContainer = null;

    console.log(
        "[Folder] Cerrado."
    );

}