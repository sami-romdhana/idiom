import React, { lazy, Suspense, useState } from "react";
import Title from "components/Title";
import { GameProvider } from "components/Game/useGame";
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
          <GameProvider>
            <Game />
          </GameProvider>
        </Suspense>
      ) : (
        <button onClick={() => setInGame(true)}>Start Game</button>
      )}
    </div>
  );
}
