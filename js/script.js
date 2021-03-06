const gameboard = (() => {
  const positions = [];
  for (let i = 1; i < 10; i++) {
    positions.push(document.querySelector(`.gameboard>:nth-child(${i})`));
  }
  const lines = [
    [positions[0], positions[1], positions[2]],
    [positions[3], positions[4], positions[5]],
    [positions[6], positions[7], positions[8]],
    [positions[0], positions[3], positions[6]],
    [positions[1], positions[4], positions[7]],
    [positions[2], positions[5], positions[8]],
    [positions[0], positions[4], positions[8]],
    [positions[2], positions[4], positions[6]],
  ];
  const emptyPositions = () => {
    return positions.filter((position) => position.textContent == "");
  };
  const renderBoard = () => {
    let indexes = [0, 1, 3, 4, 6, 7];
    positions.map((position) => {
      if (positions.indexOf(position) < 6) {
        position.classList.remove("transop-btb");
      }
      if (indexes.includes(positions.indexOf(position))) {
        position.classList.remove("transop-rb");
      }
    });
    let show = () => {
      positions.map((position) => {
        if (positions.indexOf(position) < 6) {
          position.classList.add("transop-btb");
        }
        if (indexes.includes(positions.indexOf(position))) {
          position.classList.add("transop-rb");
        }
      });
    };
    setTimeout(show, 200);
  };
  return { positions, lines, emptyPositions, renderBoard };
})();

const player = (name, mark, difficulty = "human") => {
  const noobMove = () => {
    const emptyPositions = gameboard.emptyPositions();
    const randomPosition =
      emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
    randomPosition.click();
  };
  const avgMove = () => {
    let riskyLines = [];
    let winLines = [];
    for (let i = 0; i < 8; i++) {
      if (
        gameboard.lines[i].filter((square) => square.textContent == "X")
          .length == 2 &&
        gameboard.lines[i].filter((square) => square.textContent == "O")
          .length == 0
      ) {
        riskyLines.push(gameboard.lines[i]);
      }
      if (
        gameboard.lines[i].filter((square) => square.textContent == "O")
          .length == 2 &&
        gameboard.lines[i].filter((square) => square.textContent == "X")
          .length == 0
      ) {
        winLines.push(gameboard.lines[i]);
      }
    }
    if (winLines.length != 0) {
      winLines[Math.floor(Math.random() * winLines.length)]
        .filter((riskySquare) => riskySquare.textContent == "")[0]
        .click();
    } else if (riskyLines.length != 0) {
      riskyLines[Math.floor(Math.random() * riskyLines.length)]
        .filter((riskySquare) => riskySquare.textContent == "")[0]
        .click();
    } else {
      return 0;
    }
  };
  const mgMove = () => {
    function minimax(gameboard, alpha, beta, maxPlayer) {
      let score = game.checkWinner();
      if (score != undefined) {
        return score;
      }
      if (maxPlayer) {
        let bestScore = -Infinity;
        const emptyPositions = gameboard.emptyPositions();
        for (let i = 0; i < emptyPositions.length; i++) {
          emptyPositions[i].textContent = "O";
          let score = minimax(gameboard, alpha, beta, false);
          emptyPositions[i].textContent = "";
          bestScore = Math.max(bestScore, score);
          alpha = Math.max(alpha, score);
          if (beta <= alpha) {
            break;
          }
        }
        return bestScore;
      } else {
        const emptyPositions = gameboard.emptyPositions();
        let bestScore = +Infinity;
        for (let i = 0; i < emptyPositions.length; i++) {
          emptyPositions[i].textContent = "X";
          let score = minimax(gameboard, alpha, beta, true);
          emptyPositions[i].textContent = "";
          bestScore = Math.min(bestScore, score);
          beta = Math.min(beta, score);
          if (beta <= alpha) {
            break;
          }
        }
        return bestScore;
      }
    }
    let bestScore = -Infinity;
    let bestMove = [];
    let emptyPositions = gameboard.emptyPositions();
    for (let i = 0; i < emptyPositions.length; i++) {
      emptyPositions[i].textContent = "O";
      let score = minimax(gameboard, -Infinity, +Infinity, false);
      emptyPositions[i].textContent = "";
      bestScore = Math.max(bestScore, score);
      bestMove.push([emptyPositions.indexOf(emptyPositions[i]), bestScore]);
    }
    bestMove = bestMove.sort((a, b) => b[1] - a[1]);
    emptyPositions[bestMove[0][0]].click();

    //minimax algorithm:
    //https://www.youtube.com/watch?v=l-hh51ncgDI
    //const minimax = (position, depth, maxPlayer) => {
    // 	if depth == 0 or game over in position
    // 		return static evaluation of position
    // 	if maxPlayer
    // 		maxEval = -infinity (the worst possible)
    // 		for each child of position
    // 			eval = minimax(child, depth - 1, false)
    // 			maxEval = max(maxEval, eval)
    // 		return maxEval
    // 	else
    // 		minEval = +infinity
    // 		for each child of position
    // 			eval = minimax(child, depth - 1, true)
    // 			minEval = min(minEval, eval)
    // 		return minEval}
  };
  if (difficulty == "noob") {
    return { name, mark, difficulty, noobMove };
  }
  if (difficulty == "average") {
    return { name, mark, difficulty, noobMove, avgMove };
  }
  if (difficulty == "machine-god") {
    return { name, mark, difficulty, mgMove };
  }
  return { name, mark, difficulty };
};

