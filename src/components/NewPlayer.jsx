import React from "react";
import { AppContext } from "../App";

export default function NewPlayer() {
  const { player, setPlayer, setPages, playersLog, setPlayersLog } =
    React.useContext(AppContext);

  const [isPlayerExist, setIsPlayerExist] = React.useState(false);
  const [showMsg, setShowMsg] = React.useState(false);

  function handleNewPlayer(event) {
    const { name, value } = event.target;
    setPlayer((prevPlayer) => {
      return {
        ...prevPlayer,
        [name]: value,
      };
    });

    setIsPlayerExist(
      playersLog.some((element) => element.playerName === value)
    );
  }

  function handleStartNewPlayer() {
    if (!isPlayerExist && player.playerName) {
      setPages(1);
      setPlayersLog((prevLog) => [...prevLog, player]);
    } else {
      setShowMsg(true);
    }
  }

  return (
    <>
      <div className="newPlayer">
        <h3>New Player:</h3>
        <input
          type="text"
          className="playerName"
          name="playerName"
          id="playerName"
          placeholder="Enter Name Here"
          value={player.playerName}
          onChange={handleNewPlayer}
        />
        {isPlayerExist && (
          <span className="check-msg warning">Player already exists!</span>
        )}
        {!isPlayerExist && player.playerName && (
          <span className="check-msg success">You are good to go.</span>
        )}
      </div>
      {showMsg && (
        <span className="check-msg warning">Please enter a name first</span>
      )}
      <button
        className="purple-button start-button"
        onClick={handleStartNewPlayer}
      >
        Start Game
      </button>
    </>
  );
}
