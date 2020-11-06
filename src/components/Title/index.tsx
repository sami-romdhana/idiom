import React from "react";
import { useTranslation } from "react-i18next";
import "./style.css";

export default function Title() {
  const { t } = useTranslation();

  return (
    <div className="Title">
      <h1>Idiom</h1>
      <p>{t("TAGLINE")}</p>
    </div>
  );
}
