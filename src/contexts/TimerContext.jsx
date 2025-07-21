import { createContext, useState } from "react";
export const TimerContext = createContext();

export function TimerContextProvider(props) {
  const [time, setTime] = useState(25 * 60);
  const [typeOfSession, setTypeOfSession] = useState("focus"); // or 'shortBreak', or 'longBreak'
  const [numOfSession, setNumOfSession] = useState(0);
  const [isActive, setIsActive] = useState(false);

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
    <TimerContext.Provider
      value={{
        time,
        setTime,
       // typeOfSession,
        setTypeOfSession,
        numOfSession,
        isActive,
        setIsActive,
        handleTimerEnd,
        handleReset,
      }}
    >
      {props.children}
    </TimerContext.Provider>
  );
}
