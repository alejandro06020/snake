/**
 * @jest-environment jsdom
 */

const {
  state,
  handleGameOver,
  changeFoodPosition,
  changeDirection,
  initGame,
  updateScoreElements,
  initDOMReferences,
} = require("../public/script");

beforeEach(() => {
  document.body.innerHTML = `
    <div class="play-board"></div>
    <div class="score"></div>
    <div class="max-score"></div>
  `;
  initDOMReferences();
  updateScoreElements();
});

describe("Snake Game Logic", () => {
  test("handleGameOver retorna mensaje y limpia intervalo", () => {
    state.setIntervalId = setInterval(() => {}, 1000);
    const result = handleGameOver();
    expect(result).toBe("Acabo eljuego");
  });

  test("changeFoodPosition genera coordenadas válidas", () => {
    changeFoodPosition();
    expect(state.foodX).toBeGreaterThanOrEqual(1);
    expect(state.foodX).toBeLessThanOrEqual(30);
    expect(state.foodY).toBeGreaterThanOrEqual(1);
    expect(state.foodY).toBeLessThanOrEqual(30);
  });

  test("changeDirection cambia la dirección correctamente", () => {
    const event = { key: "ArrowRight" };
    changeDirection(event);
    expect(state.velocityX).toBe(1);
    expect(state.velocityY).toBe(0);
  });

  test("initGame actualiza el DOM y mueve la serpiente", () => {
    state.snakeX = 1;
    state.snakeY = 1;
    state.velocityX = 1;
    state.velocityY = 0;
    state.snakeBody = [];

    changeFoodPosition();
    updateScoreElements();
    initGame();

    const playBoard = document.querySelector(".play-board");
    expect(playBoard.innerHTML).toContain("food");
    expect(playBoard.innerHTML).toContain("snake");
    expect(state.snakeBody.length).toBeGreaterThan(0);
  });

  test("colisión con los bordes activa gameOver", () => {
    state.snakeX = 31; // fuera del borde
    state.snakeY = 1;
    state.velocityX = 1;
    state.velocityY = 0;
    state.snakeBody = [];

    initGame();
    expect(state.gameOver).toBe(true);
  });
});
