/* eslint-disable no-restricted-syntax */
import isEqual from "lodash.isequal";
import possibleAttacks, { myNew2D } from "../gameHelpers/AI-possible-attacks";
import Ship from "./battleship-factory";
import { illegalVariants, shipArray } from "../gameHelpers/placement-helpers";

const Gameboard = () => {
  const board = [...possibleAttacks];
  const shipList = [];
  const missedShots = new Set();
  const unavailableCoords = new Set();

  const isInAnArray = (array, element) =>
    array.some((el) => isEqual(el, element));

  const generateIllegalMoves = (
    coordinates,
    illegalPossibilites = illegalVariants,
    illegalSet = unavailableCoords
  ) => {
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
  };

  const isInIllegalCoords = (
    shipPlacement,
    illegalMoves = unavailableCoords
  ) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const placement of shipPlacement) {
      if (illegalMoves.has(String(placement))) return true;
    }
    return false;
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

  // AI random ship placement
  const getRandomIndex = (indexArray) =>
    indexArray.splice(Math.floor(Math.random() * indexArray.length), 1);

  const getRandomAlignment = (alignments = ["horizontal", "vertical"]) =>
    alignments[Math.floor(Math.random() * 2)];

  const getRandomShipHelper = (shipCollectionHelper) =>
    shipCollectionHelper[getRandomIndex()];

  const initialBoardSquare = (shipLength, alignment) => {
    // Prevent from going out of bounds
    let initialBoardSquare;
    while (
      initialBoardSquare === undefined ||
      unavailableCoords.has(String(initialBoardSquare))
    ) {
      if (alignment === "horizontal") {
        const horizontalCoord =
          board[Math.floor(Math.random() * (board.length - shipLength))];
        if (horizontalCoord[1] + shipLength <= 10)
          initialBoardSquare = horizontalCoord;
      } else {
        const horizontalCoord =
          board[Math.floor(Math.random() * ((shipLength + 1) * 10))];
        if (horizontalCoord[0] + shipLength <= 10)
          initialBoardSquare = horizontalCoord;
      }
    }
    return initialBoardSquare;
  };

  const getRandomPlacement = (shipLength) => {
    const placement = [];
    while (placement.length <= 1) {
      const alignment = getRandomAlignment();
      const initialCoord = initialBoardSquare(shipLength, alignment);
      placement.push(initialCoord);
      for (let index = 1; index < shipLength; index++) {
        const lastItem = placement[placement.length - 1];
        if (alignment === "horizontal")
          placement.push([lastItem[0], lastItem[1] + 1]);
        else placement.push([lastItem[0] + 1, lastItem[1]]);
      }
      if (isInIllegalCoords(placement)) placement.splice(0);
    }
    generateIllegalMoves(placement);
    return placement;
  };
    const randomlyPlaceShip = () => {
      const indexArray = [0, 1, 2, 3, 4];
      const randomIndex = getRandomIndex(indexArray);
      const randomShipHelper = shipArray[randomIndex];
      placeShip(4, "battleship", [
        [5, 2],
        [5, 3],
        [5, 4],
        [5, 5],
      ]);
    };
  return {
    shipList,
    placeShip,
    receiveAttack,
    missedShots,
    areAllSunk,
    unavailableCoords,
    isInIllegalCoords,
    randomlyPlaceShip,
  };
};

export default Gameboard;
