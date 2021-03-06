import orderBy from "lodash/orderBy";
import { CardDeckSlot } from "page/deck-manager/deck/card-deck-slot";
import { findFirstNextFreeSlot } from "page/page-config";
import React from "react";

export function DeckCardsContainerStyle({ lastSelectedCards, cardActionWrapper, availableCards }) {
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
          availableCards={availableCards}
        />
      ))}
    </>
  );
}
