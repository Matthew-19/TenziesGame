import React from "react";
// Icons
import { FaLongArrowAltLeft } from "react-icons/fa";

// Context
import { AppContext, playerObj } from "../App";

export default function BackArrow() {
  const { setPlayer, setChosePlayer, setPages } = React.useContext(AppContext);
  return (
    <button
      className="back"
      onClick={() => {
        setChosePlayer(false);
        setPlayer(playerObj);
        setPages(0);
      }}
    >
      <FaLongArrowAltLeft /> Back
    </button>
  );
}
