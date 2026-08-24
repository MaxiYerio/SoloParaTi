//--------------------------------------------------
// CONFIGURACIÓN
//--------------------------------------------------

const MUSIC_FOLDER = "../assets/audio/";

const FADE_TIME = 1800;
const FADE_STEPS = 30;


//--------------------------------------------------
// AUDIO BASE
//--------------------------------------------------

const chihiro = new Audio(
    MUSIC_FOLDER + "chihiro.mp3"
);

chihiro.loop = true;
chihiro.volume = 0;


//--------------------------------------------------
// GUILLOTINE
//--------------------------------------------------

const guillotine = new Audio(
    MUSIC_FOLDER + "guillotine.mp3"
);

guillotine.loop = false;
guillotine.volume = 0;


//--------------------------------------------------
// AUDIO CONTEXT
//--------------------------------------------------

let audioContext = null;
let analyser = null;


//--------------------------------------------------
// SOURCES
//--------------------------------------------------

let chihiroSource = null;
let guillotineSource = null;
let currentSongSource = null;


//--------------------------------------------------
// ESTADO DEL ANALIZADOR
//--------------------------------------------------

const audioData = {

    bass: 0,
    mid: 0,
    treble: 0,
    overall: 0

};


//--------------------------------------------------
// ESTADO MUSICAL
//--------------------------------------------------

let currentSong = null;

let guillotinePlaying = false;

let guillotineStarting = false;

let fadeAnimation = null;


//--------------------------------------------------
// INICIALIZAR AUDIO CONTEXT
//--------------------------------------------------

function initAudioAnalyzer() {

    if (audioContext) {
        return;
    }

    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

    audioContext =
        new AudioContext();

    analyser =
        audioContext.createAnalyser();

    analyser.fftSize = 512;

    analyser.smoothingTimeConstant =
        0.68;

    analyser.connect(
        audioContext.destination
    );

    console.log(
        "[Music] Audio analyzer iniciado"
    );

}


//--------------------------------------------------
// CONECTAR CHIHIRO
//--------------------------------------------------

function connectChihiroToAnalyzer() {

    initAudioAnalyzer();

    if (chihiroSource) {
        return;
    }

    chihiroSource =
        audioContext.createMediaElementSource(
            chihiro
        );

    chihiroSource.connect(
        analyser
    );

}


//--------------------------------------------------
// CONECTAR GUILLOTINE
//--------------------------------------------------

function connectGuillotineToAnalyzer() {

    initAudioAnalyzer();

    if (guillotineSource) {
        return;
    }

    guillotineSource =
        audioContext.createMediaElementSource(
            guillotine
        );

    guillotineSource.connect(
        analyser
    );

}


//--------------------------------------------------
// CONECTAR CANCIÓN
//--------------------------------------------------

function connectSongToAnalyzer(song) {

    initAudioAnalyzer();

    const source =
        audioContext.createMediaElementSource(
            song
        );

    source.connect(
        analyser
    );

    currentSongSource =
        source;

}


//--------------------------------------------------
// RESET AUDIO DATA
//--------------------------------------------------

function resetAudioData() {

    audioData.bass = 0;
    audioData.mid = 0;
    audioData.treble = 0;
    audioData.overall = 0;

}


//--------------------------------------------------
// ACTUALIZAR ANALIZADOR
//--------------------------------------------------

function updateAudioData() {

    if (!analyser) {

        audioData.bass *= 0.82;
        audioData.mid *= 0.86;
        audioData.treble *= 0.86;
        audioData.overall *= 0.86;

        return;

    }


    //--------------------------------------------------
    // ¿HAY AUDIO?
    //--------------------------------------------------

    const hasAudio =
        (
            currentSong &&
            !currentSong.paused
        ) ||
        !guillotine.paused ||
        !chihiro.paused;


    if (!hasAudio) {

        audioData.bass *= 0.82;
        audioData.mid *= 0.86;
        audioData.treble *= 0.86;
        audioData.overall *= 0.86;

        return;

    }


    //--------------------------------------------------
    // FRECUENCIAS
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
        // BASS
        //--------------------------------------------------

        if (
            i <
            bufferLength * 0.08
        ) {

            bass += value;
            bassCount++;

        }


        //--------------------------------------------------
        // MID
        //--------------------------------------------------

        else if (
            i <
            bufferLength * 0.35
        ) {

            mid += value;
            midCount++;

        }


        //--------------------------------------------------
        // TREBLE
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
    // SUAVIZAR
    //--------------------------------------------------

    audioData.bass +=
        (
            bass -
            audioData.bass
        ) * 0.55;

    audioData.mid +=
        (
            mid -
            audioData.mid
        ) * 0.28;

    audioData.treble +=
        (
            treble -
            audioData.treble
        ) * 0.32;

    audioData.overall +=
        (
            overall -
            audioData.overall
        ) * 0.30;

}


//--------------------------------------------------
// OBTENER DATOS
//--------------------------------------------------

export function getAudioData() {

    updateAudioData();

    return audioData;

}


