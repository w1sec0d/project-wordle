import React from "react";
import Guess from "../Guess/Guess";
import { range } from "../../helpers/utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../../data/constants";

function GuessResults({ previousGuessesChecked }) {
  // Fixing glitchy behaviour of reordering the array
  let previousGuessesOrdered = previousGuessesChecked[0]
    ? previousGuessesChecked
    : [...previousGuessesChecked].reverse();

  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((previousGuessIndex) => (
        <Guess
          value={previousGuessesOrdered[previousGuessIndex]}
          key={previousGuessIndex}
        />
      ))}
    </div>
  );
}

export default GuessResults;
