import Ship from "../modules/battleship-factory";

describe("ship methods", () => {
  let myShip;
  let shipDescription = {
    length: 3,
    name: "cruiser",
  };
  beforeEach(() => {
    myShip = Ship(shipDescription.length, shipDescription.name);
  });

  test("properply creates ship", () => {
    expect(myShip.getLength()).toBe(3);
    expect(myShip.getName()).toBe("cruiser");
  });

  test("ship's hit method increases by one", () => {
    myShip.hit();
    expect(myShip.getHitsTaken()).toBe(1);
    myShip.hit();
    myShip.hit();
    expect(myShip.getHitsTaken()).toBe(3);
  });

  test("isSunk calculates whether ship has NOT been sunk", () => {
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk()).toBe(false);
  });

  test("isSunk calculates whether ship has been sunk", () => {
    myShip.hit();
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk()).toBe(true);
  });
})