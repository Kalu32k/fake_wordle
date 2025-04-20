const colorMap = {
  green: "#6aaa64",
  yellow: "#c9b458",
  gray: "#787c7e",
};

function GuessGrid({ guesses }) {
  return (
    <div className="guess-grid">
      {guesses.map((result, rowIndex) => (
        <div key={rowIndex} className="guess-row">
          {result.map((item, colIndex) => (
            <div
              key={colIndex}
              className="guess-cell"
              style={{
                backgroundColor: item.color || "#787c7e",
              }}
            >
              {item.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GuessGrid;
