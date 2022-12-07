import isEqual from "lodash.isequal";
import Player from "./player-factory";
import possibleAttacks, {
  getValidAttack,
} from "../gameHelpers/AI-possible-attacks";
import { illegalVariants } from "../gameHelpers/placement-helpers";

const playerBoardDOM = document.getElementById("player-board");
const AIBoardDOM = document.getElementById("ai-board");
const resultDisplay = document.getElementById("display");

const gameHandler = (playerName) => {
  let playerTurn = "realPlayer";
  const players = {
    realPlayer: Player(playerName),
    AI: Player("AI"),
  };

  // Ship placement
  /* let illegalShipPlacements = new Set(); */

  // Check if y axis is out of bound

  const isOutOfBounds = (coordinate, shipLength, alignment = "horizontal") =>
    alignment === "horizontal"
      ? coordinate[1] + shipLength > 10
      : coordinate[0] + shipLength > 10;

  const generatePlacement = (
    coordinate,
    shipLength,
    alignment = "horizontal"
  ) => {
    const shipPlacement = [];
    for (let i = 0; i < shipLength; i++) {
      if (alignment === "horizontal")
        shipPlacement.push([coordinate[0], coordinate[1] + i]);
      else shipPlacement.push([coordinate[0] + i, coordinate[1]]);
    }
    return shipPlacement;
  };
  /* 
  const isInAnArray = (array, element) =>
    array.some((el) => isEqual(el, element)); */

  const isInIllegalCoords = (shipPlacement, illegalMoves) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const placement of shipPlacement) {
      if (illegalMoves.has(String(placement))) return true;
    }
    return false;
  };

  const isShipPlaced = (name, shipList) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const shipObject of shipList) {
      if (shipObject.ship.getName() === name) return true;
    }
    return false;
  };

  const anchorAShip = (chosenCoordinate, shipData) => {
    if (isOutOfBounds(chosenCoordinate, shipData.length, shipData.alignment)) return;
    const shipPlacement = generatePlacement(chosenCoordinate, shipData.length, shipData.alignment);
    const playerBoard = players.realPlayer.board;
    if (
      isShipPlaced(shipData.name, playerBoard.shipList) ||
      isInIllegalCoords(shipPlacement, playerBoard.unavailableCoords)
    )
      return;

    playerBoard.placeShip(shipData.length, shipData.name, shipPlacement);
    console.log(playerBoard.shipList);
    return shipPlacement;
  };

  const canStartGame = () =>
    players.realPlayer.board.shipList.length === 5; /*  &&
    players.AI.board.shipList.length === 5; */

  // Game loop
  const AIPossibleAttacks = possibleAttacks;
  const getTurn = () => playerTurn;
  const changeTurn = () => {
    if (playerTurn === "realPlayer") playerTurn = "ai";
    else playerTurn = "realPlayer";
    return playerTurn;
  };

  const convertToCoordinate = (target) => [
    Number(target.dataset.x),
    Number(target.dataset.y),
  ];

  const displayAttackResult = ({ hit, sunk, name }, turn) => {
    const whoseTurn = turn;
    console.log("?", whoseTurn);
    if (whoseTurn === "realPlayer") {
      if (hit === false) resultDisplay.textContent = "Your shot missed";
      else if (hit === true && sunk === false)
        resultDisplay.textContent = "Your shot was a hit!";
      else if (hit === true && sunk === true)
        resultDisplay.textContent = `You sunk enemy's ${name}!`;
    } else if (whoseTurn === "ai") {
      if (hit === false) resultDisplay.textContent = "Computer's shot missed";
      else if (hit === true && sunk === false)
        resultDisplay.textContent = "Computer hit one of your ships!";
      else resultDisplay.textContent = `Computer sunk your ${name}!`;
    }
  };

  const markSquare = (coordinate, { hit }, turn) => {
    let target;
    if (turn === "realPlayer") {
      target = AIBoardDOM.querySelector(
        `.square[data-x="${coordinate[0]}"][data-y="${coordinate[1]}"]`
      );
    } else if (turn === "ai") {
      target = playerBoardDOM.querySelector(
        `.square[data-x="${coordinate[0]}"][data-y="${coordinate[1]}"]`
      );
    }

    if (hit === true) target.classList.add("hit");
    else target.classList.add("missed");
  };

  const playerMove = (event) => {
    AIBoardDOM.classList.remove("active");
    const playerTarget = convertToCoordinate(event.target);
    const playerAttack = players.realPlayer.attack(players.AI, playerTarget);
    displayAttackResult(playerAttack, getTurn());
    markSquare(playerTarget, playerAttack, getTurn());
    changeTurn();
  };

  const AIMove = () => {
    if (players.AI.board.areAllSunk()) return;
    const AITarget = getValidAttack(AIPossibleAttacks);
    const AIAttack = players.AI.attack(players.realPlayer, AITarget);

    setTimeout(() => {
      markSquare(AITarget, AIAttack, getTurn());
    }, 500);

    setTimeout(() => {
      displayAttackResult(AIAttack, getTurn());
    }, 700);

    setTimeout(() => {
      changeTurn();
      AIBoardDOM.classList.add("active");
    }, 850);
  };

  const startAttack = (e) => {
    if (
      e.target.classList.contains("missed") ||
      e.target.classList.contains("hit") ||
      getTurn() === "ai" ||
      players.AI.board.areAllSunk() ||
      players.realPlayer.board.areAllSunk()
    )
      return;
    playerMove(e);
    AIMove();
  };

  const isGameOver = () =>
    players.AI.board.areAllSunk() || players.realPlayer.board.areAllSunk();

  const canEndGame = () => {
    // Implement modal to pop up instead of alter
    if (isGameOver()) {
      if (players.AI.board.areAllSunk()) alert("You have won");
      else alert("AI has won won");
    }
  };

  return {
    startAttack,
    players,
    anchorAShip,
    canStartGame,
    isOutOfBounds,
    canEndGame,
    isGameOver,
    getTurn,
  };
};

export default gameHandler;
