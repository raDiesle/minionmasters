import css from "page/wiki/once-bitten/once-bitten.module.scss";
import React from "react";
import { Card } from "page/deck-manager/build/cards/card/card";
import classNames from "classnames";


export const howManyHits = ({ health, currentFirstSelectedCard }) => {
    const divided = Math.floor(health / currentFirstSelectedCard.damage);
    const remaining = health % currentFirstSelectedCard.damage;
    return remaining === 0 ? divided - 1 : divided;
  };

export const remainingHealth = ({ health, currentFirstSelectedCard }) => {
    return health - (howManyHits({ health, currentFirstSelectedCard }) * currentFirstSelectedCard.damage);
  };
export const transformAfterHits = ({ health, currentFirstSelectedCard }) => {
    const halfPercentHealth = health / 2;
    let count = 0;
    let remainingHealth = health;
    while (remainingHealth >= halfPercentHealth) {
      count++;
      remainingHealth = remainingHealth - currentFirstSelectedCard.damage;
    }
    return count;
  };




export const manaEfficiency = ({ health, manacost, count, currentFirstSelectedCard }) => {
    const manaForOneUnit = manacost / count;
    const remainingHealthResult = remainingHealth({ health, currentFirstSelectedCard });
    const healthPercentage = remainingHealthResult * 100 / health;
    const manaPercentageByHealthAndManaCount = healthPercentage * manaForOneUnit / 100;
    return manaPercentageByHealthAndManaCount.toFixed(2);
  };

export function SecondColumn({ surviveHit, currentFirstSelectedCard }) {

  return <div className={css.column}>
    <div className={css.surviveHeader}>Survives > 1 hit</div>
    {surviveHit.map(card => <div key={card.iD} className={css.cardWithInfo}>
        <Card
          card={card}
          isShowDetailsOnCard={false}
          isShowNamesOnCards={false}
        >
        </Card>

        <div className={css.twoValues}>
          <div>Survive Hits</div>
          <div>
            {howManyHits({ health: card.health, currentFirstSelectedCard })}
          </div>
        </div>
        <div className={css.twoValues}>
          <div>Remain:</div>
          <div>{remainingHealth({ health: card.health, currentFirstSelectedCard })}
          </div>
        </div>

        <div className={classNames(css.twoValues, css.transformAfter)}>
          <div>Transform after hit:</div>
          <div>{transformAfterHits({ health: card.health, currentFirstSelectedCard })}</div>
        </div>

        <div className={classNames(css.twoValues, css.transformAfter)}>
          <div>Mana Inefficiency score</div>
          <div>{manaEfficiency({ health: card.health, manacost: card.manacost, count: card.count, currentFirstSelectedCard })}</div>
        </div>
    </div>)}
  </div>;
}