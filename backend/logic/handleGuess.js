export const handleGuess = () => {
    if (guess.length !== 5) return;
    setGuesses([...guesses, guess.toUpperCase()]);
    setGuess("");
  };