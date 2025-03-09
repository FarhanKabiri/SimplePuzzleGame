let timer; 
let timeElapsed = 0; 
let moveCount = 0; 

// Function to swap two tiles
function swapTiles(cell1, cell2) {
    const temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
}

// Function to start the timer
function startTimer() {
    timeElapsed = 0;
    document.getElementById("timer").innerText = "Time spent in the current game: 0 seconds";
    
    timer = setInterval(() => {
        timeElapsed++;
        document.getElementById("timer").innerText = `Time spent in the current game: ${timeElapsed} seconds`;
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timer);
}

// Function to shuffle the tiles at the start of a new game
function shuffle() {
    for (let row = 1; row <= 4; row++) {
        for (let column = 1; column <= 4; column++) {
            const row2 = Math.floor(Math.random() * 4 + 1);
            const column2 = Math.floor(Math.random() * 4 + 1);
            swapTiles(`cell${row}${column}`, `cell${row2}${column2}`);
        }
    }
}

// Function to reset the tiles to their solved position
function resetToSolved() {
    
    for (let row = 1; row <= 4; row++) {
        for (let column = 1; column <= 4; column++) {
            const tileNumber = (row - 1) * 4 + column;
            document.getElementById(`cell${row}${column}`).className = `tile${tileNumber}`;
        }
    }
    
    stopTimer(); 
    startTimer(); 
    moveCount = 0;
    document.getElementById("moveCounter").innerText = "Number of Moves made so far: 0";
}

// Function to start a new game
function startNewGame() {
    shuffle();
    stopTimer(); 
    startTimer(); 
    moveCount = 0;
    document.getElementById("moveCounter").innerText = "Number of Moves made so far: 0";
}


function isGameComplete() {
    for (let row = 1; row <= 4; row++) {
        for (let column = 1; column <= 4; column++) {
            const cell = document.getElementById(`cell${row}${column}`);
            const correctTile = `tile${(row - 1) * 4 + column}`;
            if (cell.className !== correctTile) {
                return false;
            }
        }
    }
    return true;
}


function clickTile(row, column) {
    const cell = document.getElementById(`cell${row}${column}`);
    const tile = cell.className;

    if (tile !== "tile16") { 

        
        if (column < 4) {
            if (document.getElementById(`cell${row}${column + 1}`).className === "tile16") {
                swapTiles(`cell${row}${column}`, `cell${row}${column + 1}`);
                incrementMoveCount();
                checkCompletion();
                return;
            }
        }

        
        if (column > 1) {
            if (document.getElementById(`cell${row}${column - 1}`).className === "tile16") {
                swapTiles(`cell${row}${column}`, `cell${row}${column - 1}`);
                incrementMoveCount();
                checkCompletion();
                return;
            }
        }

        
        if (row > 1) {
            if (document.getElementById(`cell${row - 1}${column}`).className === "tile16") {
                swapTiles(`cell${row}${column}`, `cell${row - 1}${column}`);
                incrementMoveCount();
                checkCompletion();
                return;
            }
        }

     
        if (row < 4) {
            if (document.getElementById(`cell${row + 1}${column}`).className === "tile16") {
                swapTiles(`cell${row}${column}`, `cell${row + 1}${column}`);
                incrementMoveCount();
                checkCompletion();
                return;
            }
        }
    }
}


function incrementMoveCount() {
    moveCount++;
    document.getElementById("moveCounter").innerText = `Number of Moves made so far: ${moveCount}`;
}

function checkCompletion() {
    if (isGameComplete()) {
        stopTimer(); 
        alert(`CONGRATULATIONS!\n\nYou've successfully reordered the puzzle numbers in sequential order!\n\nNumber of moves it took to complete: ${moveCount}\nTime spent to complete it: ${timeElapsed} second(s).\n\nTo play again, click OK.`);
        startNewGame();
    }
}