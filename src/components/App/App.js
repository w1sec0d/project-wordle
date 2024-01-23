// Custom components
import Game from "../Game";
import Header from "../Header";

// Translations
import i18n from "../../i18n";
import { I18nextProvider, useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}>
      <div className="wrapper">
        <Header />
        <div className="game-wrapper">
          <Game />
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
