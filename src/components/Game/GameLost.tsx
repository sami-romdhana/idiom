import React from "react";
import { useTranslation } from "react-i18next";
import { useGameHandler } from "./GameHandler";

export default function GameLost() {
  const { t } = useTranslation();
  const { launchNewGame } = useGameHandler();

  return (
    <div className="GameLost">
      <div>{t("GAME.END.LOSS")}</div>

      <button onClick={launchNewGame}>{t("RESTART.BUTTON")}</button>
    </div>
  );
}
