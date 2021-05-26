import * as classnames from "classnames";
import { isForImagePreview } from "components/helper";
import isEmpty from "lodash.isempty";
import css from "page/deck-manager/deck/deck.module.scss";
import { ImportFromGameButton } from "page/deck-manager/deck/import-export/carddeckimport/import-from-game-button";
import { CopyDeckToGameButton } from "page/deck-manager/deck/import-export/export/copy-deck-to-game-button";
import ExportAsImage from "page/deck-manager/deck/import-export/url-import-export/export-as-image";
import {
  ExportAsUrlFromDeckManager,
  exportDeckUrl,
} from "page/deck-manager/deck/import-export/url-import-export/export-as-url";
import { RadioButton } from "page/deck-manager/deck/radio-button";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page-config";
import React from "react";
import cssButton from "components/button.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import cssHelpers from "components/helper.module.scss";
import { RandomGenerateDeck } from "page/deck-manager/deck/random-generate-deck";

export function DeckButtons({
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
            <ExportAsImage
              urlFn={() =>
                exportDeckUrl({
                  selectedMaster,
                  lastSelectedCards,
                  selectedPremadeMaster,
                  lastSelectedPremadeCards,
                })
              }
            />
          </div>
        </>
      )}

      {!isAnySelectedCard && (
        <div className={css.rightTopLeftLeftRandomLegend}>
          <RandomGenerateDeck
            setCards={setLastSelectedCards}
            setSelectedMaster={setSelectedMaster}
            availableCards={availableCards}
          />
        </div>
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
          lastSelectedPremadeCards={lastSelectedPremadeCards}
          selectedPremadeMaster={selectedPremadeMaster}
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
