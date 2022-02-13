// Using the minimax algorithm to determine the best move
//  from https://www.neverstopbuilding.com/blog/minimax

var game = [],
    SIZE = 3,
    EMPTY = "&nbsp;",
    human = "X",
    computer = "O",
    turn;

// Score the passed in game
function score(gm, depth) {
    // See if anyone won a row
    for (r = 0; r < 3; r++) {
        rn = r * 3;
        if (gm[rn] == gm[rn+1] == gm[rn+2]) {
            if (gm[rn] == computer) {
                return 10 - depth;
            }
            else if (gm[rn] == human) {
                return depth - 10;
            }
        }
    }

    // See if anyone won a column
    for (c = 0; c < 3; c++) {
        if (gm[c] == gm[c+3] == gm[c+6]) {
            if (gm[c] == computer) {
                return 10 - depth;
            }
            else if (gm[rn] == human) {
                return depth - 10;
            }
        }
    }

    // See if anyone won a diagonal
    if (gm[0] == gm[4] == gm[8]) {
        if (gm[0] == computer) {
            return 10 - depth;
        }
        else if (gm[0] == human) {
            return depth - 10;
        }
    }
    if (gm[2] == gm[4] == gm[6]) {
        if (gm[2] == computer) {
            return 10 - depth;
        }
        else if (gm[2] == human) {
            return depth - 10;
        }
    }

    // Nobody won
    return 0;
}

// Minimax algorithm
function minimax(gm, depth, whosTurn) {

    // If game over return the score
    if (isGameOver(gm)) {
        console.log("Game over: depth: " + depth + ", score: " + score(gm, depth));
        return {
            move: -1,
            score: score(gm, depth)
        };
    }

    // Increase the depth
    depth++;

    // Create array of scores and moves
    var scores = [],
        moves = [];
    
    // For each available spot in this game find the score
    //  of making this move
    gm.forEach((g, i) => {
        // If this spot is not empty keep going
        if (g !== EMPTY) {
            return;
        }

        // Copy this game into a new array
        gmCopy = [...gm];

        // Do the move
        gmCopy[i] = whosTurn

        // Set the next turn
        var nextTurn = (whosTurn == human ? computer : human);

        // Push the move and score
        scores.push(minimax(gmCopy, depth, nextTurn).score)
        moves.push(i)
    });

    // If this is the computer take the max score
    if (whosTurn == computer) {
        var whichMove, maxScore = -100;

        // Find the max index
        scores.forEach((s, i) => {
            if (s > maxScore) {
                maxScore = s;
                whichMove = moves[i];
            }
        });
        return {
            move: whichMove,
            score: maxScore
        };
    }
    else {
        // If its the humans move take the minimum score
        var whichMove, minScore = 100;

        // Find the min index
        scores.forEach((s, i) => {
            if (s < minScore) {
                minScore = s;
                whichMove = moves[i];
            }
        });
        return {
            move: whichMove,
            score: minScore
        };
    }
}

// See if the passed in game has any more possible moves
function isGameOver(gm) {

    // If any EMPTY then game isn't over
    var over = true;
    gm.forEach(g => {
        if (g === EMPTY) {
            over = false;
        }
    });

    return over;
}

// Pick who randomly starts the game
function pickStart() {
    // Pick a random number between 0 and 10
    let x = Math.random() * 10;

    // Make it an integer
    x = Math.floor(x);

    // If its even player starts or else computer does
    if (x % 2 == 0) {
        turn = human;
        alert("human(X) starts!");
    }
    else {
        turn = computer;
        alert("computer(O) starts!");
    }
}

// Run one time to set up the rows and cols of the board
function setupBoard() {
    // Create table element
    var board = $("<table border=1 cell-spacing=0 align=center>");

    // Loop for each row
    for (var r = 0; r < SIZE; r += 1) {

        // Create row element and add it to table element
        var row = $("<tr>");
        board.append(row);

        // Loop for each column
        for (var c = 0; c < SIZE; c += 1) {

            // Create col element
            var col = $("<td height=50 width=50 align=center valign=center></td>");

            // Tie the col click handler to this col
            col.click(colClickHandler);

            // Add the col element to the row element
            row.append(col);

            // Add this col element to the game array
            game.push(col);
        }
    }

    // Find the div, and add the table to it
    $(document.getElementById("tictactoe")).append(board);

    // Start new game
    startNewGame();
}

function startNewGame() {
    // Reset the board
    game.forEach(c => {
        c.html(EMPTY);
    });

    // Choose who starts
    pickStart();

    // If the computer goes first figure out its move
    if (turn == computer) {
        // Make the array
        var gm = [];
        game.forEach(g => {
            gm.push(g.html());
        });

        // Get the next move
        var mv = minimax(gm, 0, computer).move;

        // Do the move
        game[mv].html(computer);

        // Now its the humans move
        turn = human;
    }
}

function colClickHandler() {
    // If its the computers turn you cant click
    if (turn == computer) {
        return;
    }

    // If this cell is not empty do nothing
    if ($(this).html() !== EMPTY) {
        return;
    }

    // Set the cell with right letter
    $(this).html(turn);

    // Now its the computers turn
    turn = computer;

    // Figure out its move
    // Make the array
    var gm = [];
    game.forEach(g => {
        gm.push(g.html());
    });

    // Get the next move
    var mv = minimax(gm, 0, computer).move;
    console.log("move is " + mv);

    // Do the move
    game[mv].html(computer);

    // Now its the humans move
    turn = human;
    return;

    if (win(score[turn])) {
        alert(turn + " wins!");
        startNewGame();
    } else if (moves === SIZE * SIZE) {
        alert("Cat\u2019s game!");
        startNewGame();
    } else {
        turn = turn === "X" ? "O" : "X";
    }
}

function x() {
    var squares = [],
        SIZE = 3,
        EMPTY = "&nbsp;",
        score,
        moves,
        turn = "X",

    wins = [7, 56, 448, 73, 146, 292, 273, 84],

    startNewGame = function() {
        //selects random starter, defaults to X for security
        let x = Math.floor((Math.random() * 10) + 1);
        if (x % 2 == 0) {
            turn = "X";
            alert("X starts!")
        }
        else if (x % 2 == 1) {
            turn = "O";
            alert("O starts!")
        }
        else {
            turn = "X";
            alert("X starts!")
        }
        score = {"X" : 0, "O" : 0};
        moves = 0;
        squares.forEach(function (square) {square.html(EMPTY);});
    },

    win = function (score) {
        for (var i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    },

    set = function () {
        if ($(this).html() !== EMPTY) {
            return;
        }
        $(this).html(turn);
        console.log($(this));
        moves += 1;
        score[turn] += $(this)[0].indicator;
        console.log(score[turn]);
        if (win(score[turn])) {
            alert(turn + " wins!");
            startNewGame();
        } else if (moves === SIZE * SIZE) {
            alert("Cat\u2019s game!");
            startNewGame();
        } else {
            turn = turn === "X" ? "O" : "X";
        }
    };

    play = function () {
    var board = $("<table border=1 cell-spacing=0 align=center>"), indicator = 1;
        for (var i = 0; i < SIZE; i += 1) {
            var row = $("<tr>");
            board.append(row);
            for (var j = 0; j < SIZE; j += 1) {
                var cell = $("<td height=50 width=50 align=center valign=center></td>");
                cell[0].indicator = indicator;
                cell.click(set);
                row.append(cell);
                squares.push(cell);
                indicator += indicator;
            }
        }
        
    $(document.getElementById("tictactoe") || document.body).append(board);
    startNewGame();
    };

play();

}

// When the DOM is ready set up the board
$().ready(setupBoard);