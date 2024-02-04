import handleSelect from "../functions/handleSelect"

export default function Dice(props) {
    return (
        <div 
            className={`dice 
            ${props.selected ? "selected" : ""}`}
            onClick={()=> handleSelect(props.id, props.setDice)}
        >
            {props.value}
        </div>
    )
}