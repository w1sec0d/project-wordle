import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";

import GuessInput from "../GuessInput/GuessInput";
import GuessResults from "../GuessResults/GuessResults";
import Keyboard from "../Keyboard/Keyboard";

function Game() {
  // Language Logic
  const { t, i18n } = useTranslation();

  // Game logic
  const [guess, setGuess] = useState(""); // The current guess
  const [answer, setAnswer] = useState(sample(WORDS[i18n.language]));
  const [previousGuesses, setPreviousGuesses] = useState(
    Array(NUM_OF_GUESSES_ALLOWED).fill(undefined)
  );
  const [previousGuessesChecked, setPreviousGuessesChecked] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameStatus, setGameStatus] = useState("running"); // Handles game status: running | won | lost

  // Updates answer when changing language
  useEffect(() => {
    setAnswer(sample(WORDS[i18n.language]));
  }, [i18n.language]);

  console.log({ answer });

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
    setAnswer(sample(WORDS[i18n.language]));
  }

  function swalWonAlert(attempts) {
    let plural = "";
    if (attempts > 1) {
      if (i18n.language === "en") {
        plural = "es";
      } else if (i18n.language === "es") {
        plural = "s";
      }
    }

    Swal.fire({
      title: t("youWon"),
      html: `
          <p>
            <strong>${t("congratulations")}</strong> ${t("gotItIn")}
            <strong>
              ${" " + attempts} ${t("guess")}${plural}
            </strong>
          </p>
        `,
      icon: "success",
      toast: true,
      position: "top-end",
      showCloseButton: true,
      confirmButtonText: t("playAgain"),
      confirmButtonColor: "#998000",
    }).then((result) => {
      if (result.isConfirmed) {
        restartGame();
      }
    });
  }

  function swalLostAlert(answer) {
    Swal.fire({
      title: t("youLost"),
      html: `
          <p>
            ${t("correctAnswer")} <strong>${answer}</strong>
          </p>
        `,
      icon: "error",
      toast: true,
      position: "top-end",
      showCloseButton: true,
      confirmButtonText: t("playAgain"),
      confirmButtonColor: "#998000",
    }).then((result) => {
      if (result.isConfirmed) {
        restartGame();
      }
    });
  }

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
          language={i18n.language}
        />
      </div>
    </>
  );
}

export default Game;
