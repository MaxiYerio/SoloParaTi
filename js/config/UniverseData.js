// js/config/UniverseData.js

export const UniverseData = [

    //--------------------------------------------------
    // AMISTAD
    //--------------------------------------------------

    { text: "Amistad" },
    { text: "Siempre" },
    { text: "Gracias" },
    { text: "Confianza" },
    { text: "Escuchar" },
    { text: "Consejos" },
    { text: "Compañía" },
    { text: "Risas" },
    { text: "Paciencia" },
    { text: "Apoyo" },
    { text: "Abrazo" },
    { text: "Charlas" },
    { text: "Desahogarse" },
    { text: "Mate" },
    { text: "Tiempo" },
    { text: "Recuerdos" },
    { text: "Momentos" },
    { text: "Sos importante" },
    { text: "Siempre estoy" },
    { text: "Nosotros" },

    //--------------------------------------------------
    // ANIME
    //--------------------------------------------------

    { text: "Anime" },
    { text: "Ghibli" },
    { text: "Chihiro" },
    { text: "Haku" },
    { text: "Sin Cara" },
    { text: "Deku" },
    { text: "UA" },
    { text: "Plus Ultra" },
    { text: "Héroes" },
    { text: "Temporada 5" },
    { text: "Maratón" },
    { text: "Opening" },
    { text: "Ending" },

    //--------------------------------------------------
    // MÚSICA
    //--------------------------------------------------

    {
        text: "BTS",
        type: "folder",

        children: [

            {
                text: "Film Out",
                audio: "film-out.mp3",
                colors: [
                    "#C9A27E", // Café claro
                    "#9DD9E8", // Celeste
                    "#A9D9A0"  // Verde claro
                ]
            },

            {
                text: "Letter",
                audio: "letter.mp3",
                colors: [
                    "#FFFFFF", // Blanco
                    "#5B8FC9", // Azul
                    "#C0C0C0"  // Plata
                ]
            },

            {
                text: "Mikrokosmos",
                audio: "mikrokosmos.mp3",
                colors: [
                    "#9B5DE5", // Morado
                    "#F29BC2", // Rosa
                    "#D4AF37"  // Dorado
                ]
            },

            {
                text: "I'm Fine",
                audio: "im-fine.mp3",
                colors: [
                    "#52B788", // Verde menta brillante
                    "#4EA8DE", // Celeste alegre
                    "#FFB703"  // Naranja cálido
                ]
            },

            {
                text: "Like Animals",
                audio: "like-animals.mp3",
                colors: [
                    "#D81B60", // Fucsia coqueto / ardiente
                    "#880E4F", // Guinda / vino apasionado
                    "#E65100"  // Naranja fuego / caliente
                ]
            },

            {
                text: "Sea",
                audio: "sea.mp3",
                colors: [
                    "#F6E7A1", // Amarillo claro
                    "#D8C39B", // Arena
                    "#4E91C7"  // Azul
                ]
            },

            {
                text: "I Need U",
                audio: "i-need-u.mp3",
                colors: [
                    "#D8A0A8", // Rosa palo
                    "#9A9A9A"  // Gris
                ]
            },

            {
                text: "Best Of Me",
                audio: "best-of-me.mp3",
                colors: [
                    "#B9A0E8", // Lila
                    "#9EDCF0", // Celeste
                    "#D4AF37"  // Dorado
                ]
            },

            {
                text: "Rebirth",
                audio: "rebirth.mp3",
                colors: [
                    "#F47B20"  // Naranja
                ]
            },

            {
                text: "Still With You",
                audio: "still-with-you.mp3",
                colors: [
                    "#32145F"  // Morado oscuro
                ]
            },

            {
                text: "Closer",
                audio: "closer.mp3",
                colors: [
                    "#4D8FD8", // Azul
                    "#FFFFFF"  // Blanco
                ]
            },

            {
                text: "Mic Drop",
                audio: "mic-drop.mp3",
                colors: [
                    "#D71920", // Rojo
                    "#080808"  // Negro
                ]
            }

        ]
    },

    { text: "Guitarra" },
    { text: "Fingerstyle" },
    { text: "Acordes" },
    { text: "Melodías" },
    { text: "Canciones" },
    { text: "Jimin" },

    //--------------------------------------------------
    // VIDEOJUEGOS
    //--------------------------------------------------

    { text: "Fortnite" },
    { text: "GG" },
    { text: "Victoria" },
    { text: "Squad" },
    { text: "Otra partida" },
    { text: "Caídas" },
    { text: "Revivime" },
    { text: "Loot" },

    //--------------------------------------------------
    // COLORES
    //--------------------------------------------------

    { text: "Violeta" },
    { text: "Lavanda" },
    { text: "Lila" },
    { text: "Verde" },

    //--------------------------------------------------
    // EMOCIONES
    //--------------------------------------------------

    {
        text: "Sonreí :)",
        type: "memory",

        sequence: [
            "Sonreí :)",
            "Nunca dejes de sonreir"
        ]
    },

    {
        text: "Tigre",
        type: "memory",

        sequence: [
            "¿Qué come un tigre disléxico?",
            "...",
            "Acelgas."
        ]
    },

    { text: "Calma" },
    { text: "Esperanza" },
    { text: "Respirá" },
    { text: "Todo pasa" },
    { text: "Seguimos" },
    { text: "Luz" },
    { text: "Orgullo" },
    { text: "Valentía" },
    { text: "Vos podés" },
    { text: "Un día más" },
    { text: "No estás sola" },

    //--------------------------------------------------
    // BL
    //--------------------------------------------------

    { text: "BL" },
    { text: "Yaoi" },
    { text: "Mangas" },
    { text: "Comics" },
    { text: "Series" },

    //--------------------------------------------------
    // HUMOR
    //--------------------------------------------------

    { text: "Chistes" },
    { text: "Humor negro" },
    { text: "Down" },
    { text: "Escondinabo" },
    { text: "😂" },

    //--------------------------------------------------
    // SECRETOS
    //--------------------------------------------------

    {
        text: "∞",
        type: "secret",
        action: "guillotine"
    },

    {
        text: "24/08",
        type: "secret"
    },

    {
        text: "💜",
        type: "secret",
        action: "changeCoreColor"
    }

];