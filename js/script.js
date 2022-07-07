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
  const render = () => {
    positions.map((position) => position.classList.add("border"));
  };
  return { positions, lines, emptyPositions, render };
})();

const player = (name, mark) => {
  return { name, mark };
};

const players = {};

const game = (() => {
  const checkWinner = () => {
    let winner;
    if (
      gameboard.emptyPositions().length == 0
    ) {
      winner = 0;
    }
    for (let i = 0; i < 8; i++) {
      if (
        gameboard.lines[i].filter((square) => square.textContent == "O")
          .length == 3
      ) {
        winner = 1;
        break;
      }
      if (
        gameboard.lines[i].filter((square) => square.textContent == "X")
          .length == 3
      ) {
        winner = -1;
        break;
      }
    }
    return winner;
  };
  const displayWinner = () => {
    if (checkWinner() == 0) {
      resultDisplay.textContent = "Draw";
    }
    if (checkWinner() == 1) {
      resultDisplay.textContent = `Tic Tac, Toe, three in a row! Winner: ${players.playerTwo.name}`;
    } else if (checkWinner() == -1) {
      resultDisplay.textContent = `Tic Tac, Toe, three in a row! Winner: ${players.playerOne.name}`;
    }
  };

  const wipeScore = () => {
    resultDisplay.textContent = "";
    gameboard.positions.map((position) => {
      position.textContent = ``;
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
      const mark = () => {
        position.textContent = `${player.mark}`;
      };
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
          noobMove();
        }
      };
      const mgMove = () => {
        function minimax(gameboard, maxPlayer) {
          let score = checkWinner();
          if (score != undefined) {
            return score;
          }
          if (maxPlayer) {
            let bestScore = -Infinity;
            const emptyPositions = gameboard.emptyPositions();
            for (let i = 0; i < emptyPositions.length; i++) {
              emptyPositions[i].textContent = "O";
              let score = minimax(gameboard, false);
              emptyPositions[i].textContent = "";
              bestScore = Math.max(bestScore, score);
            }
            return bestScore;
          } else {
            const emptyPositions = gameboard.emptyPositions();
            let bestScore = +Infinity;
            for (let i = 0; i < emptyPositions.length; i++) {
              emptyPositions[i].textContent = "X";
              let score = minimax(gameboard, true);
              emptyPositions[i].textContent = "";
              bestScore = Math.min(bestScore, score);
            }
            return bestScore;
          }
        }
        let bestScore = -Infinity;
        let bestMove = [];
        let emptyPositions = gameboard.emptyPositions();
        for (let i = 0; i < emptyPositions.length; i++) {
          emptyPositions[i].textContent = "O";
          let score = minimax(gameboard, 0, false);
          emptyPositions[i].textContent = "";
          bestScore = Math.max(bestScore, score);
          bestMove.push([emptyPositions.indexOf(emptyPositions[i]), bestScore])
        }
        bestMove = bestMove.sort((a,b) => b[1] - a[1])
        console.log(bestMove)
        emptyPositions[bestMove[0][0]].click();
      };

      //minimax algorithm:
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

      const move = () => {
        if (resultDisplay.textContent != "") {
          return;
        }
        mark();
        checkWinner();
        displayWinner();
        endTurn();
      };
      position.addEventListener(
        "click",
        () => {
          move();
          if (
            gameboard.positions.filter((position) => position.textContent != "")
              .length != 9
          ) {
            if (player.difficulty == "noob") {
              noobMove();
            }
            if (player.difficulty == "average") {
              avgMove();
            }
            if (player.difficulty == "machine-god") {
              mgMove();
            }
          }
        },
        { once: true }
      );
    });
  };
  return { play };
})();

const playerOne = document.querySelector("#player-one");
const playerTwo = document.querySelector("#player-two");
const AI = document.querySelector(".AI");
const noob = document.querySelector(".noob");
const average = document.querySelector(".average");
const machineGod = document.querySelector(".machine-god");
const resultDisplay = document.querySelector(".result");
const startBUtton = document.querySelector(".start");

startBUtton.addEventListener("click", () => {
  gameboard.render();
  players.playerTwo = player(playerTwo.value, "O");
  gameboard.positions.map((position) => position.click());
  players.playerOne = player(playerOne.value, "X");
  if (AI.selected) {
    players.playerTwo = player(AI.value, "O");
    if (noob.selected) {
      players.playerTwo.difficulty = "noob";
    }
    if (average.selected) {
      players.playerTwo.difficulty = "average";
    }
    if (machineGod.selected) {
      players.playerTwo.difficulty = "machine-god";
    }
  } else {
    players.playerTwo = player(playerTwo.value, "O");
  }
  startBUtton.textContent = "Restart";
  game.play(players.playerOne);
});
