import React, { useEffect, useRef } from "react";
import { ArrowRight, RefreshCcw } from "react-feather";

function GuessInput({
  handleSubmitGuess,
  disabled,
  guess,
  setGuess,
  gameStatus,
}) {
  // Auto focus on input only on desktop
  const inputRef = useRef(null);
  useEffect(() => {
    if (window.innerWidth > 768) {
      inputRef.current.focus();
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    handleSubmitGuess(guess);
    setGuess("");
  }

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <div className="input-row">
        <input
          id="guess-input"
          type="text"
          value={guess.toUpperCase()}
          onChange={(event) => {
            setGuess(event.target.value.toUpperCase());
          }}
          pattern="[a-zA-Z]{5}"
          title="5 letter word"
          minLength={5}
          maxLength={5}
          required={true}
          disabled={disabled}
          inputMode="none"
          ref={inputRef}
        />
        {gameStatus === "running" && (
          <button type="submit" className="guess-input-icon send">
            <ArrowRight size={50} />
          </button>
        )}
        {(gameStatus === "won" || gameStatus === "lost") && (
          <button type="submit" className="guess-input-icon reset">
            <RefreshCcw size={40} />
          </button>
        )}
      </div>
    </form>
  );
}

export default GuessInput;
