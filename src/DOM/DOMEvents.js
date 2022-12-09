import gameHandler from "../modules/gameHandler";

const AIBoard = document.getElementById("ai-board");
const playerBoard = document.getElementById("player-board");
const boardForPlacement = document.getElementById("place-ship-board");
const shipsContainer = document.getElementById("ships-container");
const startBtn = document.querySelector("#start");
const boardResetBtn = document.querySelector("#board-reset");
const gameResetBtn = document.querySelector("#game-reset");
const alignmentBtn = document.querySelector("#alignment-btn");

let myGameHandler = gameHandler("test");

const renderPlayerShips = () => {
  const playerShips = myGameHandler.players.realPlayer.board.shipList;
  playerShips.forEach((shipObj) => {
    shipObj.coordinates.forEach((coord) => {
      const coordOnPlayerBoard = playerBoard.querySelector(
        `[data-x="${coord[0]}"][data-y="${coord[1]}"]`
      );
      coordOnPlayerBoard.classList.add("anchored");
    });
  });
};

alignmentBtn.addEventListener("click", () => {
  let alignmentState = shipsContainer.firstElementChild.dataset.alignment;
  if (alignmentState === "horizontal") alignmentState = "vertical";
  else alignmentState = "horizontal";

  const everyShip = Array.from(shipsContainer.children);
  everyShip.forEach((ship) => (ship.dataset.alignment = alignmentState));
});

const attackingPhase = () => {
  AIBoard.classList.add("active");
  renderPlayerShips();
  myGameHandler.players.AI.board.randomlyPlaceShips();
  AIBoard.addEventListener("mousedown", (e) => {
    if (myGameHandler.isGameOver() || myGameHandler.getTurn() === "ai") return;
    console.log(e.target);
    myGameHandler.startAttack(e);
    myGameHandler.canEndGame();
    console.log(myGameHandler.players.realPlayer.board.shipList);
  });
};

startBtn.addEventListener(
  "click",
  () => {
    if (myGameHandler.canStartGame()) {
      attackingPhase();
    }
  },
  { once: true }
);

shipsContainer.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("ship-length", e.target.dataset.length);
  e.dataTransfer.setData("ship-name", e.target.id);
  e.dataTransfer.setData("ship-alignment", e.target.dataset.alignment);
});

boardForPlacement.addEventListener("dragover", (e) => {
  if (
    e.target.id === "place-ship-board" ||
    e.target.classList.contains("anchored")
  )
    return;
  e.target.classList.add("dragover");
  e.preventDefault();
});

boardForPlacement.addEventListener("dragleave", (e) => {
  if (e.target.id === "place-ship-board") return;
  e.target.classList.remove("dragover");
  e.preventDefault();
});

const addAnchoredClass = (shipPlacement) => {
  shipPlacement.forEach((placement) => {
    const placementInDOM = boardForPlacement.querySelector(
      `[data-x="${placement[0]}"][data-y="${placement[1]}"]`
    );
    placementInDOM.classList.add("anchored");
  });
};

boardForPlacement.addEventListener("drop", (e) => {
  e.target.classList.remove("dragover");
  const objectData = {
    length: Number(e.dataTransfer.getData("ship-length")),
    name: e.dataTransfer.getData("ship-name"),
    alignment: e.dataTransfer.getData("ship-alignment"),
  };
  console.log(objectData);
  const chosenCoordinate = [
    Number(e.target.dataset.x),
    Number(e.target.dataset.y),
  ];
  const shipLocation = myGameHandler.anchorAShip(chosenCoordinate, objectData);
  if (shipLocation) {
    addAnchoredClass(shipLocation);
    document.querySelector(`#${objectData.name}`).classList.add("removed");
    console.log(myGameHandler.players.realPlayer.board.unavailableCoords);
  }
});

const classRemoval = (className, container = document) => {
  const elementsToClear = Array.from(
    container.querySelectorAll(`.${className}`)
  );
  elementsToClear.forEach((element) => element.classList.remove(className));
};

const resetBoard = () => {
  myGameHandler = gameHandler("test");
  classRemoval("anchored");
  classRemoval("removed", shipsContainer);
};

boardResetBtn.addEventListener("click", () => {
  resetBoard();
});

/* <!!!!!!!!!! Full Game Reset !!!!!!!!!!!> */

const startAttackingPhase = () => {
  AIBoard.classList.add("active");
  startBtn.addEventListener(
    "click",
    () => {
      console.log(myGameHandler.canStartGame());
      if (myGameHandler.canStartGame()) {
        attackingPhase();
      }
    },
    { once: true }
  );
};

gameResetBtn.addEventListener("click", () => {
  resetBoard();
  classRemoval("hit");
  classRemoval("missed");

  myGameHandler.players.AI.board.placeShip(4, "battleship", [
    [5, 2],
    [5, 3],
    [5, 4],
    [5, 5],
  ]);
  startAttackingPhase();
});
