import React from "react";
import { Status } from "model";
import { useGame } from "./useGame";
import GameOngoing from "./GameOngoing";
import GameLost from "./GameLost";
import GameWon from "./GameWon";
import "./style.css";

export default function Game() {
  const {
    state: { status },
  } = useGame();

  return (
    <div className="Game">
      {status === Status.Ongoing ? (
        <GameOngoing />
      ) : status === Status.Won ? (
        <GameWon />
      ) : (
        <GameLost />
      )}
    </div>
  );
}
