import BuildCardDeckActionOverlay from "page/deck-manager/deck/build-card-deck-action-overlay";
import { DeckCardsContainerStyle } from "page/deck-manager/deck/deck-cards-container-style";
import { DeckMasterAndCardsContainerStyle } from "page/deck-manager/deck/deck-master-and-cards-container-style";
import MasterDeckSlot from "page/deck-manager/deck/master-deck-slot";
import React from "react";

// refactor to only pass selectedCardId
export function Deck({
  selectedMaster,
  setSelectedMaster,
  setLastSelectedCards,
  lastSelectedCards,
}) {
  return (
    <div>
      <DeckMasterAndCardsContainerStyle
        masterEl={
          <MasterDeckSlot selectedMaster={selectedMaster} setSelectedMaster={setSelectedMaster} />
        }
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
