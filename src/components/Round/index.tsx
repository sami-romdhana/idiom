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
import Input from "components/Input";
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

  const attempt = useCallback(
    (value: string) => {
      if (value.length !== wordLength) return;

      setPastAttempts((attempts) => {
        const newAttempts = attempts.concat();
        newAttempts.push(value);
        return newAttempts;
      });
      setAttemptsLeft((attemptsLeft) => attemptsLeft - 1);
    },
    [setPastAttempts, wordLength]
  );

  const roundState = useMemo(() => {
    if (last(pastAttempts) === word) return RoundState.Won;
    if (attemptsLeft > 0) return RoundState.Ongoing;
    return RoundState.Lost;
  }, [attemptsLeft, pastAttempts, word]);

  useEffect(() => {
    if (roundState !== RoundState.Ongoing) onEnd(roundState);
  }, [roundState, onEnd]);

  useEffect(() => {
    if (pastAttempts.length && last(pastAttempts) !== word) onFailedAttempt();
  }, [pastAttempts, word, onFailedAttempt]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const knownLetters: string = useMemo(() => {
    let known = word[0] + " ".repeat(word.length - 1);

    for (let pastAttempt of pastAttempts) {
      for (let position = 1; position < word.length; position++) {
        const attemptLetter = pastAttempt[position];
        if (word[position] === attemptLetter)
          known = replaceAt(known, position, attemptLetter);
      }
    }

    return known;
  }, [word, pastAttempts]);

  return (
    <div className="Round">
      <div className="Round--grid">
        {pastAttempts.map((attempt, position) => (
          <Row
            key={word + attempt + position}
            attemptWord={attempt}
            goalWord={word}
          />
        ))}

        {roundState === RoundState.Ongoing && (
          <Row
            key={word + "known"}
            attemptWord={knownLetters}
            goalWord={word}
          />
        )}

        {roundState !== RoundState.Lost &&
          range(1, attemptsLeft).map((position) => (
            <Row key={word + position} goalWord={word} />
          ))}
      </div>

      {roundState === RoundState.Ongoing && (
        <div className="Round--input">
          <Input length={wordLength} onAttempt={attempt} inputRef={inputRef} />
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

function replaceAt(str: string, index: number, replacement: string) {
  return (
    str.substr(0, index) + replacement + str.substr(index + replacement.length)
  );
}
