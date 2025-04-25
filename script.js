function showSection(section) {
  document.getElementById('about').style.display = 'none';
  document.getElementById('game').style.display = 'none';
  document.getElementById(section).style.display = 'block';
}

// 五子棋逻辑
const canvas = document.getElementById('chess');
const context = canvas?.getContext('2d');
const boardSize = 15;
const cellSize = 30;
let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
let currentPlayer = 1;

function drawBoard() {
  for (let i = 0; i < boardSize; i++) {
    context.moveTo(cellSize / 2, cellSize / 2 + i * cellSize);
    context.lineTo(cellSize * (boardSize - 0.5), cellSize / 2 + i * cellSize);
    context.moveTo(cellSize / 2 + i * cellSize, cellSize / 2);
    context.lineTo(cellSize / 2 + i * cellSize, cellSize * (boardSize - 0.5));
  }
  context.stroke();
}

function drawPiece(x, y, player) {
  context.beginPath();
  context.arc(cellSize / 2 + x * cellSize, cellSize / 2 + y * cellSize, 13, 0, 2 * Math.PI);
  const gradient = context.createRadialGradient(
    cellSize / 2 + x * cellSize + 2,
    cellSize / 2 + y * cellSize - 2,
    13, 
    cellSize / 2 + x * cellSize + 2,
    cellSize / 2 + y * cellSize - 2,
    0
  );
  if (player === 1) {
    gradient.addColorStop(0, "#0A0A0A");
    gradient.addColorStop(1, "#636766");
  } else {
    gradient.addColorStop(0, "#D1D1D1");
    gradient.addColorStop(1, "#F9F9F9");
  }
  context.fillStyle = gradient;
  context.fill();
  context.closePath();
}

canvas?.addEventListener('click', function (e) {
  const x = Math.floor(e.offsetX / cellSize);
  const y = Math.floor(e.offsetY / cellSize);
  if (board[x][y] === 0) {
    board[x][y] = currentPlayer;
    drawPiece(x, y, currentPlayer);
    if (checkWin(x, y, currentPlayer)) {
      setTimeout(() => alert((currentPlayer === 1 ? "黑棋" : "白棋") + " 获胜！"), 10);
      canvas.removeEventListener('click', arguments.callee);
    }
    currentPlayer = 3 - currentPlayer;
  }
});

function checkWin(x, y, player) {
  const directions = [
    [1, 0], [0, 1], [1, 1], [1, -1]
  ];
  for (const [dx, dy] of directions) {
    let count = 1;
    for (let d = 1; d < 5; d++) {
      let nx = x + dx * d, ny = y + dy * d;
      if (board[nx]?.[ny] === player) count++;
      else break;
    }
    for (let d = 1; d < 5; d++) {
      let nx = x - dx * d, ny = y - dy * d;
      if (board[nx]?.[ny] === player) count++;
      else break;
    }
    if (count >= 5) return true;
  }
  return false;
}

if (canvas && context) {
  drawBoard();
}
