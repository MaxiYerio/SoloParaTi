import {
    getGuillotineTime
} from "../music.js";

let lyrics = null;


//--------------------------------------------------
// CONFIGURAR
//--------------------------------------------------

export function setupGuillotineLyrics(
    lyricsObject
) {

    lyrics =
        lyricsObject;

}


//--------------------------------------------------
// INICIAR
//--------------------------------------------------

export function startGuillotineLyrics() {

    if (!lyrics) return;

    lyrics.start();

}


//--------------------------------------------------
// DETENER
//--------------------------------------------------

export function stopGuillotineLyrics() {

    if (!lyrics) return;

    lyrics.stop();

}


//--------------------------------------------------
// UPDATE
//--------------------------------------------------

export function updateGuillotineLyrics() {

    if (!lyrics) return;

    lyrics.update(
        getGuillotineTime()
    );

}