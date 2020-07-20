import React from "react";
import {Card} from "./Card";
import css from "./Cards.module.scss";

export default function Cards({
  cards,
  isShowNames,
  cardActionWrapper,
  fullCount,
  isFullWidthClickable,
}) {
  return (
    <div>
      <div className={css.CardsStyle}>
        {cards.map((card) => (
          <div key={card.iD}>
            <Card card={card} isFullWidthClickable={isFullWidthClickable}>
              {cardActionWrapper(card)}
            </Card>
            <div className={css.CardNameStyle}>
              {isShowNames ? card.name : null}
            </div>
          </div>
        ))}
      </div>
      Count: {cards.length}/{fullCount}
    </div>
  );
}
