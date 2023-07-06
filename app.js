// import { test } from './signal.js';
import { words } from './words.js';

const state = {
    guesses: [],
    setGuess: function(guess, index) {
        this.guesses[index] = guess;
        updateGuess(guess, index)

    },
    workingWord: "",
    setWorkingWord: function(value) {
        this.workingWord = value;
    },
    word: words[Math.floor(Math.random() * words.length)],
}

function updateGuess(guess, index) {
    for ( let i = 0; i < 6; i++ ) {
        let el = document.getElementById(`g${index+1}l${i+1}`);

        if ( el ) {
            if ( i < guess.length ) {
                el.innerHTML = guess[i];
            } else {
                el.innerHTML = "";
            }
        }
    }
}

function validateGuess(guess, index) {
    let correct = false;

    for ( let i = 0; i < guess.length; i++ ) {
        let el = document.getElementById(`g${index+1}l${i+1}`);
        let style = "wrong";
        
        if (state.word[i] === guess[i]) {
            style = "correct";
            correct = true;
        } else if (state.word.includes(guess[i])) {
            style = "wrong-place";
            correct = false;
        }

        el.classList.add(style);
    }

    if ( state.guesses.length < 6 ) {
        state.setGuess("", state.guesses.length); 
        state.setWorkingWord("");

        if ( correct ) {
            console.log("You win");
        }
    }
}

document.addEventListener("keydown", (event) => {
    if ( event.key.length == 1 ) {
        let keyCode = event.key.toLowerCase().charCodeAt(0);

        if ( event.key !== "Enter" && keyCode >= 97 && keyCode <= 122 && state.workingWord.length < 5) {
            let prevWorking = state.workingWord;
            state.setWorkingWord(prevWorking + String.fromCharCode(keyCode));
            state.setGuess(state.workingWord, state.guesses.length - 1 > 0 ? state.guesses.length - 1 : 0);
        }
    }

    if ( event.key === "Enter" ) {
        let index = state.guesses.length - 1 > 0 ? state.guesses.length - 1 : 0;
        if ( words.includes(state.guesses[index]) ) {
            validateGuess(state.guesses[index], index);
        }
    }

    if ( event.key === "Backspace" ) {
        if ( state.guesses.length == 0 ) return;

        let currentGuess = state.guesses[state.guesses.length - 1];
        if ( currentGuess.length > 0 ) {
            state.setWorkingWord(currentGuess.slice(0, -1));
            state.setGuess(currentGuess.slice(0, -1), state.guesses.length - 1);
        }
    }
});
 
document.querySelectorAll(".keyboard-row > button").forEach((el) => {
    el.addEventListener("click", (event) => {
        const keyboardEvent = new KeyboardEvent("keydown", {
            key: event.target.dataset.letterval,
        });

        document.dispatchEvent(keyboardEvent);
    });
});
