import React from "react";
import classnames from "classnames";
import { LetterState } from "model";
import "./style.css";

interface CellProps {
  state: LetterState;
}

export default function Cell(props: React.PropsWithChildren<CellProps>) {
  return (
    <div
      className={classnames("Cell", {
        "Cell--correct": props.state === LetterState.Correct,
        "Cell--misplaced": props.state === LetterState.Misplaced,
        "Cell--incorrect": props.state === LetterState.Incorrect,
      })}
    >
      <div>{props.children}</div>
    </div>
  );
}
