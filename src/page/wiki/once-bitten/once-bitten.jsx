import React, { useState } from "react";
import classNames from "classnames";
import css from "page/wiki/once-bitten/once-bitten.module.scss";

import cardData from "generated/jobCardProps.json";
import { Card } from "page/deck-manager/build/cards/card/card";
import { ActionOverlayToSelectFirstCard } from "page/wiki/once-bitten/action-overlay-to-select-first-card";
import { SurvivesNoHitColumn } from "page/wiki/once-bitten/survives-no-hit-column";
import { SecondColumn } from "page/wiki/once-bitten/second-column";
import groupBy from "lodash.groupby";
import orderBy from "lodash/orderBy";

export const howManyHits = ({ health, damage }) => {
  const divided = Math.floor(health / damage);
  const remaining = health % damage;
  return remaining === 0 ? divided - 1 : divided;
};

export const remainingHealth = ({ health, damage }) => {
  return health - howManyHits({ health, damage }) * damage;
};

export const transformAfterHits = ({ health = 0, damage = 0 }) => {
  const halfPercentHealth = health / 2;
  let count = 0;
  let remainingHealth = health;
  if(damage === 0){
    return 9999999999;
  }
  while (remainingHealth >= halfPercentHealth) {
    count++;
    remainingHealth = remainingHealth - damage;
  }
  return count;
};

export const manaEfficiency = ({ health, manacost, count, damage }) => {
  const manaForOneUnit = manacost / count;
  const remainingHealthResult = remainingHealth({ health, damage });
  const healthPercentage = (remainingHealthResult * 100) / health;
  const manaPercentageByHealthAndManaCount = (healthPercentage * manaForOneUnit) / 100;
  return manaPercentageByHealthAndManaCount.toFixed(2);
};

export function FirstColumn({ cards, setCurrentSelectedCard, currentSelectedCard }) {
  return (
    <div className={css.firstColumn}>
      {cards.map((card) => (
        <div key={card.iD}>
          <div>
            <Card
              card={card}
              isShowDetailsOnCard={false}
              isShowNamesOnCards={false}
              availableCards={[currentSelectedCard?.iD]}
            >
              <ActionOverlayToSelectFirstCard card={card} setCurrentSelectedCard={setCurrentSelectedCard} />
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}

export const BY_REMAINING_HEALTH = "byRemainingHealth";
export const BY_MANA_EFFICIENCY = "byManaEfficiency";
export const ORDER = "asc";

const OnceBittenCard = () => <Card card={cardData.find(({name}) => "Once Bitten" === name)} />;

export function OnceBitten() {

  const [sortByProp, setSortByProp] = useState(BY_REMAINING_HEALTH);
  const [order, setOrder] = useState(ORDER);

  const [currentFirstSelectedCard, setCurrentSelectedCard] = useState(null);
  const minions = cardData.filter(({ type, rarity }) => type === "Minion" && rarity !== "Perk");
  const { health, count, manacost} = currentFirstSelectedCard || {health: 1000, count: 1, manacost: 1};

  const enrichedCalculatedMinionsData = minions.map((card) => {
    const {damage} = card;
    if(damage === null){
    debugger;

    }
    return ({
      card,
      damage,
      remainingHealth : remainingHealth({ health, damage }),
      howManyHits: howManyHits({ health, damage }),
      manaEfficiency: manaEfficiency({ health, manacost, count, damage }),
      transformAfterHits: transformAfterHits({ health, damage })
    })
  });

  const surviveNoHit = currentFirstSelectedCard
    ? groupBy(enrichedCalculatedMinionsData, ({ damage }) => health <= damage)
    : [];


  const cardsSurvive = typeof surviveNoHit["false"] !== "undefined" ?  surviveNoHit["false"].filter(({damage}) => damage !== 0) : [];
  const cardsNotSurviving = typeof surviveNoHit["true"] !== "undefined" ? orderBy(surviveNoHit["true"], "damage") : [];
  const surviveHitSorted =
    sortByProp === BY_REMAINING_HEALTH
      ? orderBy(
          cardsSurvive,
          "remainingHealth",
          order
        )
      : orderBy(
          cardsSurvive,
          "manaEfficiency",
          order
        );

  const oneHitMinions = orderBy(surviveHitSorted.filter(({howManyHits}) => howManyHits === 1), "damage");
  const twoHitMinions = orderBy(surviveHitSorted.filter(({howManyHits}) => howManyHits === 2), "damage");
  const moreThanTwoHitsMinions = orderBy(surviveHitSorted.filter(({howManyHits}) => howManyHits > 2), "damage");


  const firstColumnMinions = orderBy(minions, "health");


  return (
    <div className={css.page}>
      <div className={css.introduction}>
        Select card
      </div>
      {/*{currentFirstSelectedCard && (
        <SortOnceInputs
          {...{ sortByProp, setSortByProp, order, setOrder }}
        />
      )}*/}
      <div className={css.containerLayout}>
        <div className={classNames( css.firstColumnWidth)}>
          <div className={css.header}>Your unit receiving Once Bitten</div>
          <FirstColumn
            cards={firstColumnMinions}
            setCurrentSelectedCard={setCurrentSelectedCard}
            currentSelectedCard={currentFirstSelectedCard}
          />
        </div>
        {currentFirstSelectedCard !== null && (
          <div>
            <div className={classNames(css.header)}>Enemy attacking your unit</div>
            <div className={classNames(css.defendingHeader, css.otherColumns)}>
              <SurvivesNoHitColumn minions={cardsNotSurviving} />
               <SecondColumn header="Survive 1 hit" minions={oneHitMinions} />
              <SecondColumn header="Survive 2 hits" minions={twoHitMinions} />
              <SecondColumn header="Survive > 2 hits" minions={moreThanTwoHitsMinions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
