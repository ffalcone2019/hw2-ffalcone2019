// Score the passed in game
function score(gm, depth) {
    // See if anyone won a row
    for (var r = 0; r < 3; r++) {
        if ((gm[r][0] == gm[r][1]) && (gm[r][1] == gm[r][2]) && (gm[r][1] === computer)) {
            //console.log("computer won, score: " + (10 - depth));
            return {
                win: [[r, 0], [r, 1], [r, 2]],
                score: 10 - depth
            };
        }
        else if ((gm[r][0] == gm[r][1]) && (gm[r][1] == gm[r][2]) && (gm[r][1] === human)) {
            //console.log("human won, score: " + (depth - 10));
            return {
                win: [[r, 0], [r, 1], [r, 2]],
                score: depth - 10
            };
        }
    }

    // See if anyone won a column
    for (var c = 0; c < 3; c++) {
        if ((gm[0][c] == gm[1][c]) && (gm[1][c] == gm[2][c]) && (gm[1][c] === computer)) {
            //console.log("computer won, score: " + (10 - depth));
            return {
                win: [[0, c], [1, c], [2, c]],
                score: 10 - depth
            };
        }
        else if ((gm[0][c] == gm[1][c]) && (gm[1][c] == gm[2][c]) && (gm[1][c] === human)) {
            //console.log("human won, score: " + (depth - 10));
            return {
                win: [[0, c], [1, c], [2, c]],
                score: depth - 10
            };
        }
    }

    // See if anyone won a diagonal
    if ((gm[0][0] == gm[1][1]) && (gm[1][1] == gm[2][2]) && (gm[1][1] === computer)) {
        //console.log("computer won, score: " + (10 - depth));
        return {
            win: [[0, 0], [1, 1], [2, 2]],
            score: 10 - depth
        };
    }
    else if ((gm[0][0] == gm[1][1]) && (gm[1][1] == gm[2][2]) && (gm[1][1] === human)) {
        //console.log("human won, score: " + (depth - 10));
        return {
            win: [[0, 0], [1, 1], [2, 2]],
            score: depth - 10
        };
    }
    if ((gm[0][2] == gm[1][1]) && (gm[1][1] == gm[2][0]) && (gm[1][1] === computer)) {
        //console.log("computer won, score: " + (10 - depth));
        return {
            win: [[0, 2], [1, 1], [2, 0]],
            score: 10 - depth
        };
    }
    else if ((gm[0][2] == gm[1][1]) && (gm[1][1] == gm[2][0]) && (gm[1][1] === human)) {
        //console.log("human won, score: " + (depth - 10));
        return {
            win: [[0, 2], [1, 1], [2, 0]],
            score: depth - 10
        };
    }

    // Nobody won
    //console.log("score: 0");
    return {
        win: [],
        score: 0
    };
}

// Minimax algorithm
function minimax(gm, depth, whosTurn) {
    //console.log("mm: start: gm: " + gm + ", depth: " + depth + ", turn: " + whosTurn);

    // Score the game to see if somebody won
    var sc = score(gm, depth);

    // If there is a score somebody won
    if (sc.score != 0) {
        var ret = {
            winner: (sc.score > 0) ? computer : human,
            move: {
                row: -1,
                col: -1
            },
            score: sc.score
        };
        //console.log("mm: end: " + JSON.stringify(ret));
        return ret;
    }

    // If there are no more moves its a tie
    if (noMoreMoves(gm)) {
        var ret = {
            winner: 'tie',
            move: {
                row: -1,
                col: -1
            },
            score: sc.score
        };
        //console.log("mm: end: " + JSON.stringify(ret));
        return ret;
    }

    // Increase the depth
    depth++;
    
    // Hold the current min and max, and the move
    var minScore = 1000,
        maxScore = -1000,
        bestScore,
        move,
        winner;

    // For each available spot in this game find the score
    //  of making this move
    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            // If this spot is not empty skip it
            if (gm[r][c] !== EMPTY) {
                continue;
            }
            //console.log("trying spot (" + r + "," + c + ")")

            // Copy this game into a new array
            gmCopy = copyGameArray(gm);

            // See what happens if this spot is tried
            gmCopy[r][c] = whosTurn

            // Set who has the next turn
            var nextTurn = (whosTurn == human ? computer : human);

            // Get the minimax for this move
            var mm = minimax(gmCopy, depth, nextTurn);

            // If its the computer's turn find the max or else find the min
            if (whosTurn == computer) {
                if (mm.score > maxScore) {
                    maxScore = mm.score;
                    bestScore = maxScore;
                    move = {
                        row: r,
                        col: c
                    };
                    winner = mm.winner
                }
            }
            else {
                if (mm.score < minScore) {
                    minScore = mm.score;
                    bestScore = minScore
                    move = {
                        row: r,
                        col: c
                    };
                    winner = mm.winner
                }
            }
        }
    }

    // All moves were tried, return the result
    var ret = {
        winner: winner,
        move: move,
        score: bestScore
    };
    //console.log("mm: end: " + JSON.stringify(ret));
    return ret;
}

