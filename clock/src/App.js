import React, { useState } from "react";
import "./App.css";

function App() {
  const [sessionMode, isSessionMode] = useState(true);
  const [breakMode, isBreakMode] = useState(false);
  let breakSessionLength = 5 * 60;
  let sessionLength = 25 * 60;
  let sessionTimer;
  let breakTimer;

  const breakIncrement = () => {
    const breakInc = document.getElementById("break-length");
    if (breakSessionLength > 60 * 60) {
      return;
    }
    breakSessionLength += 60;
    breakInc.textContent = breakSessionLength / 60;
  };

  const breakDecrement = () => {
    const breakInc = document.getElementById("break-length");
    if (breakSessionLength - 60 === 0) {
      return;
    }
    breakSessionLength -= 60;
    breakInc.textContent = breakSessionLength / 60;
  };

  const sessionIncrement = () => {
    const breakInc = document.getElementById("session-length");
    if (sessionLength > 60 * 60) {
      return;
    }
    sessionLength += 60;
    breakInc.textContent = sessionLength / 60;
    if (sessionMode) {
      document.getElementById("minutes").textContent = sessionLength / 60;
    }
  };

  const sessionDecrement = () => {
    const breakInc = document.getElementById("session-length");
    if (sessionLength - 60 === 0) {
      return;
    }
    sessionLength -= 60;
    breakInc.textContent = sessionLength / 60;
    if (sessionMode) {
      document.getElementById("minutes").textContent = sessionLength / 60;
    }
  };

  const updateTimer = (length) => {
    if (Math.floor(length / 60).toString().length === 1) {
      document.getElementById("minutes").textContent =
        "0" + Math.floor(length / 60);
    } else {
      document.getElementById("minutes").textContent = Math.floor(length / 60);
    }
    if ((length % 60).toString().length === 1) {
      document.getElementById("seconds").textContent = "0" + (length % 60);
    } else {
      document.getElementById("seconds").textContent = length % 60;
    }
  };

  const startBreakTimer = () => {
    clearInterval(sessionTimer);
    isSessionMode(false);
    document.getElementById("timer-label").textContent = "Break";
    breakTimer = setInterval(() => {
      breakSessionLength -= 1;
      updateTimer(breakSessionLength);
      if (breakSessionLength === 0) {
        isBreakMode(false);
        sessionLength =
          parseInt(document.getElementById("session-length").textContent, 10) *
          60;
        updateTimer(sessionLength);
        startSessionTimer();
      }
    }, 1000);
  };

  const startSessionTimer = () => {
    clearInterval(breakTimer);
    isSessionMode(true);
    document.getElementById("timer-label").textContent = "Session";
    sessionTimer = setInterval(() => {
      sessionLength -= 1;
      updateTimer(sessionLength);
      if (sessionLength === 0) {
        isBreakMode(true);
        breakSessionLength =
          parseInt(document.getElementById("break-length").textContent, 10) *
          60;
        updateTimer(breakSessionLength);
        startBreakTimer();
      }
    }, 1000);
  };
  const startTimer = () => {
    if (sessionMode) {
      startSessionTimer();
    }
    if (breakMode) {
      startBreakTimer();
    }
  };

  const pauseTimer = () => {
    if (sessionMode) {
      clearInterval(sessionTimer);
    }
  };

  const resetTimer = () => {
    isSessionMode(true);

    breakSessionLength = 5 * 60;
    sessionLength = 25 * 60;
    document.getElementById("break-length").textContent =
      breakSessionLength / 60;
    document.getElementById("session-length").textContent = sessionLength / 60;
    clearInterval(sessionTimer);
    document.getElementById("minutes").textContent = sessionLength / 60;
    document.getElementById("seconds").textContent = "00";
  };

  return (
    <div className="App">
      <h1 className="Heading">25 + 5 Clock</h1>
      <div className="clock">
        <div className="break">
          <h2 id="break-label">Break Length</h2>
          <button id="break-decrement" onClick={breakDecrement}>
            -
          </button>
          <span id="break-length">5</span>
          <button id="break-increment" onClick={breakIncrement}>
            +
          </button>
        </div>
        <div className="session">
          <h2 id="session-label">Session Length</h2>
          <button id="session-decrement" onClick={sessionDecrement}>
            -
          </button>
          <span id="session-length">25</span>
          <button id="session-increment" onClick={sessionIncrement}>
            +
          </button>
        </div>
        <div className="timer">
          <h3 id="timer-label">Session</h3>
          <h3>
            <div id="time-left">
              <span id="minutes">25</span>:<span id="seconds">00</span>
            </div>
          </h3>
          <button onClick={startTimer} id="start_stop">
            Start
          </button>
          <button onClick={pauseTimer} id="start_Stop">
            Stop
          </button>
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
