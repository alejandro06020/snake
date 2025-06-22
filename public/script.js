let playBoard;
let scoreElement;
let highScoreElement;

const state = {
  gameOver: false,
  foodX: 0,
  foodY: 0,
  snakeX: 3,
  snakeY: 5,
  velocityX: 0,
  velocityY: 0,
  snakeBody: [],
  score: 0,
  highScore: localStorage.getItem("max-score") || 0,
  setIntervalId: null,
};

const initDOMReferences = () => {
  playBoard = document.querySelector(".play-board");
  scoreElement = document.querySelector(".score");
  highScoreElement = document.querySelector(".max-score");
};

const updateScoreElements = () => {
  if (scoreElement && highScoreElement) {
    scoreElement.innerHTML = `Score: ${state.score}`;
    highScoreElement.innerHTML = `Max score: ${state.highScore}`;
  }
};

const changeFoodPosition = () => {
  state.foodX = Math.floor(Math.random() * 30) + 1;
  state.foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  clearInterval(state.setIntervalId);
  alert("GameOver!");
  location.reload();
  return "Acabo eljuego";
};

const changeDirection = (e) => {
  if (e.key === "ArrowUp" && state.velocityY !== 1) {
    state.velocityX = 0;
    state.velocityY = -1;
  }
  if (e.key === "ArrowDown" && state.velocityY !== -1) {
    state.velocityX = 0;
    state.velocityY = 1;
  }
  if (e.key === "ArrowLeft" && state.velocityX !== 1) {
    state.velocityX = -1;
    state.velocityY = 0;
  }
  if (e.key === "ArrowRight" && state.velocityX !== -1) {
    state.velocityX = 1;
    state.velocityY = 0;
  }
};

const initGame = () => {
  if (state.gameOver) return handleGameOver();

  let htmlMarkUp = `<div class="food" style="grid-area:${state.foodY}/${state.foodX}"></div>`;

  if (state.snakeX === state.foodX && state.snakeY === state.foodY) {
    changeFoodPosition();
    state.snakeBody.push([state.foodX, state.foodY]);
    state.score++;
    state.highScore = state.score >= state.highScore ? state.score : state.highScore;
    localStorage.setItem("max-score", state.highScore);
    updateScoreElements();
  }

  for (let i = state.snakeBody.length - 1; i > 0; i--) {
    state.snakeBody[i] = state.snakeBody[i - 1];
  }

  state.snakeBody[0] = [state.snakeX, state.snakeY];
  state.snakeX += state.velocityX;
  state.snakeY += state.velocityY;

  if (state.snakeX <= 0 || state.snakeX > 30 || state.snakeY <= 0 || state.snakeY > 30) {
    state.gameOver = true;
  }

  for (let i = 0; i < state.snakeBody.length; i++) {
    htmlMarkUp += `<div class="snake" style="grid-area:${state.snakeBody[i][1]}/${state.snakeBody[i][0]}"></div>`;
    if (
      i !== 0 &&
      state.snakeBody[0][1] === state.snakeBody[i][1] &&
      state.snakeBody[0][0] === state.snakeBody[i][0]
    ) {
      state.gameOver = true;
    }
  }

  if (playBoard) {
    playBoard.innerHTML = htmlMarkUp;
  }
};

// Solo se ejecuta esto si no estás en test
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    initDOMReferences();
    changeFoodPosition();
    updateScoreElements();
    document.addEventListener("keydown", changeDirection);
    state.setIntervalId = setInterval(initGame, 125);
  });
}

module.exports = {
  state,
  handleGameOver,
  changeFoodPosition,
  changeDirection,
  initGame,
  updateScoreElements,
  initDOMReferences,
};
