import * as classnames from "classnames";
import { isForImagePreview } from "components/helper";
import isEmpty from "lodash.isempty";
import { ImportFromGameButton } from "page/deck-manager/deck/carddeckimport/import-from-game-button";
import css from "page/deck-manager/deck/deck.module.scss";
import { CopyDeckToGameButton } from "page/deck-manager/deck/export/copy-deck-to-game-button";
import ExportAsImage from "page/deck-manager/deck/export/export-as-image";
import {
  ExportAsUrlFromDeckManager,
  exportDeckUrl,
} from "page/deck-manager/deck/export/export-as-url";
import { RadioButton } from "page/deck-manager/deck/radio-button";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page-config";
import React from "react";

export function DeckButtons({
  isPremadeDeckActive,
  setIsPremadeDeckActive,
  isAnySelectedCard,
  availableCards,
  selectedMaster,
  lastSelectedCards,
  setSelectedMaster,
  setLastSelectedCards,
}) {
  return (
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
    </div>
  );
}
