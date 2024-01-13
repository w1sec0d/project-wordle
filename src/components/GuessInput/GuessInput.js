import React, { useState } from "react";

function GuessInput({ handleSubmitGuess, disabled }) {
  const [guess, setGuess] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    handleSubmitGuess(guess);
    setGuess("");
  }

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
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
        autoFocus={true}
        disabled={disabled}
      />
    </form>
  );
}

export default GuessInput;
