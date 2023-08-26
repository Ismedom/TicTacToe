const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const xClass = "x";
const oClass = "o";
let currentClass;
let turn = true;
const button = document.querySelector("button");
const winningMessage = document.querySelector(".winning-message");
const messages = document.querySelector("p");
const allWinCase = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function endGame() {
  winningMessage.classList.remove("show");
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("x");
    cell.classList.remove("o");
    cell.removeEventListener("click", addXorO);
    cell.addEventListener("click", addXorO, { once: true });
  });
}
button.addEventListener("click", endGame);

function addXorO(e) {
  currentClass == xClass ? (currentClass = oClass) : (currentClass = xClass);
  if (board.classList.contains("x") && turn) {
    e.target.innerHTML = "x";
    e.target.classList.add("x");
  } else {
    e.target.innerHTML = "o";
    e.target.classList.add("o");
  }
  turn = !turn;
  if (checkWin()) {
    winningMessage.classList.add("show");
    currentClass == xClass
      ? (messages.innerHTML = "X's win")
      : (messages.innerHTML = "O's win");
  }
  const xClassElements = document.querySelectorAll(".cell.x");
  const OClassElements = document.querySelectorAll(".cell.o");
  if (!checkWin()) {
    if (xClassElements.length + OClassElements.length == cells.length) {
      messages.innerHTML = "Draw";
      winningMessage.classList.add("show");
    }
  }
}

cells.forEach((cell) => {
  cell.addEventListener("click", addXorO, { once: true });
});

function checkWin() {
  return allWinCase.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}
