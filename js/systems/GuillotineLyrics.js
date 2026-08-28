//--------------------------------------------------
// GUILLOTINE LYRICS
//--------------------------------------------------
//
// Letras independientes del mundo 3D.
// La posición depende de la pantalla,
// NO del núcleo ni de la cámara.
//
//--------------------------------------------------


//==================================================
// CONFIGURACIÓN
//==================================================

// Ajuste global muy pequeño.
// Si alguna vez necesitás adelantar o atrasar
// absolutamente todo, cambiás solamente esto.
//
// Negativo = aparece antes
// Positivo = aparece después

const GLOBAL_OFFSET = 0;


//==================================================
// TIMELINE PRINCIPAL
//==================================================

const timeline = [

    //==================================================
    // PRIMER VERSO
    //==================================================

    {
        start: 9.80,
        end: 13,
        side: "left",
        text: "Sleep on me"
    },

    {
        start: 14.10,
        end: 16,
        side: "right",
        text: "Feel the rhythm in my chest"
    },

    {
        start: 16.10,
        end: 20.4,
        side: "right",
        text: "Just breathe"
    },

    {
        start: 19.80,
        end: 22.39,
        side: "left",
        text: "I will stay"
    },

    {
        start: 23.90,
        end: 26,
        side: "right",
        text: "So the lantern in your heart"
    },

    {
        start: 26.10,
        end: 27,
        side: "right",
        text: "won't fade"
    },

    //==================================================
    // PRIMER ESTRIBILLO
    //==================================================

    {
        start: 27.90,
        end: 30,
        side: "left",
        text: "The secrets you tell me"
    },

    {
        start: 30.49,
        end: 32.08,
        side: "right",
        text: "I'll take to my grave"
    },

    {
        start: 32.80,
        end: 34.68,
        side: "left",
        text: "There's bones in my closet"
    },

    {
        start: 35.32,
        end: 36.74,
        side: "right",
        text: "But you hang stuff anyway"
    },

    {
        start: 37.90,
        end: 39.79,
        side: "left",
        text: "And if you have nightmares"
    },

    {
        start: 40.08,
        end: 41.79,
        side: "right",
        text: "We'll dance on the bed"
    },

    {
        start: 42.80,
        end: 44.80,
        side: "left",
        text: "I know that you love me"
    },

    {
        start: 45.09,
        end: 45.62,
        side: "left",
        text: "love me"
    },

    {
        start: 46.31,
        end: 47.89,
        side: "right",
        text: "Even when I lose my head"
    },


    //==================================================
    // GUILLOTINE 1
    //==================================================

    {
        start: 48.60,
        end: 49.28,
        side: "left",
        text: "Guillotine"
    },

    {
        start: 53.32,
        end: 54.34,
        side: "right",
        text: "Guillotine"
    },
    //==================================================
    // VOCALIZACIÓN 1
    //==================================================

    {
        type: "vocal",

        start: 49.52,

        side: "bottom",

        parts: [

            {
                text: "bum",
                time: 49.52
            },

            {
                text: "bidity",
                time: 49.92
            },

            {
                text: "dum",
                time: 50.42
            },

            {
                text: "bum",
                time: 50.70
            },

            {
                text: "buddy",
                time: 51.02
            },

            {
                text: "bum",
                time: 51.82
            },

            {
                text: "bum",
                time: 52.32
            },

            {
                text: "bidity",
                time: 52.61
            },

            {
                text: "bum",
                time: 52.63
            },

            {
                text: "bum",
                time: 52.89
            },

            {
                text: "buddy",
                time: 52.92
            },

            {
                text: "buddy",
                time: 52.93
            },

            {
                text: "bum",
                time: 54.41
            },

            {
                text: "bidity",
                time: 54.83
            },

            {
                text: "bum",
                time: 55.32
            },

            {
                text: "bum",
                time: 55.62
            },

            {
                text: "bum",
                time: 59.32
            },

            {
                text: "bidity",
                time: 59.72
            },

            {
                text: "bum",
                time: 100.22
            },

            {
                text: "bum",
                time: 100.53
            },

            {
                text: "buddy",
                time: 100.83
            },

            {
                text: "bum",
                time: 101.23
            },

            {
                text: "bidity",
                time: 101.62
            },

            {
                text: "bum",
                time: 102.03
            },

            {
                text: "bum",
                time: 102.32
            },

            {
                text: "buddy",
                time: 102.62
            },

            {
                text: "bum",
                time: 103.09
            },

            {
                text: "bum",
                time: 103.42
            },

            {
                text: "bah",
                time: 103.83
            },

            {
                text: "bum",
                time: 104.22
            },

            {
                text: "bidity",
                time: 104.70
            },

            {
                text: "bum",
                time: 59.32
            },

        ]

    },

    {
        start: 55.93,
        end: 57.89,
        side: "left",
        text: "Even when I lose my head"
    },


    //==================================================
    // GUILLOTINE 2
    //==================================================

    {
        start: 58.23,
        end: 59.28,
        side: "right",
        text: "Guillotine"
    },

    {
        start: 103.09,
        end: 105.02,
        side: "left",
        text: "Guillotine"
    },

    {
        type: "vocal",

        start: 49.28,

        side: "bottom",

        parts: [

            {
                text: "bum",
                time: 59.33
            },

            {
                text: "bidity",
                time: 59.72
            },

            {
                text: "dum",
                time: 100.22
            },

            {
                text: "bum",
                time: 100.52
            },

            {
                text: "buddy",
                time: 100.82
            },

            {
                text: "bum",
                time: 101.22
            },

            {
                text: "bidity",
                time: 101.63
            },

            {
                text: "bum",
                time: 102.02
            },

            {
                text: "bum",
                time: 102.33
            },

            {
                text: "buddy",
                time: 102.62
            },

            {
                text: "bum",
                time: 103.09
            },

            {
                text: "bum",
                time: 103.43
            },

            {
                text: "bah",
                time: 103.83
            },

            {
                text: "bum",
                time: 104.22
            },

            {
                text: "bidity",
                time: 104.70
            },

            {
                text: "bum",
                time: 105.11
            },

            {
                text: "bum",
                time: 105.41
            },

            {
                text: "buddy",
                time: 105.79
            },

            {
                text: "bum",
                time: 106.12
            },

            {
                text: "bidity",
                time: 106.53
            },

            {
                text: "bum",
                time: 107.02
            },

            {
                text: "bum",
                time: 107.33
            },

            {
                text: "buddy",
                time: 107.65
            }

        ]

    },

    {
        start: 105.69,
        end: 108.00,
        side: "right",
        text: "Even when I lose my head"
    },

    //==================================================
    // SEGUNDO VERSO
    //==================================================

    {
        start: 108.76,
        end: 111.38,
        side: "left",
        text: "Kiss my lips"
    },

    {
        start: 112.94,
        end: 114.00,
        side: "right",
        text: "Feel the rhythm of your heart"
    },

    {
        start: 114.90,
        end: 116.27,
        side: "right",
        text: "And hips"
    },

    {
        start: 118.50,
        end: 121.29,
        side: "left",
        text: "I will pray"
    },

    {
        start: 122.70,
        end: 125.08,
        side: "right",
        text: "So the castle that we've built"
    },

    {
        start: 125.19,
        end: 126.00,
        side: "right",
        text: "Won't cave"
    },


    //==================================================
    // SEGUNDO ESTRIBILLO
    //==================================================

    {
        start: 126.80,
        end: 129.01,
        side: "left",
        text: "The secrets you tell me"
    },

    {
        start: 126.80,
        end: 130.35,
        side: "bottom",
        text: "secrets you tell me"
    },

    {
        start: 129.12,
        end: 131.46,
        side: "right",
        text: "I'll take to my grave"
    },

    {
        start: 130.84,
        end: 133.00,
        side: "bottom",
        text: "take to my grave"
    },

    {
        start: 131.60,
        end: 133.85,
        side: "left",
        text: "There's bones in my closet"
    },

    {
        start: 133.92,
        end: 135.73,
        side: "right",
        text: "But you hang stuff anyway"
    },

    {
        start: 136.53,
        end: 138.81,
        side: "left",
        text: "And if you have nightmares"
    },

    {
        start: 138.86,
        end: 140.95,
        side: "right",
        text: "We'll dance on the bed"
    },

    {
        start: 141.36,
        end: 143.24,
        side: "left",
        text: "I know that you love me"
    },

    {
        start: 143.62,
        end: 144.70,
        side: "left",
        text: "love me"
    },

    {
        start: 144.72,
        end: 146.82,
        side: "right",
        text: "Even when I lose my head"
    },


    //==================================================
    // GUILLOTINE 3
    //==================================================

    {
        start: 147.20,
        end: 148.18,
        side: "left",
        text: "Guillotine"
    },

    {
        start: 152.13,
        end: 153.16,
        side: "right",
        text: "Guillotine"
    },

    {
        type: "vocal",

        start: 49.28,

        side: "bottom",

        parts: [

            {
                text: "bum",
                time: 148.30
            },

            {
                text: "bidity",
                time: 148.69
            },

            {
                text: "dum",
                time: 149.18
            },

            {
                text: "bum",
                time: 149.47
            },

            {
                text: "buddy",
                time: 149.79
            },

            {
                text: "bum",
                time: 150.19
            },

            {
                text: "bidity",
                time: 150.61
            },

            {
                text: "bum",
                time: 151.09
            },

            {
                text: "bum",
                time: 151.39
            },

            {
                text: "buddy",
                time: 151.69
            },

            {
                text: "bum",
                time: 153.19
            },

            {
                text: "bidity",
                time: 153.60
            },

            {
                text: "bu,",
                time: 154.09
            },

            {
                text: "bum",
                time: 154.39
            },

            {
                text: "bum",
                time: 158.09
            },

            {
                text: "bidity",
                time: 158.51
            },

            {
                text: "bum",
                time: 159.00
            },

            {
                text: "bum",
                time: 159.30
            },

            {
                text: "buddy",
                time: 159.59
            },

            {
                text: "bum",
                time: 159.99
            },

            {
                text: "bidity",
                time: 200.40
            },

            {
                text: "bum",
                time: 200.80
            },

            {
                text: "bum",
                time: 201.09
            },

            {
                text: "buddy",
                time: 201.40
            },

            {
                text: "bum",
                time: 201.87
            },

            {
                text: "bum",
                time: 202.19
            },

            {
                text: "bah",
                time: 202.60
            },

            {
                text: "bum",
                time: 203.00
            },

            {
                text: "bidity",
                time: 203.47
            },

            {
                text: "bum",
                time: 203.89
            },

            {
                text: "bum",
                time: 204.19
            },

            {
                text: "buddy",
                time: 204.56
            },

            {
                text: "bum",
                time: 204.89
            },

            {
                text: "bidity",
                time: 205.30
            },

            {
                text: "bum",
                time: 205.79
            },

            {
                text: "bum",
                time: 206.09
            },

            {
                text: "buddy",
                time: 206.40
            }
        ]

    },

    {
        start: 154.73,
        end: 156.64,
        side: "left",
        text: "Even when I lose my head"
    },


    //==================================================
    // GUILLOTINE 4
    //==================================================
    {
        start: 157.45,
        end: 158.12,
        side: "left",
        text: "Guillotine"
    },

    {
        start: 201.79,
        end: 203.78,
        side: "right",
        text: "Guillotine"
    },


    {
        start: 204.49,
        end: 207.25,
        side: "right",
        text: "Even when I lose my head"
    },

    //==================================================
    // PUENTE
    //==================================================

    {
        start: 207.73,
        end: 208.71,
        side: "left",
        text: "You fill me up"
    },

    {
        start: 208.79,
        end: 210.08,
        side: "left",
        text: "you fill me up"
    },

    {
        start: 210.12,
        end: 211.94,
        side: "right",
        text: "You set my soul ablaze"
    },

    {
        start: 212.59,
        end: 213.63,
        side: "left",
        text: "You fill me up"
    },

    {
        start: 213.69,
        end: 214.88,
        side: "left",
        text: "you fill me up"
    },

    {
        start: 214.99,
        end: 216.85,
        side: "right",
        text: "Your love is so amazing"
    },

    {
        start: 217.47,
        end: 218.51,
        side: "left",
        text: "You fill me up"
    },

    {
        start: 218.59,
        end: 219.85,
        side: "left",
        text: "you fill me up"
    },

    {
        start: 219.84,
        end: 221.71,
        side: "right",
        text: "You set my soul ablaze"
    },


    {
        start: 222.38,
        end: 223.59,
        side: "left",
        text: "You fill me up"
    },

    {
        start: 223.98,
        end: 226.11,
        side: "left",
        text: "even when I lose my head"
    },


    //==================================================
    // ÚLTIMO ESTRIBILLO
    //==================================================

    {
        start: 161.0,
        end: 163.1,
        side: "left",
        text: "Guillotine"
    },

    {
        start: 163.1,
        end: 165.2,
        side: "right",
        text: "Guillotine"
    },

    {
        start: 165.2,
        end: 168.2,
        side: "left",
        text: "Even when I lose my head"
    },

    {
        start: 168.2,
        end: 170.3,
        side: "right",
        text: "Guillotine"
    },

    {
        start: 170.3,
        end: 172.4,
        side: "left",
        text: "Guillotine"
    },

    {
        start: 172.4,
        end: 175.4,
        side: "right",
        text: "Even when I lose my head"
    },

    {
        start: 175.4,
        end: 177.6,
        side: "left",
        text: "Guillotine"
    },

    {
        start: 177.6,
        end: 180.6,
        side: "right",
        text: "Even when I lose my head"
    },

    {
        start: 180.6,
        end: 182.7,
        side: "left",
        text: "Guillotine"
    },

    {
        start: 182.7,
        end: 184.8,
        side: "right",
        text: "Guillotine"
    },

    {
        start: 184.8,
        end: 188.0,
        side: "left",
        text: "Even when I lose my head"
    },

    //==================================================
    // OUTRO
    //==================================================

    {
        start: 188.0,
        end: 192.8,
        side: "left",
        text: "You fill me up, you fill me up"
    },

    {
        start: 192.8,
        end: 196.8,
        side: "right",
        text: "You set my soul ablaze"
    },

    {
        start: 196.8,
        end: 201.5,
        side: "left",
        text: "You fill me up, you fill me up"
    },

    {
        start: 201.5,
        end: 205.5,
        side: "right",
        text: "Your love is so amazing"
    },

    {
        start: 205.5,
        end: 210.2,
        side: "left",
        text: "You fill me up, you fill me up"
    },

    {
        start: 210.2,
        end: 214.0,
        side: "right",
        text: "You set my soul ablaze"
    },

    {
        start: 214.0,
        end: 217.0,
        side: "left",
        text: "You fill me up even when I lose my head"
    }

];


