import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { targetsMapping } from "components/attack/targetsMapping";
import { factionMapping } from "components/faction/factions-mapping-config";
import { imgPathFn } from "components/helper";
import { RarityMappingConfig } from "components/rarity/rarity-mapping-config";
import { typeMapping } from "components/typeMapping";
import css from "page/card-modal/card-properties.module.scss";
import React from "react";

export default function CardProperties({
  card: {
    imageName,
    CardCount,
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
    Weight
  },
}) {
  const isAttacking = !isNaN(damage) && !isNaN(attackspeed) && ![damage, attackspeed].includes(0);

  return (
    <div className={css.CardPropertyUlStyle}>
      <li className={css.CardPropertyLiStyle}>
        <div className={css.CardPropertyKeyStyle}></div>
        <div className={css.PortraitStyle}>
          {/*
                                <div>
                                    <FontAwesomeIcon icon={faHeartSolid} size={"xs"}/><FontAwesomeIcon
                                    icon={faHeartSolid} size={"xs"}/>
                                    <FontAwesomeIcon icon={faHeartRegular} size={"xs"}/><FontAwesomeIcon
                                    icon={faHeartRegular} size={"xs"}/><FontAwesomeIcon icon={faHeartRegular}
                                                                                        size={"xs"}/>
                                </div>
                                */}
          <img className={css.CardImageStyle} src={imgPathFn(imageName)} alt={imageName} />
        </div>
      </li>
      {imageName === "BloodImps.jpg" && (
        <li className={css.CardPropertyLiStyle}>
          <div className={css.PortraitStyle}>
            <div>
              <FontAwesomeIcon icon={faHeartSolid} size={"xs"} color={"transparent"} />
            </div>
            <img src="bloodimp_inline.jpg" width="60px" alt="bloodimp" />
          </div>
        </li>
      )}
      <li className={css.CardPropertyLiStyle}>
        <div className={css.CardPropertyKeyStyle}>Allowed Wildcards</div>
        <div className={css.CardProperyValue}>{CardCount}</div>
      </li>
      <li className={css.CardPropertyLiStyle}>
        <div className={css.CardPropertyKeyStyle}>Cost</div>
        <div className={css.CardProperyValue}>{manacost}</div>
      </li>
      <li className={css.CardPropertyLiStyle}>
        <div className={css.CardPropertyKeyStyle}>Faction</div>
        <div className={css.CardProperyValue}>
          {factionMapping[faction]} {faction}
        </div>
      </li>
      <li className={css.CardPropertyLiStyle}>
        <div className={css.CardPropertyKeyStyle}>Type</div>
        <div className={css.CardProperyValue}>
          <FontAwesomeIcon icon={typeMapping[type]} size={"xs"} /> {type}
        </div>
      </li>
      {!isNaN(count) && (
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Unit Count</div>
          <div className={css.CardProperyValue}>{count}</div>
        </li>
      )}
      {isAttacking && (
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Targets</div>
          <div className={css.CardProperyValue}>
            {targetsMapping[targets] && (
              <>
                {targetsMapping[targets]} {targets}
              </>
            )}
          </div>
        </li>
      )}
      {!isNaN(health) && (
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Health</div>
          <div className={css.CardProperyValue}>{health}</div>
        </li>
      )}
      {isAttacking && (
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Attack Speed</div>
          <div className={css.CardProperyValue}>{attackspeed / 1000} s</div>
        </li>
      )}

      {!isNaN(attackdelay) && (
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Attack Delay</div>
          <div className={css.CardProperyValue}>{attackdelay}</div>
        </li>
      )}
      {!isNaN(radius) && (
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Radius</div>
          <div className={css.CardProperyValue}>{radius / 1000}</div>
        </li>
      )}
      {!isNaN(damage) && (
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Damage</div>
          <div className={css.CardProperyValue}>{damage === 0 ? "-" : damage}</div>
        </li>
      )}
      {isAttacking && (
        <>
          <li className={css.CardPropertyLiStyle}>
            <div className={css.CardPropertyKeyStyle}>Single Dps</div>
            <div className={css.CardProperyValue}>
              {Math.round((damage / attackspeed) * 10000) / 10}
            </div>
          </li>
          <li className={css.CardPropertyLiStyle}>
            <div className={css.CardPropertyKeyStyle}>Total Dps</div>
            <div className={css.CardProperyValue}>
              {Math.round((damage / attackspeed) * count * 10000) / 10}
            </div>
          </li>
        </>
      )}
      {isAttacking && (
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Range</div>
          <div className={css.CardProperyValue}>{range / 1000}</div>
        </li>
      )}
      {speed && (
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Speed</div>
          <div className={css.CardProperyValue}>{speed}</div>
        </li>
      )}
      {[true, false].includes(flying) && (
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Flying</div>
          <div className={css.CardProperyValue}>
            <FontAwesomeIcon icon={flying ? faCheck : faTimes} />
          </div>
        </li>
      )}
      {Weight &&
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Weight</div>
          <div className={css.CardProperyValue}>{Weight}</div>
        </li>
      }

      <li className={css.CardPropertyLiStyle}>
        <div className={css.CardPropertyKeyStyle}>Rarity</div>
        <div className={css.CardProperyValue} style={{ color: RarityMappingConfig[rarity] }}>
          {rarity}
        </div>
      </li>
    </div>
  );
}
