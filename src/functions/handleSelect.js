export default function handleSelect(id, setDice) {
  setDice((prevDice) => {
    return prevDice.map((item) => {
      return item.id === id ? { ...item, selected: !item.selected } : item;
    });
  });
}
