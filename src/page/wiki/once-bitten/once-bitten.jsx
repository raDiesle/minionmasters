import React, { useState } from "react";
import css from "page/wiki/once-bitten/once-bitten.module.scss";
import cardData from "generated/jobCardProps.json";
import { Card } from "page/deck-manager/build/cards/card/card";
import { ActionOverlay } from "page/wiki/once-bitten/action-overlay";
import { ThirdColumn } from "page/wiki/once-bitten/third-column";
import { SecondColumn, remainingHealth, manaEfficiency, howManyHits } from "page/wiki/once-bitten/second-column";
import groupBy from "lodash.groupby";
import { SortOnceInputs } from "page/wiki/once-bitten/sort-once-inputs";
import orderBy from "lodash/orderBy";

export function FirstColumn({ cards, setCurrentSelectedCard, currentSelectedCard }) {

  return <div className={css.table}>
    {cards.map(card => <div  key={card.iD}>
      <div>
        <Card
          card={card}
          isShowDetailsOnCard={false}
          isShowNamesOnCards={false}
          availableCards={[currentSelectedCard?.iD]}
        >
          <ActionOverlay card={card} setCurrentSelectedCard={setCurrentSelectedCard} />
        </Card>
      </div>
    </div>)}
  </div>;
}

export const BY_REMAINING_HEALTH = "byRemainingHealth";
export const BY_MANA_EFFICIENCY = "byManaEfficiency";
export const ORDER = "asc";

export function OnceBitten() {
  const [sortByProp, setSortByProp] = useState(BY_REMAINING_HEALTH);
  const [order, setOrder] = useState(ORDER);
  const [isSmartFilter, setIsSmartFilter] = useState(true);

  const [currentFirstSelectedCard, setCurrentSelectedCard] = useState(null);
  const minions = cardData.filter(({ type, rarity }) => type === "Minion" && rarity !== "Perk");


  const surviveNoHit = currentFirstSelectedCard ? groupBy(minions, ({ health }) => health <= currentFirstSelectedCard.damage) : [];

  const cardsSurvive = surviveNoHit["false"];
  const cardsNotSurviving = surviveNoHit["true"];
  const surviveHitSorted = sortByProp === BY_REMAINING_HEALTH ? orderBy(cardsSurvive, ({ health }) => remainingHealth({ health, currentFirstSelectedCard }), order) : orderBy(cardsSurvive, ({  health, manacost, count }) => manaEfficiency({  health, manacost, count, currentFirstSelectedCard }), order);

  const cardsWithSmartFilter = isSmartFilter ? surviveHitSorted.filter(({health}) => (howManyHits({health, currentFirstSelectedCard}) < 3) && (health < 601)) : surviveHitSorted;

  return <div className={css.page}>
    <div className={css.introduction}>Select the card, which the enemy plays. Second and Third Column shows your card
      you play and how it competes for Once Bitten transformation:
    </div>
    { currentFirstSelectedCard && <SortOnceInputs {...{ sortByProp, setSortByProp, order, setOrder, isSmartFilter, setIsSmartFilter }} /> }
    <div className={css.containerLayout}>
      <div className={css.column}>
        <div>Attacking unit</div>
        <FirstColumn cards={minions} setCurrentSelectedCard={setCurrentSelectedCard}
                     currentSelectedCard={currentFirstSelectedCard} />
      </div>
      {currentFirstSelectedCard !== null && <div>
        <div className={css.defendingHeader}>Defending Unit to be transformed</div>
        <div className={css.otherColumns}>
          <SecondColumn minions={minions}
                                                  currentFirstSelectedCard={currentFirstSelectedCard}
                                surviveHit={cardsWithSmartFilter} />
          <ThirdColumn minions={minions} currentFirstSelectedCard={currentFirstSelectedCard}
                       surviveNoHit={cardsNotSurviving} />
        </div>
      </div>
      }
    </div>
  </div>;
}