import generateRandomNumber from "./generateRandomNumber";

export default function handleRoll(
  isWinner,
  setDice,
  diceData,
  setRolls,
  setIsWinner,
  setButton
) {
  if (isWinner) {
    setDice(diceData);
    setRolls(0);
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
    setRolls((prevRoll) => prevRoll + 1);
  }
}
