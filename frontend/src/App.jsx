import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const handleGuessSubmit = async () => {};

function App() {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [wordLength, setWordLength] = useState(5);
  const [allowReapeatingLetters, setAllowReapeatingLetters] = useState(false);

  return (
    <main className="App">
      <div className="container">
        <h1 className="App__Header">Fake wordle</h1>
        <p>Guess the word!</p>

        <form onSubmit={handleGuessSubmit}></form>

        <label>
          Select word length:
          <select>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </label>
        <label>
          Allow repeating letters:
          <input
            type="checkbox"
            checked={allowReapeatingLetters}
            onChange={"placeholder"}
          />
        </label>
      </div>
      <button className="play__button">Play</button>
    </main>
  );
}

export default App;
