import generateRandomNumber from "./generateRandomNumber";

export default function handleRoll(
  isWinner,
  setDice,
  diceData,
  setRolls,
  setIsWinner,
  setButton,
  running,
  setRunning,
  setTime
) {
  if (isWinner) {
    setDice(diceData);
    setRolls(0);
    setIsWinner(false);
    setButton("Start");
    setTime(0)
  } else {
    if (!running) {
      setRunning(true);
      setButton("Roll");
    } else {
      setDice((prevDice) => {
        return prevDice.map((item) => {
          return item.selected
            ? item
            : { ...item, value: generateRandomNumber() };
        });
      });
      setRolls((prevRoll) => prevRoll + 1);
    }
  }
}
