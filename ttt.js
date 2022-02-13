// Using the minimax algorithm to determine the best move
//  from https://www.neverstopbuilding.com/blog/minimax
//
// This algorithm takes a LONG time to run when there are
// a lot of options so I am also using tic-tac-toe strategy
// from https://www.rd.com/article/how-to-win-tic-tac-toe/ for
// the opening moves

var domBoard = [[], [], []],
    EMPTY = "&nbsp;",
    human = "X",
    computer = "O",
    turn,
    firstMove,
    winCount = {
        X: 0,
        O: 0,
        cats: 0
    };

// Run one time to set up the rows and cols of the board
function setupBoard() {
    // Create table element
    var board = $("<table border=1 cell-spacing=0 align=center>");

    // Loop for each row
    for (var r = 0; r < 3; r++) {

        // Create row element and add it to table element
        var row = $("<tr>");
        board.append(row);

        // Loop for each column
        for (var c = 0; c < 3; c++) {

            // Create col element
            var col = $("<td height=50 width=50 align=center valign=center></td>");

            // Tie the col click handler to this col
            col.click(colClickHandler);

            // Add the col element to the row element
            row.append(col);

            // Add this col element to the DOM board array
            domBoard[r].push(col);
        }
    }

    // Find the div, and add the table to it
    $(document.getElementById("tictactoe")).append(board);

    // Display win count
    setWinCount(human, winCount.X)
    setWinCount(computer, winCount.O)
    setWinCount("cats", winCount.cats)

    // Start new game
    startNewGame();
}

// When the DOM is ready set up the board
$().ready(setupBoard);