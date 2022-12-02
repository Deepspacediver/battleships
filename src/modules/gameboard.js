/* eslint-disable no-restricted-syntax */
import isEqual from "lodash.isequal";
import Ship from "./battleship-factory";

const Gameboard = () => {
  const board = Array.from({ length: 10 }, () => Array.from({ length: 10 }));
  const shipList = [];
  const missedShots = new Set();
  const placeShip = (length, name, coordinates) => {
    const shipObject = {
      ship: Ship(length, name),
      coordinates,
    };
    shipList.push(shipObject);
  };

  const receiveAttack = (coordinate) => {
    const indexOfShip = seeIfOnBoard(coordinate);
    if (indexOfShip !== undefined) {
      const shipInList = shipList[indexOfShip];
      shipInList.ship.hit();
      if (shipInList.ship.isSunk())
        return {
          hit: true,
          sunk: true,
          name: shipInList.ship.getName(),
        };
      return {
        hit: true,
        sunk: false,
      };
    }
    missedShots.add(String(coordinate));
    return {
      hit: false,
      sunk: false,
    };
  };

  const seeIfOnBoard = (coordinate) => {
    let index = 0;
    for (const object of shipList) {
      if (object.coordinates.some((x) => isEqual(coordinate, x))) return index;
      index += 1;
    }
  };

  const areAllSunk = () => shipList.every((el) => el.ship.isSunk());

  return { board, shipList, placeShip, receiveAttack, missedShots, areAllSunk };
};

export default Gameboard;
