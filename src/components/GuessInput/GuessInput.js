import React, { useEffect, useRef } from "react";
import { ArrowRight } from "react-feather";

function GuessInput({ handleSubmitGuess, disabled, guess, setGuess }) {
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
        <button type="submit" className="guess-input-icon">
          <ArrowRight size={50} />
        </button>
      </div>
    </form>
  );
}

export default GuessInput;
