import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSelect.module.css";
import Select from "react-select";

const languageNames = {
  en: "🇺🇸 English",
  es: "🇪🇸 Español",
};

function LanguageSelect() {
  const { t, i18n } = useTranslation();

  const languages = i18n.options.supportedLngs
    .filter((lang) => lang !== "cimode")
    .map((lang) => ({
      value: lang,
      label: languageNames[lang],
    }));

  return (
    <div className={styles.select} title={t("selectLanguage")}>
      <Select
        options={languages}
        aria-label="Select Language"
        defaultValue={languages.find((lang) => lang.value === i18n.language)}
        onChange={(option) => i18n.changeLanguage(option.value)}
        blurInputOnSelect={true}
      />
    </div>
  );
}

export default LanguageSelect;
