import React, { useCallback, useEffect, useMemo, useState } from "react";
import range from "lodash/range";
import { RoundState } from "model";
import Row from "components/Row";
import "./style.css";

interface RoundProps {
  word: string;
}

export default function Round(props: RoundProps) {
  const { word } = props;

  const wordLength = useMemo(() => word.length, [word]);

  const [pastAttempts, setPastAttempts] = useState<Array<string>>([]);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(0);
  const [value, setValue] = useState("");

  const onChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setValue(ev.target.value.slice(0, wordLength));
    },
    [wordLength]
  );

  const attempt = useCallback(() => {
    if (wordLength === 0) return;

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
    if (pastAttempts[pastAttempts.length - 1] === word) return RoundState.Won;
    if (attemptsLeft > 0) return RoundState.Ongoing;
    return RoundState.Lost;
  }, [attemptsLeft, pastAttempts, word]);

  useEffect(() => {
    setPastAttempts([]);
    setAttemptsLeft(getInitialAttempts(wordLength));
  }, [word, wordLength]);

  return (
    <div className="Round">
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

function getInitialAttempts(length: number) {
  return Math.max(7, Math.pow(length - 7, 2) + 7);
}