//==================================================
// ESTADO
//==================================================

let lyricsLayer = null;

let activeElements = [];

let running = false;


//==================================================
// CREAR SISTEMA
//==================================================

export function createGuillotineLyrics(scene) {

    lyricsLayer =
        document.createElement("div");

    lyricsLayer.id =
        "guillotine-lyrics-layer";

    lyricsLayer.className =
        "guillotine-lyrics-layer";

    lyricsLayer.setAttribute(
        "aria-hidden",
        "true"
    );


    const sceneContainer =
        document.getElementById("scene");


    if (sceneContainer) {

        sceneContainer.appendChild(
            lyricsLayer
        );

    }

    else {

        document.body.appendChild(
            lyricsLayer
        );

    }


    return {

        object:
            lyricsLayer,


        //--------------------------------------------------
        // START
        //--------------------------------------------------

        start() {

            running = true;

            clearElements();

            lyricsLayer.classList.add(
                "active"
            );

        },


        //--------------------------------------------------
        // STOP
        //--------------------------------------------------

        stop() {

            running = false;

            clearElements();

            lyricsLayer.classList.remove(
                "active"
            );

        },


        //--------------------------------------------------
        // UPDATE
        //--------------------------------------------------

        update(time) {

            if (!running) {
                return;
            }

            updateTimeline(
                time + GLOBAL_OFFSET
            );

        }

    };

}


