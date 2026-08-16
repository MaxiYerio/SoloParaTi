// js/music.js

//--------------------------------------------------
// CONFIGURACIÓN
//--------------------------------------------------

const MUSIC_FOLDER = "../assets/audio/";

const FADE_TIME = 1800;
const FADE_STEPS = 30;

//--------------------------------------------------
// AUDIO
//--------------------------------------------------

const chihiro = new Audio(
    MUSIC_FOLDER + "chihiro.mp3"
);

chihiro.loop = true;
chihiro.volume = 0;

//--------------------------------------------------
// ESTADO
//--------------------------------------------------

let currentSong = null;
let fadeInterval = null;

//--------------------------------------------------
// UTILIDADES
//--------------------------------------------------

function fadeAudio(audio, targetVolume, duration = FADE_TIME) {

    return new Promise(resolve => {

        if (!audio) {
            resolve();
            return;
        }

        clearInterval(fadeInterval);

        const startVolume = audio.volume;

        const difference =
            targetVolume - startVolume;

        const stepTime =
            duration / FADE_STEPS;

        let step = 0;

        fadeInterval = setInterval(() => {

            step++;

            const progress =
                step / FADE_STEPS;

            audio.volume =
                startVolume +
                difference * progress;

            if (step >= FADE_STEPS) {

                audio.volume = targetVolume;

                clearInterval(fadeInterval);

                resolve();

            }

        }, stepTime);

    });

}

//--------------------------------------------------
// INICIAR CHIHIRO
//--------------------------------------------------

export async function startChihiro() {

    try {

        await chihiro.play();

        fadeAudio(
            chihiro,
            0.35
        );

        console.log(
            "[Music] Chihiro iniciado"
        );

    } catch (error) {

        console.warn(
            "[Music] El navegador bloqueó el audio hasta una interacción.",
            error
        );

    }

}

//--------------------------------------------------
// REPRODUCIR CANCIÓN
//--------------------------------------------------

export async function playSong(filename) {

    if (!filename) return;

    console.log(
        "[Music] Reproduciendo:",
        filename
    );

    //--------------------------------------------------
    // Si ya hay una canción
    //--------------------------------------------------

    if (currentSong) {

        await fadeAudio(
            currentSong,
            0
        );

        currentSong.pause();

        currentSong.currentTime = 0;

    }

    //--------------------------------------------------
    // Bajar Chihiro
    //--------------------------------------------------

    await fadeAudio(
        chihiro,
        0
    );

    //--------------------------------------------------
    // Crear canción
    //--------------------------------------------------

    const song = new Audio(
        MUSIC_FOLDER + filename
    );

    song.volume = 0;

    currentSong = song;

    //--------------------------------------------------
    // Cuando termina
    //--------------------------------------------------

    song.addEventListener(
        "ended",
        async () => {

            console.log(
                "[Music] Terminó:",
                filename
            );

            await fadeAudio(
                song,
                0
            );

            song.pause();

            if (currentSong === song) {

                currentSong = null;

            }

            //--------------------------------------------------
            // Volver a Chihiro
            //--------------------------------------------------

            await fadeAudio(
                chihiro,
                0.35
            );

        }
    );

    //--------------------------------------------------
    // Reproducir
    //--------------------------------------------------

    try {

        await song.play();

        await fadeAudio(
            song,
            0.35
        );

    } catch (error) {

        console.error(
            "[Music] No se pudo reproducir:",
            error
        );

        currentSong = null;

        await fadeAudio(
            chihiro,
            0.35
        );

    }

}

//--------------------------------------------------
// DETENER TODO
//--------------------------------------------------

export async function stopMusic() {

    if (currentSong) {

        await fadeAudio(
            currentSong,
            0
        );

        currentSong.pause();

        currentSong.currentTime = 0;

        currentSong = null;

    }

    await fadeAudio(
        chihiro,
        0
    );

    chihiro.pause();

    chihiro.currentTime = 0;

}