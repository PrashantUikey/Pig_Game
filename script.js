'use strict';

//we can use both but the method getElementById is more faster then the querySelector.

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//Add active class for the switching board.
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
// diceEl.classList.add('hidden');

// score0El.textContent = 0;
// score1El.textContent = 0;

// const scores = [0,0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

let scores, currentScore, activePlayer, playing;

//here we copy call the variable inside the init function.
const init = function () {
  // score0El.textContent = 0;
  // score1El.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const winner = function () {
  if (scores[activePlayer] >= 20) {
    //finish game
    document
      .querySelector(`player--${activePlayer}`)
      .classList.add('player-winner');
    document
      .querySelector(`player--${activePlayer}`)
      .classList.remove('player--active');
  }
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll.
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2.display dice.
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.check for rolled 1
    if (dice !== 1) {
      //keep on adding the number

      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      //switch the player
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // currentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');

      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.Add current score to active player's score.
    scores[activePlayer] += currentScore;
    // scores[1] = score[1] + currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check weather the player cross the >= 100;
    if (scores[activePlayer] >= 100) {
      playing = false;
      //finish game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

// btnNew.addEventListener('click', function(){
// score0El.textContent = 0;
// score1El.textContent = 0;

// current0El.textContent = 0;
// current1El.textContent= 0;

// player0El.classList.remove('player--winner');
// player1El.classList.remove('player--winner');
// player0El.classList.add('player--active');
// player1El.classLisr.remove('player--active');
// })

btnNew.addEventListener('click', init);
