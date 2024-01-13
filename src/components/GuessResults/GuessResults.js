import React from "react";
import Guess from "../Guess/Guess";

function GuessResults({ previousGuesses, checkGuess, answer }) {
  return (
    <div className="guess-results">
      {previousGuesses.map((guess, index) => (
        <Guess value={checkGuess(guess, answer)} key={index} />
      ))}
    </div>
  );
}

export default GuessResults;
