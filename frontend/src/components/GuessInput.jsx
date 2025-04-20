import React from "react";

function GuessInput({ onSubmit, guess, setGuess, wordLength }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (guess.trim().length === wordLength) {
        onSubmit(guess);
        setGuess("");
      } else {
        alert(`The guess must be ${wordLength} letters long!`);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        className="input"
        value={guess}
        onChange={(e) => setGuess(e.target.value.toUpperCase())}
        onKeyDown={handleKeyDown}
        maxLength={wordLength} 
        placeholder={`Enter guess (${wordLength} letters)`}
      />
      <button
        className="button"
        onClick={() => {
          if (guess.trim().length === wordLength) {
            onSubmit(guess);
            setGuess("");
          } else {
            alert(`The guess must be ${wordLength} letters long!`);
          }
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default GuessInput;