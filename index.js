const btnNew = $(".btn-new");
const btnHold = $(".btn-hold");
const btnRoll = $(".btn-roll");

const player0 = $(".player-0");
const player1 = $(".player-1");

const dice = $(".dice");
const currentScore0 = $(".current-score-0");
const currentScore1 = $(".current-score-1");
const score0 = $(".score-0");
const score1 = $(".score-1");

const diceSound = new Audio("sounds/dice.mp3");
const winSound = new Audio("sounds/win.mp3");
const switchPlayerSound = new Audio("sounds/switch.mp3");
const holdSound = new Audio("sounds/hold.mp3");
const newGameSound = new Audio("sounds/new.mp3");

let randomNumber;
let currentScore;
let player;
let scores = [0, 0];
let isPlaying;

const startGame = () => {
  currentScore = 0;
  player = 0;
  scores = [0, 0];
  isPlaying = true;
  player0.removeClass("player-inactive");
  player1.removeClass("player-inactive").addClass("player-inactive");
  currentScore0.text(0);
  currentScore1.text(0);
  score0.text(0);
  score1.text(0);
};

startGame();

const switchPlayer = () => {
  currentScore = 0;
  $(`.current-score-${player}`).text(currentScore);
  player = player ? 0 : 1;
  player0.toggleClass("player-inactive");
  player1.toggleClass("player-inactive");
};

btnRoll.click(() => {
  if (isPlaying) {
    diceSound.play();
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        randomNumber = Math.floor(Math.random() * 6) + 1;
        dice.attr("src", `images/dice-${randomNumber}.png`);
      }, 50 * i);
    }
    setTimeout(() => {
      if (randomNumber !== 1) {
        currentScore += randomNumber;
        $(`.current-score-${player}`).text(currentScore);
      } else {
        switchPlayerSound.play();
        switchPlayer();
      }
    }, 350);
  }
});

btnHold.click(() => {
  if (isPlaying) {
    scores[player] += currentScore;
    currentScore = 0;
    $(`.score-${player}`).text(scores[player]);
    $(`.current-score-${player}`).text(currentScore);
    if (scores[player] >= 20) {
      winSound.play();
      isPlaying = false;
      $(`.score-${player}`).text("WIN!");
    } else {
      holdSound.play();
      switchPlayer();
    }
  }
});

btnNew.click(() => {
  newGameSound.play();
  startGame();
});
