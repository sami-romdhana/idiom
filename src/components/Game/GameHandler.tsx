import React, { createContext, useCallback, useContext, useState } from "react";
import Game from ".";
import { GameProvider } from "./useGame";

const GameHandlerContext = createContext({
  launchNewGame: () => {},
});

export function GameHandler() {
  const [key, setKey] = useState<number>(1);

  const launchNewGame = useCallback(() => {
    debugger;
    setKey((key) => key + 1);
  }, [setKey]);

  return (
    <GameHandlerContext.Provider value={{ launchNewGame }}>
      <GameProvider key={key.toString()}>
        <Game />
      </GameProvider>
    </GameHandlerContext.Provider>
  );
}

export function useGameHandler() {
  return useContext(GameHandlerContext);
}
