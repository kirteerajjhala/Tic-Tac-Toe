const boxes = document.querySelectorAll('.box');
const resetButton = document.querySelector('.reset');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleBoxClick(index));
});

function handleBoxClick(index) {
    if (gameState[index] !== null || !isGameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    boxes[index].innerText = currentPlayer;
    boxes[index].classList.add(currentPlayer);

    if (checkWin()) {
        alert(`Player ${currentPlayer} wins!`);
        isGameActive = false;
    } else if (gameState.every(box => box !== null)) {
        alert("It's a draw!");
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] === currentPlayer && gameState[b] === currentPlayer && gameState[c] === currentPlayer;
    });
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameState.fill(null);
    boxes.forEach(box => {
        box.innerText = '';
        box.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
    isGameActive = true;
}
