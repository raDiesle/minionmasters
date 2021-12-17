import css from "page/wiki/once-bitten/once-bitten.module.scss";
import React from "react";
import { Card } from "page/deck-manager/build/cards/card/card";
import classNames from "classnames";

export function SecondColumn({ minions, header }) {
  return (
    <div className={classNames(css.column, css.otherColumn)}>
      <div className={css.headerOfOtherColumns}>{header}</div>
      {minions.map(
        ({ card, howManyHits, remainingHealth, transformAfterHits, manaEfficiency}) => (
          <div key={card.iD} className={css.cardWithInfo}>
            <Card card={card} isShowDetailsOnCard={false} isShowNamesOnCards={false}></Card>

            <div className={css.twoValues}>
              <div>Survive Hits</div>
              <div>{howManyHits}</div>
            </div>
            <div className={css.twoValues}>
              <div>Remain:</div>
              <div>{remainingHealth}</div>
            </div>

            <div className={classNames(css.twoValues)}>
              <div>Transform on hit:</div>
              <div>{transformAfterHits}</div>
            </div>

            <div className={classNames(css.twoValues)}>
              <div>Inefficiency mana score:</div>
              <div>{manaEfficiency}</div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
