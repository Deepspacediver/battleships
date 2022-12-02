import Gameboard from "./gameboard";

const Player = (name) => {
  const getName = () => name;
  const board = Gameboard();

  const attack = (enemy, coordinate) => enemy.board.receiveAttack(coordinate);

  return { getName, board, attack };
};

export default Player;
