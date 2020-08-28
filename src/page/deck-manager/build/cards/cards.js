import { Card } from "page/deck-manager/build/cards/card/card";
import css from "page/deck-manager/build/cards/cards.module.scss";
import React from "react";

export default function Cards({
  cards,
  availableCards,
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
                availableCards={availableCards}
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
