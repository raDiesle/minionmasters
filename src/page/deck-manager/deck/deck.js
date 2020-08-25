import { CopyDeckToGameButton } from "page/deck-manager/deck/export/copy-deck-to-game-button";
import {
  ExportAsUrlFromDeckManager,
  exportDeckUrl,
} from "page/deck-manager/deck/export/export-as-url";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page-config";
import React from "react";
import BuildCardDeckActionOverlay from "page/deck-manager/deck/build-card-deck-action-overlay";
import { DeckCardsContainerStyle } from "page/deck-manager/deck/deck-cards-container-style";
import { DeckMasterAndCardsContainerStyle } from "page/deck-manager/deck/deck-master-and-cards-container-style";
import ExportAsImage from "page/deck-manager/deck/export/export-as-image";
import MasterDeckSlot from "page/deck-manager/deck/master-deck-slot";
import css from "page/deck-manager/deck/deck.module.scss";
// refactor to only pass selectedCardId
export function Deck({
  selectedMaster,
  setSelectedMaster,
  setLastSelectedCards,
  lastSelectedCards,
}) {
  return (
    <fieldset className={css.deckFieldset}>
      <legend>Deck</legend>

      {lastSelectedCards.some(({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT) && (
        <>
          <div className={css.rightTopLeftLeftLegend}>
            <CopyDeckToGameButton master={selectedMaster} cards={lastSelectedCards} />
          </div>

          <div className={css.rightTopLeftLegend}>
            <ExportAsImage url={exportDeckUrl(selectedMaster, lastSelectedCards)} />
          </div>

          <div className={css.rightLeftLegend}>
            <ExportAsUrlFromDeckManager
              selectedMaster={selectedMaster}
              lastSelectedCards={lastSelectedCards}
            />
          </div>
        </>
      )}
      {/* ask someone to build deck with your available cards
      <div className={css.rightLeftLegend}>
        <ExportAsUrlFromDeckManager
          selectedMaster={selectedMaster}
          lastSelectedCards={lastSelectedCards}
        />
      </div>
      */}

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
    </fieldset>
  );
}
