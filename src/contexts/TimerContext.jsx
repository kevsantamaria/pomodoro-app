import { createContext, useState } from "react";
import { Bounce, toast } from "react-toastify";

const TimerContext = createContext();

function TimerContextProvider({ children }) {
  const [time, setTime] = useState(25 * 60);
  const [typeOfSession, setTypeOfSession] = useState("focus"); // or 'shortBreak', or 'longBreak'
  const [numOfSession, setNumOfSession] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const notification = () => {
    toast.success("Session completed! :D", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const handleTimerEnd = () => {
    setIsActive(false);
    notification();
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
        typeOfSession,
        setTypeOfSession,
        numOfSession,
        isActive,
        setIsActive,
        handleTimerEnd,
        handleReset,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export { TimerContext, TimerContextProvider };
