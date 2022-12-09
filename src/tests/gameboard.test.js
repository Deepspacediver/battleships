/* import { illegalVariants } from "../gameHelpers/placement-helpers";
import possibleAttacks from "../gameHelpers/AI-possible-attacks";
 */ import Gameboard from "../modules/gameboard";

let myGameboard;
let shipDescription = {
  length: 3,
  name: "submarine",
};

describe("creates and places ship in the shipList", () => {
  beforeAll(() => {
    myGameboard = Gameboard();
    myGameboard.placeShip(shipDescription.length, shipDescription.name, [
      [1, 2],
      [1, 3],
      [1, 4],
    ]);
  });

  test("pushes object to shipList", () => {
    expect(myGameboard.shipList.length).toBe(1);
  });

  test("ship inside list is a ship object", () => {
    expect(myGameboard.shipList[0].ship).toHaveProperty("getName");
  });

  test("ship inside list is a submarine", () => {
    expect(myGameboard.shipList[0].ship.getName()).toBe("submarine");
  });

  test("stores multiple ships", () => {
    myGameboard.placeShip(3, "destroyer", [
      [1, 2],
      [1, 3],
      [1, 4],
    ]);
    myGameboard.shipList[1].ship.hit();
    myGameboard.shipList[1].ship.hit();
    myGameboard.shipList[1].ship.hit();
    expect(myGameboard.shipList[1].ship.isSunk()).toBe(true);
  });
});

describe("coordinations", () => {
  let shipCoordinates = [
    [1, 2],
    [1, 3],
    [1, 4],
  ];
  beforeAll(() => {
    myGameboard = Gameboard();
    myGameboard.placeShip(
      shipDescription.length,
      shipDescription.name,
      shipCoordinates
    );
  });

  test("creates ship property with coordinates when passed", () => {
    expect(myGameboard.shipList[0].coordinates).toEqual(
      expect.arrayContaining(shipCoordinates)
    );
  });

  test("array length is equal to ship's length", () => {
    const shipLength = myGameboard.shipList[0].ship.getLength();
    expect(myGameboard.shipList[0].coordinates.length).toStrictEqual(
      shipLength
    );
  });
});

describe("receiveAttack function", () => {
  beforeAll(() => {
    myGameboard = Gameboard();
    myGameboard.placeShip(2, "destroyer", [
      [1, 2],
      [1, 3],
    ]);
    myGameboard.placeShip(3, "submarine", [
      [3, 2],
      [3, 3],
      [3, 4],
    ]);
    myGameboard.placeShip(4, "battleship", [
      [5, 2],
      [5, 3],
      [5, 4],
      [5, 5],
    ]);
  });

  test("increases battleship's hitsTaken", () => {
    myGameboard.receiveAttack([5, 3]);
    expect(myGameboard.shipList[2].ship.getHitsTaken()).toBe(1);
  });

  test("sinks battleship", () => {
    myGameboard.receiveAttack([5, 2]);
    myGameboard.receiveAttack([5, 4]);
    myGameboard.receiveAttack([5, 5]);
    expect(myGameboard.shipList[2].ship.isSunk()).toBe(true);
  });

  test("returns hit:false sunk:false when missed", () => {
    const resultOfAttack = myGameboard.receiveAttack([9, 9]);
    expect(resultOfAttack.hit).toBe(false);
    expect(resultOfAttack.sunk).toBe(false);
  });

  test("returns hit:true sunk:false when player only hits the ship", () => {
    const resultOfAttack = myGameboard.receiveAttack([1, 2]);
    expect(resultOfAttack.hit).toBe(true);
    expect(resultOfAttack.sunk).toBe(false);
  });

  test("returns hit:true sunk:true and shipName when ship is sunk", () => {
    myGameboard.receiveAttack([3, 2]);
    myGameboard.receiveAttack([3, 3]);
    const resultOfAttack = myGameboard.receiveAttack([3, 4]);
    expect(resultOfAttack.hit).toBe(true);
    expect(resultOfAttack.sunk).toBe(true);
    expect(resultOfAttack.name).toBe("submarine");
  });

  test("adds missed shots to a set", () => {
    myGameboard.receiveAttack([9, 9]);
    expect(myGameboard.missedShots.has(String([9, 9]))).toBe(true);
  });
});

describe("areAllSunk testing", () => {
  beforeEach(() => {
    myGameboard = Gameboard();
    myGameboard.placeShip(2, "destroyer", [
      [1, 2],
      [1, 3],
    ]);
    myGameboard.placeShip(2, "destroyer2", [
      [3, 2],
      [3, 3],
    ]);
    myGameboard.placeShip(2, "destroyer3", [
      [5, 2],
      [5, 3],
    ]);
  });
  test("returns true if all ships are sunk", () => {
    myGameboard.shipList[0].ship.hit();
    myGameboard.shipList[0].ship.hit();
    myGameboard.shipList[1].ship.hit();
    myGameboard.shipList[1].ship.hit();
    myGameboard.shipList[2].ship.hit();
    myGameboard.shipList[2].ship.hit();

    expect(myGameboard.areAllSunk()).toBe(true);
  });

  test("returns false if only one ship is sunk", () => {
    myGameboard.shipList[0].ship.hit();
    myGameboard.shipList[0].ship.hit();
    expect(myGameboard.shipList[0].ship.isSunk()).toBe(true);
    expect(myGameboard.areAllSunk()).toBe(false);
  });
});

describe("isInIllegalCords", () => {
  beforeAll(() => {
    myGameboard = Gameboard();
    myGameboard.placeShip(2, "destroyer", [
      [5, 2],
      [5, 3],
    ]);
  });
  test("returns true when set has at least one specified cords", () => {
    expect(
      myGameboard.isInIllegalCoords([
        [0, 0],
        [0, 1],
        [5, 2],
      ])
    ).toBe(true);
  });

  test("returns false when coords are available", () => {
    expect(
      myGameboard.isInIllegalCoords([
        [9, 4],
        [9, 5],
        [9, 6],
      ])
    ).toBe(false);
  });
});

describe("random ship placement", () => {
  beforeAll(() => {
    myGameboard = Gameboard();
    myGameboard.randomlyPlaceShips();
  });
  test("places 5 ships in shiplist", () => {
    expect(myGameboard.shipList.length).toBe(5);
  });
  test("randomly generated ships return appropriate name", () => {
    expect([
      "destroyer",
      "submarine",
      "cruiser",
      "battleship",
      "carrier",
    ]).toContain(myGameboard.shipList[2].ship.getName());
  });
});
