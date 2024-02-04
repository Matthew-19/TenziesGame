import React from "react";
import { AppContext } from "../App";

export default function GameHeader() {
  const { player } = React.useContext(AppContext);
  return (
    <header className="game">
      <h1>Tenzies</h1>
      <p>{player.playerName}</p>
    </header>
  );
}
