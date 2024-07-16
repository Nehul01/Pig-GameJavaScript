'use strict';

// Making modal work

const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const button = document.querySelector('.button');
const viewRules = document.querySelector('.rules');
// hiding the modal

function hideModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}
button.addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);
closeModal.addEventListener('click', hideModal);
viewRules.addEventListener('click', openModal);

// Selecting elemets

const player0El = document.querySelector('.player--0');

const player1El = document.querySelector('.player--1');

const score0EL = document.getElementById('score--0');
const current0El = document.getElementById('current--0');

const current1El = document.getElementById('current--1');
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');

const btnRoll = document.querySelector('.btn--roll');

const btnHold = document.querySelector('.btn--hold');

let scores, activePlayer, currentScore, playing;

function init() {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0EL.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

init();
// Switch PLayer function
function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  scores[activePlayer] += currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// rolling dice functnality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice

    diceEl.classList.remove('hidden');
    console.log(dice);
    diceEl.src = `dice-${dice}.png`;

    // If dice === 1, switch to next player

    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; // CHANGE LATER!!!
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score >= 100
    //Finish game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      diceEl.classList.add('hidden');
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
