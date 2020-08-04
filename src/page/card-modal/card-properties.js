import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { targetsMapping } from "attack/targetsMapping";
import { typeMapping } from "cardtype/typeMapping";
import { factionMapping } from "faction/Factions";
import css from "page/CardDetailsModal.module.scss";
import { RARITY_MAPPING_CONFIG } from "rarity/RARITY_MAPPING_CONFIG";
import React from "react";
import styled from "styled-components";

const CardPropertyUlStyle = styled.div`
  @media (max-width: 767px) {
    padding-top: 0;
    grid-row-gap: 5px;
    grid-column-gap: 2px;
    padding-bottom: 0px;
  }
  padding-bottom: 40px;

  padding-top: 30px;
  grid-row-gap: 25px;
  grid-column-gap: 10px;

  display: grid;
  grid-auto-flow: column;
  align-items: center;
  text-align: center;
  list-style-type: none;
  padding-inline-start: 0;

  & > div {
    //  margin: 1rem;
  }

  @media (max-width: 950px) {
    grid-auto-flow: unset;
    grid-template-columns: auto auto auto;
  }
`;

const CardPropertyKeyStyle = styled.div`
  font-weight: bold;
`;

const CardPropertyLiStyle = styled.div``;

const CardImageStyle = styled.img`
  width: 60px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const RarityStyle = styled.div`
  color: ${({ rarity }) => RARITY_MAPPING_CONFIG[rarity]};
`;

const PortraitStyle = styled.div`
  color: gold;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LikeStyle = styled.div`
  // display: flex;
  // justify-content: center;
`;

