import React from "react";
import i18n from "../../i18n";

function LanguageSelect({ languagesList }) {
  return (
    <div>
      {languagesList.map((lng) => (
        <button
          key={lng}
          style={{
            fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
          }}
          type="submit"
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lng}
        </button>
      ))}
    </div>
  );
}

export default LanguageSelect;
