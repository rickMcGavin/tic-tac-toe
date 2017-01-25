

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

var xTurn = true;
function launchTwoPlayerMode() {

  if (xTurn) {
    $(".square").click(function() {
      $(this).append("<div class='x'>X</div>");
    });
  } else {
    $(".square").click(function() {
      $(this).append("<div class='o'>O</div>");
    });
  }
  xTurn = false;
}


init();
