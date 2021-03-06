import { Card } from "page/deck-manager/build/cards/card/card";
import css from "page/deck-manager/build/cards/cards.module.scss";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";

export default function Cards({
  cards: cardsByMana,
  availableCards,
  isShowDetailsOnCard,
  isShowNamesOnCards,
  cardActionWrapper,
}) {
  return (
    <div>
      <div className={css.cardsContainer}>
        <div className={css.cardRows}>
        {cardsByMana.map(({ cards, mana }) => (
            <div key={mana} className={css.CardsStyle}>
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
        ))}
        </div>
        <div className={css.swipeHint}>
          {Array.from(Array(3)).map((_, pos) => (
            <FontAwesomeIcon key={pos} icon={faChevronUp} />
          ))}
          <div className={css.here}> swipe here</div>{" "}
          {Array.from(Array(3)).map((_, pos) => (
            <FontAwesomeIcon key={pos} icon={faChevronDown} />
          ))}
        </div>
      </div>
    </div>
  );
}
