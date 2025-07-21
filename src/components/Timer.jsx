import { useEffect, useContext } from "react";
import { CirclePlay, TimerReset, CirclePause } from "lucide-react";
import { TimerContext } from "../contexts/TimerContext";
import SessionSwitch from "./SessionSwitch";
import AddTime from "./AddTime";

function Timer() {
  const {
    time,
    setTime,
    numOfSession,
    isActive,
    setIsActive,
    handleTimerEnd,
    handleReset,
  } = useContext(TimerContext);

  useEffect(() => {
    let timer;

    if (isActive) {
      timer = setInterval(() => {
        setTime((prev) => {
          // decrement the time every second
          if (prev === 1) {
            handleTimerEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <section className="bg-white h-screen flex flex-col gap-5 items-center justify-center">
      <article className="absolute top-5 right-5 bg-red-800 rounded-xl p-2">
        <h2 className="font-bold text-white text-lg">
          Sessions Completed:
          <span className="font-normal">{" " + numOfSession}</span>
        </h2>
      </article>

      <article>
        <SessionSwitch />
      </article>

      <article className="border-b-gray-700 m-5 bg-red-800 text-white p-15 rounded-full">
        <span className="text-7xl">
          {String(Math.floor(time / 60)).padStart(2, "0")}:
          {String(time % 60).padStart(2, "0")}
        </span>
      </article>

      <article className="flex gap-3">
        <AddTime text={"+ 25 min"} timeToAdd={time + 25 * 60} />
        <AddTime text={"+ 10 min"} timeToAdd={time + 10 * 60} />
        <AddTime text={"+ 5 min"} timeToAdd={time + 5 * 60} />
        <AddTime text={"+ 1 min"} timeToAdd={time + 1 * 60} />
      </article>
      <article className="flex gap-4">
        <button
          className="flex gap-1 bg-red-800 p-2.5 rounded-xl text-white cursor-pointer font-bold"
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          {isActive ? <CirclePause /> : <CirclePlay />}
          <span>{isActive ? "Pause" : "Play"}</span>
        </button>
        <button
          className="flex gap-1 bg-red-800 p-2.5 rounded-xl text-white cursor-pointer font-bold"
          onClick={handleReset}
        >
          <TimerReset />
          Reset
        </button>
      </article>
    </section>
  );
}
export default Timer;
