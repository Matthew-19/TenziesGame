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

  const [counter, setCounter] = React.useState(0);
  const [timer, setTimer] = React.useState(0);
  const [button, setButton] = React.useState("Roll");
  const [isWinner, setIsWinner] = React.useState(false);
  const [isAllSelected, setIsAllSelected] = React.useState(false);

  let highscoreCounter = localStorage.getItem("counter") || 0;

  const diceElements = dice.map((item) => (
    <Dice
      key={item.id}
      id={item.id}
      selected={item.selected}
      value={item.value}
      handleClick={handleSelect}
    />
  ));

  function winnerCheck() {
    if (isAllSelected) {
      let firstNum = dice[0].value;
      let playerWon = dice.every((item) => item.value === firstNum);
      if (playerWon) {
        setIsWinner(true);
        setButton("Congrats! You Won!!");

        highscoreCounter = localStorage.getItem("counter")
          ? Math.min(localStorage.getItem("counter"), counter)
          : counter;
        localStorage.setItem("counter", highscoreCounter);
      }
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
    if (isWinner) {
      setDice(diceData);
      setCounter(0);
      setIsWinner(false);
      setButton("Roll");
    } else {
      setDice((prevDice) => {
        return prevDice.map((item) => {
          return item.selected
            ? item
            : { ...item, value: generateRandomNumber() };
        });
      });
      setCounter(counter + 1);
    }
  }

  React.useEffect(() => {
    setIsAllSelected(dice.every((item) => item.selected));
  }, [dice]);

  React.useEffect(() => {
    winnerCheck();
  }, [isAllSelected]);

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
          {button}
        </button>
      </div>
      <div className="score">
        <div className="current--score">
          <div className="counter">Counter: {counter}</div>
          {/* <div className="timer">Timer: Here</div> */}
        </div>
        <div className="best--score">
          <div className="highscoreCounter">Best: {highscoreCounter}</div>
          {/* <div className="highscoreTimer">Best: Here</div> */}
        </div>
      </div>
    </main>
  );
}