const players = {};

const game = (() => {
  const checkWinner = () => {
    for (let i = 0; i < 8; i++) {
      if (
        gameboard.lines[i].filter((square) => square.textContent == "O")
          .length == 3
      ) {
        return 1;
      }
      if (
        gameboard.lines[i].filter((square) => square.textContent == "X")
          .length == 3
      ) {
        return -1;
      }
    }
    if (gameboard.emptyPositions().length == 0) {
      return 0;
    }
  };

  const displayWinner = () => {
    let winner = checkWinner();
    if (winner == 0) {
      dom.resultDisplay.textContent = "Draw";
      dom.resultDisplay.classList.add("result-show");
      return 1;
    }
    if (winner == 1) {
      dom.resultDisplay.textContent = `Winner: ${players.playerTwo.name}`;
      dom.resultDisplay.classList.add("result-show");
      dom.playerTwoDisplay.classList.add("winner");
      return 1;
    }
    if (winner == -1) {
      dom.resultDisplay.textContent = `Winner: ${players.playerOne.name}`;
      dom.resultDisplay.classList.add("result-show");
      dom.playerOneDisplay.classList.add("winner");
      return 1;
    }
  };

  const wipeScore = () => {
    dom.resultDisplay.textContent = "";
    dom.resultDisplay.classList.remove("result-show");
    dom.playerOneDisplay.classList.remove("winner");
    dom.playerTwoDisplay.classList.remove("winner");
    gameboard.positions.map((position) => {
      position.textContent = "";
      position.classList.remove("xmark-one", "omark-one");
    });
  };

  const play = (player) => {
    wipeScore();
    gameboard.positions.map((position) => {
      const endTurn = () => {
        if (player == players.playerOne) {
          player = players.playerTwo;
        } else {
          player = players.playerOne;
        }
      };
      const play = () => {
        if (dom.resultDisplay.textContent != "") {
          return;
        }
        position.textContent = `${player.mark}`;
        if (position.textContent == "X") {
          position.classList.add("xmark-one");
        } else {
          position.classList.add("omark-one");
        }
        let winner = displayWinner();
        if (winner) {
          return;
        }
        endTurn();
        if (player.difficulty == "human") {
          return;
        }
        if (gameboard.emptyPositions().length > 1) {
          if (player.difficulty == "noob") {
            player.noobMove();
          } else if (player.difficulty == "average") {
            let blockWin = player.avgMove();
            if (blockWin == 0) {
              player.noobMove();
            }
          } else if (player.difficulty == "machine-god") {
            player.mgMove();
          }
        }
      };
      position.addEventListener("click", play, { once: true });
    });
  };
  return { play, checkWinner };
})();

const dom = (() => {
  const playerOneInput = document.querySelector("#player-one");
  const playerOneDisplay = document.querySelector(".player-one");
  const playerTwoInput = document.querySelector("#player-two");
  const playerTwoDisplay = document.querySelector(".player-two");
  const AI = document.querySelector(".AI");
  const noob = document.querySelector(".noob");
  const average = document.querySelector(".average");
  const machineGod = document.querySelector(".machine-god");
  const resultDisplay = document.querySelector(".result");
  const startBUtton = document.querySelector(".start");

  startBUtton.addEventListener("click", () => {
    gameboard.renderBoard();
    startBUtton.textContent = "Restart";
    gameboard.positions.map((position) => position.click());
    players.playerOne = player(playerOneInput.value, "X");
    playerOneDisplay.textContent = playerOneInput.value;
    playerTwoDisplay.textContent = "";
    if (AI.selected) {
      if (noob.selected) {
        playerTwoInput.value = "Noob-RX";
        players.playerTwo = player(playerTwoInput.value, "O", "noob");
      } else if (average.selected) {
        playerTwoInput.value = "Average-ultra";
        players.playerTwo = player(playerTwoInput.value, "O", "average");
      } else if (machineGod.selected) {
        playerTwoInput.value = "Deus Ex Machina";
        players.playerTwo = player(playerTwoInput.value, "O", "machine-god");
      }
      playerTwoInput.value = "";
    } else {
      players.playerTwo = player(playerTwoInput.value, "O");
      playerTwoDisplay.textContent = playerTwoInput.value;
    }
    playerOneDisplay.classList.remove("transop-pone");
    playerTwoDisplay.classList.remove(
      "transop-ptwo",
      "player-noob",
      "player-average",
      "player-deus"
    );
    let show = () => {
      playerOneDisplay.classList.add("transop-pone");
      playerTwoDisplay.classList.add("transop-ptwo");
      if (players.playerTwo.name == "Noob-RX") {
        playerTwoDisplay.classList.add("player-noob");
      } else if (players.playerTwo.name == "Average-ultra") {
        playerTwoDisplay.classList.add("player-average");
      } else if (players.playerTwo.name == "Deus Ex Machina") {
        playerTwoDisplay.classList.add("player-deus");
      }
    };
    setTimeout(show, 200);
    game.play(players.playerOne);
  });

  return { resultDisplay, playerOneDisplay, playerTwoDisplay };
})();
