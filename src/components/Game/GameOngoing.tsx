import React from "react";
import Round from "components/Round";
import { useGame } from "./useGame";
import heartIcon from "./images/heart.png";
import shieldIcon from "./images/shield.png";

export default function GameOngoing() {
  const { state, onRoundEnd, onFailedAttempt } = useGame();

  return (
    <>
      <div>
        Difficulty: {state.difficulty} | Round: {state.round}
      </div>

      <div className="Game--stats">
        <div>
          <img alt="Health" src={heartIcon} />
          <span>
            {state.health.value} / {state.health.max}
          </span>
        </div>
        <div>
          <img alt="Shield" src={shieldIcon} />
          <span>
            {state.armor.value} / {state.armor.max}
          </span>
        </div>
      </div>

      {!!state.word ? (
        <Round
          key={state.difficulty + "-" + state.round}
          word={state.word}
          initialAttempts={state.attempts}
          onEnd={onRoundEnd}
          onFailedAttempt={onFailedAttempt}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