//--------------------------------------------------
// ¿HAY CANCIÓN?
//--------------------------------------------------

export function isSongPlaying() {

    return (
        currentSong !== null &&
        !currentSong.paused
    );

}

//--------------------------------------------------
// TIEMPO DE GUILLOTINE
//--------------------------------------------------

export function getGuillotineTime() {

    return guillotine.currentTime || 0;

}


//--------------------------------------------------
// FADE
//--------------------------------------------------

function fadeAudio(
    audio,
    targetVolume,
    duration = FADE_TIME
) {

    return new Promise(
        resolve => {

            if (!audio) {

                resolve();

                return;

            }

            //--------------------------------------------------
            // LIMITAR VOLUMEN OBJETIVO
            //--------------------------------------------------

            targetVolume =
                Math.max(
                    0,
                    Math.min(
                        1,
                        targetVolume
                    )
                );


            //--------------------------------------------------
            // CANCELAR FADE ANTERIOR
            //--------------------------------------------------

            if (fadeAnimation) {

                cancelAnimationFrame(
                    fadeAnimation
                );

                fadeAnimation = null;

            }


            //--------------------------------------------------
            // VOLUMEN INICIAL
            //--------------------------------------------------

            const startVolume =
                Math.max(
                    0,
                    Math.min(
                        1,
                        audio.volume
                    )
                );


            //--------------------------------------------------
            // DIFERENCIA
            //--------------------------------------------------

            const difference =
                targetVolume -
                startVolume;


            //--------------------------------------------------
            // TIEMPO
            //--------------------------------------------------

            const startTime =
                performance.now();


            //--------------------------------------------------
            // ANIMACIÓN
            //--------------------------------------------------

            function animateFade(now) {

                const elapsed =
                    now -
                    startTime;


                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );


                //--------------------------------------------------
                // EASING
                //--------------------------------------------------

                const eased =
                    progress *
                    (
                        2 -
                        progress
                    );


                //--------------------------------------------------
                // CALCULAR VOLUMEN
                //--------------------------------------------------

                let volume =
                    startVolume +
                    difference *
                    eased;


                //--------------------------------------------------
                // SEGURIDAD
                //--------------------------------------------------

                volume =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            volume
                        )
                    );


                audio.volume =
                    volume;


                //--------------------------------------------------
                // TERMINÓ
                //--------------------------------------------------

                if (
                    progress >= 1
                ) {

                    audio.volume =
                        targetVolume;

                    fadeAnimation =
                        null;

                    resolve();

                    return;

                }


                //--------------------------------------------------
                // SIGUIENTE FRAME
                //--------------------------------------------------

                fadeAnimation =
                    requestAnimationFrame(
                        animateFade
                    );

            }


            fadeAnimation =
                requestAnimationFrame(
                    animateFade
                );

        }
    );

}


//--------------------------------------------------
// INICIAR CHIHIRO
//--------------------------------------------------

//--------------------------------------------------
// INICIAR / REANUDAR CHIHIRO
//--------------------------------------------------

