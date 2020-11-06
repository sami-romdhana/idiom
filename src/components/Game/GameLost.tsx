import React from "react";
import { useTranslation } from "react-i18next";

export default function GameLost() {
  const { t } = useTranslation();

  return <div className="GameLost">{t("GAME.END.LOSS")}</div>;
}