//==================================================
// TIMELINE
//==================================================

function updateTimeline(time) {

    const visible = [];


    //--------------------------------------------------
    // ELEMENTOS NORMALES
    //--------------------------------------------------

    for (
        const item
        of timeline
    ) {

        if (
            item.type === "vocal"
        ) {

            continue;

        }


        if (
            time >= item.start &&
            time < item.end
        ) {

            visible.push(
                item
            );

        }

    }


    //--------------------------------------------------
    // VOCALIZACIONES
    //--------------------------------------------------

    for (
        const item
        of timeline
    ) {

        if (
            item.type !== "vocal"
        ) {

            continue;

        }


        updateVocal(
            item,
            time
        );

    }


    //--------------------------------------------------
    // CREAR ELEMENTOS NORMALES
    //--------------------------------------------------

    for (
        const item
        of visible
    ) {

        const exists =
            activeElements.find(
                element =>
                    element.data === item
            );


        if (!exists) {

            createElement(
                item
            );

        }

    }


    //--------------------------------------------------
    // ELIMINAR ELEMENTOS
    //--------------------------------------------------

    for (
        let i =
            activeElements.length - 1;

        i >= 0;

        i--
    ) {

        const element =
            activeElements[i];


        if (
            !visible.includes(
                element.data
            )
        ) {

            removeElement(
                element
            );

        }

    }

}


