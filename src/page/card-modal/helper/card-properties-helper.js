import css from "page/card-modal/card-properties.module.scss";
import { imgPathFn } from "components/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { typeMapping } from "components/typeMapping";
import { targetsMapping, TARGET_IS_SPELL } from "components/attack/targetsMapping";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { RarityMappingConfig } from "components/rarity/rarity-mapping-config";
import React from "react";
import { factionMapping } from "components/faction/factions-mapping-config";
import { isNaN, isUndefined } from "lodash";

export function CardImage({imageName}) {
  return <img className={css.CardImageStyle} src={imgPathFn(imageName)} alt={imageName} />;
}

export function CardFaction({faction}){
  return <>{factionMapping[faction]} {faction}</>
}

export function CardTypeIcon({type}) {
  return typeMapping[type] ? <FontAwesomeIcon icon={typeMapping[type]} size={"xs"} /> : null;
}

export function CardType({type}) {
  return <> <CardTypeIcon type={type} /> {type}</>;
}

export function CardTargetsIcon({targets}) {
  return targets !== TARGET_IS_SPELL ? targetsMapping[targets] : null;
}

export function CardTarget({targets}) {
  return <>
    {targetsMapping[targets] && (
      <>
        <CardTargetsIcon targets={targets}/> {targets}
      </>
    )}
  </>;
}

export function CardAttackSpeed({attackspeed}) {
  return !isUndefined(attackspeed) && !isNaN(attackspeed) && attackspeed !== 0 ? <>{attackspeed / 1000} s</> : null;
}

export function CardRadius({radius}) {
  return !isUndefined(radius) && !isNaN(radius)  ? <>{radius / 1000}</> : null;
}

export function CardDamage({damage}) {
  return <>{damage === 0 ? "-" : damage}</>;
}

export function cardSingleDps({damage, attackspeed}) {
  return !isUndefined(attackspeed) && damage !== 0 && !isNaN(attackspeed) ? Math.round((damage / attackspeed) * 1000) : null;
}

export function cardTotalDps({damage, attackspeed, count}) {
  return !isUndefined(attackspeed) && damage !== 0 ? Math.round((damage / attackspeed) * count * 1000) : null;
}

export function cardRange({range}) {
  return !isUndefined(range) ? Math.round(range / 100) / 10 : null;
}

export function CardFlying({flying}) {
  return <FontAwesomeIcon icon={flying ? faCheck : faTimes} />;
}

export function CardRarity({rarity}) {
  return <div className={css.CardProperyValue} style={{ color: RarityMappingConfig[rarity] }}>
    {rarity}
  </div>;
}

export const CardAttackDelay = ({attackDelay})  => !isUndefined(attackDelay) && !isNaN(attackDelay) ? <>{attackDelay / 1000}</> : null;
