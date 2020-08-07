import React from "react";
import { targetsMapping } from "attack/targetsMapping";
import { factionMapping } from "faction/Factions";
import css from "page/Card.module.scss";

export default function CardBottomOverlay({ faction, targets }) {
  return (
    <>
      <div className={css.BottomLeftCornerStyle} />
      <div className={css.FactionStyle}>{factionMapping[faction]}</div>

      {targetsMapping[targets] && (
        <>
          <div className={css.BottomRightCornerStyle} />
          <div className={css.AttackTypeStyle}>{targetsMapping[targets]}</div>
        </>
      )}
    </>
  );
}
