import Player from "./player-factory";
import possibleAttacks, {
  getValidAttack,
} from "../gameHelpers/AI-possible-attacks";

const playerBoardDOM = document.getElementById("player-board");
const AIBoardDOM = document.getElementById("ai-board");
const resultDisplay = document.getElementById("display");

const gameHandler = (playerName) => {
  let playerTurn = "realPlayer";
  const players = {
    realPlayer: Player(playerName),
    AI: Player("AI"),
  };
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
  };
};

export default gameHandler;
