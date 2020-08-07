import { faCircle } from "@fortawesome/free-regular-svg-icons/faCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import CardBottomOverlay from "page/card-bottom-overlay";

import { RARITY_MAPPING_CONFIG } from "rarity/RARITY_MAPPING_CONFIG";
import React from "react";
import { typeMapping } from "../cardtype/typeMapping";
import css from "./Card.module.scss";

//onClick to be removed and setter go here
export function Card({
  children,
  card: { image, manacost, rarity, type, faction, targets, name },
  isShowDetailsOnCard = false,
}) {
  const IMG_FOLDER = "generated/img/";
  const FILE_ENDING = ".webp";
  const IMG_PATH = IMG_FOLDER + image;

  return (
    <div className={classnames(css.CardContainerStyle, css.CardContainerStyleFullWidth)}>
      <div className={css.CardContentStyle}>
        <img src={`${IMG_PATH}_78${FILE_ENDING}`} alt={image} className={classnames(css.IMG)} />
        <div
          className={css.RightCornerStyle}
          style={{ borderTopColor: RARITY_MAPPING_CONFIG[rarity] }}
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
      <div className={css.CardNameStyle}>{isShowDetailsOnCard ? name : null}</div>
    </div>
  );
}
