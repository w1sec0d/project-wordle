import React, { useEffect, useCallback } from "react";
import { HelpCircle } from "react-feather";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

import LanguageSelect from "../LanguageSelect";

function Header() {
  const { t } = useTranslation();

  const swalInstructions = useCallback(() => {
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
  }, [t]);

  // Show instructions on first load
  useEffect(() => {
    swalInstructions();
  }, [swalInstructions]);

  return (
    <header>
      <LanguageSelect />
      <h1>{t("gameTitle")}</h1>
      <div className="help-icon-wrapper" title={t("instructions")}>
        <HelpCircle
          size={40}
          onClick={() => swalInstructions()}
          className="help-svg"
        />
      </div>
    </header>
  );
}

export default Header;