// See if the passed in game has any more possible moves
function noMoreMoves(gm) {
    // If any EMPTY then more moves to make
    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            if (gm[r][c] == EMPTY) {
                return false;
            }
        }
    }

    return true;
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
        setStatus("human(X) starts!");
    }
    else {
        turn = computer;
        setStatus("computer(O) starts!");
    }
}

// Reset the board DOM objects and class
function resetDomBoard() {
    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            domBoard[r][c].html(EMPTY);
            domBoard[r][c].removeClass("highlight");
        }
    }
}

// Copy the 2 dimensional game array into a new one
function copyGameArray(gm) {
    var newArray = [[], [], []];
    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            newArray[r][c] = gm[r][c];
        }
    }
    return newArray;
}

// Set the status
setStatus = (msg) => {
	$("#status").html(msg);
}

setHighlight = (a) => {
	domBoard[a[0][0]][a[0][1]].addClass("highlight")
	domBoard[a[1][0]][a[1][1]].addClass("highlight")
	domBoard[a[2][0]][a[2][1]].addClass("highlight")
}

// Set the win count
function setWinCount(id, msg) {
	if (id == "cats") {
		$("#cats").html("Cat's games: " + msg);
	}
	else {
		$("#" + id).html(id + " wins: " + msg);
	}
}

function makeArrayFromDomBoard() {
    var gm = [[], [], []];
    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            gm[r][c] = domBoard[r][c].html();
        }
    }

    return gm;
}

function startNewGame() {
    // Reset the board
    resetDomBoard();

    // Choose who starts
    pickStart();

    // Its the computers first move
    firstMove = true;

    // If the computer goes first just pick top left corner
    if (turn == computer) {
        console.log("Computer's turn...");
		setStatus("Computer's turn...")

		// Make the 2 dimensional game array
        var game = makeArrayFromDomBoard();
    
        // Don't call minimax for the opening move
        //  just pick the top left corner
        domBoard[0][0].html(computer);

        // Its not the computers first move anymore
        firstMove = false;

        // Now its the humans move
        turn = human;
        console.log("Human's turn...");
		setStatus("Human's turn...")
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

	// Stop the user from clicking
	turn = computer;

    // If its the computers first move dont use
    // minimax because it takes too long
    if (firstMove) {

	    // Now its the computers turn
    	console.log("Computer's turn...");
		setStatus("Computer's turn...")

        // Its not the computers first move anymore
        firstMove = false;

        // If the human picked the center box, select the top left corner
        // else take the center
        if (domBoard[1][1].html() == human) {
            domBoard[0][0].html(computer);
        }
        else {
            domBoard[1][1].html(computer);
        }

        // It's the humans turn
        turn = human;
        console.log("Human's turn...");
		setStatus("Human's turn...")

        return;
    }

    // Make the 2 dimensional game array
    var game = makeArrayFromDomBoard();

	// See if the game is over
	var gameOver = score(game, 0);
	if (gameOver.score != 0) {
		console.log("Human wins! Winning cells are: " + gameOver.win)
		setStatus("Human wins!")
		winCount.X++
		setWinCount(human, winCount.X)
		setHighlight(gameOver.win)
		setTimeout(startNewGame, 2500)
		return
	}

	// See if tie
	if (noMoreMoves(game)) {
		console.log("Cat's game!");
		setStatus("Cat's game!")
		winCount.cats++
		setWinCount("cats", winCount.cats)
		setTimeout(startNewGame, 2500)
		return
	}

    // Get the next move
	console.log("Computer's turn...");
	setStatus("Computer's turn...")
    console.log("figuring out computer's move");
    var mm = minimax(game, 0, computer);
    console.log("minimax returned: " + JSON.stringify(mm));

    // Do the move
    domBoard[mm.move.row][mm.move.col].html(computer);

    // Make the new 2 dimensional game array
    game = makeArrayFromDomBoard();

	// See if the game is over
	var gameOver = score(game, 0);
	if (gameOver.score != 0) {
		console.log("Computer wins! Winning cells are: " + gameOver.win)
		setStatus("Computer wins!")
		winCount.O++
		setWinCount(computer, winCount.O)
		setHighlight(gameOver.win)
		setTimeout(startNewGame, 2500)
		return
	}

	// See if tie
	if (noMoreMoves(game)) {
		console.log("Cat's game!");
		setStatus("Cat's game!")
		winCount.cats++
		setWinCount("cats", winCount.cats)
		setTimeout(startNewGame, 2500)
		return
	}

    // Now its the humans move
    turn = human;
    console.log("Human's turn...");
	setStatus("Human's turn...")

    return;
}
