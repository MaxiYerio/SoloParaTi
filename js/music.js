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
// AUDIO CONTEXT
//--------------------------------------------------

let audioContext = null;
let analyser = null;

//--------------------------------------------------
// ESTADO DEL ANALIZADOR
//--------------------------------------------------

let audioData = {

    bass: 0,
    mid: 0,
    treble: 0,
    overall: 0

};

//--------------------------------------------------
// ESTADO
//--------------------------------------------------

let currentSong = null;
let currentSongSource = null;

let fadeInterval = null;

//--------------------------------------------------
// INICIALIZAR ANALIZADOR
//--------------------------------------------------

function initAudioAnalyzer() {

    if (audioContext) return;

    audioContext =
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    analyser =
        audioContext.createAnalyser();

    //--------------------------------------------------
    // CONFIGURACIÓN
    //--------------------------------------------------

    analyser.fftSize = 512;

    analyser.smoothingTimeConstant = 0.82;

    //--------------------------------------------------
    // IMPORTANTE
    //--------------------------------------------------

    analyser.connect(
        audioContext.destination
    );

    console.log(
        "[Music] Analizador de audio iniciado"
    );

}

//--------------------------------------------------
// CREAR CONEXIÓN DE UNA CANCIÓN
//--------------------------------------------------

function connectSongToAnalyzer(song) {

    initAudioAnalyzer();

    //--------------------------------------------------
    // CREAR SOURCE
    //--------------------------------------------------

    const source =
        audioContext.createMediaElementSource(
            song
        );

    //--------------------------------------------------
    // SOURCE → ANALYZER → AUDIO
    //--------------------------------------------------

    source.connect(analyser);

    currentSongSource = source;

}

//--------------------------------------------------
// ACTUALIZAR DATOS DEL AUDIO
//--------------------------------------------------

function updateAudioData() {

    //--------------------------------------------------
    // Si no hay canción analizable
    //--------------------------------------------------

    if (
        !analyser ||
        !currentSong
    ) {

        audioData.bass *= 0.92;
        audioData.mid *= 0.92;
        audioData.treble *= 0.92;
        audioData.overall *= 0.92;

        return;

    }

    //--------------------------------------------------
    // OBTENER FRECUENCIAS
    //--------------------------------------------------

    const bufferLength =
        analyser.frequencyBinCount;

    const frequencies =
        new Uint8Array(
            bufferLength
        );

    analyser.getByteFrequencyData(
        frequencies
    );

    //--------------------------------------------------
    // BANDAS
    //--------------------------------------------------

    let bass = 0;
    let mid = 0;
    let treble = 0;

    let bassCount = 0;
    let midCount = 0;
    let trebleCount = 0;

    let total = 0;

    //--------------------------------------------------
    // RECORRER FRECUENCIAS
    //--------------------------------------------------

    for (
        let i = 0;
        i < bufferLength;
        i++
    ) {

        const value =
            frequencies[i] / 255;

        total += value;

        //--------------------------------------------------
        // GRAVES
        //--------------------------------------------------

        if (i < bufferLength * 0.08) {

            bass += value;

            bassCount++;

        }

        //--------------------------------------------------
        // MEDIOS
        //--------------------------------------------------

        else if (
            i < bufferLength * 0.35
        ) {

            mid += value;

            midCount++;

        }

        //--------------------------------------------------
        // AGUDOS
        //--------------------------------------------------

        else {

            treble += value;

            trebleCount++;

        }

    }

    //--------------------------------------------------
    // NORMALIZAR
    //--------------------------------------------------

    bass =
        bassCount > 0
            ? bass / bassCount
            : 0;

    mid =
        midCount > 0
            ? mid / midCount
            : 0;

    treble =
        trebleCount > 0
            ? treble / trebleCount
            : 0;

    const overall =
        total / bufferLength;

    //--------------------------------------------------
    // SUAVIZADO
    //--------------------------------------------------

    audioData.bass +=
        (bass - audioData.bass) *
        0.35;

    audioData.mid +=
        (mid - audioData.mid) *
        0.25;

    audioData.treble +=
        (treble - audioData.treble) *
        0.25;

    audioData.overall +=
        (overall - audioData.overall) *
        0.25;

}

//--------------------------------------------------
// OBTENER DATOS PARA EL NÚCLEO
//--------------------------------------------------

export function getAudioData() {

    updateAudioData();

    return audioData;

}

//--------------------------------------------------
// SABER SI HAY UNA CANCIÓN ACTIVA
//--------------------------------------------------

export function isSongPlaying() {

    return (
        currentSong !== null &&
        !currentSong.paused
    );

}

//--------------------------------------------------
// UTILIDADES
//--------------------------------------------------

