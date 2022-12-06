/* eslint-disable no-restricted-syntax */
import isEqual from "lodash.isequal";
import Ship from "./battleship-factory";
import { illegalVariants } from "../gameHelpers/placement-helpers";

const Gameboard = () => {
  const board = Array.from({ length: 10 }, () => Array.from({ length: 10 }));
  const shipList = [];
  const missedShots = new Set();
  const unavailableCoords = new Set();

  const isInAnArray = (array, element) =>
    array.some((el) => isEqual(el, element));

  const generateIllegalMoves = (
    coordinates,
    illegalPossibilites,
    illegalSet
  ) => {
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
          illegalSet.add(String(illegalMove));
      }
      illegalSet.add(String(coord));
    });
    console.log(illegalSet)

  };

  const placeShip = (length, name, coordinates) => {
    const shipObject = {
      ship: Ship(length, name),
      coordinates,
    };
    shipList.push(shipObject);
    generateIllegalMoves(coordinates, illegalVariants, unavailableCoords);
  };

  const receiveAttack = (coordinate) => {
    const indexOfShip = checkHit(coordinate);
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
        name: null,
      };
    }
    missedShots.add(String(coordinate));
    return {
      hit: false,
      sunk: false,
      name: null,
    };
  };

  const checkHit = (coordinate) => {
    let index = 0;
    for (const object of shipList) {
      if (object.coordinates.some((x) => isEqual(coordinate, x))) return index;
      index += 1;
    }
  };

  const areAllSunk = () => shipList.every((el) => el.ship.isSunk());

  return {
    board,
    shipList,
    placeShip,
    receiveAttack,
    missedShots,
    areAllSunk,
    unavailableCoords,
  };
};

export default Gameboard;
