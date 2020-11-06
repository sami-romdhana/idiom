import React from "react";
import { useTranslation } from "react-i18next";
import Round from "components/Round";
import { useGame } from "./useGame";
import heartIcon from "./images/heart.png";
import shieldIcon from "./images/shield.png";

export default function GameOngoing() {
  const { t } = useTranslation();
  const { state, onRoundEnd, onFailedAttempt } = useGame();

  return (
    <>
      <div className="Game--stats">
        <div>
          <div className="Game--valign">
            <img src={heartIcon} alt={t("GAME.INFO.HEALTH")} />
            <div>{t("GAME.INFO.HEALTH")}</div>
          </div>
          <div className="Game--valign">
            <span className="Game--stat">{state.health.value}</span>
            <span>/ {state.health.max}</span>
          </div>
        </div>

        <div>
          <div className="Game--valign">
            <img src={shieldIcon} alt={t("GAME.INFO.SHIELD")} />
            <div>{t("GAME.INFO.SHIELD")}</div>
          </div>
          <div className="Game--valign">
            <span className="Game--stat">{state.armor.value}</span>
            <span>/ {state.armor.max}</span>
          </div>
        </div>
      </div>

      <div className="Game--stats Game--stats-mini">
        <div>
          <div>{t("GAME.INFO.DIFFICULTY")}</div>
          <div className="Game--stat">{state.difficulty}</div>
        </div>
        <div>
          <div>{t("GAME.INFO.ROUND")}</div>
          <div className="Game--stat">{state.round + 1}</div>
        </div>
      </div>

      {!!state.word ? (
        <Round
          key={state.difficulty + "-" + state.round}
          word={state.word}
          initialAttempts={state.attempts}
          onEnd={onRoundEnd}
          onFailedAttempt={onFailedAttempt}
        />
      ) : (
        <p>{t("COMMON.VERB.LOADING")}</p>
      )}
    </>
  );
}
