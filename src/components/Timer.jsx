import { useEffect, useContext } from "react";
import { CirclePlay, TimerReset, CirclePause, Key } from "lucide-react";
import { TimerContext } from "../contexts/TimerContext";
import SessionSwitch from "./SessionSwitch";
import AddTime from "./AddTime";
import Pomodoro from "../assets/pomodoro.png";

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

  const addTimeProps = [
    { text: "+ 25", timeToAdd: time + 25 * 60 },
    { text: "+ 10", timeToAdd: time + 10 * 60 },
    { text: "+ 5", timeToAdd: time + 5 * 60 },
    { text: "+ 1", timeToAdd: time + 1 * 60 },
  ];

  return (
    <section className="bg-[var(--background)] h-screen w-[70%] m-auto sm:w-auto flex flex-col gap-5 items-center justify-center">
      <article className="absolute top-5 right-5 bg-[var(--primary)] p-3 border-4 border-[var(--accent)] shadow-[4px_4px_0_0_#102542] font-pixel text-white text-[10px] sm:text-xs uppercase select-none">
        <h2 className="font-bold leading-tight">
          Sessions Completed:
          <span className="font-normal">{" " + numOfSession}</span>
        </h2>
      </article>

      <article>
        <SessionSwitch />
      </article>

      <article className="font-pixel select-none">
        <div className="relative flex justify-center items-center sm:h-105 sm:w-105 h-80 w-85">
          <img
            src={Pomodoro}
            alt="Pomodoro timer"
            className="absolute h-full w-full object-contain"
          />

          <div className="absolute flex flex-col items-center justify-center pt-10 w-full h-full z-10">
            <span className="text-6xl sm:text-7xl text-white drop-shadow-lg">
              {String(Math.floor(time / 60)).padStart(2, "0")}:
              {String(time % 60).padStart(2, "0")}
            </span>
          </div>
        </div>
      </article>

      <article className="flex justify-center items-center gap-3">
        {addTimeProps.map(({ text, timeToAdd }) => (
          <AddTime key={text} text={text} timeToAdd={timeToAdd} />
        ))}
      </article>
      
      <article className="flex gap-4">
        <button
          className="cursor-pointer flex items-center gap-2 bg-[var(--primary)] text-white sm:p-3 p-2 font-pixel sm:text-xs text-[10px] uppercase 
               border-4 border-[var(--accent)] shadow-[4px_4px_0_0_#102542] 
               select-none transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          {isActive ? <CirclePause /> : <CirclePlay />}
          <span>{isActive ? "Pause" : "Play"}</span>
        </button>

        <button
          className="cursor-pointer flex items-center gap-2 bg-[var(--primary)] text-white sm:p-3 p-2 font-pixel sm:text-xs text-[10px] uppercase 
               border-4 border-[var(--accent)] shadow-[4px_4px_0_0_#102542] 
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
