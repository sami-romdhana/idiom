import React, { useCallback, useEffect, useState } from "react";
import { GameState, RoundResult, RoundState } from "model";
import Round from "components/Round";

export default function Game() {
  const [state, setState] = useState<GameState>({
    difficulty: 3,
    round: 0,
    word: null,
  });

  const onRoundEnd = useCallback((result: RoundResult) => {
    if (result === RoundState.Won) {
      setState((state) => {
        const round = state.round + 1;

        if (round < state.difficulty) {
          return {
            ...state,
            round,
          };
        }

        return {
          ...state,
          difficulty: state.difficulty + 1,
          round: 0,
        };
      });
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const word = await getRandomWord(state.difficulty);
      if (cancelled) return;
      setState((state) => ({ ...state, word }));
    })();

    return () => {
      cancelled = true;
    };
  }, [setState, state.difficulty, state.round]);

  return (
    <div className="Game">
      <p>
        Difficulty: {state.difficulty} | Round: {state.round}
      </p>

      {!!state.word ? (
        <Round word={state.word} onEnd={onRoundEnd} />
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
