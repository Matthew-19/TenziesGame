export default function winnerCheck(
  dice,
  rolls,
  isAllSelected,
  setIsWinner,
  setButton,
  player,
  setPlayer
) {
  if (isAllSelected) {
    let firstNum = dice[0].value;
    let playerWon = dice.every((item) => item.value === firstNum);
    if (playerWon) {
      setIsWinner(true);
      setButton("Congrats! You Won!!");

      const bestRolls =
        player.rolls === 0 ? rolls : Math.min(rolls, player.rolls);

      setPlayer((prevPlayer) => ({ ...prevPlayer, rolls: bestRolls }));
    }
  }
}
