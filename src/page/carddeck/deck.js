import BuildCardDeckActionOverlay from "page/carddeck/build-card-deck-action-overlay";
import { DeckCardsContainerStyle } from "page/carddeck/deck-cards-container-style";
import { DeckMasterAndCardsContainerStyle } from "page/carddeck/deck-master-and-cards-container-style";
import MasterDeckSlot from "page/carddeck/master-deck-slot";
import React from "react";

// refactor to only pass selectedCardId
export function Deck({ selectedHero, setSelectedHero, setLastSelectedCards, lastSelectedCards }) {
  return (
    <div>
      <DeckMasterAndCardsContainerStyle
        masterEl={<MasterDeckSlot selectedHero={selectedHero} setSelectedHero={setSelectedHero} />}
      >
        <DeckCardsContainerStyle
          lastSelectedCards={lastSelectedCards}
          cardActionWrapper={(card) => (
            <BuildCardDeckActionOverlay setLastSelectedCards={setLastSelectedCards} card={card} />
          )}
        />
      </DeckMasterAndCardsContainerStyle>
    </div>
  );
}