export default function CardProperties({
  card: {
    image,
    count,
    attackdelay,
    attackspeed,
    damage,
    faction,
    flying,
    health,
    manacost,
    range,
    rarity,
    speed,
    targets,
    type,
    radius,
  },
}) {
  const isAttacking = !isNaN(damage) && !isNaN(attackspeed) && ![damage, attackspeed].includes(0);

  const IMG_FOLDER = "generated/img/";
  const FILE_ENDING = ".webp";
  const WIDTH = "_78";
  const IMG_PATH = IMG_FOLDER + image + WIDTH + FILE_ENDING;
  return (
    <CardPropertyUlStyle>
      <CardPropertyLiStyle>
        <CardPropertyKeyStyle></CardPropertyKeyStyle>
        <PortraitStyle>
          {/*
                                <LikeStyle>
                                    <FontAwesomeIcon icon={faHeartSolid} size={"xs"}/><FontAwesomeIcon
                                    icon={faHeartSolid} size={"xs"}/>
                                    <FontAwesomeIcon icon={faHeartRegular} size={"xs"}/><FontAwesomeIcon
                                    icon={faHeartRegular} size={"xs"}/><FontAwesomeIcon icon={faHeartRegular}
                                                                                        size={"xs"}/>
                                </LikeStyle>
                                */}
          <CardImageStyle src={IMG_PATH} alt={image} />
        </PortraitStyle>
      </CardPropertyLiStyle>
      {image === "BloodImps.jpg" && (
        <CardPropertyLiStyle>
          <PortraitStyle>
            <LikeStyle>
              <FontAwesomeIcon icon={faHeartSolid} size={"xs"} color={"transparent"} />
            </LikeStyle>
            <img src="bloodimp_inline.jpg" width="60px" alt="bloodimp" />
          </PortraitStyle>
        </CardPropertyLiStyle>
      )}
      <CardPropertyLiStyle>
        <CardPropertyKeyStyle>Cost</CardPropertyKeyStyle>
        <div className={css.CardProperyValue}>{manacost}</div>
      </CardPropertyLiStyle>
      <CardPropertyLiStyle>
        <CardPropertyKeyStyle>Faction</CardPropertyKeyStyle>
        <div className={css.CardProperyValue}>
          {factionMapping[faction]} {faction}
        </div>
      </CardPropertyLiStyle>
      <CardPropertyLiStyle>
        <CardPropertyKeyStyle>Type</CardPropertyKeyStyle>
        <div className={css.CardProperyValue}>
          <FontAwesomeIcon icon={typeMapping[type]} size={"xs"} /> {type}
        </div>
      </CardPropertyLiStyle>
      {!isNaN(count) && (
        <CardPropertyLiStyle>
          <CardPropertyKeyStyle>Count</CardPropertyKeyStyle>
          <div className={css.CardProperyValue}>
            <img
              src="img/icon-count.png"
              style={{ width: "auto", height: "26px", verticalAlign: "middle" }}
            />
            {count}
          </div>
        </CardPropertyLiStyle>
      )}
      {isAttacking && (
        <CardPropertyLiStyle>
          <CardPropertyKeyStyle>Targets</CardPropertyKeyStyle>
          <div className={css.CardProperyValue}>
            {targetsMapping[targets] && (
              <>
                {targetsMapping[targets]} {targets}
              </>
            )}
          </div>
        </CardPropertyLiStyle>
      )}
      {!isNaN(health) && (
        <CardPropertyLiStyle>
          <CardPropertyKeyStyle>Health</CardPropertyKeyStyle>
          <div className={css.CardProperyValue}>{health}</div>
        </CardPropertyLiStyle>
      )}
      {isAttacking && (
        <CardPropertyLiStyle>
          <CardPropertyKeyStyle>Attack Speed</CardPropertyKeyStyle>
          <div className={css.CardProperyValue}>{attackspeed / 1000} s</div>
        </CardPropertyLiStyle>
      )}

      {!isNaN(attackdelay) && (
        <CardPropertyLiStyle>
          <CardPropertyKeyStyle>Attack Delay</CardPropertyKeyStyle>
          <div className={css.CardProperyValue}>{attackdelay}</div>
        </CardPropertyLiStyle>
      )}
      {!isNaN(radius) && (
        <CardPropertyLiStyle>
          <CardPropertyKeyStyle>Radius</CardPropertyKeyStyle>
          <div className={css.CardProperyValue}>
            <img
              src="img/icon-radius.png"
              alt="radius"
              style={{ width: "auto", height: "25px", verticalAlign: "text-top" }}
            />{" "}
            {radius / 1000}
          </div>
        </CardPropertyLiStyle>
      )}
      {!isNaN(damage) && (
        <CardPropertyLiStyle>
          <CardPropertyKeyStyle>Damage</CardPropertyKeyStyle>
          <div className={css.CardProperyValue}>{damage === 0 ? "-" : damage}</div>
        </CardPropertyLiStyle>
      )}
      {isAttacking && (
        <CardPropertyLiStyle>
          <CardPropertyKeyStyle>DPS</CardPropertyKeyStyle>
          <div className={css.CardProperyValue}>
            {Math.round((damage / attackspeed) * 10000) / 10}
          </div>
        </CardPropertyLiStyle>
      )}
      {isAttacking && (
        <CardPropertyLiStyle>
          <CardPropertyKeyStyle>Range</CardPropertyKeyStyle>
          <div className={css.CardProperyValue}>{range / 1000}</div>
        </CardPropertyLiStyle>
      )}
      {speed && (
        <CardPropertyLiStyle>
          <CardPropertyKeyStyle>Speed</CardPropertyKeyStyle>
          <div className={css.CardProperyValue}>{speed}</div>
        </CardPropertyLiStyle>
      )}
      {[true, false].includes(flying) && (
        <CardPropertyLiStyle>
          <CardPropertyKeyStyle>Flying</CardPropertyKeyStyle>
          <div className={css.CardProperyValue}>
            <FontAwesomeIcon icon={flying ? faCheck : faTimes} />
          </div>
        </CardPropertyLiStyle>
      )}
      <CardPropertyLiStyle>
        <CardPropertyKeyStyle>Rarity</CardPropertyKeyStyle>
        <RarityStyle className={css.CardProperyValue} rarity={rarity}>
          {rarity}
        </RarityStyle>
      </CardPropertyLiStyle>
    </CardPropertyUlStyle>
  );
}
