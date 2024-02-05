import React from "react";

// Components
import WelcomeHeader from "../components/WelcomeHeader";
import NewPlayer from "../components/NewPlayer";
import PrevPlayer from "../components/PrevPlayer";
import BackArrow from "../components/BackArrow";

// Context
import { AppContext } from "../App";

export default function Welcome() {
  const { chosePlayer, setChosePlayer, playersLog } =
    React.useContext(AppContext);
  const [playerType, setPlayerType] = React.useState(null);
  const isEmptyPlayersLog = playersLog.length === 0 ? true : false;
  const [showLockedMsg, setShowLockedMsg] = React.useState(false);

  return (
    <section className="welcome">
      <WelcomeHeader />
      <main className="main--welcome">
        {chosePlayer ? (
          <>
            <BackArrow />
            <form onSubmit={(e) => e.preventDefault()}>
              {playerType === "new" ? <NewPlayer /> : <PrevPlayer />}
            </form>
          </>
        ) : (
          <div className="choose-player">
            <button
              className="choose-player--new"
              onClick={() => {
                setPlayerType("new");
                setChosePlayer(true);
              }}
            >
              New Player
            </button>
            <button
              className={`choose-player--prev ${
                isEmptyPlayersLog ? "locked" : ""
              }`}
              onClick={() => {
                if (!isEmptyPlayersLog) {
                  setPlayerType("previous");
                  setChosePlayer(true);
                } else {
                  setShowLockedMsg(true);
                }
              }}
            >
              Previous Player
            </button>
            {isEmptyPlayersLog && showLockedMsg && (
              <span className="check-msg warning">No Previous Players!<br /> Please make a new player first.</span>
            )}
          </div>
        )}
      </main>
    </section>
  );
}
