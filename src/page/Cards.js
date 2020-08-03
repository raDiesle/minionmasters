import React from "react";
import { Card } from "./Card";
import css from "./Cards.module.scss";

export default function Cards({ cards, isShowNames, cardActionWrapper, isFullWidthClickable }) {
  return (
    <div>
      <div>
        <div className={css.CardsStyle}>
          {cards.map((card) => (
            <div key={card.iD}>
              <Card
                card={card}
                isFullWidthClickable={isFullWidthClickable}
                isShowNames={isShowNames}
              >
                {cardActionWrapper(card)}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
