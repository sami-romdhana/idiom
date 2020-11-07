import React, { ChangeEvent, useCallback, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Title from "components/Title";
import { GameHandler } from "components/Game/GameHandler";
import "./style.css";

export default function App() {
  const { t, i18n } = useTranslation();
  const [inGame, setInGame] = useState(false);

  const onLanguageChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const language = event.target.value;
      i18n.changeLanguage(language);
    },
    [i18n]
  );

  return (
    <div className="App">
      <div className="App--title">
        <Title />
      </div>

      {inGame ? (
        <GameHandler />
      ) : (
        <>
          <button onClick={() => setInGame(true)}>{t("START.BUTTON")}</button>

          <div className="App--language">
            <label>
              <span>{t("START.LANGUAGE")}</span>
              <select value={i18next.languages[0]} onChange={onLanguageChange}>
                <option value="en">English</option>
                <option value="fr">français</option>
              </select>
            </label>
          </div>
        </>
      )}
    </div>
  );
}
