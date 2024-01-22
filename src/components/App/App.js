// Swetalert2
import Swal from "sweetalert2";

// Custom components
import Game from "../Game";
import Header from "../Header";

// Translations
import i18n from "../../i18n";
import { I18nextProvider, useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  // Translation logic
  function swalInstructions() {
    Swal.fire({
      title: t("instructions"),
      html: `
          <ul class="instruction-list">
            <li>
              ${t("instructions1")}
            </li>
            <li>
              ${t("instructions2")}
            </li>
          </ul>
          <br>
          <div class="tutorial-wrapper">
            <h2>${t("examples")}</h2>
            <ul>
              <li>
                <p><span class="cell correct">W</span><p><strong>W</strong> ${t(
                  "tutorial1"
                )}</p>
              </li>
              <li>
                <p><span class="cell misplaced">L</span><p><strong>L</strong> ${t(
                  "tutorial2"
                )}</p>
              </li>
              <li>
                <p><span class="cell incorrect">Y</span><p><strong>Y</strong> ${t(
                  "tutorial3"
                )}</p>
              </li>
            </ul>
          </div>

        `,
      icon: "info",
      showCloseButton: true,
      confirmButtonText: t("gotIt"),
      confirmButtonColor: "#0a84ff",
    });
  }

  return (
    <I18nextProvider i18n={i18n}>
      <div className="wrapper">
        <Header swalInstructions={swalInstructions} />
        <div className="game-wrapper">
          <Game swalInstructions={swalInstructions} />
        </div>
        <footer>
          {t("madeIn") + " "}
          <a
            href="https://github.com/w1sec0d/"
            target="_BLANK"
            rel="noreferrer"
          >
            w1sec0d
          </a>
        </footer>
      </div>
    </I18nextProvider>
  );
}

export default App;