export async function startChihiro() {

    // Si hay otra música reproduciéndose,
    // NO iniciar Chihiro encima.
    if (
        currentSong &&
        !currentSong.paused
    ) {

        console.log(
            "[Music] Chihiro no inicia: hay otra canción."
        );

        return;

    }

    if (
        guillotinePlaying
    ) {

        console.log(
            "[Music] Chihiro no inicia: Guillotine está activa."
        );

        return;

    }

    try {

        initAudioAnalyzer();

        connectChihiroToAnalyzer();


        if (
            audioContext.state ===
            "suspended"
        ) {

            await audioContext.resume();

        }


        //--------------------------------------------------
        // IMPORTANTE:
        // NO reiniciamos currentTime.
        // Continúa exactamente donde quedó.
        //--------------------------------------------------

        if (
            chihiro.paused
        ) {

            await chihiro.play();

        }


        await fadeAudio(
            chihiro,
            0.35
        );


        console.log(
            "[Music] Chihiro reanudado en:",
            chihiro.currentTime.toFixed(2),
            "s"
        );

    }
    catch (error) {

        console.warn(
            "[Music] No se pudo iniciar/reanudar Chihiro:",
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

    if (!filename) {
        return;
    }


    console.log(
        "[Music] Reproduciendo:",
        filename
    );


    //--------------------------------------------------
    // AUDIO CONTEXT
    //--------------------------------------------------

    initAudioAnalyzer();


    if (
        audioContext.state ===
        "suspended"
    ) {

        await audioContext.resume();

    }


    //--------------------------------------------------
    // DETENER GUILLOTINE
    //--------------------------------------------------

    if (guillotinePlaying) {

        await stopGuillotine();

    }


    //--------------------------------------------------
    // DETENER CANCIÓN ANTERIOR
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
    // BAJAR Y PAUSAR CHIHIRO
    //--------------------------------------------------

    await fadeAudio(
        chihiro,
        0
    );

    chihiro.pause();


    //--------------------------------------------------
    // CREAR AUDIO
    //--------------------------------------------------

    const song =
        new Audio(
            MUSIC_FOLDER +
            filename
        );

    song.volume = 0;

    currentSong =
        song;


    //--------------------------------------------------
    // ANALIZADOR
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


            await fadeAudio(
                song,
                0
            );

            song.pause();


            if (
                currentSong ===
                song
            ) {

                currentSong = null;
                currentSongSource = null;

            }


            resetAudioData();


            //--------------------------------------------------
            // VOLVER A CHIHIRO
            //--------------------------------------------------

            if (!guillotinePlaying) {

                await chihiro.play();

                await fadeAudio(
                    chihiro,
                    0.35
                );

                console.log(
                    "[Music] Chihiro reanudado en:",
                    chihiro.currentTime.toFixed(2),
                    "s"
                );

            }


            if (onEnded) {

                onEnded();

            }

        },
        {
            once: true
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

    }
    catch (error) {

        console.error(
            "[Music] No se pudo reproducir:",
            error
        );


        currentSong = null;

        currentSongSource = null;

        resetAudioData();


        await fadeAudio(
            chihiro,
            0.35
        );

    }

}


//==================================================
// GUILLOTINE
//==================================================

export async function playGuillotine(
    onEnded = null
) {

    if (guillotinePlaying || guillotineStarting) {

        console.log(
            "[Music] Guillotine ya está activa."
        );

        return;

    }

    guillotineStarting = true;

    console.log(
        "[Music] Iniciando Guillotine"
    );


    //--------------------------------------------------
    // AUDIO CONTEXT
    //--------------------------------------------------

    initAudioAnalyzer();


    if (
        audioContext.state ===
        "suspended"
    ) {

        await audioContext.resume();

    }


    //--------------------------------------------------
    // CONECTAR
    //--------------------------------------------------

    connectGuillotineToAnalyzer();


    //--------------------------------------------------
    // MARCAR ESTADO
    //--------------------------------------------------

    guillotinePlaying =
        true;


    //--------------------------------------------------
    // DETENER CANCIÓN NORMAL
    //--------------------------------------------------

    if (currentSong) {

        await fadeAudio(
            chihiro,
            0
        );

        chihiro.pause();
        
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
    // REINICIAR GUILLOTINE
    //--------------------------------------------------

    guillotine.pause();

    guillotine.currentTime = 0;

    guillotine.volume = 0;


    //--------------------------------------------------
    // EVENTO FINAL
    //--------------------------------------------------

    guillotine.onended =
        async () => {

            console.log(
                "[Music] Terminó Guillotine"
            );


            guillotinePlaying =
                false;


            await fadeAudio(
                guillotine,
                0
            );


            guillotine.pause();


            resetAudioData();


            //--------------------------------------------------
            // VOLVER A CHIHIRO
            //--------------------------------------------------

            await fadeAudio(
                chihiro,
                0.35
            );


            //--------------------------------------------------
            // CALLBACK
            //--------------------------------------------------

            if (onEnded) {

                onEnded();

            }

        };


    //--------------------------------------------------
    // REPRODUCIR
    //--------------------------------------------------

    try {

        await guillotine.play();

        guillotineStarting = false;

        await fadeAudio(
            guillotine,
            0.35
        );

        console.log(
            "[Music] Guillotine reproduciendo"
        );

    }
    catch (error) {

        console.error(
            "[Music] No se pudo reproducir Guillotine:",
            error
        );

        guillotineStarting = false;

        guillotinePlaying = false;

        resetAudioData();

        await fadeAudio(
            chihiro,
            0.35
        );

    }

}


//--------------------------------------------------
// DETENER GUILLOTINE
//--------------------------------------------------

export async function stopGuillotine() {
    console.log(
        "[Music] Deteniendo Guillotine"
    );


    guillotinePlaying =
        false;


    await fadeAudio(
        guillotine,
        0
    );

    guillotineStarting = false;

    guillotinePlaying = false;

    guillotine.pause();

    guillotine.currentTime = 0;

    guillotine.onended = null;


    resetAudioData();


    //--------------------------------------------------
    // VOLVER A CHIHIRO
    //--------------------------------------------------

    await fadeAudio(
        chihiro,
        0.35
    );

}


//--------------------------------------------------
// DETENER TODO
//--------------------------------------------------

export async function stopMusic() {

    console.log(
        "[Music] Deteniendo toda la música"
    );


    //--------------------------------------------------
    // GUILLOTINE
    //--------------------------------------------------

    guillotinePlaying =
        false;

    guillotine.onended = null;


    await fadeAudio(
        guillotine,
        0
    );

    guillotine.pause();

    guillotine.currentTime = 0;


    //--------------------------------------------------
    // CANCIÓN
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
    // CHIHIRO
    //--------------------------------------------------

    await fadeAudio(
        chihiro,
        0
    );

    chihiro.pause();

    chihiro.currentTime = 0;


    //--------------------------------------------------
    // RESET
    //--------------------------------------------------

    resetAudioData();

}