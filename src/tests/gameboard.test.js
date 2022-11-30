import Ship from "../modules/battleship-factory";
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
  beforeEach(() => {
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
