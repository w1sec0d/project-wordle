import React from "react";
import { HelpCircle } from "react-feather";
import LanguageSelect from "../LanguageSelect";
import { useTranslation } from "react-i18next";

function Header({ swalInstructions }) {
  const { t } = useTranslation();

  return (
    <header>
      <LanguageSelect />
      <h1>{t("gameTitle")}</h1>
      <HelpCircle
        size={40}
        onClick={() => swalInstructions()}
        className="help-svg"
      />
    </header>
  );
}

export default Header;
