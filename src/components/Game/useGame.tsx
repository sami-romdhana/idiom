import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import { GameState, Locale, RoundResult, Status } from "model";

interface IGameContext {
  state: GameState;
  onRoundEnd: (result: RoundResult) => unknown;
  onFailedAttempt: () => unknown;
}

const GameContext = createContext<IGameContext>({
  state: {
    status: Status.Ongoing,
    difficulty: 0,
    round: 0,
    armor: {
      max: 0,
      value: 0,
    },
    health: {
      max: 0,
      value: 0,
    },
    attempts: 0,
    word: null,
  },
  onRoundEnd: () => {},
  onFailedAttempt: () => {},
});

export function GameProvider(props: PropsWithChildren<{}>) {
  const [state, setState] = useState<GameState>({
    status: Status.Ongoing,
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
    setState((state) => computeNextRound(state, result));
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
    <GameContext.Provider
      value={{
        state,
        onFailedAttempt,
        onRoundEnd,
      }}
      children={props.children}
    />
  );
}

export function useGame() {
  return useContext(GameContext);
}

function computeNextRound(state: GameState, result: RoundResult) {
  if (result !== Status.Won) {
    return {
      ...state,
      status: Status.Lost,
    };
  }

  let { status, round, armor, difficulty } = state;

  round++;
  armor.value = armor.max;

  if (round === 5) {
    const newMax = state.armor.max + 1;
    armor.value = newMax;
    armor.max = newMax;
    difficulty += 1;
    round = 1;
  }

  if (difficulty === 10) {
    status = Status.Won;
  }

  return {
    ...state,
    word: null,
    status,
    round,
    armor,
    difficulty,
  };
}

async function getRandomWord(length: number) {
  const words = await getWords(Locale.EN);
  const array = words.filter((word) => word.length === length);
  return array[Math.floor(Math.random() * array.length)];
}

async function getWords(locale: Locale) {
  switch (locale) {
    case Locale.EN:
      const wordObj = await import("words/en.json");
      return wordObj.en;
    default:
      throw new Error("Unknown locale: " + locale);
  }
}
