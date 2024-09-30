let maxR = document.querySelector("#maxField");
let minR = document.querySelector("#minField");
let gamediv = document.querySelector("#gameSection");
let wholediv = document.querySelector("#wrapper");
const setRangeBtn = document.querySelector("#setRangeBtn");
const inputdiv= document.querySelector("#inputintro")

let minvalue;
let maxvalue;
let randomNumber;
let numGuess = 1;
let playGame = true;


setRangeBtn.addEventListener("click", function(e) {
    e.preventDefault();

    minvalue = parseInt(minR.value);
    maxvalue = parseInt(maxR.value);

    if (!isNaN(minvalue) && !isNaN(maxvalue) && minvalue < maxvalue) {
        inputdiv.style.display = "none"; // Hide the intro div
        gamediv.style.display = "block"; // Show the game section

        // Generate a random number between the specified range
        randomNumber = Math.floor(Math.random() * (maxvalue - minvalue + 1)) + minvalue;
        console.log(`Random number generated: ${randomNumber}`);
    } else {
        alert('Please enter a valid range with min < max.');
    }
});

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

// Add game logic
if (playGame) {
    submit.addEventListener('click', function(e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please enter a valid number');
    } else if (guess < minvalue) {
        alert(`Please enter a number greater than or equal to ${minvalue}`);
    } else if (guess > maxvalue) {
        alert(`Please enter a number less than or equal to ${maxvalue}`);
    } else {
        if (numGuess === 11) {
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randomNumber}`);
            endGame();
        } else {
            checkGuess(guess);
            displayGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`You guessed it right!`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`Number is TOO low`);
    } else if (guess > randomNumber) {
        displayMessage(`Number is TOO high`);
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h3 id="newGame">Start New Game</h3>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector("#newGame");
    newGameButton.addEventListener('click', function() {
        // Hide the game section and show the range input section
        gamediv.style.display = "none";
        inputdiv.style.display = "block";
        
        // Clear the min and max input fields
        minR.value = '';
        maxR.value = '';

        // Reset the game variables
        numGuess = 1;
        guessSlot.innerHTML = "";
        remaining.innerHTML = `${11 - numGuess}`;
        lowOrHi.innerHTML = '';
        userInput.removeAttribute('disabled');

        // Remove the "Start New Game" button
        startOver.removeChild(p);
        playGame = true;
    });
}