//==================================================
// CREAR ELEMENTO NORMAL
//==================================================

function createElement(data) {

    const element =
        document.createElement("div");


    element.className =
        "guillotine-lyric";


    //--------------------------------------------------
    // LADO
    //--------------------------------------------------

    if (
        data.side === "left"
    ) {

        element.classList.add(
            "lyrics-left"
        );

    }


    else if (
        data.side === "right"
    ) {

        element.classList.add(
            "lyrics-right"
        );

    }


    else if (
        data.side === "bottom"
    ) {

        element.classList.add(
            "lyrics-bottom"
        );

    }


    //--------------------------------------------------
    // TEXTO
    //--------------------------------------------------

    element.textContent =
        data.text;


    //--------------------------------------------------
    // AGREGAR
    //--------------------------------------------------

    lyricsLayer.appendChild(
        element
    );


    //--------------------------------------------------
    // ENTRADA
    //--------------------------------------------------

    requestAnimationFrame(
        () => {

            element.classList.add(
                "show"
            );

        }
    );


    //--------------------------------------------------
    // GUARDAR
    //--------------------------------------------------

    activeElements.push({

        data,

        element

    });

}


//==================================================
// VOCALIZACIONES
//==================================================

const vocalStates =
    new Map();


function updateVocal(
    data,
    currentTime
) {

    //--------------------------------------------------
    // TODAVÍA NO EMPEZÓ
    //--------------------------------------------------

    if (
        currentTime <
        data.start
    ) {

        return;

    }


    //--------------------------------------------------
    // BUSCAR ESTADO
    //--------------------------------------------------

    let state =
        vocalStates.get(
            data
        );


    if (!state) {

        state = {

            elements: []

        };

        vocalStates.set(
            data,
            state
        );

    }


    //--------------------------------------------------
    // CREAR SÍLABAS
    //
    // IMPORTANTE:
    // Los tiempos de "parts" son tiempos ABSOLUTOS
    // del video.
    //
    // Ejemplo:
    // 49.52 = 00:49.520
    //--------------------------------------------------

    for (
        let i = 0;

        i < data.parts.length;

        i++
    ) {

        const part =
            data.parts[i];


        //--------------------------------------------------
        // TODAVÍA NO LLEGÓ EL MOMENTO
        //--------------------------------------------------

        if (
            currentTime <
            part.time
        ) {

            continue;

        }


        //--------------------------------------------------
        // YA FUE CREADA
        //--------------------------------------------------

        if (
            state.elements[i]
        ) {

            continue;

        }


        //--------------------------------------------------
        // CREAR ELEMENTO
        //--------------------------------------------------

        const element =
            document.createElement("span");


        element.className =
            "guillotine-vocal-part";


        //--------------------------------------------------
        // TEXTO
        //--------------------------------------------------

        element.textContent =
            part.text;


        //--------------------------------------------------
        // POSICIÓN
        //--------------------------------------------------

        element.style.setProperty(
            "--vocal-index",
            i
        );


        //--------------------------------------------------
        // AGREGAR AL LAYER
        //--------------------------------------------------

        lyricsLayer.appendChild(
            element
        );


        //--------------------------------------------------
        // ANIMACIÓN
        //--------------------------------------------------

        requestAnimationFrame(
            () => {

                element.classList.add(
                    "show"
                );

            }
        );


        //--------------------------------------------------
        // GUARDAR
        //--------------------------------------------------

        state.elements[i] =
            element;

    }


    //--------------------------------------------------
    // LIMPIAR AL TERMINAR
    //--------------------------------------------------

    const lastPart =
        data.parts[
        data.parts.length - 1
        ];


    if (
        currentTime >
        lastPart.time + 2.2
    ) {

        clearVocal(
            data
        );

    }

}


