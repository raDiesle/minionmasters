import { faCircle } from "@fortawesome/free-regular-svg-icons/faCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";

import { rarityMapping } from "rarity/rarityMapping";
import React from "react";

import { targetsMapping } from "../attack/targetsMapping";
import { typeMapping } from "../cardtype/typeMapping";

import { factionMapping } from "../faction/Factions";
import css from "./Card.module.scss";

//onClick to be removed and setter go here
export function Card({
  children,
  card: { image, manacost, rarity, type, faction, targets, name },
  isFullWidthClickable = false,
  isShowNames = false,
}) {
  const IMG_FOLDER = "generated/img/";
  const FILE_ENDING = ".webp";
  const IMG_PATH = IMG_FOLDER + image;

  return (
    <div
      className={classnames(
        css.CardContainerStyle,
        isFullWidthClickable && css.CardContainerStyleFullWidth
      )}
    >
      <div className={css.CardContentStyle}>
        <img src={`${IMG_PATH}_78${FILE_ENDING}`} alt={image} className={classnames(css.IMG)} />
        <div className={css.RightCornerStyle} style={{ borderTopColor: rarityMapping[rarity] }} />
        <div className={css.ManacostStyle}>{manacost}</div>

        <div className={css.TopLeftCornerStyle} />
        <div className={css.GroundAirStyle}>
          <FontAwesomeIcon icon={typeMapping[type] || faCircle} size={"xs"} />
        </div>

        <div className={css.BottomLeftCornerStyle} />
        <div className={css.FactionStyle}>{factionMapping[faction]}</div>

        {targetsMapping[targets] && (
          <>
            <div className={css.BottomRightCornerStyle} />
            <div className={css.AttackTypeStyle}>{targetsMapping[targets]}</div>
          </>
        )}
        {children}
      </div>
      <div className={css.CardNameStyle}>{isShowNames ? name : null}</div>
    </div>
  );
}
