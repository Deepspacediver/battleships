import Player from "../modules/player-factory";

let player1;
let player2;

describe("player1 methods", () => {
  beforeEach(() => {
    player1 = Player("Commander");
    player2 = Player("Captain");
  });

  test("creates player", () => {
    expect(player1.getName()).toBe("Commander");
  });

  test("player1 attacks player2", () => {
    player2.board.placeShip(3,"submarine", [[5,1],[5,2],[5,3]])
    player1.attack(player2, [5,2])
    expect(player2.board.shipList[0].ship.getHitsTaken()).toBe(1);
  });

  test("player1 sinks player2's ship", () => {
    player2.board.placeShip(3,"submarine", [[5,1],[5,2],[5,3]])
    player1.attack(player2, [5,1])
    player1.attack(player2, [5,2])
    player1.attack(player2, [5,3])
    expect(player2.board.shipList[0].ship.isSunk()).toBe(true);
  });
});
