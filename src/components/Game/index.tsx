import React, { useCallback, useEffect, useState } from "react";
import { GameState, RoundResult, RoundState } from "model";
import Round from "components/Round";
import heartIcon from "./images/heart.png";
import shieldIcon from "./images/shield.png";
import "./style.css";

export default function Game() {
  const [state, setState] = useState<GameState>({
    difficulty: 3,
    round: 0,
    armor: {
      max: 5,
      value: 5,
    },
    health: {
      max: 3,
      value: 3,
    },
    attempts: 0,
    word: null,
  });

  const onFailedAttempt = useCallback(() => {
    setState((state) => ({
      ...state,
      armor: {
        ...state.armor,
        value: Math.max(0, state.armor.value - 1),
      },
      health: {
        ...state.health,
        value:
          state.armor.value > 0
            ? state.health.value
            : Math.max(0, state.health.value - 1),
      },
    }));
  }, [setState]);

  const onRoundEnd = useCallback((result: RoundResult) => {
    if (result !== RoundState.Won) {
      return;
    }

    setState((state) => {
      const round = state.round + 1;

      if (round < state.difficulty) {
        return {
          ...state,
          armor: {
            ...state.armor,
            value: state.armor.max,
          },
          round,
        };
      }

      const newArmorMax = state.armor.max + 1;

      return {
        ...state,
        armor: {
          max: newArmorMax,
          value: newArmorMax,
        },
        difficulty: state.difficulty + 1,
        round: 0,
      };
    });
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const word = await getRandomWord(state.difficulty);
      if (cancelled) return;
      setState((state) => ({
        ...state,
        word,
        attempts: state.armor.value + state.health.value,
      }));
    })();

    return () => {
      cancelled = true;
    };
  }, [setState, state.difficulty, state.round]);

  return (
    <div className="Game">
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
    </div>
  );
}

async function getRandomWord(length: number) {
  const wordObj = await import("words/en.json");
  const words = wordObj.en;
  const array = words.filter((word) => word.length === length);
  return array[Math.floor(Math.random() * array.length)];
}
