import React from "react";
import { Card } from "page/deck-manager/build/cards/card/card";
import css from "page/deck-manager/build/cards/cards.module.scss";

export default function Cards({
  cards,
  isShowDetailsOnCard,
  isShowNamesOnCards,
  cardActionWrapper,
}) {
  return (
    <div>
      <div>
        <div className={css.CardsStyle}>
          {cards.map((card) => (
            <div key={card.iD}>
              <Card
                card={card}
                isShowDetailsOnCard={isShowDetailsOnCard}
                isShowNamesOnCards={isShowNamesOnCards}
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
