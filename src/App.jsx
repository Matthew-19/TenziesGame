import React from "react";
import Dice from "./components/Dice";

export default function App() {
  function generateRandomNumber() {
    return Math.ceil(Math.random() * 6);
  }

  const diceArray = Array.from({ length: 10 }, generateRandomNumber);
  const diceData = diceArray.map((dice, index) => ({
    id: index,
    selected: false,
    value: dice,
  }));

  const [dice, setDice] = React.useState(diceData);

  const diceElements = dice.map((item) => (
    <Dice
      key={item.id}
      id={item.id}
      selected={item.selected}
      value={item.value}
      handleClick={handleSelect}
    />
  ));

  let isWinner = false;
  function winnerCheck() {
    const isAllSelected = dice.every((item) => item.selected);
    if (isAllSelected) {
      let firstNum = dice[0].value;
      isWinner = dice.every((item) => item.value === firstNum);
    }
  }

  function handleSelect(id) {
    setDice((prevDice) => {
      return prevDice.map((item) => {
        return item.id === id ? { ...item, selected: !item.selected } : item;
      });
    });
  }

  function handleRoll() {
    setDice((prevDice) => {
      return prevDice.map((item) => {
        return item.selected
          ? item
          : { ...item, value: generateRandomNumber() };
      });
    });
  }

  winnerCheck();
  let victoryMsg = isWinner ? "Congrats! We have got a Winner!" : "Roll";

  return (
    <main>
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="game--container">
        <div className="dice--container">{diceElements}</div>
        <button className="roll--button" onClick={handleRoll}>
          {victoryMsg}
        </button>
      </div>
    </main>
  );
}
