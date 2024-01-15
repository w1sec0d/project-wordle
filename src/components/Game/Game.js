import React, { useState } from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";

import GuessInput from "../GuessInput/GuessInput";
import GuessResults from "../GuessResults/GuessResults";
import WonBanner from "../WonBanner/WonBanner";
import LostBanner from "../LostBanner/LostBanner";
import Keyboard from "../Keyboard/Keyboard";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [previousGuesses, setPreviousGuesses] = useState(
    Array(NUM_OF_GUESSES_ALLOWED).fill(undefined)
  );
  const [previousGuessesChecked, setPreviousGuessesChecked] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameStatus, setGameStatus] = useState("running"); // Handles game status: running | won | lost

  // Handles the submission of a guess. Updating attempts, previousGuesses, and stopping the game if the user won or lost.
  function handleSubmitGuess(guess) {
    let nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (gameStatus === "running" && nextAttempts <= NUM_OF_GUESSES_ALLOWED) {
      // Update previousGuesses
      let newPreviousGuesses = [...previousGuesses];
      newPreviousGuesses[attempts] = guess;
      setPreviousGuesses(newPreviousGuesses);
      setPreviousGuessesChecked(
        newPreviousGuesses.map((guess) => checkGuess(guess, answer))
      );

      // Check if the guess is correct
      if (
        checkGuess(guess, answer).every(
          (checkedGuess) => checkedGuess.status === "correct"
        )
      ) {
        setGameStatus("won");
        return;
      }
    }

    if (gameStatus === "running" && nextAttempts === NUM_OF_GUESSES_ALLOWED) {
      setGameStatus("lost");
    }
  }

  return (
    <div className="row">
      <div className="col">
        <GuessResults
          previousGuesses={previousGuesses}
          previousGuessesChecked={previousGuessesChecked}
        />
      </div>
      <div className="col vertical">
        <GuessInput
          handleSubmitGuess={handleSubmitGuess}
          disabled={gameStatus === "won" || gameStatus === "lost"}
          autoFocus
        />
        <Keyboard previousGuessesChecked={previousGuessesChecked} />
        {gameStatus === "won" && <WonBanner attempts={attempts} />}
        {gameStatus === "lost" && <LostBanner answer={answer} />}
      </div>
    </div>
  );
}

export default Game;
