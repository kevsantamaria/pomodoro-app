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
    <section className="bg-[var(--background)] h-screen flex flex-col gap-5 items-center justify-center">
      <article className="absolute top-5 right-5 bg-[var(--primary)] p-4 border-4 border-gray-900 shadow-[4px_4px_0_0_#101828] font-pixel text-white text-xs uppercase select-none">
        <h2 className="font-bold leading-tight">
          Sessions Completed:
          <span className="font-normal">{" " + numOfSession}</span>
        </h2>
      </article>

      <article>
        <SessionSwitch />
      </article>

      <article className="m-5 bg-[var(--primary)] text-white p-6 border-4 border-gray-900 shadow-[4px_4px_0_0_#111827] font-pixel select-none inline-block text-center">
        <span className="text-7xl leading-none block">
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
          className="flex items-center gap-2 bg-red-800 text-white p-3 font-pixel text-xs uppercase 
               border-4 border-gray-900 shadow-[4px_4px_0_0_#111827] 
               select-none transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          {isActive ? <CirclePause /> : <CirclePlay />}
          <span>{isActive ? "Pause" : "Play"}</span>
        </button>

        <button
          className="flex items-center gap-2 bg-red-800 text-white p-3 font-pixel text-xs uppercase 
               border-4 border-gray-900 shadow-[4px_4px_0_0_#111827] 
               select-none transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          onClick={handleReset}
        >
          <TimerReset />
          <span>Reset</span>
        </button>
      </article>
    </section>
  );
}
export default Timer;
