// Custom components
import Game from "../Game";
import Header from "../Header";

// Translations
import i18n from "../../i18n";
import { I18nextProvider } from "react-i18next";
import Footer from "../Footer/Footer";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="wrapper">
        <Header />
        <Game />
        <Footer />
      </div>
    </I18nextProvider>
  );
}

export default App;
