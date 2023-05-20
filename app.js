const PLAYER_X = "X";
const PLAYER_O = "O";
const EMPTY_CELL = "";
const COMPUTER_PLAYER = PLAYER_O;

let currentPlayer = PLAYER_X;
let gameEnded = false;
let board = [
  [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
  [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
  [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
];

const makeMove = (row, col) => {
  if (!gameEnded && board[row][col] === EMPTY_CELL) {
    board[row][col] = currentPlayer;
    document.getElementsByClassName("cell")[row * 3 + col].innerText =
      currentPlayer;

    if (checkWin(currentPlayer)) {
      alert(`Player ${currentPlayer} wins!`);
      gameEnded = true;
    } else if (checkTie()) {
      alert("It's a tie!");
      gameEnded = true;
    } else {
      currentPlayer = currentPlayer === PLAYER_X ? COMPUTER_PLAYER : PLAYER_X;

      if (currentPlayer === COMPUTER_PLAYER && !gameEnded) {
        makeComputerMove();
      }
    }
  }
};

const makeComputerMove = () => {
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === EMPTY_CELL) {
        board[i][j] = COMPUTER_PLAYER;
        let score = minimax(board, 0, false);
        board[i][j] = EMPTY_CELL;

        if (score > bestScore) {
          bestScore = score;
          move = { row: i, col: j };
        }
      }
    }
  }

  const { row, col } = move;
  makeMove(row, col);
};

const minimax = (board, depth, isMaximizing) => {
  if (checkWin(PLAYER_X)) {
    return -1;
  } else if (checkWin(COMPUTER_PLAYER)) {
    return 1;
  } else if (checkTie()) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === EMPTY_CELL) {
          board[i][j] = COMPUTER_PLAYER;
          let score = minimax(board, depth + 1, false);
          board[i][j] = EMPTY_CELL;
          bestScore = Math.max(score, bestScore);
        }
      }
    }

    return bestScore;
  } else {
    let bestScore = Infinity;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === EMPTY_CELL) {
          board[i][j] = PLAYER_X;
          let score = minimax(board, depth + 1, true);
          board[i][j] = EMPTY_CELL;
          bestScore = Math.min(score, bestScore);
        }
      }
    }

    return bestScore;
  }
};

const checkWin = (player) => {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    ) {
      return true;
    }

    if (
      board[0][i] === player &&
      board[1][i] === player &&
      board[2][i] === player
    ) {
      return true;
    }
  }

  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  ) {
    return true;
  }

  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  ) {
    return true;
  }

  return false;
};

const checkTie = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === EMPTY_CELL) {
        return false;
      }
    }
  }

  return true;
};

const resetGame = () => {
  currentPlayer = PLAYER_X;
  gameEnded = false;
  board = [
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
  ];

  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
  }
};
