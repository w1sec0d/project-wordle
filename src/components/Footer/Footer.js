import React from "react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer>
      {t("madeIn") + " "}
      <a href="https://github.com/w1sec0d/" target="_BLANK" rel="noreferrer">
        w1sec0d
      </a>
    </footer>
  );
}

export default Footer;
