// js/systems/CoreColorManager.js

//--------------------------------------------------
// COLORES DEL NÚCLEO
//--------------------------------------------------

const CORE_COLORS = [

    0xB987FF, // 1. Morado
    0x3980FF, // 2. Azul
    0x080808, // 3. Negro
    0xFFFFFF, // 4. Blanco
    0x73B087, // 5. Verde
    0xFF8FB8, // 6. Rosa
    0x7A4A2E, // 7. Café
    0x800020, // 8. Guinda
    0xFFD700  // 9. Dorado

];

//--------------------------------------------------
// STORAGE
//--------------------------------------------------

const STORAGE_KEY = "abby_core_color";

//--------------------------------------------------
// ESTADO
//--------------------------------------------------

let currentColorIndex = 0;

//--------------------------------------------------
// INICIALIZAR
//--------------------------------------------------

export function initCoreColor() {

    const savedIndex =
        localStorage.getItem(STORAGE_KEY);

    if (savedIndex !== null) {

        const parsedIndex =
            Number.parseInt(
                savedIndex,
                10
            );

        if (
            Number.isInteger(parsedIndex) &&
            parsedIndex >= 0 &&
            parsedIndex < CORE_COLORS.length
        ) {

            currentColorIndex = parsedIndex;

        }

    }

    return getCurrentCoreColor();

}

//--------------------------------------------------
// SIGUIENTE COLOR
//--------------------------------------------------

export function nextCoreColor() {

    currentColorIndex++;

    if (
        currentColorIndex >=
        CORE_COLORS.length
    ) {

        currentColorIndex = 0;

    }

    localStorage.setItem(
        STORAGE_KEY,
        currentColorIndex
    );

    return getCurrentCoreColor();

}

//--------------------------------------------------
// OBTENER COLOR ACTUAL
//--------------------------------------------------

export function getCurrentCoreColor() {

    return CORE_COLORS[
        currentColorIndex
    ];

}