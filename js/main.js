// js/main.js


import {
    startApp
} from "./core/App.js";


//==================================================
// VERSIÓN DEL PROYECTO
//==================================================

const CURRENT_VERSION = "0.4.0";


//==================================================
// ACTUALIZACIONES
//==================================================

const UPDATES = [

    {
        version: "0.4.0",

        date: "25 de agosto de 2026",

        title: "El universo llega al celular",

        message:
            "Ahora también podés recorrer este pequeño universo desde tu celular.",

        changes: [

            "Soporte completo para pantallas móviles.",

            "Zoom con dos dedos.",

            "Movimiento del universo con un dedo.",

            "Mensajes largos mejor adaptados.",

            "Interfaz responsive."

        ]

    },


    //==================================================
    // FUTURAS ACTUALIZACIONES
    //==================================================

    /*
    {
        version: "0.5.0",

        date: "Próximamente",

        title: "Nuevos recuerdos",

        message:
            "El universo tiene algo nuevo para vos.",

        changes: [

            "Nuevo recuerdo.",

            "Nuevo secreto."

        ]

    }
    */

];


//==================================================
// ELEMENTOS
//==================================================

const intro =
    document.getElementById(
        "intro"
    );

const updatesButton =
    document.getElementById(
        "updates-button"
    );

const updatesPanel =
    document.getElementById(
        "updates-panel"
    );

const updatesDot =
    document.getElementById(
        "updates-dot"
    );

const updatesList =
    document.getElementById(
        "updates-list"
    );

const currentVersion =
    document.getElementById(
        "current-version"
    );


//==================================================
// ESTADO DE LA INTRO
//==================================================

let started = false;


//==================================================
// STORAGE
//==================================================

const READ_VERSION_KEY =
    "soloParaTi_readVersion";


//==================================================
// INICIALIZAR ACTUALIZACIONES
//==================================================

function setupUpdates() {

    //--------------------------------------------------
    // VERSIÓN
    //--------------------------------------------------

    currentVersion.textContent =
        `v${CURRENT_VERSION}`;


    //--------------------------------------------------
    // GENERAR CONTENIDO
    //--------------------------------------------------

    renderUpdates();


    //--------------------------------------------------
    // VER SI HAY ALGO NUEVO
    //--------------------------------------------------

    checkForUnreadUpdates();

}


//==================================================
// RENDERIZAR ACTUALIZACIONES
//==================================================

function renderUpdates() {

    updatesList.innerHTML = "";


    UPDATES.forEach(
        update => {

            const article =
                document.createElement(
                    "article"
                );

            article.className =
                "update-item";


            //--------------------------------------------------
            // HEADER
            //--------------------------------------------------

            const header =
                document.createElement(
                    "div"
                );

            header.className =
                "update-item-header";


            //--------------------------------------------------
            // VERSIÓN
            //--------------------------------------------------

            const version =
                document.createElement(
                    "span"
                );

            version.className =
                "update-version";

            version.textContent =
                `v${update.version}`;


            //--------------------------------------------------
            // FECHA
            //--------------------------------------------------

            const date =
                document.createElement(
                    "span"
                );

            date.className =
                "update-date";

            date.textContent =
                update.date;


            header.appendChild(
                version
            );

            header.appendChild(
                date
            );


            //--------------------------------------------------
            // TÍTULO
            //--------------------------------------------------

            const title =
                document.createElement(
                    "h3"
                );

            title.textContent =
                update.title;


            //--------------------------------------------------
            // MENSAJE
            //--------------------------------------------------

            const message =
                document.createElement(
                    "p"
                );

            message.className =
                "update-message";

            message.textContent =
                update.message;


            //--------------------------------------------------
            // CAMBIOS
            //--------------------------------------------------

            const changes =
                document.createElement(
                    "ul"
                );

            changes.className =
                "update-changes";


            update.changes.forEach(
                change => {

                    const li =
                        document.createElement(
                            "li"
                        );

                    li.textContent =
                        change;

                    changes.appendChild(
                        li
                    );

                }
            );


            //--------------------------------------------------
            // ARMAR
            //--------------------------------------------------

            article.appendChild(
                header
            );

            article.appendChild(
                title
            );

            article.appendChild(
                message
            );

            article.appendChild(
                changes
            );


            updatesList.appendChild(
                article
            );

        }
    );

}


