var count = 0;
var random = 0;
var playerX = "X";
var playerO = "O";
var player = playerX;


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
  $("#button-x").click(function() {
    $("#choose-piece").hide();
    launchXPlayerMode();
  });
  $("#button-o").click(function() {
    $("#choose-piece").hide();
    launchOPlayerMode();
  });
}

function launchXPlayerMode() {
  (function getRandomNumber() {
    random = Math.floor(Math.random() * 9);
    if ($("#"+random).text() === "X" || $("#"+random).text() === "O") {
      getRandomNumber();
    } else {
      return random;
    }
  })();
  if (count % 2 === 0) {
    $(".square").unbind("click").click(function(element) {
      takeTurn($(this));
      $(this).off("click");
      launchXPlayerMode();
    });
  } else {
    takeTurn($("#"+random));
    $("#"+random).off("click");
    launchXPlayerMode();
  }
}

function launchOPlayerMode() {
  (function getRandomNumber() {
    random = Math.floor(Math.random() * 9);
    if ($("#"+random).text() === "X" || $("#"+random).text() === "O") {
      getRandomNumber();
    } else {
      return random;
    }
  })();
  if (count % 2 !== 0) {
    $(".square").unbind("click").click(function(element) {
      takeTurn($(this));
      $(this).off("click");
      launchOPlayerMode();
    });
  } else {
    takeTurn($("#"+random));
    $("#"+random).off("click");
    launchOPlayerMode();
  }
}


function reset() {
  $(".square").empty();
  $("#message").empty();
  $("#message").hide();
  player = playerX;
  count = 0;
  $(".square").removeClass("x o");
}

function checkForWinner() {
  if (
   ($("#0").text() === player) &&
   ($("#1").text() === player) &&
   ($("#2").text() === player) ||

   ($("#3").text() === player) &&
   ($("#4").text() === player) &&
   ($("#5").text() === player) ||

   ($("#6").text() === player) &&
   ($("#7").text() === player) &&
   ($("#8").text() === player) ||

   ($("#0").text() === player) &&
   ($("#3").text() === player) &&
   ($("#6").text() === player) ||

   ($("#1").text() === player) &&
   ($("#4").text() === player) &&
   ($("#7").text() === player) ||

   ($("#2").text() === player) &&
   ($("#5").text() === player) &&
   ($("#8").text() === player) ||

   ($("#0").text() === player) &&
   ($("#4").text() === player) &&
   ($("#8").text() === player) ||

   ($("#2").text() === player) &&
   ($("#4").text() === player) &&
   ($("#6").text() === player)) {
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

function launchTwoPlayerMode() {
  $(".square").unbind("click").click(function(element) {
    takeTurn($(this));
    console.log($(this).text());
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

function takeTurn(cell) {
  cell.addClass(player.toLowerCase());
  cell.text(player);
  checkForWinner();
  switchPlayer();
}

launchGameTypeModal();
