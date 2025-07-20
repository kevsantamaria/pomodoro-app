import React, { useEffect, useState } from "react";
import { CirclePlay, TimerReset, CirclePause } from "lucide-react";

function Timer() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [typeOfSession, setTypeOfSession] = useState("focus"); // or 'shortBreak', or 'longBreak'
  const [numOfSession, setNumOfSession] = useState(0);

  useEffect(() => {
    let timer;

    if (isActive) {
      timer = setInterval(() => {
        setTime((prev) => { // decrement the time every second
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

  const handleTimerEnd = () => {
    setIsActive(false);
    if (typeOfSession === "focus") {
      const nextSession = numOfSession + 1;
      if (nextSession % 4 === 0) {
        setTypeOfSession("longBreak");
        setTime(15 * 60);
      } else {
        setTypeOfSession("shortBreak");
        setTime(5 * 60);
      }
      setNumOfSession(nextSession);
    } else {
      setTypeOfSession("focus");
      setTime(25 * 60);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(
      typeOfSession === "focus"
        ? 25 * 60
        : typeOfSession === "shortBreak"
        ? 5 * 60
        : 15 * 60
    );
  };

  return (
    <section className="bg-white h-screen flex flex-col gap-5 items-center justify-center">
      <article className="fixed top-5 right-5 bg-red-800 rounded-xl p-2">
        <h2 className="font-bold text-white text-xl">
          Sessions Completed:{" "}
          <span className="font-normal">{numOfSession}</span>
        </h2>
      </article>
      <article className="flex gap-6">
        <button className=" bg-gray-700 p-2.5 rounded-xl text-white cursor-pointer font-bold">
          Focus
        </button>
        <button className=" bg-gray-700 p-2.5 rounded-xl text-white cursor-pointer font-bold">
          Short Break
        </button>
        <button className=" bg-gray-700 p-2.5 rounded-xl text-white cursor-pointer font-bold">
          Long Break
        </button>
      </article>
      <article className="border-b-gray-700 m-5">
        <span className="text-7xl">
          {Math.floor(time / 60)}:{String(time % 60).padStart(2, "00")}
        </span>
      </article>
      <article className="flex gap-3">
        <span
          className="border p-1.5 rounded-xl cursor-pointer"
          onClick={() => setTime(time + 25 * 60)}
        >
          + 25 min
        </span>
        <span
          className="border p-1.5 rounded-xl cursor-pointer"
          onClick={() => setTime(time + 10 * 60)}
        >
          + 10 min
        </span>
        <span
          className="border p-1.5 rounded-xl cursor-pointer"
          onClick={() => setTime(time + 5 * 60)}
        >
          + 5 min
        </span>
        <span
          className="border p-1.5 rounded-xl cursor-pointer"
          onClick={() => setTime(time + 1 * 60)}
        >
          + 1 min
        </span>
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
