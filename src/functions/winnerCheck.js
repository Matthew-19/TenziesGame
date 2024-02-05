export default function winnerCheck(
  dice,
  rolls,
  isAllSelected,
  setIsWinner,
  setButton,
  player,
  setPlayer,
  setRunning,
  time
) {
  if (isAllSelected) {
    let firstNum = dice[0].value;
    let playerWon = dice.every((item) => item.value === firstNum);
    if (playerWon) {
      setIsWinner(true);
      setButton("Congrats! You Won!!");
      setRunning(false);

      const bestRolls =
        player.rolls === 0 ? rolls : Math.min(rolls, player.rolls);

      const bestTime = player.time === 0 ? time : Math.min(time, player.time);

      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        rolls: bestRolls,
        time: bestTime,
      }));
    }
  }
}
