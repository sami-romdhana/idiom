import React, { useMemo } from "react";
import range from "lodash/range";
import { LetterStatus } from "model";
import Cell from "components/Cell";
import "./style.css";

export interface RowProps {
  goalWord: string;
  attemptWord?: string;
}

export default function Row(props: RowProps) {
  const { goalWord, attemptWord } = props;

  const wordRange = useMemo(() => range(0, goalWord.length), [goalWord]);
  const letters = useMemo(() => attemptWord?.split(""), [attemptWord]);

  if (!letters) {
    return (
      <div className="Row">
        {wordRange.map((letter) => {
          return (
            <div className="Row--cell" key={letter}>
              <Cell state={LetterStatus.Default}></Cell>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="Row">
      {wordRange.map((position) => {
        const letter = letters[position];
        return (
          <div className="Row--cell" key={letter + position}>
            <Cell state={getWordState(goalWord, position, letter)}>
              {letter}
            </Cell>
          </div>
        );
      })}
    </div>
  );
}

function getWordState(word: string, position: number, letter: string) {
  if (word.charAt(position) === letter) return LetterStatus.Correct;
  if (word.includes(letter)) return LetterStatus.Misplaced;
  return LetterStatus.Incorrect;
}
