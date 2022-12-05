import Player from "./player-factory";
import possibleAttacks, {
  getValidAttack,
} from "../gameHelpers/AI-possible-attacks";
import isEqual from "lodash.isequal";

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
  let illegalShipPlacements = [];

  // Check if y axis is out of bounds
  const isOutOfBounds = (coordinate, shipLength) =>
    coordinate[1] + shipLength > 10;

  const generatePlacement = (coordinate, shipLength) => {
    const shipPlacement = [];
    for (let i = 0; i < shipLength; i++) {
      shipPlacement.push([coordinate[0], coordinate[1] + i]);
    }
    return shipPlacement;
  };

  const illegalVariants = [
    [0, -1],
    [-1, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [0, 1],
    [-1, +1],
    [1, 1],
  ];

  const isInAnArray = (array, element) =>
    array.some((el) => isEqual(el, element));

  const isInIllegalMoves = (shipPlacement, illegalMoves) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const placement of shipPlacement) {
      if (illegalMoves.some((el) => isEqual(el, placement))) return true;
    }
    return false;
  };

  const generateIllegalMoves = (coordinates, illegalPossibilites) => {
    const illegalMoves = [];
    console.log(coordinates);
    coordinates.forEach((coord) => {
      for (let i = 0; i < illegalPossibilites.length; i++) {
        const illegalVariant = illegalPossibilites[i];
        const illegalMove = [
          coord[0] + illegalVariant[0],
          coord[1] + illegalVariant[1],
        ];
        if (
          illegalMove[0] >= 0 &&
          illegalMove[0] <= 9 &&
          illegalMove[1] >= 0 &&
          illegalMove[1] <= 9 &&
          isInAnArray(coordinates, illegalMove) === false
        )
          illegalMoves.push(illegalMove);
      }
    });
    return illegalMoves.concat(coordinates);
  };

  const anchorAShip = (chosenCoordinate, shipData) => {
    if (isOutOfBounds(chosenCoordinate, shipData.length)) return;
    const shipPlacement = generatePlacement(chosenCoordinate, shipData.length);
    if (isInIllegalMoves(shipPlacement, illegalShipPlacements)) return;

    players.realPlayer.board.placeShip(
      shipData.length,
      shipData.name,
      shipPlacement
    );
    const illegalMoves = generateIllegalMoves(shipPlacement, illegalVariants);
    illegalShipPlacements = illegalShipPlacements.concat(illegalMoves);
    return shipPlacement;
  };

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
    endGame();
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
      endGame();
    }, 700);

    setTimeout(() => {
      changeTurn();
      AIBoardDOM.classList.add("active");
    }, 850);
  };

  const intializeAttack = (e) => {
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

  const isGameOver = (turn) =>
    turn === "realPlayer"
      ? players.AI.board.areAllSunk()
      : players.realPlayer.board.areAllSunk();

  const endGame = () => {
    // Implement modal to pop up instead of alter
    if (isGameOver(getTurn())) {
      alert(`${getTurn()} has won!`);
    }
  };

  return {
    intializeAttack,
    players,
    anchorAShip,
  };
};

export default gameHandler;
