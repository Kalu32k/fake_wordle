import { testGuess } from "../logic/testGuess";

describe("testGuess", () => {
  /* 
  #6aaa64 is green
  #c9b458 is yellow
  #787c7e is grey
  */

  it("should return correct colors for a correct guess", () => {
    const guess = "apple";
    const bridge = "apple";
    const expectedResult = [
      { letter: "A", color: "#6aaa64" },
      { letter: "P", color: "#6aaa64" },
      { letter: "P", color: "#6aaa64" },
      { letter: "L", color: "#6aaa64" },
      { letter: "E", color: "#6aaa64" },
    ];

    const result = testGuess(guess, bridge);
    expect(result).toEqual(expectedResult);
  });

  it("should return correct colors for a partially correct guess", () => {
    const guess = "elppa";
    const bridge = "apple";
    const expectedResult = [
      { letter: "E", color: "#c9b458" },
      { letter: "L", color: "#c9b458" },
      { letter: "P", color: "#6aaa64" },
      { letter: "P", color: "#c9b458" },
      { letter: "A", color: "#c9b458" },
    ];

    const result = testGuess(guess, bridge);
    expect(result).toEqual(expectedResult);
  });

  it("should return correct colors for a completely incorrect guess", () => {
    const guess = "figgy";
    const bridge = "apple";
    console.log(bridge, guess);
    const expectedResult = [
      { letter: "F", color: "#787c7e" },
      { letter: "I", color: "#787c7e" },
      { letter: "G", color: "#787c7e" },
      { letter: "G", color: "#787c7e" },
      { letter: "Y", color: "#787c7e" },
    ];

    const result = testGuess(guess, bridge);
    expect(result).toEqual(expectedResult);
  });
});
