import React, { useMemo } from "react";
import i18next from "i18next";
import { Trans, useTranslation } from "react-i18next";
import { useGameHandler } from "./GameHandler";
import { useGame } from "./useGame";
import { Locale } from "model";

export default function GameLost() {
  const { t } = useTranslation();
  const { launchNewGame } = useGameHandler();
  const {
    state: { word },
  } = useGame();

  const locale = i18next.languages[0];
  const link = useMemo(() => getWiktionaryLink(word!.original, locale), [
    word,
    locale,
  ]);

  return (
    <div className="GameLost">
      <h2>{t("END.LOSS")}</h2>

      <p>{t("END.WORD.PRELUDE")}</p>

      <div className="GameLost--word">{word!.original}</div>

      <p>
        <Trans
          i18nKey="END.WORD.DEFINITION"
          components={{
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            tag: <a href={link} target="_blank" rel="noopener noreferrer" />,
          }}
        />
      </p>

      <button onClick={launchNewGame}>{t("RESTART.BUTTON")}</button>
    </div>
  );
}

function getWiktionaryLink(word: string, locale: string) {
  switch (locale) {
    case Locale.EN:
      return `https://en.wiktionary.org/wiki/${word}#English`;
    case Locale.FR:
      return `https://fr.wiktionary.org/wiki/${word}#Fran%C3%A7ais`;
    default:
      throw new Error("Unsupported locale");
  }
}
