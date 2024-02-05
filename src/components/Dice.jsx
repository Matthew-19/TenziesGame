import handleSelect from "../functions/handleSelect";

export default function Dice(props) {
  const { id, selected, value, setDice, running } = props;
  return (
    <div
      className={`dice ${selected ? "selected" : ""}`}
      onClick={() => {
        if (running) handleSelect(id, setDice);
      }}
    >
      {value}
    </div>
  );
}
