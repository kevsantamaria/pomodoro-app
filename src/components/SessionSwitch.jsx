import { useContext } from "react";
import { TimerContext } from "../contexts/TimerContext";

function SessionSwitch() {
  const { setTime, typeOfSession, setTypeOfSession, handleReset } =
    useContext(TimerContext);

  const sessionSwitchProps = [
    { type: "focus", time: 25 * 60, text: "Focus" },
    { type: "shortBreak", time: 5 * 1, text: "Short Break" },
    { type: "longBreak", time: 15 * 60, text: "Long Break" },
  ];

  const currentIndex = sessionSwitchProps.findIndex(
    (opt) => opt.type === typeOfSession
  );

  return (
    <section className="relative bg-[var(--accent)] p-2 px-5 flex mt-20 sm:mt-25 space-x-5 border-4 border-[var(--accent)] shadow-[4px_4px_0_0_#102542] font-pixel select-none uppercase sm:text-xs text-[10px]">
      {/* Slider */}
      <div
        className="absolute left-1 top-1 bg-[var(--primary)] transition-transform duration-300 ease-in-out"
        style={{
          width: "calc((100% - 8px) / 3)",
          height: "calc(100% - 8px)",
          transform: `translateX(${currentIndex * 100}%)`,
        }}
      />

      {sessionSwitchProps.map(({ type, time, text }) => (
        <div key={type} className="relative z-10 w-1/3 flex justify-center">
          <button
            className={`text-center transition-colors duration-300 cursor-pointer 
                    ${
                      typeOfSession === type
                        ? "text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
            onClick={() => {
              handleReset();
              setTypeOfSession(type);
              setTime(time);
            }}
          >
            {text}
          </button>
        </div>
      ))}
    </section>
  );
}

export default SessionSwitch;
