import React from "react";
import { range } from "../../utils";

function Guess({ value }) {
  return (
    <p className="guess">
      {range(5).map((letterIndex) => {
        let letter = value ? value[letterIndex] : undefined;
        return (
          <span
            className={`cell${letter ? " " + letter.status : ""}`}
            key={letterIndex}
          >
            {letter ? letter.letter : ""}
          </span>
        );
      })}
    </p>
  );
}

export default Guess;
