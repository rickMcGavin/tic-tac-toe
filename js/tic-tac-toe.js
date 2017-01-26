var playerX = "X";
var playerO = "O";
var player = playerX;
var count = 0;
var board = [];

// ask user if one or two player (for now two player will be only option)
function launchGameTypeModal() {
  $("#onePlayer-twoPlayer").show();
  $("button").click(function() {
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
  launchTwoPlayerMode();
}

function init() {
  launchGameTypeModal();

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
  if (board[0] === player && board[1] === player && board[2] === player) {
    alert(player + " wins!");
  }
  if (count >= 8) {
    alert("It's a draw");
  }
}

function updateBoard(squareId) {
  board[squareId] = player;
  console.log(board);
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
