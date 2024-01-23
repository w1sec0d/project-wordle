import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    supportedLngs: ["en", "es"],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          currentLanguage: "English",
          instructions: "Instructions",
          instructions1: "Guess the 5 letter word in 6 attempts or less.",
          instructions2:
            "The tiles change its color based on how good your guess is.",
          examples: "Examples",
          tutorial1:
            "is in the word and in the <span class='cell-text correct'>correct</span> position",
          tutorial2:
            "is in the word but in the <span class='cell-text misplaced'>wrong</span> position",
          tutorial3:
            "is <span class='cell-text incorrect'>not in</span> the word",
          gotIt: "Got it!",
          enterGuess: "Enter Guess",
          madeIn: "Made in 🇨🇴 by",
          gameTitle: "Wordle Game",
          youWon: "You Won 😊!",
          congratulations: "Congratulations!",
          gotItIn: "Got it in",
          guess: "guess",
          playAgain: "Play again",
          youLost: "You lost 😢",
          correctAnswer: "The correct answer is",
          submitGuess: "Submit Guess",
          selectLanguage: "Select Language",
        },
      },
      es: {
        translation: {
          currentLanguage: "Español",
          instructions: "Instrucciones",
          instructions1:
            "Adivina la palabra de 5 letras en 6 intentos o menos.",
          instructions2:
            "Las letras cambian su color según que tan bueno fue tu intento.",
          examples: "Ejemplos:",
          tutorial1:
            "está en la palabra y en la posición <span class='cell-text correct'>correcta</span>",
          tutorial2:
            "está en la palabra pero en la posición <span class='cell-text misplaced'>incorrecta</span>",
          tutorial3:
            "<span class='cell-text incorrect'>no está</span> en la palabra",
          gotIt: "¡Lo tengo!",
          enterGuess: "Escribe tu adivinanza",
          madeIn: "Hecho en 🇨🇴 por",
          gameTitle: "Juego Wordle",
          youWon: "¡Ganaste 😊!",
          congratulations: "¡Felicitaciones!",
          gotItIn: "Adivinaste en",
          guess: "intento",
          playAgain: "Jugar de nuevo",
          youLost: "Perdiste 😢",
          correctAnswer: "La respuesta correcta es",
          submitGuess: "Enviar adivinanza",
          selectLanguage: "Selecciona el idioma",
        },
      },
    },
  });

export default i18n;
