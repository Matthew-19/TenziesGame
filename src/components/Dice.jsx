import React from "react"

export default function Dice(props) {
    return (
        <div 
            className={`dice 
            ${props.selected ? "selected" : ""}`}
            onClick={()=> props.handleClick(props.id)}
        >
            {props.value}
        </div>
    )
}