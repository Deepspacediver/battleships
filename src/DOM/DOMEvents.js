import gameHandler from "../modules/gameHandler";

const AIBoard = document.getElementById("ai-board");
const playerBoard = document.getElementById("player-board");
const boardForPlacement = document.getElementById("place-ship-board");
const shipsContainer = document.getElementById("ships-container");
const startBtn = document.querySelector("#start");
const boardResetBtn = document.querySelector("#board-reset");
const gameResetBtn = document.querySelector("#game-reset");
const alignmentBtn = document.querySelector("#alignment-btn");
const overlay = document.querySelector("#overlay");
const boardModal = document.querySelector("#board-creator");

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
  const everyShip = Array.from(shipsContainer.children);
  if (alignmentState === "horizontal") {
    alignmentState = "vertical";
    everyShip.forEach((ship) => {
      ship.dataset.alignment = alignmentState;
      ship.classList.add("vertical");
    });
  } else {
    everyShip.forEach((ship) => {
      alignmentState = "horizontal";
      ship.dataset.alignment = alignmentState;
      ship.classList.remove("vertical");
    });
  }
});

const canEndGame = () => {
  // Implement modal to pop up instead of alter
  if (myGameHandler.isGameOver()) {
    if (myGameHandler.players.AI.board.areAllSunk()) alert("You have won");
    else alert("AI has won won");
  }
};

const attackingPhase = () => {
  boardModal.classList.remove("active");
  overlay.classList.remove("active");
  AIBoard.classList.add("active");
  renderPlayerShips();
  myGameHandler.players.AI.board.randomlyPlaceShips();
  AIBoard.addEventListener("mousedown", (e) => {
    if (
      myGameHandler.isGameOver() ||
      myGameHandler.getTurn() === "ai" ||
      !e.target.classList.contains("square")
    )
      return;
    console.log(e.target);
    myGameHandler.startAttack(e);
    myGameHandler.canEndGame();
    console.log(myGameHandler.players.realPlayer.board.shipList);
  });
};

startBtn.addEventListener(
  // If clicked before playable, prevents from furthr playing
  "click",
  () => {
    if (myGameHandler.canStartGame()) {
      attackingPhase();
    }
  }
);

shipsContainer.addEventListener("dragstart", (e) => {
  console.log(e);
  if (e.target.classList.contains("ship")) {
    e.dataTransfer.setData("ship-length", e.target.dataset.length);
    e.dataTransfer.setData("ship-name", e.target.id);
    e.dataTransfer.setData("ship-alignment", e.target.dataset.alignment);
  }
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

/* <!!!!!!!!!! Game Reset !!!!!!!!!!!> */
const resetBoard = () => {
  myGameHandler = gameHandler("test");
  classRemoval("anchored");
  classRemoval("removed", shipsContainer);
};

boardResetBtn.addEventListener("click", () => {
  resetBoard();
});

gameResetBtn.addEventListener("click", () => {
  resetBoard();
  classRemoval("hit");
  classRemoval("missed");
});
