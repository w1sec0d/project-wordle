import React from "react";
import { HelpCircle } from "react-feather";
import LanguageSelect from "../LanguageSelect";

function Header({ swalInstructions }) {
  return (
    <header>
      <LanguageSelect />
      <h1>Wordle Game</h1>
      <HelpCircle
        size={40}
        onClick={() => swalInstructions()}
        className="help-svg"
      />
    </header>
  );
}

export default Header;
