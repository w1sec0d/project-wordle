import React from "react";

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
  ],
];

function KeyboardLetter({ variant, children }) {
  return (
    <p className={`keyboard-letter ${variant ? variant : "unused"}`}>
      {children}
    </p>
  );
}

function getLastAlphabetState(previousGuessesChecked) {
  // * Returns a dictionary with the current state of each letter (lastState)
  // * lastState = {a: 'correct', b:'missplaced', c:'incorrect', d:'unused'}

  let lastState = {};
  if (previousGuessesChecked) {
    for (let guess of previousGuessesChecked.reverse()) {
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

function Keyboard({ alphabetArray = defaultKeyboard, previousGuessesChecked }) {
  let lastAlphabetState = getLastAlphabetState(previousGuessesChecked);

  return (
    <div className="keyboard">
      {alphabetArray.map((keyboardLine, index) => (
        <span className="keyboard-line" key={index}>
          {keyboardLine.map((letterItem) => (
            <KeyboardLetter
              variant={lastAlphabetState[letterItem.letter]}
              key={letterItem.letter.toUpperCase()}
            >
              {letterItem.letter.toUpperCase()}
            </KeyboardLetter>
          ))}
        </span>
      ))}
    </div>
  );
}

export default Keyboard;
