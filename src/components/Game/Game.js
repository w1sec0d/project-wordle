import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";

import GuessInput from "../GuessInput/GuessInput";
import GuessResults from "../GuessResults/GuessResults";
import Keyboard from "../Keyboard/Keyboard";

function Game({ swalInstructions }) {
  const [guess, setGuess] = useState(""); // The current guess
  const [answer, setAnswer] = useState(sample(WORDS));
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
        swalWonAlert(nextAttempts);
        return;
      }
    }

    if (gameStatus === "running" && nextAttempts === NUM_OF_GUESSES_ALLOWED) {
      setGameStatus("lost");
      swalLostAlert(answer);
    } else if (
      (gameStatus === "won" || gameStatus === "lost") &&
      nextAttempts > NUM_OF_GUESSES_ALLOWED
    ) {
      restartGame();
    }
  }

  function restartGame() {
    setPreviousGuesses(Array(NUM_OF_GUESSES_ALLOWED).fill(undefined));
    setPreviousGuessesChecked([]);
    setAttempts(0);
    setGameStatus("running");
    setAnswer(sample(WORDS));
  }

  function swalWonAlert(attempts) {
    Swal.fire({
      title: "You won!",
      html: `
          <p>
            <strong>Congratulations!</strong> Got it in
            <strong>
              ${" " + attempts} guess${attempts > 1 ? "es" : ""}
            </strong>
          </p>
        `,
      icon: "success",
      toast: true,
      position: "top-end",
      showCloseButton: true,
      confirmButtonText: "Restart Game",
      confirmButtonColor: "#998000",
    }).then((result) => {
      if (result.isConfirmed) {
        restartGame();
      }
    });
  }

  function swalLostAlert(answer) {
    Swal.fire({
      title: "You lost :(",
      html: `
          <p>
            The correct answer is <strong>${answer}</strong>
          </p>
        `,
      icon: "error",
      toast: true,
      position: "top-end",
      showCloseButton: true,
      confirmButtonText: "Restart Game",
      confirmButtonColor: "#998000",
    }).then((result) => {
      if (result.isConfirmed) {
        restartGame();
      }
    });
  }

  useEffect(() => {
    swalInstructions();
  }, [swalInstructions]);

  return (
    <>
      <GuessResults previousGuessesChecked={previousGuessesChecked} />
      <div className="input-wrapper">
        <GuessInput
          handleSubmitGuess={handleSubmitGuess}
          disabled={gameStatus === "won" || gameStatus === "lost"}
          guess={guess}
          setGuess={setGuess}
          gameStatus={gameStatus}
        />
        <Keyboard
          previousGuessesChecked={previousGuessesChecked}
          guess={guess}
          setGuess={setGuess}
        />
      </div>
    </>
  );
}

export default Game;
