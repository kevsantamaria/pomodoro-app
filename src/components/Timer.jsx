import { useEffect, useContext, useRef } from "react";
import { TimerContext } from "../contexts/TimerContext";
import SessionSwitch from "./SessionSwitch";
import AddTime from "./AddTime";
import Pomodoro from "../assets/pomodoro.webp";
import { ToastContainer } from "react-toastify";

function Timer() {
  const {
    time,
    setTime,
    numOfSession,
    isActive,
    setIsActive,
    handleTimerEnd,
    handleReset,
    startTime,
    setStartTime,
  } = useContext(TimerContext);
  const durationRef = useRef(time);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    let timer;

    if (isActive && startTime) {
      durationRef.current = time;
      timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const newTimeLeft = durationRef.current - elapsed;

        if (newTimeLeft <= 0) {
          clearInterval(timer);
          setTime(0);
          setIsActive(false);
          handleTimerEnd();
        } else {
          setTime(newTimeLeft);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, startTime]);

  // Effect to handle when the timer reaches zero
  useEffect(() => {
    if (isActive && time === 0) {
      handleTimerEnd();
    }
  }, [time, isActive]);

  const addTimeProps = [
    { text: "+ 25", timeToAdd: time + 25 * 60 },
    { text: "+ 10", timeToAdd: time + 10 * 60 },
    { text: "+ 5", timeToAdd: time + 5 * 60 },
    { text: "+ 1", timeToAdd: time + 1 * 60 },
  ];

  return (
    <section className="bg-[var(--background)] h-[90vh] w-[70%] m-auto sm:w-auto flex flex-col gap-5 items-center justify-center">
      <article className="absolute top-0 w-full">
        <article className="absolute top-2 right-2 bg-[var(--primary)] p-3 border-4 border-[var(--accent)] shadow-[4px_4px_0_0_#102542] font-pixel text-white text-[10px] sm:text-xs uppercase select-none">
          <h2 className="font-bold leading-tight">
            Sessions Completed:
            <span className="font-normal">{" " + numOfSession}</span>
          </h2>
        </article>
      </article>

      <article>
        <SessionSwitch />
      </article>

      <article className="font-pixel select-none">
        <div className="relative flex justify-center items-center sm:h-80 sm:w-80 h-70 w-70">
          <img
            src={Pomodoro}
            alt="Pomodoro timer"
            className="absolute h-full w-full object-contain"
          />

          <div className="absolute flex flex-col items-center justify-center pt-10 w-full h-full z-10">
            <span className="text-4xl sm:text-5xl text-white drop-shadow-lg">
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
          className="cursor-pointer flex items-center gap-2 bg-[var(--primary)] text-white p-3 font-pixel text-xs uppercase 
               border-4 border-[var(--accent)] shadow-[4px_4px_0_0_#102542] 
               select-none transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          onClick={() => {
            setIsActive((prev) => {
              if (!prev) setStartTime(Date.now()); // Si se está iniciando (de pausa a activo)
              return !prev; // Alterna el estado
            });
          }}
        >
          {isActive ? "Pause" : "Play"}
        </button>

        <button
          className="cursor-pointer flex items-center gap-2 bg-[var(--primary)] text-white p-3 font-pixel text-xs uppercase 
               border-4 border-[var(--accent)] shadow-[4px_4px_0_0_#102542] 
               select-none transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          onClick={handleReset}
        >
          Reset
        </button>
      </article>
      <ToastContainer />
    </section>
  );
}
export default Timer;
