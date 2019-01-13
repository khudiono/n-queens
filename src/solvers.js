/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function(n) {
  var solution = [];
  var boardObj = new Board({n:n});
  var board = boardObj.rows();

  var search = function (rooksLeft, board) {
    if(rooksLeft === 0) {
      solution = board;
      return board;
    }
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        //toggle position and check tests
        if (board[i][j] === 0) {
          boardObj.togglePiece(i,j);
          if (boardObj.hasAnyRooksConflicts()) {
            boardObj.togglePiece(i,j);
          } else {
            board = boardObj.rows();
            search(--rooksLeft, board);
          }
        }
      }
    }
  }
  search(n,board);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  var search = function (row) {
    if(row === n) {
      solutionCount++;
      return;
    };

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyRooksConflicts()) {
        search(row+1);
      }
      board.togglePiece(row, i);
    }
  }

  search(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var boardObj = new Board({n:n});
  var solution = undefined;
  if (n === 2 || n === 3) {
    return boardObj.rows();
  }
  var search = function(row){
    if (row === n){
      solution = boardObj.rows();
      return solution;
    }
    for (let i = 0; i < n; i++){
      boardObj.togglePiece(row, i);
      if (!boardObj.hasAnyQueensConflicts()){
        search(row+1);
      }
      if (solution) {
        return solution;
      }
      boardObj.togglePiece(row, i)
    }
  }
  search(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  var search = function (row) {
    if(row === n) {
      solutionCount++;
      return;
    };

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        search(row+1);
      }
      board.togglePiece(row, i);
    }
  }

  search(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
