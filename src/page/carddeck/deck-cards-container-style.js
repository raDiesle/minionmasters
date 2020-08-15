import orderBy from "lodash/orderBy";
import { CardDeckSlot } from "page/carddeck/card-deck-slot";
import { findFirstNextFreeSlot } from "page/carddeck/deck-manager";
import React from "react";

export function DeckCardsContainerStyle({ lastSelectedCards, cardActionWrapper }) {
  const orderedCards = orderBy(
    lastSelectedCards,
    [({ card: { manacost } }) => parseInt(manacost), ({ card: { name } }) => name],
    ["asc", "asc"]
  );

  return (
    <>
      {orderedCards.map((selectedCard, slotPos) => (
        <CardDeckSlot
          key={selectedCard.card.iD + "_" + slotPos}
          isSelectedSlot={findFirstNextFreeSlot(lastSelectedCards) === slotPos}
          lastSelectedCard={selectedCard}
          cardActionWrapper={cardActionWrapper}
        />
      ))}
    </>
  );
}
