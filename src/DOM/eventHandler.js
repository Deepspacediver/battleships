import gameHandler from "../modules/gameHandler";

const AIBoard = document.getElementById("ai-board");

// Template of a game
let myGameHandler = gameHandler();
myGameHandler.players.AI.board.placeShip(2, "destroyer", [
  [1, 2],
  [1, 3],
]);
myGameHandler.players.AI.board.placeShip(3, "submarine", [
  [3, 2],
  [3, 3],
  [3, 4],
]);
myGameHandler.players.AI.board.placeShip(4, "battleship", [
  [5, 2],
  [5, 3],
  [5, 4],
  [5, 5],
]);
myGameHandler.players.realPlayer.board.placeShip(2, "destroyer", [
  [2, 2],
  [2, 3],
]);
myGameHandler.players.realPlayer.board.placeShip(3, "submarine", [
  [4, 2],
  [4, 3],
  [4, 4],
]);
myGameHandler.players.realPlayer.board.placeShip(4, "battleship", [
  [6, 2],
  [6, 3],
  [6, 4],
  [6, 5],
]);

AIBoard.addEventListener('mousedown', (e) => {
  myGameHandler.intializeAttack(e);
})


