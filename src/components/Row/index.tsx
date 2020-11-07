import React, { useMemo } from "react";
import range from "lodash/range";
import { LetterStatus } from "model";
import { replaceAt } from "utils";
import Cell from "components/Cell";
import "./style.css";

export interface RowProps {
  goalWord: string;
  attemptWord: string;
  showValidity?: boolean;
}

export default function Row(props: RowProps) {
  const { goalWord, attemptWord, showValidity = true } = props;

  const wordRange = useMemo(() => range(0, goalWord.length), [goalWord]);
  const letters = useMemo(() => attemptWord.split(""), [attemptWord]);
  const lettersStatus = useMemo(
    () => (showValidity ? computeLetterStatus(goalWord, attemptWord) : []),
    [showValidity, goalWord, attemptWord]
  );

  return (
    <div className="Row">
      {wordRange.map((position) => {
        const letter = letters[position];
        return (
          <div className="Row--cell" key={letter + position}>
            <Cell
              state={
                showValidity ? lettersStatus[position] : LetterStatus.Default
              }
            >
              {letter}
            </Cell>
          </div>
        );
      })}
    </div>
  );
}

function computeLetterStatus(goal: string, attempt: string) {
  let filteredGoal = goal;
  let filteredAttempt = attempt;
  let status: LetterStatus[] = Array(goal.length).fill(LetterStatus.Incorrect);

  // First pass for correct letters

  for (let i = 0; i < goal.length; i++) {
    if (attempt[i] !== goal[i]) continue;
    filteredGoal = replaceAt(filteredGoal, i, "_");
    filteredAttempt = replaceAt(filteredAttempt, i, "_");
    status[i] = LetterStatus.Correct;
  }

  // Second pass for misplaced letters

  for (let i = 0; i < goal.length; i++) {
    if (filteredAttempt[i] === "_") continue;
    const index = filteredGoal.indexOf(filteredAttempt[i]);
    if (index === -1) continue;
    filteredGoal = replaceAt(filteredGoal, index, "_");
    filteredAttempt = replaceAt(filteredAttempt, i, "_");
    status[i] = LetterStatus.Misplaced;
  }

  return status;
}
