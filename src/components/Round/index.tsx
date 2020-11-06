import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import range from "lodash/range";
import last from "lodash/last";
import { RoundResult, RoundState } from "model";
import Row from "components/Row";
import "./style.css";

interface RoundProps {
  word: string;
  initialAttempts: number;
  onEnd: (result: RoundResult) => unknown;
  onFailedAttempt: () => unknown;
}

export default function Round(props: RoundProps) {
  const { word, initialAttempts, onEnd, onFailedAttempt } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const wordLength = useMemo(() => word.length, [word]);

  const [pastAttempts, setPastAttempts] = useState<Array<string>>([]);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(initialAttempts);
  const [value, setValue] = useState("");

  const onChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setValue(ev.target.value.slice(0, wordLength));
    },
    [wordLength]
  );

  const attempt = useCallback(() => {
    if (value.length !== wordLength) return;

    setPastAttempts((attempts) => {
      const newAttempts = attempts.concat();
      newAttempts.push(value.padEnd(wordLength, " "));
      return newAttempts;
    });
    setAttemptsLeft((attemptsLeft) => attemptsLeft - 1);
    setValue("");
  }, [value, setPastAttempts, wordLength, setValue]);

  const onKeyDown = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === "Enter") attempt();
    },
    [attempt]
  );

  const roundState = useMemo(() => {
    if (last(pastAttempts) === word) return RoundState.Won;
    if (attemptsLeft > 0) return RoundState.Ongoing;
    return RoundState.Lost;
  }, [attemptsLeft, pastAttempts, word]);

  useEffect(() => {
    setPastAttempts([]);
    inputRef.current?.focus();
  }, [word, wordLength]);

  useEffect(() => {
    if (roundState === RoundState.Ongoing) return;

    onEnd(roundState);
  }, [roundState, onEnd]);

  useEffect(() => {
    if (pastAttempts.length && last(pastAttempts) !== word) onFailedAttempt();
  }, [pastAttempts, word, onFailedAttempt]);

  return (
    <div className="Round">
      <div className="Round--known">
        The first letter is "{word[0].toUpperCase()}".
      </div>

      <div className="Round--grid">
        {pastAttempts.map((attempt, position) => (
          <Row key={attempt + position} attemptWord={attempt} goalWord={word} />
        ))}

        {range(0, attemptsLeft).map((position) => (
          <Row key={position} goalWord={word} />
        ))}
      </div>

      {roundState === RoundState.Ongoing && (
        <div className="Round--input">
          <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            ref={inputRef}
          />
          <button onClick={attempt}>Attempt</button>
        </div>
      )}

      {roundState === RoundState.Won && (
        <div className="Round--text">You won!</div>
      )}

      {roundState === RoundState.Lost && (
        <div className="Round--text">You lost... the word was "{word}".</div>
      )}
    </div>
  );
}
