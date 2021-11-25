"use strict";

// Initializing Variables
const winningScore = 100;
const playerOne = document.querySelector(".player--1");
const playerTwo = document.querySelector(".player--2");
const dice = document.querySelector(".dice");
let scores, currentScore, playingStatus, activePlayer;

// Function to change score values
const displayScore = (type, value) => {
    document.querySelector(type).textContent = value;
};

// Function to toggle active player
const togglePlayer = () => {
    currentScore = 0;
    displayScore(`.current--${activePlayer}`, 0);
    activePlayer = activePlayer === 1 ? 2 : 1;
    playerOne.classList.toggle("player--active");
    playerTwo.classList.toggle("player--active");
};

// Function to start/reset game
const newGame = () => {
    scores = [0, 0];
    currentScore = 0;
    playingStatus = true;
    activePlayer = 1;
    dice.classList.add("hidden");
    playerOne.classList.add("player--active");
    playerOne.classList.remove("player--winner");
    playerTwo.classList.remove("player--winner");
    displayScore(".current--1", 0);
    displayScore(".current--2", 0);
    displayScore(".total--1", 0);
    displayScore(".total--2", 0);
};

// Starting game and Event listener to reset game
newGame();
document.querySelector(".btn--new").addEventListener("click", newGame);

// Event listener to roll dice
document.querySelector(".btn--roll").addEventListener("click", function () {
    if (playingStatus) {
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        dice.classList.remove("hidden");
        dice.src = `images/dice-${diceRoll}.png`;

        if (diceRoll === 1) {
            togglePlayer();
        } else {
            currentScore += diceRoll;
            displayScore(`.current--${activePlayer}`, currentScore);
        }
    } else {
        alert("Game ended! Reset to play another!");
    }
});

// Event listener to hold the turn
document.querySelector(".btn--hold").addEventListener("click", function () {
    if (playingStatus) {
        scores[activePlayer - 1] += currentScore;
        currentScore = 0;
        displayScore(`.total--${activePlayer}`, scores[activePlayer - 1]);

        if (scores[activePlayer - 1] >= winningScore) {
            displayScore(`.current--${activePlayer}`, 0);
            dice.classList.add("hidden");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");
            playingStatus = false;
        } else {
            togglePlayer();
        }
    } else {
        alert("Game ended! Reset to play another!");
    }
});

// Events to close modal
document.querySelector(".modal__close").addEventListener("click", function () {
    document.querySelector(".modal").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
});

document.querySelector(".overlay").addEventListener("click", function () {
    document.querySelector(".modal").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
});
