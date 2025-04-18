import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [allowReapeatingLetters, setAllowReapeatingLetters] = useState(false);

  return (
    <main className="App">
      <div className="container">
        <h1 className="App__Header">Fake wordle</h1>
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
          <input type="checkbox" checked={allowReapeatingLetters} onChange={'placeholder'} />
          <button className="play__button" >Play</button>
        </label>
      </div>
    </main>
  );
}

export default App;
