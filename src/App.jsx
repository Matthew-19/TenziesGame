import React, { createContext } from "react";

// Pages
import Welcome from "./pages/Welcome";
import Game from "./pages/Game";

const AppContext = createContext();
export { AppContext };

const playerObj = {
  playerName: "",
  rolls: 0,
  time: 0,
};
export { playerObj };

export default function App() {
  const [pages, setPages] = React.useState(0);

  const [player, setPlayer] = React.useState(playerObj);
  const [playersLog, setPlayersLog] = React.useState(
    JSON.parse(localStorage.getItem("playersLog")) || []
  );

  const [chosePlayer, setChosePlayer] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem("playersLog", JSON.stringify(playersLog));
  }, [playersLog]);

  return (
    <AppContext.Provider
      value={{
        setPages,
        player,
        setPlayer,
        playersLog,
        setPlayersLog,
        chosePlayer,
        setChosePlayer,
      }}
    >
      {pages === 0 ? <Welcome /> : <Game />}
    </AppContext.Provider>
  );
}
