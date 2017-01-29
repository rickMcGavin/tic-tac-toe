var playerX = "X";
var playerO = "O";
var player = playerX;
var count = 0;
var board = [];

// ask user if one or two player (for now two player will be only option)
function launchGameTypeModal() {
  $("#onePlayer-twoPlayer").show();
  $("#two-player").unbind("click").click(function() {
    $("#onePlayer-twoPlayer").hide();
    $("#message").show();
    $("#message").append("<h1>X always goes first</h1>");
    setTimeout(function() {
      $("#message").empty();
      $("#message").hide();
    }, 1000);
    launchTwoPlayerMode();
  });
  $("#one-player").click(function() {
    $("#onePlayer-twoPlayer").hide();
    launchGamePieceModal();
  });
}

// ask user if they want to be x or o
function launchGamePieceModal() {
  $("#choose-piece").show();
  $("button").click(function() {
    $("#choose-piece").hide();
  });
}

function init() {
  launchGameTypeModal();
}

function reset() {
  $(".square").empty();
  $("#message").empty();
  $("#message").hide();
  board = [];
  count = 0;
  player = playerX;
  $(".square").removeClass("x o");
  $(".square").unbind("click").click(function(element) {
    updateBoard(element.target.id);
    takeTurn($(this));
    $(this).off("click");
  });
}

function switchPlayer() {
  count++;

  if (player === playerX) {
    player = playerO;
  } else {
    player = playerX;
  }
}

function checkForWinner() {
  if (
  (board[0] === player && board[1] === player && board[2] === player)     || (board[3] === player && board[4] === player && board[5] === player)     ||  (board[6] === player && board[7] === player && board[8] === player)     ||
  (board[0] === player && board[3] === player && board[6] === player)     ||
  (board[1] === player && board[4] === player && board[7] === player)     ||
  (board[2] === player && board[5] === player && board[8] === player)     ||
  (board[0] === player && board[4] === player && board[8] === player)     ||
  (board[2] === player && board[4] === player && board[6] === player)
  ) {
      $("#message").append("<h1>" + player + " wins!</h1>");
      $("#message").show();
      setTimeout(function() {
        reset();
      }, 2000);
  } else if (count >= 8) {
      $("#message").append("<h1>It's a draw</h1>");
      $("#message").show();
      setTimeout(function() {
        reset();
      }, 2000);
  }
}

function updateBoard(squareId) {
  board[squareId] = player;
  console.log(board[7]);
}

function takeTurn(cell) {
  cell.addClass(player.toLocaleLowerCase());
  cell.text(player);
  checkForWinner();
  switchPlayer();
}

function launchTwoPlayerMode() {
  $(".square").unbind("click").click(function(element) {
    updateBoard(element.target.id);
    takeTurn($(this));
    $(this).off("click");
  });
}


init();
