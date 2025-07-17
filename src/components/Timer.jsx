import React, { useState } from "react";
import { CirclePlay, TimerReset, CirclePause } from "lucide-react";

function Timer({ initialTime, numOfSession = 0 }) {
  const [time, setTime] = useState(initialTime);
  const [active, setActive] = useState(false);
  const [session, setSession] = useState(numOfSession);

  console.log(active);

  return (
    <section className="bg-white h-screen flex flex-col gap-5 items-center justify-center">
      <article className="fixed top-5 right-5 bg-red-800 rounded-xl p-2">
        <h2 className="font-bold text-white text-xl">
          Current Session: <span className="font-normal">{numOfSession}</span>
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
        <span className="text-7xl">{initialTime}</span>
      </article>
      <article className="flex gap-3">
        <span className="border p-1.5 rounded-xl cursor-pointer">+ 25 min</span>
        <span className="border p-1.5 rounded-xl cursor-pointer">+ 10 min</span>
        <span className="border p-1.5 rounded-xl cursor-pointer">+ 5 min</span>
        <span className="border p-1.5 rounded-xl cursor-pointer">+ 1 min</span>
      </article>
      <button
        className="flex gap-1 bg-red-800 p-2.5 rounded-xl text-white cursor-pointer font-bold"
        onClick={() => {
          setActive(true);
        }}
      >
        <CirclePlay />
        Start
      </button>
      <article className="flex gap-4">
        <button className="flex gap-1 bg-red-800 p-2.5 rounded-xl text-white cursor-pointer font-bold">
          <CirclePause />
          Pause
        </button>
        <button
          className="flex gap-1 bg-red-800 p-2.5 rounded-xl text-white cursor-pointer font-bold"
          onClick={() => {
            setActive(false);
          }}
        >
          <TimerReset />
          Reset
        </button>
      </article>
    </section>
  );
}

export default Timer;
