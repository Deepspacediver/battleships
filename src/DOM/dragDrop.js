import gameHandler from "../modules/gameHandler";

const boardForPlacement = document.getElementById("place-ship-board");
const shipsContainer = document.getElementById("ships-container");
const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const ships = document.querySelectorAll(".ship");

const generateShipBlocks = () => {
  Array.from(ships).forEach((ship) => {
    const shipLength = Number(ship.dataset.length);
    ship.setAttribute("draggable", "true");
    for (let i = 0; i < shipLength; i += 1) {
      const shipBlock = document.createElement("div");
      shipBlock.classList.add("block");
      ship.appendChild(shipBlock);
    }
  });
};
generateShipBlocks();

let myGameHandler = gameHandler("test");

startBtn.addEventListener("click", () => {
  console.log(myGameHandler.canStartGame());
});

resetBtn.addEventListener("click", () => {
  myGameHandler = gameHandler("test");

  classRemoval("anchored", boardForPlacement);
  classRemoval("removed", shipsContainer);
});

shipsContainer.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("ship-length", e.target.dataset.length);
  e.dataTransfer.setData("ship-name", e.target.id);
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

boardForPlacement.addEventListener("drop", (e) => {
  e.target.classList.remove("dragover");
  const objectData = {
    length: Number(e.dataTransfer.getData("ship-length")),
    name: e.dataTransfer.getData("ship-name"),
  };
  const chosenCoordinate = [
    Number(e.target.dataset.x),
    Number(e.target.dataset.y),
  ];
  const shipLocation = myGameHandler.anchorAShip(chosenCoordinate, objectData);
  if (shipLocation) {
    addAnchoredClass(shipLocation);
    document.querySelector(`#${objectData.name}`).classList.add("removed");
  }
});

const addAnchoredClass = (shipPlacement) => {
  shipPlacement.forEach((placement) => {
    const placementInDOM = boardForPlacement.querySelector(
      `[data-x="${placement[0]}"][data-y="${placement[1]}"]`
    );
    placementInDOM.classList.add("anchored");
  });
};

const classRemoval = (className, container = document) => {
  const elementsToClear = Array.from(
    container.querySelectorAll(`.${className}`)
  );
  elementsToClear.forEach((element) => element.classList.remove(className));
};
