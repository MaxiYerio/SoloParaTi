// js\data\WordGenerator.js

import { WordLibrary } from "./WordLibraryold.js";

export function generateWords() {

    const words = [];

    Object.values(WordLibrary).forEach(category => {

        category.forEach(word => {

            words.push({

                text: word,

                color: randomColor(),

                size: randomSize()

            });

        });

    });

    return shuffle(words);

}

function randomColor() {

    const palette = [

        "#FFFFFF",
        "#F8F2FF",
        "#E9D5FF",
        "#D8B4FE",
        "#C084FC"

    ];

    return palette[
        Math.floor(Math.random() * palette.length)
    ];

}

function randomSize() {

    const sizes = [

        0.9,
        1,
        1,
        1,
        1.1,
        1.15

    ];

    return sizes[
        Math.floor(Math.random() * sizes.length)
    ];

}

function shuffle(array) {

    return [...array].sort(() => Math.random() - 0.5);

}