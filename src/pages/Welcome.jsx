import React from "react";

// Components
import WelcomeHeader from "../components/WelcomeHeader";
import NewPlayer from "../components/NewPlayer";
import PrevPlayer from "../components/PrevPlayer";
import BackArrow from "../components/BackArrow";

// Context
import { AppContext } from "../App";

export default function Welcome() {
  const { chosePlayer, setChosePlayer } = React.useContext(AppContext);
  const [playerType, setPlayerType] = React.useState(null);

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
              className="choose-player--prev"
              onClick={() => {
                setPlayerType("previous");
                setChosePlayer(true);
              }}
            >
              Previous Player
            </button>
          </div>
        )}
      </main>
    </section>
  );
}
