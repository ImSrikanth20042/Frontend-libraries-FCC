import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [clicked, isClicked] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      playSound(event.key.toUpperCase());
    });
  });

  const audioClips = [
    {
      keyCode: 81,
      text: "Q",
      src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
    },
    {
      keyCode: 87,
      text: "W",
      src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
    },
    {
      keyCode: 69,
      text: "E",
      src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
    },
    {
      keyCode: 65,
      text: "A",
      src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
    },
    {
      keyCode: 83,
      text: "S",
      src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
    },
    {
      keyCode: 68,
      text: "D",
      src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
    },
    {
      keyCode: 90,
      text: "Z",
      src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
    },
    {
      keyCode: 88,
      text: "X",
      src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
    },
    {
      keyCode: 67,
      text: "C",
      src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3",
    },
  ];

  const playSound = (src) => {
    const audio = document.getElementById(src);
    audio.play();
    isClicked(src);
  };
  return (
    <div className="App">
      <div id="drum-machine">
        <div id="display">{clicked}</div>
        <div className="drum-pads">
          {audioClips.map((drumPad) => (
            <button
              onClick={() => {
                playSound(drumPad.text);
              }}
              className="drum-pad"
              id={drumPad.src}>
              {drumPad.text}
              <audio
                className="clip"
                id={drumPad.text}
                src={drumPad.src}></audio>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
