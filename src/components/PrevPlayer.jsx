import React from "react";

// Icons
import { MdDelete } from "react-icons/md";

// Context
import { AppContext } from "../App";

// Components
import NewPlayer from "./NewPlayer";

// Functions
import formatTime from "../functions/formatTime";

export default function PrevPlayer() {
  const { playersLog, setPlayersLog, player, setPlayer, setPages } =
    React.useContext(AppContext);
  const [selectedPrevPlayer, setSelectedPrevPlayer] = React.useState(null);
  const [showMsg, setShowMsg] = React.useState(false);

  function handleDelete(e, playerName, index) {
    e.stopPropagation();
    setPlayersLog((prevLog) => {
      return prevLog.filter((logPlayer) => logPlayer.playerName !== playerName);
    });
    if (selectedPrevPlayer === index) {
      setSelectedPrevPlayer(null);
      setPlayer({
        playerName: "",
        rolls: "",
        time: "",
      });
    }
  }

  function handleSelectPrevPlayer(player, index) {
    setPlayer(player);
    setSelectedPrevPlayer(index);
  }

  function handleStartPrevPlayer() {
    if (player.playerName) {
      setShowMsg(false);
      setPages(1);
    } else {
      setShowMsg(true);
    }
  }

  const prevPlayersElements = playersLog.map((player, index) => {
    return (
      <div
        key={index}
        className={`prev-player--card ${
          selectedPrevPlayer === index ? "selected" : ""
        }`}
        onClick={() => handleSelectPrevPlayer(player, index)}
      >
        <div className="prev-player--info">
          <span className="prev-player--name">{player.playerName}</span>
          <span className="prev-player--rolls">rolls: {player.rolls}</span>
          <span className="prev-player--time">time: {formatTime(player.time)}</span>
        </div>
        <span className="prev-player--delete">
          <MdDelete
            className="delete-icon"
            onClick={(e) => handleDelete(e, player.playerName, index)}
          />
        </span>
      </div>
    );
  });

  return (
    <>
      {playersLog.length === 0 ? (
        <div className="newPlayer">
          <p className="check-msg warning">All Players have been deleted.</p>
          <p className="check-msg warning">please make a new player.</p>
          <NewPlayer />
        </div>
      ) : (
        <div className="prevPlayer">
          <h3>Previous Players:</h3>
          <div className="playersList">{prevPlayersElements}</div>
        </div>
      )}
      {!player.playerName && showMsg && playersLog.length !== 0 && (
        <span className="check-msg warning">You need to select a player!</span>
      )}
      {playersLog.length !== 0 && (
        <button
          className="purple-button start-button"
          onClick={handleStartPrevPlayer}
        >
          Start Game
        </button>
      )}
    </>
  );
}
