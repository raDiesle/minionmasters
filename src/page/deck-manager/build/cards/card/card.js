import { faCircle } from "@fortawesome/free-regular-svg-icons/faCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import { imgPathFn } from "components/helper";

import { RarityMappingConfig } from "components/rarity/rarity-mapping-config";
import { typeMapping } from "components/typeMapping";
import CardBottomOverlay from "page/deck-manager/build/cards/card/card-bottom-overlay";
import css from "page/deck-manager/card.module.scss";
import React from "react";

//onClick to be removed and setter go here
export function Card({
  children,
  card: { imageName, manacost, rarity, type, faction, targets, name },
  isShowDetailsOnCard = false,
  isShowNamesOnCards = false,
}) {
  return (
    <div className={classnames(css.CardContainerStyle, css.CardContainerStyleFullWidth)}>
      <div className={css.CardContentStyle}>
        <img src={`${imgPathFn(imageName)}`} alt={imageName} className={classnames(css.IMG)} />
        <div
          className={css.RightCornerStyle}
          style={{ borderTopColor: RarityMappingConfig[rarity] }}
        />

        <div className={css.ManacostStyle}>{manacost}</div>
        {isShowDetailsOnCard && (
          <>
            <div className={css.TopLeftCornerStyle} />
            <div className={css.GroundAirStyle}>
              <FontAwesomeIcon icon={typeMapping[type] || faCircle} size={"xs"} />
            </div>
            <CardBottomOverlay faction={faction} targets={targets} />
          </>
        )}

        {children}
      </div>
      <div className={css.CardNameStyle}>{isShowNamesOnCards ? name : null}</div>
    </div>
  );
}
