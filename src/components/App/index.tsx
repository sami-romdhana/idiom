import React, { lazy, Suspense, useState } from "react";
import Title from "components/Title";
import "./style.css";

const Game = lazy(() => import("components/Game"));

export default function App() {
  const [inGame, setInGame] = useState(false);

  return (
    <div className="App">
      <div className="App--title">
        <Title />
      </div>

      {inGame ? (
        <Suspense fallback={<div>Loading</div>}>
          <Game />
        </Suspense>
      ) : (
        <button onClick={() => setInGame(true)}>Start Game</button>
      )}
    </div>
  );
}