function fadeAudio(
    audio,
    targetVolume,
    duration = FADE_TIME
) {

    return new Promise(resolve => {

        if (!audio) {

            resolve();

            return;

        }

        clearInterval(
            fadeInterval
        );

        const startVolume =
            audio.volume;

        const difference =
            targetVolume -
            startVolume;

        const stepTime =
            duration /
            FADE_STEPS;

        let step = 0;

        fadeInterval =
            setInterval(() => {

                step++;

                const progress =
                    step /
                    FADE_STEPS;

                audio.volume =
                    startVolume +
                    difference *
                    progress;

                if (
                    step >=
                    FADE_STEPS
                ) {

                    audio.volume =
                        targetVolume;

                    clearInterval(
                        fadeInterval
                    );

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

        await fadeAudio(
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

export async function playSong(
    filename,
    onEnded = null
) {

    if (!filename) return;

    console.log(
        "[Music] Reproduciendo:",
        filename
    );

    //--------------------------------------------------
    // INICIAR AUDIO CONTEXT
    //--------------------------------------------------

    initAudioAnalyzer();

    if (
        audioContext.state ===
        "suspended"
    ) {

        await audioContext.resume();

    }

    //--------------------------------------------------
    // SI YA HAY UNA CANCIÓN
    //--------------------------------------------------

    if (currentSong) {

        await fadeAudio(
            currentSong,
            0
        );

        currentSong.pause();

        currentSong.currentTime = 0;

        currentSong = null;

        currentSongSource = null;

    }

    //--------------------------------------------------
    // BAJAR CHIHIRO
    //--------------------------------------------------

    await fadeAudio(
        chihiro,
        0
    );

    //--------------------------------------------------
    // CREAR CANCIÓN
    //--------------------------------------------------

    const song =
        new Audio(
            MUSIC_FOLDER +
            filename
        );

    song.volume = 0;

    currentSong = song;

    //--------------------------------------------------
    // CONECTAR AL ANALIZADOR
    //--------------------------------------------------

    connectSongToAnalyzer(
        song
    );

    //--------------------------------------------------
    // CUANDO TERMINA
    //--------------------------------------------------

    song.addEventListener(
        "ended",
        async () => {

            console.log(
                "[Music] Terminó:",
                filename
            );

            //--------------------------------------------------
            // FADE OUT
            //--------------------------------------------------

            await fadeAudio(
                song,
                0
            );

            song.pause();

            //--------------------------------------------------
            // LIMPIAR
            //--------------------------------------------------

            if (
                currentSong === song
            ) {

                currentSong = null;

                currentSongSource = null;

            }

            //--------------------------------------------------
            // APAGAR DATOS DEL VISUALIZADOR
            //--------------------------------------------------

            audioData.bass = 0;
            audioData.mid = 0;
            audioData.treble = 0;
            audioData.overall = 0;

            //--------------------------------------------------
            // VOLVER A CHIHIRO
            //--------------------------------------------------

            await fadeAudio(
                chihiro,
                0.35
            );
            
            if (onEnded) {

                onEnded();

            }

        }
    );

    //--------------------------------------------------
    // REPRODUCIR
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

        currentSongSource = null;

        audioData.bass = 0;
        audioData.mid = 0;
        audioData.treble = 0;
        audioData.overall = 0;

        await fadeAudio(
            chihiro,
            0.35
        );

    }

}

//--------------------------------------------------
// GUILLotine
//--------------------------------------------------

const guillotine = new Audio(
    MUSIC_FOLDER + "guillotine.mp3"
);

guillotine.volume = 0;

export async function playGuillotine(onEnded = null) {

    console.log(
        "[Music] Iniciando Guillotine"
    );

    //--------------------------------------------------
    // BAJAR CHIHIRO
    //--------------------------------------------------

    await fadeAudio(
        chihiro,
        0
    );

    //--------------------------------------------------
    // REINICIAR
    //--------------------------------------------------

    guillotine.currentTime = 0;
    guillotine.volume = 0;

    //--------------------------------------------------
    // REPRODUCIR
    //--------------------------------------------------

    try {

        await guillotine.play();

        await fadeAudio(
            guillotine,
            0.35
        );

        //--------------------------------------------------
        // CUANDO TERMINA
        //--------------------------------------------------

        guillotine.addEventListener(
            "ended",
            async () => {

                console.log(
                    "[Music] Terminó Guillotine"
                );

                //--------------------------------------------------
                // FADE OUT
                //--------------------------------------------------

                await fadeAudio(
                    guillotine,
                    0
                );

                guillotine.pause();

                //--------------------------------------------------
                // VOLVER A CHIHIRO
                //--------------------------------------------------

                await fadeAudio(
                    chihiro,
                    0.35
                );

                //--------------------------------------------------
                // AVISAR QUE TERMINÓ
                //--------------------------------------------------

                if (onEnded) {

                    onEnded();

                }

            },
            { once: true }
        );

    } catch (error) {

        console.error(
            "[Music] No se pudo reproducir Guillotine:",
            error
        );

    }

}

export async function stopGuillotine() {

    await fadeAudio(
        guillotine,
        0
    );

    guillotine.pause();

    guillotine.currentTime = 0;

    await fadeAudio(
        chihiro,
        0.35
    );

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

        currentSongSource = null;

    }

    //--------------------------------------------------
    // LIMPIAR VISUALIZADOR
    //--------------------------------------------------

    audioData.bass = 0;
    audioData.mid = 0;
    audioData.treble = 0;
    audioData.overall = 0;

    //--------------------------------------------------
    // CHIHIRO
    //--------------------------------------------------

    await fadeAudio(
        chihiro,
        0
    );

    chihiro.pause();

    chihiro.currentTime = 0;

}