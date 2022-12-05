import gameHandler from "../modules/gameHandler";

const boardForPlacement = document.getElementById("place-ship-board");
const shipsContainer = document.getElementById("ships-container");

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

const myGameHandler = gameHandler("test");

boardForPlacement.addEventListener("dragover", (e) => {
  if (e.target.id === "place-ship-board") return;
  e.target.style.backgroundColor = "purple";
  e.preventDefault();
});
boardForPlacement.addEventListener("dragleave", (e) => {
  if (e.target.id === "place-ship-board") return;
  e.target.style.backgroundColor = "white";
  e.preventDefault();
});

boardForPlacement.addEventListener("drop", (e) => {
  const objectData = {
    length: Number(e.dataTransfer.getData("ship-length")),
    name: e.dataTransfer.getData("ship-name"),
  };
  const chosenCoordinate = [
    Number(e.target.dataset.x),
    Number(e.target.dataset.y),
  ];
  myGameHandler.anchorAShip(chosenCoordinate, objectData);
});

shipsContainer.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("ship-length", e.target.dataset.length);
  e.dataTransfer.setData("ship-name", e.target.id);
  console.log(e.dataTransfer);
});
