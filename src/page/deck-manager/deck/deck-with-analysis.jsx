import React, { forwardRef } from "react";
import { DeckMasterAndCardsContainerStyle } from "page/deck-manager/deck/deck-master-and-cards-container-style";
import MasterDeckSlot from "page/deck-manager/deck/master-deck-slot";
import { DeckCardsContainerStyle } from "page/deck-manager/deck/deck-cards-container-style";
import BuildCardDeckActionOverlay from "page/deck-manager/deck/build-card-deck-action-overlay";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page-config";
import AnalyzeDeck from "page/deck-manager/savedeck/analyze-deck";
import css from "./deck-with-analysis.module.scss";


export const DeckWithAnalysis = forwardRef(
  ({selectedMaster, setSelectedMaster, lastSelectedCards, availableCards, setLastSelectedCards}, ref) => {
  return (
    <div ref={ref} className={css.backgroundColor}>
    <DeckMasterAndCardsContainerStyle
      masterEl={
        <MasterDeckSlot selectedMaster={selectedMaster} setSelectedMaster={setSelectedMaster} />
      }
    >
      <DeckCardsContainerStyle
        lastSelectedCards={lastSelectedCards}
        availableCards={availableCards}
        cardActionWrapper={(card) => (
          <BuildCardDeckActionOverlay setLastSelectedCards={setLastSelectedCards} card={card} />
        )}
      />
    </DeckMasterAndCardsContainerStyle>
  {lastSelectedCards.some(({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT) && (
    <AnalyzeDeck lastSelectedCards={lastSelectedCards} selectedMaster={selectedMaster} />
  )}
    </div>
  );
});