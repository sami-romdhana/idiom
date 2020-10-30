import React, { useCallback, useMemo, useState } from "react";
import Row from "components/Row";
import "./style.css";

interface RoundProps {
  word: string;
}

export default function Round(props: RoundProps) {
  const { word } = props;

  const wordLength = useMemo(() => word.length, [word]);

  const [attempts, setAttempts] = useState<Array<string>>([]);
  const [value, setValue] = useState("");

  const onChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setValue(ev.target.value.slice(0, wordLength));
    },
    [wordLength]
  );

  const attempt = useCallback(() => {
    setAttempts((attempts) => {
      const newAttempts = attempts.concat();
      newAttempts.push(value.padEnd(wordLength, " "));
      return newAttempts;
    });
  }, [value, setAttempts, wordLength]);

  return (
    <div className="Round">
      <div className="Round--grid">
        {attempts.map((attempt, position) => (
          <Row key={attempt + position} attemptWord={attempt} goalWord={word} />
        ))}
      </div>

      <input type="text" value={value} onChange={onChange} />
      <button onClick={attempt}>Attempt</button>
    </div>
  );
}
