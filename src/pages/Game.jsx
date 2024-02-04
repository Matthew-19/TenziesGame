import React from "react";

// Components
import Dice from "../components/Dice";
import GameHeader from "../components/GameHeader";
import BackArrow from "../components/BackArrow";

// Functions
import generateRandomNumber from "../functions/generateRandomNumber";
import winnerCheck from "../functions/winnerCheck";
import handleRoll from "../functions/handleRoll";

import { AppContext } from "../App";

export default function Main() {
  const { player, setPlayer, playersLog, setPlayersLog } =
    React.useContext(AppContext);

  const diceArray = Array.from({ length: 10 }, generateRandomNumber);
  const diceData = diceArray.map((dice, index) => ({
    id: index,
    selected: false,
    value: dice,
  }));
  const [dice, setDice] = React.useState(diceData);

  const [rolls, setRolls] = React.useState(0);
  const [timer, setTimer] = React.useState(0);
  const [button, setButton] = React.useState("Roll");
  const [isWinner, setIsWinner] = React.useState(false);
  const [isAllSelected, setIsAllSelected] = React.useState(false);

  const diceElements = dice.map((item) => (
    <Dice key={item.id} {...item} setDice={setDice} />
  ));

  React.useEffect(() => {
    setIsAllSelected(dice.every((item) => item.selected));
  }, [dice]);

  React.useEffect(() => {
    winnerCheck(
      dice,
      rolls,
      isAllSelected,
      setIsWinner,
      setButton,
      player,
      setPlayer
    );
  }, [isAllSelected]);

  React.useEffect(() => {
    setPlayersLog((prevLog) => {
      return prevLog.map((playerElement) => {
        return playerElement.playerName === player.playerName
          ? { ...playerElement, rolls: player.rolls }
          : playerElement;
      });
    });
  }, [player]);

  return (
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
              setButton
            )
          }
        >
          {button}
        </button>
      </div>
      <div className="score">
        <div className="current--score">
          <div className="rolls">Rolls: {rolls}</div>
          {/* <div className="timer">Timer: Here</div> */}
        </div>
        <div className="best--score">
          <div className="highscoreCounter">Best: {player.rolls}</div>
          {/* <div className="highscoreTimer">Best: Here</div> */}
        </div>
      </div>
    </section>
  );
}
