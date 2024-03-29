import { isForImagePreview } from "components/helper";
import { AddPremadeDeckButton } from "page/deck-manager/deck/add-premade-deck-button";

import BuildCardDeckActionOverlay from "page/deck-manager/deck/build-card-deck-action-overlay";
import { DeckButtons } from "page/deck-manager/deck/deck-buttons";
import { DeckCardsContainerStyle } from "page/deck-manager/deck/deck-cards-container-style";
import { DeckMasterAndCardsContainerStyle } from "page/deck-manager/deck/deck-master-and-cards-container-style";
import css from "page/deck-manager/deck/deck.module.scss";
import MasterDeckSlot from "page/deck-manager/deck/master-deck-slot";
import { RadioButton } from "page/deck-manager/deck/radio-button";
import AnalyzeDeck from "page/deck-manager/savedeck/analyze-deck";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page-config";
import React, { useRef } from "react";
import { DeckWithAnalysis } from "page/deck-manager/deck/deck-with-analysis";
import { Copyasimagetoclipboardbutton } from "page/deck-manager/deck/copyasimagetoclipboardbutton";

// refactor to only pass selectedCardId
export function Deck({
  selectedMaster,
  setSelectedMaster,
  setLastSelectedCards,
  lastSelectedCards,
  availableCards,
  selectedPremadeMaster,
  setSelectedPremadeMaster,
  lastSelectedPremadeCards,
  setLastSelectedPremadeCards,
  isPremadeDeckActive = null,
  setIsPremadeDeckActive,
}) {
  const isAnySelectedCard =
    !isForImagePreview &&
    lastSelectedCards.some(({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT);

  const deckWithAnalysisRef = useRef(null);
  const createCopyAsImageToClipboardButton = () =>   <Copyasimagetoclipboardbutton deckWithAnalysisRef={deckWithAnalysisRef} />;

  return (
    <fieldset className={css.deckFieldset}>
      <legend>Deck</legend>

      <div>
        {!isForImagePreview && (
          <DeckButtons
            {...{
              isPremadeDeckActive,
              setIsPremadeDeckActive,
              isAnySelectedCard,
              availableCards,
              selectedMaster,
              lastSelectedCards,
              setSelectedMaster,
              setLastSelectedCards,
              selectedPremadeMaster,
              lastSelectedPremadeCards,
              deckWithAnalysisRef
            }}
            CopyAsImageToClipboardButton={createCopyAsImageToClipboardButton}
          />
        )}

        <DeckWithAnalysis {...{selectedMaster, setSelectedMaster, lastSelectedCards, availableCards, setLastSelectedCards}}
              ref={deckWithAnalysisRef}
        />
      </div>

      {isPremadeDeckActive !== null && (
        <div>
          <RadioButton
            value={true}
            checked={isPremadeDeckActive === true}
            onChange={() => setIsPremadeDeckActive(true)}
          />

          <DeckMasterAndCardsContainerStyle
            masterEl={
              <MasterDeckSlot
                selectedMaster={selectedPremadeMaster}
                setSelectedMaster={setSelectedPremadeMaster}
              />
            }
          >
            <DeckCardsContainerStyle
              lastSelectedCards={lastSelectedPremadeCards}
              availableCards={availableCards}
              cardActionWrapper={(card) => (
                <BuildCardDeckActionOverlay
                  setLastSelectedCards={setLastSelectedPremadeCards}
                  card={card}
                />
              )}
            />
          </DeckMasterAndCardsContainerStyle>

          {lastSelectedPremadeCards.some(
            ({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT
          ) && (
            <AnalyzeDeck
              lastSelectedCards={lastSelectedPremadeCards}
              selectedMaster={selectedPremadeMaster}
            />
          )}
        </div>
      )}

      {!isForImagePreview && isPremadeDeckActive === null && (
        <AddPremadeDeckButton setIsPremadeDeckActive={setIsPremadeDeckActive} />
      )}
    </fieldset>
  );
}
