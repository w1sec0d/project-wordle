import React from "react";
import { HelpCircle } from "react-feather";

function Header({ swalInstructions }) {
  return (
    <header>
      <h1>Wordle Game</h1>
      <HelpCircle size={40} onClick={() => swalInstructions()} />
    </header>
  );
}

export default Header;
