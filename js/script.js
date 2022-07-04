const gameboard = (() => {
  const contents = [];
  const positions = [];
  for (let i = 1; i < 10; i++) {
    positions.push(document.querySelector(`.gameboard>:nth-child(${i})`));
  }
  const render = () => {positions.map(position => position.classList.add("border"))}
  return { contents, positions, render };
})();

const player = (name, mark) => {
  return { name, mark };
};

const players = {};

const game = (() => {
  const resultDisplay = document.querySelector(".result");
  const checkWinner = (player) => {
    let pos1 = gameboard.positions[0].textContent;
    let pos2 = gameboard.positions[1].textContent;
    let pos3 = gameboard.positions[2].textContent;
    let pos4 = gameboard.positions[3].textContent;
    let pos5 = gameboard.positions[4].textContent;
    let pos6 = gameboard.positions[5].textContent;
    let pos7 = gameboard.positions[6].textContent;
    let pos8 = gameboard.positions[7].textContent;
    let pos9 = gameboard.positions[8].textContent;

    if (gameboard.contents.length == 9) {
      resultDisplay.textContent = "Draw";
    }

    if (pos1 != "") {
      if (
        (pos1 == pos2 && pos1 == pos3) ||
        (pos1 == pos5 && pos1 == pos9) ||
        (pos1 == pos4 && pos1 == pos7)
      ) {
        resultDisplay.textContent = `Winner: ${player.name}`;
      }
    }
    if (pos4 != "") {
      if (pos4 == pos5 && pos4 == pos6) {
        resultDisplay.textContent = `Winner: ${player.name}`;
      }
    }
    if (pos7 != "") {
      if ((pos7 == pos5 && pos7 == pos3) || (pos7 == pos8 && pos7 == pos9)) {
        resultDisplay.textContent = `Winner: ${player.name}`;
      }
    }
    if (pos3 != "") {
      if (pos3 == pos6 && pos3 == pos9) {
        resultDisplay.textContent = `Winner: ${player.name}`;
      }
    }
    if (pos2 != "") {
      if (pos2 == pos5 && pos2 == pos8) {
        resultDisplay.textContent = `Winner: ${player.name}`;
      }
    }
  };
  const play = (player) => {
    resultDisplay.textContent = "";
    gameboard.contents = [];
    gameboard.positions.map((position) => {
      position.textContent = ``;
      let mark = () => {
        gameboard.contents.push(`${player.mark}`);
        position.textContent = `${player.mark}`;
      };
      const endTurn = () => {
        if (player == players.playerOne) {
          player = players.playerTwo;
        } else {
          player = players.playerOne;
        }
      };
      const move = () => {
        if (resultDisplay.textContent != "") {
          return;
        }
        mark();
        checkWinner(player);
        endTurn();
      };
      position.addEventListener("click", move, { once: true });
    });
  };
  return { play };
})();

const playerOne = document.querySelector("#player-one");
const playerTwo = document.querySelector("#player-two");
const AI = document.querySelector(".AI");
const startBUtton = document.querySelector(".start");

startBUtton.addEventListener("click", () => {
  gameboard.render()
  players.playerOne = player(playerOne.value, "X");
  players.playerTwo = player(playerTwo.value, "O");
  if (AI.selected) {
    players.playerTwo = player(AI.value, "O");
  }
  startBUtton.textContent = "Restart";
  gameboard.positions.map((position) => position.click());
  game.play(players.playerOne);
});
