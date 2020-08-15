import orderBy from "lodash/orderBy";
import BuildCardDeckActionOverlay from "page/carddeck/build-card-deck-action-overlay";
import { CardDeckSlot } from "page/carddeck/card-deck-slot";
import { findFirstNextFreeSlot } from "page/carddeck/deck-manager";
import { MasterAndCardsContainerStyle } from "page/carddeck/master-and-cards-container-style";
import MasterDeckSlot from "page/carddeck/master-deck-slot";
import React from "react";

// refactor to only pass selectedCardId
export function Deck({ selectedHero, setSelectedHero, setLastSelectedCards, lastSelectedCards }) {
  const orderedCards = orderBy(
    lastSelectedCards,
    [({ card: { manacost } }) => parseInt(manacost), ({ card: { name } }) => name],
    ["asc", "asc"]
  );

  return (
    <div>
      <MasterAndCardsContainerStyle>
        <MasterDeckSlot selectedHero={selectedHero} setSelectedHero={setSelectedHero} />

        {orderedCards.map((selectedCard, slotPos) => (
          <CardDeckSlot
            key={selectedCard.card.iD + "_" + slotPos}
            isSelectedSlot={findFirstNextFreeSlot(lastSelectedCards) === slotPos}
            lastSelectedCard={selectedCard}
            cardActionWrapper={(card) => (
              <BuildCardDeckActionOverlay setLastSelectedCards={setLastSelectedCards} card={card} />
            )}
          />
        ))}
      </MasterAndCardsContainerStyle>
    </div>
  );
}
