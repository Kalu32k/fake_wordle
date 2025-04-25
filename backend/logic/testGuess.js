export function testGuess(guess, bridge) {
    guess = guess.toUpperCase();
    bridge = bridge.toUpperCase();
    console.log("Guess: " + guess);
    console.log("Answer: " + bridge);
  
    const result = [];
  
  
    if (guess.length !== bridge.length) {
      throw new Error("Guess and answer must have the same length");
    }
  
    for (let i = 0; i < bridge.length; i++) {
      const letter = guess[i];
      if (letter === bridge[i]) {
        result.push({ letter, color: "#6aaa64" });
        console.log(letter + " is green");
      } else if (bridge.includes(letter)) {
        result.push({ letter, color: "#c9b458" });
        console.log(letter + " is yellow");
      } else {
        result.push({ letter, color: "#787c7e" });
        console.log(letter + " is grey");
      }
    }


    return result;
}