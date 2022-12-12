/* eslint-disable no-restricted-syntax */
import isEqual from "lodash.isequal";
import possibleAttacks from "../gameHelpers/AI-possible-attacks";
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
          coords: shipInList.coordinates,
        };
      return {
        hit: true,
        sunk: false,
        coords: null,
      };
    }
    missedShots.add(String(coordinate));
    return {
      hit: false,
      sunk: false,
      coords: null,
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

  const getInitialBoardSquare = (shipLength, alignment) => {
    let initialBoardSquare;
    while (
      initialBoardSquare === undefined ||
      unavailableCoords.has(String(initialBoardSquare))
    ) {
      if (alignment === "horizontal") {
        const horizontalCoord =
          board[Math.floor(Math.random() * (board.length - shipLength))];

        // Prevent from going out of bounds on y axis
        if (horizontalCoord[1] + shipLength <= 10)
          initialBoardSquare = horizontalCoord;
      } else {
        const horizontalCoord =
          board[Math.floor(Math.random() * ((shipLength + 1) * 10))];

        // Prevent from going out of bounds on x axis
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
      const initialCoord = getInitialBoardSquare(shipLength, alignment);
      placement.push(initialCoord);

      for (let i = 1; i < shipLength; i++) {
        // const lastItem = placement[placement.length - 1];
        if (alignment === "horizontal")
          placement.push([initialCoord[0], initialCoord[1] + i]);
        else placement.push([initialCoord[0] + i, initialCoord[1]]);
      }
      if (isInIllegalCoords(placement)) placement.splice(0);
    }

    generateIllegalMoves(placement);
    return placement;
  };
  const randomlyPlaceShips = () => {
    const indexArray = [0, 1, 2, 3, 4];
    while (indexArray.length) {
      const randomIndex = getRandomIndex(indexArray);
      const shipHelper = shipArray[randomIndex];
      const shipPlacement = getRandomPlacement(shipHelper.length);
      placeShip(shipHelper.length, shipHelper.name, shipPlacement);
    }
  };
  return {
    shipList,
    placeShip,
    receiveAttack,
    missedShots,
    areAllSunk,
    unavailableCoords,
    isInIllegalCoords,
    randomlyPlaceShips,
  };
};

export default Gameboard;
