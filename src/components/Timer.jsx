import React from "react";

// Functions
import formatTime from "../functions/formatTime";

// Icons
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { MdReplay } from "react-icons/md";

// Context
import { GameContext } from "../pages/Game";

export default function Timer() {
  const {
    time,
    setTime,
    running,
    setRunning,
    setButton,
    setRolls,
    setDice,
    diceData,
  } = React.useContext(GameContext);

  const timer = React.useRef();
  React.useEffect(() => {
    if (running) {
      timer.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [running]);

  return (
    <div className="stopwatch">
      <p style={{ width: "60px" }} className="stopwatch--time">
        {formatTime(time)}
      </p>
      <div className="actions">
        <button
          style={{
            position: "absolute",
            top: "15px",
            right: "50px",
            border: "none",
            padding: "5px",
            display: "flex",
            cursor: "pointer",
          }}
          onClick={() => {
            setTime(0);
            setRolls(0);
            setDice(diceData);
            setRunning(false);
            setButton("Start");
          }}
        >
          <MdReplay style={{ width: "20px", height: "20px" }} />
        </button>
        <button
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            border: "none",
            padding: "5px",
            display: "flex",
            cursor: "pointer",
          }}
          onClick={() => {
            if (running) {
              clearInterval(timer.current);
              setButton("Start")
            } else {
              setButton("Roll");
            }
            setRunning(!running);
          }}
        >
          {running ? (
            <FaPauseCircle style={{ width: "20px", height: "20px" }} />
          ) : (
            <FaPlayCircle style={{ width: "20px", height: "20px" }} />
          )}
        </button>
      </div>
    </div>
  );
}
