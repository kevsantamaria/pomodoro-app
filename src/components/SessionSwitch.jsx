import { useContext } from "react";
import { TimerContext } from "../contexts/TimerContext";

function SessionSwitch() {
  const { setTime, typeOfSession, setTypeOfSession } = useContext(TimerContext);

  const sessionSwitchProps = [
    { type: "focus", time: 25 * 60, text: "Focus" },
    { type: "shortBreak", time: 5 * 60, text: "Short Break" },
    { type: "longBreak", time: 15 * 60, text: "Long Break" },
  ];

  const currentIndex = sessionSwitchProps.findIndex((opt) => opt.type === typeOfSession);

  return (
    <section className="relative bg-[var(--accent)] p-2 px-5 flex mt-15 space-x-10 border-4 border-[var(--accent)] shadow-[4px_4px_0_0_#102542] font-pixel select-none uppercase sm:text-xs text-[12px]">
      {/* Slider */}
      <div
        className="absolute left-1 top-1 bg-[var(--primary)] transition-transform duration-300 ease-in-out"
        style={{
          width: "calc((100% - 8px) / 3)", // divide en 3 partes con padding
          height: "calc(100% - 8px)", // altura con margen interno
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