//==================================================
// COMPROBAR SI HAY ACTUALIZACIONES NUEVAS
//==================================================

function checkForUnreadUpdates() {

    const readVersion =
        localStorage.getItem(
            READ_VERSION_KEY
        );


    //--------------------------------------------------
    // SI NUNCA ENTRÓ
    //--------------------------------------------------

    if (!readVersion) {

        updatesDot.classList.add(
            "show"
        );

        return;

    }


    //--------------------------------------------------
    // COMPARAR VERSIÓN
    //--------------------------------------------------

    if (
        readVersion !==
        CURRENT_VERSION
    ) {

        updatesDot.classList.add(
            "show"
        );

    }

}


//==================================================
// MARCAR COMO LEÍDO
//==================================================

function markUpdatesAsRead() {

    localStorage.setItem(
        READ_VERSION_KEY,
        CURRENT_VERSION
    );

    updatesDot.classList.remove(
        "show"
    );

}


//==================================================
// ABRIR / CERRAR PANEL
//==================================================

function toggleUpdates() {

    const isOpen =
        updatesPanel.classList.contains(
            "show"
        );


    if (isOpen) {

        closeUpdates();

    } else {

        openUpdates();

    }

}


//==================================================
// ABRIR
//==================================================

function openUpdates() {

    updatesPanel.classList.add(
        "show"
    );

    updatesPanel.setAttribute(
        "aria-hidden",
        "false"
    );

    updatesButton.setAttribute(
        "aria-expanded",
        "true"
    );


    //--------------------------------------------------
    // MARCAR LEÍDO
    //--------------------------------------------------

    markUpdatesAsRead();

}


//==================================================
// CERRAR
//==================================================

function closeUpdates() {

    updatesPanel.classList.remove(
        "show"
    );

    updatesPanel.setAttribute(
        "aria-hidden",
        "true"
    );

    updatesButton.setAttribute(
        "aria-expanded",
        "false"
    );

}


//==================================================
// CLICK CAMPANA
//==================================================

updatesButton.addEventListener(
    "pointerdown",
    event => {

        event.stopPropagation();

    }
);


updatesButton.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        toggleUpdates();

    }
);


//==================================================
// CLICK FUERA
//==================================================

document.addEventListener(
    "pointerdown",
    event => {

        if (
            !updatesPanel.classList.contains(
                "show"
            )
        ) {

            return;

        }


        if (
            updatesPanel.contains(
                event.target
            ) ||

            updatesButton.contains(
                event.target
            )
        ) {

            return;

        }


        closeUpdates();

    }
);


//==================================================
// INICIAR APP
//==================================================

window.addEventListener(
    "pointerdown",
    () => {

        if (started) {

            return;

        }


        //--------------------------------------------------
        // SI EL CLICK FUE EN LA CAMPANA
        //--------------------------------------------------

        if (
            updatesButton.contains(
                event.target
            )
        ) {

            return;

        }


        started = true;


        //--------------------------------------------------
        // DESAPARECER INTRO
        //--------------------------------------------------

        intro.style.opacity =
            "0";


        setTimeout(
            () => {

                intro.style.display =
                    "none";


                //--------------------------------------------------
                // INICIAR UNIVERSO
                //--------------------------------------------------

                startApp();


                //--------------------------------------------------
                // MOSTRAR CAMPANA
                //--------------------------------------------------

                document
                    .getElementById(
                        "updates-container"
                    )
                    .classList.add(
                        "visible"
                    );

            },

            1200

        );

    }
);


//==================================================
// INICIALIZAR
//==================================================

setupUpdates();