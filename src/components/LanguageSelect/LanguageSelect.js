import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSelect.module.css";
import { ChevronDown } from "react-feather";

function Flag({ lang = "en", isSelected = false }) {
  let country = undefined;
  switch (lang) {
    case "en":
      country = "us";
      break;
    case "es":
      country = "es";
      break;
    default:
      country = "us";
  }
  return <span className={`fi fi-${country}`}></span>;
}

function LanguageSelect() {
  const { t, i18n } = useTranslation();

  const selectedLanguage = i18n.language;

  return (
    <div className={styles.container}>
      {i18n.options.supportedLngs.map((lang) =>
        lang !== "cimode" ? (
          <Flag lang={lang} isSelected={lang === selectedLanguage} />
        ) : (
          ""
        )
      )}
    </div>
  );
}

export default LanguageSelect;
