import gameHandler from "../modules/gameHandler";

let myHandler;

describe("change turn", () => {
  beforeAll(() => {
    myHandler = gameHandler("realPlayer");
  });
  test("return realPlayer", () => {
    expect(myHandler.getTurn()).toBe("realPlayer");
  });

  test("changes to ai", () => {
    expect(myHandler.changeTurn()).toBe("ai");
    expect(myHandler.getTurn()).toBe("ai");

  });
});
