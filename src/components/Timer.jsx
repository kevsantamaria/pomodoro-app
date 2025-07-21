import { useEffect, useContext } from "react";
import { CirclePlay, TimerReset, CirclePause } from "lucide-react";
import { TimerContext } from "../contexts/TimerContext";
import SessionButton from "./SessionButton";
import AddTime from './AddTime'

function Timer() {
  const { time, setTime, numOfSession, isActive, setIsActive, handleTimerEnd, handleReset } = useContext(TimerContext);

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
      <article className="fixed top-5 right-5 bg-red-800 rounded-xl p-2">
        <h2 className="font-bold text-white text-xl">
          Sessions Completed:
          <span className="font-normal">{" " + numOfSession}</span>
        </h2>
      </article>

      <article className="flex gap-6 bg-gray-700 rounded-xl px-5">
        <SessionButton type={"focus"} thisTime={25 * 60} text={"Focus"} />
        <SessionButton type={"shortBreak"} thisTime={5 * 60} text={"Short Break"} />
        <SessionButton type={"longBreak"} thisTime={15 * 60} text={"Long Break"} />
      </article>

      <article className="border-b-gray-700 m-5 bg-red-800 text-white p-15 rounded-full">
        <span className="text-7xl">
          {Math.floor(time / 60)}:{String(time % 60).padStart(2, "00")}
        </span>
      </article>

      <article className="flex gap-3">
        <AddTime text={"+ 25 min"} timeToAdd={time + 25 * 60}/>
        <AddTime text={"+ 10 min"} timeToAdd={time + 10 * 60}/>
        <AddTime text={"+ 5 min"} timeToAdd={time + 5 * 60}/>
        <AddTime text={"+ 1 min"} timeToAdd={time + 1 * 60}/>
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
