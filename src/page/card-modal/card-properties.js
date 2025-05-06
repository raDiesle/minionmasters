import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons/faHeart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "page/card-modal/card-properties.module.scss";
import React from "react";
import {
  CardImage,
  CardFaction,
  CardType,
  CardTarget,
  CardAttackSpeed,
  CardRadius,
  CardDamage,
  CardSingleDps,
  cardTotalDps,
  CardFlying,
  CardRarity,
  cardSingleDps,
  cardRange
} from "page/card-modal/helper/card-properties-helper";


export default function CardProperties({
  card: {
    imageName,
    CardCount,
    count,
    attackDelay,
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
    Weight,
    stationary,
    lifeTime,
    duration,
    delay,
  },
}) {
  const isAttacking = !isNaN(damage) && !isNaN(attackspeed) && ![damage, attackspeed].includes(0);

  return (
    <div className={css.CardPropertyUlStyle}>
      <li className={css.CardPropertyLiStyle}>
        <div className={css.CardPropertyKeyStyle}></div>
        <div className={css.PortraitStyle}>
          <CardImage imageName={imageName} />
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
          <CardFaction faction={faction} />
        </div>
      </li>
      <li className={css.CardPropertyLiStyle}>
        <div className={css.CardPropertyKeyStyle}>Type</div>
        <div className={css.CardProperyValue}>
          <CardType type={type} />
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
            <CardTarget targets={targets} />
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
          <div className={css.CardProperyValue}><CardAttackSpeed attackspeed={attackspeed} /></div>
        </li>
      )}

      {!isNaN(attackDelay) && isAttacking && (
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Attack Delay</div>
          <div className={css.CardProperyValue}>{attackDelay/1000 + " s"}</div>
        </li>
      )}
      {!isNaN(radius) && (
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Radius</div>
          <div className={css.CardProperyValue}><CardRadius radius={radius} /></div>
        </li>
      )}
      {!isNaN(damage) && (
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Damage</div>
          <div className={css.CardProperyValue}><CardDamage damage={damage} /></div>
        </li>
      )}
      {isAttacking && (
        <>
          <li className={css.CardPropertyLiStyle}>
            <div className={css.CardPropertyKeyStyle}>Single Dps</div>
            <div className={css.CardProperyValue}>
              {cardSingleDps({damage, attackspeed})}
            </div>
          </li>
          <li className={css.CardPropertyLiStyle}>
            <div className={css.CardPropertyKeyStyle}>Total Dps</div>
            <div className={css.CardProperyValue}>
              {cardTotalDps({ damage, attackspeed, count })}
            </div>
          </li>
        </>
      )}
      {isAttacking && (
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Range</div>
          <div className={css.CardProperyValue}>{cardRange({range})}</div>
        </li>
      )}
      {(speed !== 0 && speed) && (
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Speed</div>
          <div className={css.CardProperyValue}>{speed}</div>
        </li>
      )}
      {([true, false].includes(flying) && !stationary) && (
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Flying</div>
          <div className={css.CardProperyValue}>
            <CardFlying flying={flying} />
          </div>
        </li>
      )}
      {stationary && (
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Duration</div>
          <div className={css.CardProperyValue}>{lifeTime + " s"}</div>
        </li>
      )}
      {!isNaN(delay) &&
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Cast Delay</div>
          <div className={css.CardProperyValue}>{delay/1000 + " s"}</div>
        </li>
      }
      {duration !== 0 && duration &&
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Duration</div>
          <div className={css.CardProperyValue}>{duration/1000 + " s"}</div>
        </li>
      }
      {Weight &&
        <li className={css.CardPropertyLiStyle}>
          <div className={css.CardPropertyKeyStyle}>Weight</div>
          <div className={css.CardProperyValue}>{Weight}</div>
        </li>
      }

      <li className={css.CardPropertyLiStyle}>
        <div className={css.CardPropertyKeyStyle}>Rarity</div>
        <CardRarity rarity={rarity} />
      </li>
    </div>
  );
}
