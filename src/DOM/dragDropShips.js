const ships = document.querySelectorAll(".ship");

const generateShipBlocks = () => {
  Array.from(ships).forEach((ship) => {
    const shipLength = Number(ship.dataset.length);
    ship.setAttribute("draggable", "true");
    ship.dataset.alignment = "horizontal";
    for (let i = 0; i < shipLength; i += 1) {
      const shipBlock = document.createElement("div");
      shipBlock.classList.add("block");
      ship.appendChild(shipBlock);
    }
  });
};
generateShipBlocks();
