import { TYPES } from "components/typeMapping";
import { getCardDataFromCount } from "page/deck-manager/deck/import-export/export/export-helper";
import css from "page/deck-manager/savedeck/analyse-deck.module.scss";
import { RarityChart } from "page/deck-manager/savedeck/analyze/rarity-chart";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page-config";
import Tooltip from "rc-tooltip";
import React from "react";

export default function AnalyzeDeck({ lastSelectedCards }) {
  const selectedCards = getCardDataFromCount(
    lastSelectedCards.filter(({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT)
  ).map((card) => ({ card }));

  const totalMana = selectedCards.reduce((total, { card: { manacost } }) => {
    return total + manacost;
  }, 0);

  const numberOfCardsConsideringWildcards = selectedCards.length;

  const avgMana =
    numberOfCardsConsideringWildcards !== 0
      ? Math.round((totalMana / numberOfCardsConsideringWildcards) * 10) / 10
      : 0;

  const attackFlying = selectedCards.filter(({ card: { hitsFlying } }) => hitsFlying).length;
  const spells = selectedCards.filter(({ card: { type } }) => type === "Spell").length;

  const dps = selectedCards.reduce(
    (total, { card: { damage, attackspeed, count } }) =>
      attackspeed ? total + (damage / attackspeed) * count * 10000 : total,
    0
  );

  const dpsForDisplay = parseFloat((Math.round(dps) / 10).toFixed(0)); //

  const minionsWithAoe = selectedCards.reduce(
    (total, { card: { isAOE } }) => (isAOE ? total + 1 : total),
    0
  );

  const avgAttackDelay = selectedCards.reduce(
    (total, { card: { type, attackDelay, count } }) =>
      attackDelay
        ? {
            sum: total.sum + attackDelay * count,
            count: total.count + 1,
          }
        : total,
    {
      sum: 0,
      count: 0,
    }
  );
  const avgAttackDelayForDisplay = avgAttackDelay.sum
    ? Math.round(avgAttackDelay.sum / avgAttackDelay.count / 100).toFixed(0)
    : 0;

  const avgAttackSpeed = selectedCards.reduce(
    (total, { card: { type, attackspeed, count } }) =>
      attackspeed ? { sum: total.sum + attackspeed * count, count: total.count + 1 } : total,
    { sum: 0, count: 0 }
  );

  const avgAttackSpeedForDisplay = !!avgAttackSpeed.sum
    ? Math.round(avgAttackSpeed.sum / avgAttackSpeed.count / 100).toFixed(0)
    : 0;

  const bridgeControl = selectedCards.reduce(
    (total, { card: { type, count, typeSpell, manacost } }) =>
      [TYPES["Flying Minion"], TYPES.Minion].includes(type)
        ? total + (count > 1 ? 2 : 1) / manacost + 1
        : typeSpell === "SummonSpell"
        ? total + 1
        : total + 0,
    0
  );

  const totalPossibleForBridge = numberOfCardsConsideringWildcards * 2;

  const bridgeControlRatio = (bridgeControl / totalPossibleForBridge) * 100;

  const bridgeControlForDisplay = Math.round(bridgeControlRatio).toFixed(0);

  return (
    <fieldset className={css.analyzeFieldset}>
      <legend>Analysis</legend>
      <div className={css.AnalysisDataStyle}>
        <div className={css.property}>
          <b>Average Mana</b> <div>{avgMana}</div>
        </div>

        <Tooltip
          placement="top"
          overlay={
            <span>
              Only minions. If you want to include attack flying spells, ask fdmfdm for providing it
              ;)
            </span>
          }
        >
          <div className={css.property}>
            <b>Attack Flying</b> <div>{attackFlying}</div>
          </div>
        </Tooltip>

        <div className={css.property}>
          <b>Spells</b> <div>{spells}</div>
        </div>

        <Tooltip
          placement="top"
          overlay={<span>Damage / Attackspeed * Unit count (ignoring attack delay)</span>}
        >
          <div className={css.property}>
            <b>Total Dps</b>
            <div>{dpsForDisplay}</div>
          </div>
        </Tooltip>

        <Tooltip placement="top" overlay={<span>attackspeed * unitcount</span>}>
          <div className={css.property}>
            <b>Avg Attack Speed</b>
            <div>{avgAttackSpeedForDisplay}</div>
          </div>
        </Tooltip>

        <Tooltip
          placement="top"
          overlay={
            <span>
              (if unitCount === 1 -> 1. if unitCount > 1 -> 2. if summonUnitSpell -> 1) / maxMana=10
              : maxUnits=20
            </span>
          }
        >
          <div className={css.property}>
            <b>Bridge Control</b>
            <div>{bridgeControlForDisplay}%</div>
          </div>
        </Tooltip>

        <Tooltip placement="top" overlay={<span>attackdelay * unitcount </span>}>
          <div className={css.property}>
            <b>Avg Attack Delay</b>
            <div>{avgAttackDelayForDisplay}</div>
          </div>
        </Tooltip>

        <Tooltip
          placement="top"
          overlay={
            <span>
              If game data has no Area of Effect icon, its not included. Ask fdmfdm to fix ;)
            </span>
          }
        >
          <div className={css.property}>
            <b>Minions with AOE</b>
            <div>{minionsWithAoe}</div>
          </div>
        </Tooltip>
      </div>
      <RarityChart lastSelectedCards={lastSelectedCards} />

      <div className={css.disclaimer}>summoned units do not count to statistics</div>
    </fieldset>
  );
}
