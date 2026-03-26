// OTGA Maze with traps
const maze = [
  [0,0,1,0,0,1,0,0,0,1,0,0,2,0,0],
  [1,0,1,0,1,1,0,1,0,1,1,0,1,3,0],
  [3,0,0,0,0,0,0,1,0,0,0,0,1,0,0],
  [0,1,1,1,1,0,1,0,1,1,1,0,1,0,0],
  [0,0,3,2,1,0,0,0,0,0,0,0,1,0,0],
  [0,1,1,0,1,1,1,1,1,1,1,0,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,0,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,3,2,0,0,0,0,0,0],
  [0,1,1,1,1,0,1,1,1,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,0,1,1,1,1,0,1,1,1,0,1,1,0],
  [1,3,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,2,1,1,0,1,1,1,1,0,1,3,1,0,0],
  [0,0,0,0,0,1,2,0,0,0,0,0,1,0,9]
];

const container = document.getElementById('maze-container');
const rows = maze.length;
const cols = maze[0].length;

const originalMaze = maze.map(row => [...row]);

let playerPos = {x:0, y:0};
let keysCollected = 0;
const totalKeys = maze.flat().filter(cell => cell === 2).length;

// Draw maze
function drawMaze() {
  container.innerHTML = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = document.createElement('div');
      cell.classList.add('maze-cell');

      if (maze[y][x] === 1) cell.classList.add('wall');
      if (maze[y][x] === 2) cell.classList.add('key');
      if (maze[y][x] === 3) cell.classList.add('trap');
      if (maze[y][x] === 9) cell.classList.add('goal');

      if (playerPos.x === x && playerPos.y === y) cell.classList.add('player');

      container.appendChild(cell);
    }
  }

  document.getElementById('keys-count').textContent = `Keys collected: ${keysCollected}/${totalKeys}`;
}

// Move player
function movePlayer(dx, dy) {
  const newX = playerPos.x + dx;
  const newY = playerPos.y + dy;

  if (newX < 0 || newX >= cols || newY < 0 || newY >= rows) return;

  const nextCell = maze[newY][newX];

  // Wall
  if (nextCell === 1) return;

  // Trap
  if (nextCell === 3) {
    alert("⚠️ You triggered a trap! Back to start.");
    playerPos = {x:0, y:0};
    drawMaze();
    return;
  }

  // Key
  if (nextCell === 2) {
    keysCollected++;
    maze[newY][newX] = 0;
  }

  // Goal
  if (nextCell === 9) {
    if (keysCollected === totalKeys) {
      alert("🎉 You escaped!");
    } else {
      alert(`You need all keys! Keys collected: ${keysCollected}/${totalKeys}`);
      return;
    }
  }

  playerPos = {x:newX, y:newY};
  drawMaze();
}

// W/A/S/D controls
document.addEventListener('keydown', e => {
  switch(e.key.toLowerCase()) {
    case 'w': movePlayer(0, -1); break;
    case 's': movePlayer(0, 1); break;
    case 'a': movePlayer(-1, 0); break;
    case 'd': movePlayer(1, 0); break;
  }
});

// Reset button
document.getElementById('reset-maze').addEventListener('click', () => {
  playerPos = {x:0, y:0};
  keysCollected = 0;

  // Restore maze
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      maze[y][x] = originalMaze[y][x];
    }
  }

  drawMaze();
});

// Initial draw
drawMaze();