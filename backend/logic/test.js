export function test(guess, bridge) {
    guess = guess.toUpperCase();
    bridge = bridge.toUpperCase();
    console.log("Guess: " + guess);
    console.log("Answer: " + bridge);
  
    const result = [];
  
    // Ensure guess and WORD_TO_GUESS have the same length
    if (guess.length !== bridge.length) {
      throw new Error("Guess and WORD_TO_GUESS must have the same length");
    }
  
    for (let i = 0; i < bridge.length; i++) {
      const letter = guess[i];
      if (letter === bridge[i]) {
        result.push({ letter, color: "#6aaa64" }); // green
        console.log(letter + " är grön");
      } else if (bridge.includes(letter)) {
        result.push({ letter, color: "#c9b458" }); // yellow
        console.log(letter + " är gul");
      } else {
        result.push({ letter, color: "#787c7e" }); // gray
        console.log(letter + " är grå");
      }
    }


    return result;
}