import * as classnames from "classnames";

import { isForImagePreview } from "components/helper";
import isEmpty from "lodash.isempty";

import BuildCardDeckActionOverlay from "page/deck-manager/deck/build-card-deck-action-overlay";
import { ImportFromGameButton } from "page/deck-manager/deck/carddeckimport/import-from-game-button";
import { DeckCardsContainerStyle } from "page/deck-manager/deck/deck-cards-container-style";
import { DeckMasterAndCardsContainerStyle } from "page/deck-manager/deck/deck-master-and-cards-container-style";
import css from "page/deck-manager/deck/deck.module.scss";
import { CopyDeckToGameButton } from "page/deck-manager/deck/export/copy-deck-to-game-button";
import ExportAsImage from "page/deck-manager/deck/export/export-as-image";
import {
  ExportAsUrlFromDeckManager,
  exportDeckUrl,
} from "page/deck-manager/deck/export/export-as-url";
import MasterDeckSlot from "page/deck-manager/deck/master-deck-slot";
import { RadioButton } from "page/deck-manager/deck/radio-button";
import { SaveAsPremadeDeckButton } from "page/deck-manager/deck/save-as-premade-deck-button";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page-config";
import React from "react";

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

  return (
    <fieldset className={css.deckFieldset}>
      <legend>Deck</legend>

      <div>
        {isPremadeDeckActive !== null && (
          <RadioButton
            value={false}
            checked={isPremadeDeckActive === false}
            onChange={() => setIsPremadeDeckActive(false)}
          />
        )}

        {isAnySelectedCard && (
          <>
            <div
              className={
                isEmpty(availableCards)
                  ? css.rightTopLeftLeftLegendWithoutAvailableCards
                  : css.rightTopLeftLeftLegend
              }
            >
              <CopyDeckToGameButton master={selectedMaster} cards={lastSelectedCards} />
            </div>

            <div className={css.rightTopLeftExportImageLegend}>
              <ExportAsImage url={exportDeckUrl(selectedMaster, lastSelectedCards)} />
            </div>
          </>
        )}

        <div
          className={classnames(
            isAnySelectedCard
              ? css.rightTopLeftExportUrlLegendSelected
              : css.rightTopLeftExportUrlLegend
          )}
        >
          <ExportAsUrlFromDeckManager
            selectedMaster={selectedMaster}
            lastSelectedCards={lastSelectedCards}
            availableCards={availableCards}
          />
        </div>

        {!isForImagePreview &&
          lastSelectedCards.every(({ card: { iD } }) => iD === IDENTIFIER_FOR_EMPTY_SLOT) && (
            <div className={css.rightLeftLegend}>
              <ImportFromGameButton
                setSelectedMaster={setSelectedMaster}
                setLastSelectedCards={setLastSelectedCards}
              />
            </div>
          )}

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
      </div>

      {isPremadeDeckActive !== null && (
        <>
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
        </>
      )}

      {!isForImagePreview &&
        isPremadeDeckActive === null &&
        lastSelectedCards.every(({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT) && (
          <SaveAsPremadeDeckButton setIsPremadeDeckActive={setIsPremadeDeckActive} />
        )}
    </fieldset>
  );
}
