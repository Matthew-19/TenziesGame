import React from "react";

// Components
import Dice from "../components/Dice";
import GameHeader from "../components/GameHeader";
import BackArrow from "../components/BackArrow";
import Timer from "../components/Timer";

// Functions
import generateRandomNumber from "../functions/generateRandomNumber";
import winnerCheck from "../functions/winnerCheck";
import handleRoll from "../functions/handleRoll";
import formatTime from "../functions/formatTime";

// Context
import { AppContext } from "../App";
const GameContext = React.createContext();
export { GameContext };

export default function Main() {
  const { player, setPlayer, setPlayersLog } = React.useContext(AppContext);

  const diceArray = Array.from({ length: 10 }, generateRandomNumber);
  const diceData = diceArray.map((dice, index) => ({
    id: index,
    selected: false,
    value: dice,
  }));
  const [dice, setDice] = React.useState(diceData);

  const [rolls, setRolls] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [button, setButton] = React.useState("Start");
  const [isWinner, setIsWinner] = React.useState(false);
  const [isAllSelected, setIsAllSelected] = React.useState(false);

  const diceElements = dice.map((item) => (
    <Dice key={item.id} {...item} setDice={setDice} running={running} />
  ));

  // Are all dice Selected? Check
  React.useEffect(() => {
    setIsAllSelected(dice.every((item) => item.selected));
  }, [dice]);

  // Winner Check
  React.useEffect(() => {
    winnerCheck(
      dice,
      rolls,
      isAllSelected,
      setIsWinner,
      setButton,
      player,
      setPlayer,
      setRunning,
      time
    );
  }, [isAllSelected]);

  // Saving Player Data
  React.useEffect(() => {
    setPlayersLog((prevLog) => {
      return prevLog.map((playerElement) => {
        return playerElement.playerName === player.playerName
          ? { ...playerElement, rolls: player.rolls, time: player.time }
          : playerElement;
      });
    });
  }, [player]);

  return (
    <GameContext.Provider
      value={{
        time,
        setTime,
        running,
        setRunning,
        setButton,
        setRolls,
        setDice,
        diceData,
      }}
    >
      <section className="game">
        <BackArrow />
        <GameHeader />
        <div className="game--container">
          <div className="dice--container">{diceElements}</div>
          <button
            className="purple-button roll--button"
            onClick={() =>
              handleRoll(
                isWinner,
                setDice,
                diceData,
                setRolls,
                setIsWinner,
                setButton,
                running,
                setRunning,
                setTime
              )
            }
          >
            {button}
          </button>
        </div>
        <div className="score">
          <div className="current--score">
            <div className="rolls">Rolls: {rolls}</div>
            <div className="time">
              Time: <Timer />
            </div>
          </div>
          <div className="best--score">
            <div className="rolls">Best: {player.rolls}</div>
            <div className="time">Best: {formatTime(player.time)}</div>
          </div>
        </div>
      </section>
    </GameContext.Provider>
  );
}
