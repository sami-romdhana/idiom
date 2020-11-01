import React, { useState } from "react";
import Title from "components/Title";
import Game from "components/Game";
import "./style.css";

export default function App() {
  const [inGame, setInGame] = useState(false);

  return (
    <div className="App">
      <div className="App--title">
        <Title />
      </div>

      {inGame ? (
        <Game />
      ) : (
        <button onClick={() => setInGame(true)}>Start Game</button>
      )}
    </div>
  );
}
