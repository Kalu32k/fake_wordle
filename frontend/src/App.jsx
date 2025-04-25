import { useState } from "react";
import "./App.css";
import GuessInput from "./components/GuessInput.jsx";
import GuessGrid from "./components/GuessGrid.jsx";

function App() {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [wordLength, setWordLength] = useState(5);
  const [allowRepeatingLetters, setAllowRepeatingLetters] = useState(false);
  const [isHighscoreSubmitted, setIsHighscoreSubmitted] = useState(false);
  const handleGuessSubmit = async (guess) => {
    if (isGameOver) {
      alert("Game is already over!");
      return;
    }

    const response = await fetch("/api/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess }),
    });

    const data = await response.json();
    if (data.result) {
      console.log(data.result);
      setGuesses([...guesses, data.result]);
      let numberGuesses = guesses.length + 1;
      // Checks to see if all letters come back green.
      const allGreen = data.result.every((item) => item.color === "#6aaa64");
      if (allGreen) {
        setIsGameOver(true);

        const endTime = Date.now();
        const timeTaken = Math.floor((endTime - startTime) / 1000);
        setElapsedTime(timeTaken);
      }
    }
  };

  const saveHighscore = async (name, time, numberGuesses, allowRepeatingLetters) => {
    try {
      console.log("Saving highscore:", name, time, numberGuesses, allowRepeatingLetters);
      const response = await fetch("/api/highscore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          time,
          date: new Date().toISOString(),
          numberGuesses,
          allowRepeatingLetters,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Highscores:", data.highscores);
      } else {
        alert("Could not save to highscore " + data.error);
      }
    } catch (error) {
      console.error("Error saving highscore:", error);
      alert("an error occurred while saving the highscore.");
    }
  };

  const handleStartGame = async () => {
    try {
      console.log("Word length:", wordLength);

      const response = await fetch("/api/random", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wordLength, allowRepeatingLetters }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Target word ${data}`);

        setIsGameStarted(true);
        setIsGameOver(false);
        setGuesses([]);
        setStartTime(Date.now());
        setElapsedTime(null);
        setPlayerName("");
      } else {
        const errorData = await response.json();
        alert("Could not start the game: " + errorData.error);
      }
    } catch (error) {
      console.error("Error starting game:", error);
      alert("Error starting game:");
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (isHighscoreSubmitted) {
      alert("Highscore has already been submitted!");
      return;
    }

    if (playerName.trim()) {
      const numberGuesses = guesses.length;
      saveHighscore(playerName, elapsedTime, numberGuesses, allowRepeatingLetters);
      setIsHighscoreSubmitted(true);
    } else {
      alert("Enter a valid name!");
    }
  };

  return (

    <main className="App">
      {!isGameStarted ? (
        <div className="container">
          <h1 className="app__header">Fake Wordle</h1>
          <label className="dropdown-label">
            Select word length:
            <select
              value={wordLength}
              onChange={(e) => setWordLength(Number(e.target.value))}
            >
              {[3, 4, 5, 6, 7, 8, 9, 10].map((length) => (
                <option key={length} value={length}>
                  {length}
                </option>
              ))}
            </select>
          </label>
          <label className="checkbox-label">
            Allow repeating letters:
            <input
              type="checkbox"
              checked={allowRepeatingLetters}
              onChange={(e) => setAllowRepeatingLetters(e.target.checked)}
            />
          </label>
          <button className="play-button" onClick={handleStartGame}>
            Play
          </button>
        </div>
      ) : (
        <div className="container">
          <h1 className="app__header">Fake Wordle</h1>
          {!isGameOver && <p>Guess the word!</p>}
          {isGameOver && (
            <div>
              <p>Guess is correct! You finished in {elapsedTime} seconds!</p>
              <form onSubmit={handleNameSubmit}>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                />
                <button
                  type="submit"
                  className="button"
                  disabled={isHighscoreSubmitted}
                >
                  {isHighscoreSubmitted ? "Submitted" : "Save Highscore"}
                </button>
              </form>
            </div>
          )}
          {!isGameOver && (
            <GuessInput
              onSubmit={handleGuessSubmit}
              guess={guess}
              setGuess={setGuess}
              wordLength={wordLength} // Pass the chosen word length as a prop
            />
          )}
          <GuessGrid guesses={guesses} />
        </div>
      )}
    </main>
  );
}

export default App;
