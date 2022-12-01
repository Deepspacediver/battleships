import Gameboard from "../modules/gameboard";

let myGameboard;
let shipDescription = {
  length: 3,
  name: "submarine",
};

describe("creates and places ship in the shipList", () => {
  beforeAll(() => {
    myGameboard = Gameboard();
    myGameboard.placeShip(shipDescription.length, shipDescription.name);
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
    myGameboard.placeShip(3, "destroyer");
    myGameboard.shipList[1].ship.hit();
    myGameboard.shipList[1].ship.hit();
    myGameboard.shipList[1].ship.hit();
    expect(myGameboard.shipList[1].ship.isSunk()).toBe(true);
  });

  test("array coordinate is undefined", () => {
    expect(myGameboard.shipList[0].coordinates).toBeUndefined();
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
  beforeEach(() => {
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
    myGameboard.receiveAttack([5, 3]);
    myGameboard.receiveAttack([5, 4]);
    myGameboard.receiveAttack([5, 5]);
    expect(myGameboard.shipList[2].ship.isSunk()).toBe(true);
  });

  test("receiveAttack returns shipObject if it was sunk", () => {
    myGameboard.receiveAttack([5, 2]);
    myGameboard.receiveAttack([5, 3]);
    expect(myGameboard.receiveAttack([5, 4])).toBeUndefined();
    expect(myGameboard.receiveAttack([5, 5])).not.toBeUndefined();

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
    myGameboard.shipList[0].ship.hit()
    myGameboard.shipList[0].ship.hit()
    myGameboard.shipList[1].ship.hit()
    myGameboard.shipList[1].ship.hit()
    myGameboard.shipList[2].ship.hit()
    myGameboard.shipList[2].ship.hit()

    expect(myGameboard.areAllSunk()).toBe(true)
  });

  test("returns false if only one ship is sunk", () => {
    myGameboard.shipList[0].ship.hit()
    myGameboard.shipList[0].ship.hit()
    expect(myGameboard.shipList[0].ship.isSunk()).toBe(true)
    expect(myGameboard.areAllSunk()).toBe(false)
  });

  
});
