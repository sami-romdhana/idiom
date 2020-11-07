import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import last from "lodash/last";
import { RoundResult, Status } from "model";
import { replaceAt } from "utils";
import Row, { RowProps } from "components/Row";
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

  const { t } = useTranslation();

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
    if (last(pastAttempts) === word) return Status.Won;
    if (attemptsLeft > 0) return Status.Ongoing;
    return Status.Lost;
  }, [attemptsLeft, pastAttempts, word]);

  useEffect(() => {
    if (roundState !== Status.Ongoing) onEnd(roundState);
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
      {roundState === Status.Ongoing && (
        <div className="Round--input">
          <Input length={wordLength} onAttempt={attempt} inputRef={inputRef} />
        </div>
      )}

      <div className="Round--grid">
        {roundState === Status.Ongoing && (
          <>
            <h2>{t("GAME.INFO.KNOWN")}</h2>

            <RoundRow
              key={word + "known"}
              attemptWord={knownLetters}
              goalWord={word}
            />
          </>
        )}

        {!!pastAttempts.length && (
          <>
            <h2>{t("GAME.INFO.ATTEMPTS")}</h2>

            {pastAttempts.map((attempt, position) => (
              <RoundRow
                key={word + attempt + position}
                attemptWord={attempt}
                goalWord={word}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function RoundRow(props: RowProps) {
  return (
    <div className="Round--row">
      <Row {...props} />
    </div>
  );
}
