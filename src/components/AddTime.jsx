import { useContext } from "react";
import { TimerContext } from "../contexts/TimerContext";

function AddTime({text, timeToAdd}) {
    const { setTime } = useContext(TimerContext)

    return (
    <span
          className="border p-1.5 rounded-xl cursor-pointer"
          onClick={() => setTime(timeToAdd)} // time + 25 * 60 || time + 10 * 60 || time + 5 * 60 || time + 1 * 60
        >
          {text}
        </span>
  )
}

export default AddTime