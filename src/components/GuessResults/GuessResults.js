import React from "react";
import Guess from "../Guess/Guess";
import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

function GuessResults({ previousGuessesChecked }) {
  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((previousGuessIndex) => (
        <Guess
          value={previousGuessesChecked[previousGuessIndex]}
          key={previousGuessIndex}
        />
      ))}
    </div>
  );
}

export default GuessResults;