//==================================================
// LIMPIAR VOCAL
//==================================================

function clearVocal(data) {

    const state =
        vocalStates.get(
            data
        );


    if (!state) {
        return;
    }


    for (
        const element
        of state.elements
    ) {

        if (
            element &&
            element.parentNode
        ) {

            element.classList.remove(
                "show"
            );

            element.classList.add(
                "hide"
            );


            setTimeout(
                () => {

                    if (
                        element.parentNode
                    ) {

                        element.parentNode.removeChild(
                            element
                        );

                    }

                },
                350
            );

        }

    }


    vocalStates.delete(
        data
    );

}


//==================================================
// ELIMINAR ELEMENTO NORMAL
//==================================================

function removeElement(
    element
) {

    if (
        !element ||
        !element.element
    ) {

        return;

    }


    const domElement =
        element.element;


    domElement.classList.remove(
        "show"
    );


    domElement.classList.add(
        "hide"
    );


    setTimeout(
        () => {

            if (
                domElement.parentNode
            ) {

                domElement.parentNode.removeChild(
                    domElement
                );

            }

        },
        450
    );


    activeElements =
        activeElements.filter(
            item =>
                item !== element
        );

}


//==================================================
// LIMPIAR TODO
//==================================================

function clearElements() {

    for (
        const element
        of activeElements
    ) {

        if (
            element.element &&
            element.element.parentNode
        ) {

            element.element.parentNode.removeChild(
                element.element
            );

        }

    }


    activeElements = [];


    //--------------------------------------------------
    // LIMPIAR VOCALES
    //--------------------------------------------------

    for (
        const data
        of vocalStates.keys()
    ) {

        clearVocal(
            data
        );

    }

}


//==================================================
// UPDATE EXTERNO
//==================================================

export function updateGuillotineLyrics() {

    // Las letras normales utilizan CSS.
    // Las vocalizaciones utilizan sus propios
    // tiempos internos.

}