import React, { useMemo } from "react";
import Cell from "components/Cell";
import "./style.css";
import { LetterState } from "model";

interface RowProps {
  goalWord: string;
  attemptWord: string;
}

export default function Row(props: RowProps) {
  const { goalWord, attemptWord } = props;

  const letters = useMemo(() => attemptWord.split(""), [attemptWord]);

  return (
    <div className="Row">
      {letters.map((letter, position) => (
        <Cell
          key={letter + position}
          state={getWordState(goalWord, position, letter)}
        >
          {letter}
        </Cell>
      ))}
    </div>
  );
}

function getWordState(word: string, position: number, letter: string) {
  if (word.charAt(position) === letter) return LetterState.Correct;

  if (word.includes(letter)) return LetterState.Misplaced;

  return LetterState.Incorrect;
}
