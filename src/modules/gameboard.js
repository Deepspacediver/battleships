import Ship from "./battleship-factory";

const Gameboard = () => {
  const board = Array.from({ length: 10 }, () => Array.from({ length: 10 }));
  const shipList = [];
  const placeShip = (length, name, coordinates) => {
    const shipObject = {
      ship: Ship(length, name),
      coordinates,
    };
    shipList.push(shipObject);
  };
  return { board, shipList, placeShip };
};

export default Gameboard;
