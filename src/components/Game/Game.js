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
  // Check previousGuesses
  const [previousGuessesChecked, setPreviousGuessesChecked] = useState([]);
  const [attempts, setAttempts] = useState(0);
  // Sets game status: running | won | lost
  const [gameStatus, setGameStatus] = useState("running");

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
    <>
      <GuessResults
        previousGuesses={previousGuesses}
        previousGuessesChecked={previousGuessesChecked}
      />
      <GuessInput
        handleSubmitGuess={handleSubmitGuess}
        disabled={gameStatus === "won" || gameStatus === "lost"}
        autoFocus
      />
      <Keyboard previousGuessesChecked={previousGuessesChecked} />
      {gameStatus === "won" && <WonBanner attempts={attempts} />}
      {gameStatus === "lost" && <LostBanner answer={answer} />}
    </>
  );
}

export default Game;
