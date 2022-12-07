import possibleAttacks from "../gameHelpers/AI-possible-attacks";

const playerBoard = document.getElementById("player-board");
const AIBoard = document.getElementById("ai-board");
const boardForPlacement = document.getElementById("place-ship-board");


const createBoards = (coordinates) => {
  coordinates.forEach((coordinate) => {
    const square = document.createElement("div");
    square.classList.add("square");
    square.dataset.x = coordinate[0];
    square.dataset.y = coordinate[1];
    playerBoard.appendChild(square);
    let squareClone1 = square.cloneNode();
    AIBoard.appendChild(squareClone1); 
    let squareClone2 = square.cloneNode();
    boardForPlacement.appendChild(squareClone2);

  });
};

createBoards(possibleAttacks);

/*
 */
