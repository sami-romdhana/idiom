import React from "react";
import { useTranslation } from "react-i18next";

export default function GameWon() {
  const { t } = useTranslation();

  return <div className="GameWon">{t("END.WIN")}</div>;
}
