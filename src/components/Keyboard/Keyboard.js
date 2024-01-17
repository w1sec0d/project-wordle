import React from "react";
import { Delete, ArrowRight } from "react-feather";

// * This function recieves an alphabet array, representing each keyboard line
// * Each sub-array is a keyboard line
// * Inside each line there are multiple letter objects like this: {letter:'a',style:...}

const defaultKeyboard = [
  [
    { letter: "Q" },
    { letter: "W" },
    { letter: "E" },
    { letter: "R" },
    { letter: "T" },
    { letter: "Y" },
    { letter: "U" },
    { letter: "I" },
    { letter: "O" },
    { letter: "P" },
  ],
  [
    { letter: "A" },
    { letter: "S" },
    { letter: "D" },
    { letter: "F" },
    { letter: "G" },
    { letter: "H" },
    { letter: "J" },
    { letter: "K" },
    { letter: "L" },
  ],
  [
    { letter: "Z" },
    { letter: "X" },
    { letter: "C" },
    { letter: "V" },
    { letter: "B" },
    { letter: "N" },
    { letter: "M" },
    { letter: "[delete]" },
  ],
];

function KeyboardLetter({ variant, onClick, children }) {
  return (
    <p
      className={`keyboard-letter ${variant ? variant : "unused"}`}
      onClick={onClick}
    >
      {children}
    </p>
  );
}

function getLastAlphabetState(previousGuessesChecked) {
  // * Returns a dictionary with the current state of each letter (lastState)
  // * lastState = {a: 'correct', b:'missplaced', c:'incorrect', d:'unused'}

  // Fixing glitchy behaviour of reordering the array
  let previousGuessesOrdered = previousGuessesChecked[0]
    ? previousGuessesChecked
    : [...previousGuessesChecked].reverse();

  let lastState = {};
  if (previousGuessesOrdered) {
    for (let guess of previousGuessesOrdered.reverse()) {
      // * The guesses are checked in reverse in order to store
      // * the last status of a letter efficiently!
      if (guess) {
        for (let guessItem of guess) {
          if (!lastState[guessItem.letter]) {
            lastState[guessItem.letter] = guessItem.status;
          }
        }
      }
    }
    return lastState;
  } else {
    return undefined;
  }
}

function decodeKeyboardLetter(letter) {
  switch (letter) {
    case "[delete]":
      return <Delete />;

    case "[enter]":
      return <ArrowRight />;

    default:
      return "unknown";
  }
}

function Keyboard({
  alphabetArray = defaultKeyboard,
  previousGuessesChecked,
  guess,
  setGuess,
}) {
  let lastAlphabetState = getLastAlphabetState(previousGuessesChecked);

  // Fixing glitchy behaviour of reordering the array
  let previousGuessesOrdered = previousGuessesChecked[0]
    ? previousGuessesChecked
    : [...previousGuessesChecked].reverse();

  const handleLetterClick = (letter) => {
    console.log(previousGuessesOrdered);
    if (previousGuessesOrdered.length <= 6) {
      if (/^[A-Z]$/.test(letter) && guess.length <= 4) {
        setGuess(guess + letter);
      } else if (letter === "[delete]" && guess.length > 0) {
        setGuess(guess.slice(0, -1));
      }
    }
  };

  return (
    <div className="keyboard">
      {alphabetArray.map((keyboardLine, index) => (
        <span className="keyboard-line" key={index}>
          {keyboardLine.map((letterItem) => (
            <KeyboardLetter
              variant={lastAlphabetState[letterItem.letter]}
              key={letterItem.letter.toUpperCase()}
              onClick={() => handleLetterClick(letterItem.letter)}
            >
              {!letterItem.letter.startsWith("[")
                ? letterItem.letter.toUpperCase()
                : decodeKeyboardLetter(letterItem.letter)}
            </KeyboardLetter>
          ))}
        </span>
      ))}
    </div>
  );
}

export default Keyboard;
