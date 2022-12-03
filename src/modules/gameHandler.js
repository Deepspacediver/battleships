import Player from "./player-factory";

const gameHandler = (name) => {
 
  let playerTurn = "realPlayer";
  const players = {
    realPlayer: Player(name),
    playerAI: Player("AI"),
  };

  const getTurn = () => playerTurn;
  const changeTurn = () => {
    if (playerTurn === "realPlayer") playerTurn = "ai";
    else playerTurn = "realPlayer";
    return playerTurn;
  };

  return {
    getTurn,
    playerTurn,
    changeTurn,
  };
};

export default gameHandler;