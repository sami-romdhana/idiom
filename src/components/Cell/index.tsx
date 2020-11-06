import React from "react";
import classnames from "classnames";
import { LetterStatus } from "model";
import "./style.css";

interface CellProps {
  state: LetterStatus;
}

export default function Cell(props: React.PropsWithChildren<CellProps>) {
  return (
    <div
      className={classnames("Cell", {
        "Cell--correct": props.state === LetterStatus.Correct,
        "Cell--misplaced": props.state === LetterStatus.Misplaced,
        "Cell--incorrect": props.state === LetterStatus.Incorrect,
      })}
    >
      <div>{props.children}</div>
    </div>
  );
}
