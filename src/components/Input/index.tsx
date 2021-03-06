import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Row from "components/Row";
import "./style.css";

interface InputProps {
  length: number;
  onAttempt: (word: string) => unknown;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function Input(props: InputProps) {
  const { length, onAttempt, inputRef } = props;

  const { t } = useTranslation();

  const [value, setValue] = useState("");

  const attempt = useCallback(() => {
    if (value.length !== length) return;

    onAttempt(value);
    setValue("");
  }, [length, onAttempt, value, setValue]);

  const onChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value.toLocaleLowerCase());
  }, []);

  const onKeyDown = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === "Enter") attempt();
    },
    [attempt]
  );

  return (
    <div className="Input">
      <div className="Input--wrapper">
        <Row
          goalWord={"_".repeat(length)}
          attemptWord={value.padEnd(length, " ")}
          showValidity={false}
        />

        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          maxLength={length}
          ref={inputRef}
        />
      </div>

      <button onClick={attempt}>{t("GAME.BUTTON.ATTEMPT")}</button>
    </div>
  );
}
