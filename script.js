const gridItems = document.querySelectorAll('.option p');

let player = 0;
gridItems.forEach((gridItem, i) => {
    gridItem.addEventListener('click', () => {
        let playerChoice = player%2 === 0 ? 'X' : 'O'
        gridItem.innerHTML = playerChoice;
        game.updateBoard(Math.floor(i/3), i%3, playerChoice);
        loadBoard(game);
        console.log(checkWinningCond(game["playGameBoard"]));
        player++;
    });
});

const gameBoardObj = (id) => {
    let playGameBoard = [['', '', ''],['', '', ''],['', '', '']];
    function updateBoard(row, col, val) {
        playGameBoard[row][col] = val;
        return;
    };
    return {id, playGameBoard, updateBoard};
};

function loadBoard(gameBoard) {
    for(var i = 0; i < 3; i++) { //row iterator
        for(var j = 0; j < 3; j++) { //col iterator
            if(gameBoard.playGameBoard[i][j] != '') {
                console.log(`${i} - ${j} + ${gameBoard.playGameBoard[i][j]}`);
            }
        }
    }
}

function checkWinningCond(gameBoard) { //check each row, each column
    //win row - [i][0] = [i][1] = [i][2]
    //win col - [0][i] = [1][i] = [2][i]
    //win diag - [0][0] = [1][1] = [2][2] or [0][2] = [1][1] = [2][0]
    //start from each in first row - all columns and diags
    //start from first in each row - all rows
    //column
    for(var i = 0; i < 3; i++) { //iterate first row
        let val = gameBoard[0][i];
        if(val === '') {
            continue;
        }
        for(var j = 1; j < 3; j++) {
            if(gameBoard[j][i] != val) { //back out if any dont match
                break;
            }
            if(j === 2) { //first condition already met
                console.log(`${val} wins!`);
                return true;
            }
        }
    }
    for(var i = 0; i < 3; i++) { //iterate first column
        let val = gameBoard[i][0];
        if(val === '') {
            continue;
        }
        for(var j = 1; j < 3; j++) {
            if(gameBoard[i][j] != val) { //back out if any dont match
                break;
            }
            if(j === 2) { //first condition already met
                console.log(`${val} wins!`);
                return true;
            }
        }
    }
    let diagVal = gameBoard[1][1];
    if(diagVal != '' && ((diagVal === gameBoard[0][0] && diagVal === gameBoard[2][2]) || diagVal === gameBoard[2][0] && diagVal === gameBoard[0][2])) {
        console.log(`${diagVal} wins!`);
        return true;
    }
    return false;
}

function playGame() {

}

const game = gameBoardObj(1);