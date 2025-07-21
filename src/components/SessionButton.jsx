import { useContext } from "react";
import { TimerContext } from "../contexts/TimerContext";

function SessionButton({ type, thisTime, text }) {
  const { setTime, typeOfSession, setTypeOfSession } = useContext(TimerContext);

  // const currentSession = (typeOfSession) => {
  //   typeOfSession === "focus"
  //     ? (className = "bg-white text-black")
  //     : typeOfSession === "shortBreak"
  //     ? (className = "bg-white text-black")
  //     : (className = "bg-white text-black");
  // };

  return (
    <button
      className="text-white p-2.5 rounded-xl cursor-pointer font-bold"
      onClick={() => {
        setTypeOfSession(type); // 'focus' || 'shortBreak' || 'longBreak'
        setTime(thisTime); // 25 * 60 || 5 * 60 || 15 * 60
      }}
    >
      {text}
    </button>
  );
}

export default SessionButton;
