import Swal from "sweetalert2";

import Game from "../Game";
import Header from "../Header";
import { useTranslation, Trans } from "react-i18next";

function App() {
  // Translation logic
  const { t, i18n } = useTranslation();
  const languages = {
    en: { nativeName: "English" },
    es: { nativeName: "Spanish" },
  };

  function swalInstructions() {
    Swal.fire({
      title: "Instructions",
      html: `
          <ul class="instruction-list">
            <li>
              Guess the 5 letter word in 6 attempts or less.
            </li>
            <li>
              The tiles change its color based on how good your guess is.
            </li>
          </ul>
          <br>
          <div class="tutorial-wrapper">
            <h2>Examples</h2>
            <ul>
              <li>
                <p><span class="cell correct">W</span><p><strong>W</strong> is in the word and in the <span class="cell-text correct">correct</span> position</p>
              </li>
              <li>
                <p><span class="cell misplaced">L</span><p><strong>L</strong> is in the word but in the <span class="cell-text misplaced">wrong</span> position</p>
              </li>
              <li>
                <p><span class="cell incorrect">Y</span><p><strong>Y</strong> is <span class="cell-text incorrect">not in</span> the word</p>
              </li>
            </ul>
          </div>

        `,
      icon: "info",
      showCloseButton: true,
      confirmButtonText: "Got it!",
      confirmButtonColor: "#0a84ff",
    });
  }

  return (
    <div className="wrapper">
      <Header swalInstructions={swalInstructions} />

      <div className="game-wrapper">
        <Game swalInstructions={swalInstructions} />
      </div>

      <footer>
        Made in 🇨🇴 by{" "}
        <a href="https://github.com/w1sec0d/" target="_BLANK" rel="noreferrer">
          w1sec0d
        </a>
      </footer>
    </div>
  );
}

export default App;
