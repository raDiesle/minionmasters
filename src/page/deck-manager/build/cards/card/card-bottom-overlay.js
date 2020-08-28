import { targetsMapping } from "components/attack/targetsMapping";
import { factionMapping } from "components/faction/factions-mapping-config";
import css from "page/deck-manager/build/cards/card/card.module.scss";
import React from "react";

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
