import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";

import { CURRENT_GAME_VERSION } from "components/helper";
import { ButtonGroupStyle } from "page/deck-manager/build/filters/ButtonFilterGroup";
import cssButton from "page/deck-manager/build/filters/ButtonFilterGroup.module.scss";
import AddMasterToDeckOrOpenDetailsActionOverlay from "page/deck-manager/build/masters/add-master-to-deck-or-open-details-action-overlay";
import Master from "page/deck-manager/build/masters/master";
import CardForDeckActionOverlay from "page/deck-manager/deck/cardfordeck-actionoverlay";
import { DeckCardsContainerStyle } from "page/deck-manager/deck/deck-cards-container-style";
import { DeckMasterAndCardsContainerStyle } from "page/deck-manager/deck/deck-master-and-cards-container-style";
import { CopyDeckToGameButton } from "page/deck-manager/deck/decks/copy-deck-to-game-button";
import css from "page/deck-manager/deck/decks/decks.module.scss";
import ExportAsImage from "page/deck-manager/deck/export/export-as-image";
import { exportDeckUrl } from "page/deck-manager/deck/export/export-as-url";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

export function SavedDeck({
  deck,
  deck: { master },
  deck: { cards },
  setSelectedMaster,
  setLastSelectedCards,
}) {
  const url = exportDeckUrl(master, cards);
  return (
    <fieldset className={css.singleDeck} key={deck.createdAt.getTime()}>
      <legend>
        <div className={css.deckLegend}>{deck.deckname}</div>
      </legend>
      <div className={css.deckRightLegend}>
        v{deck.createdAtVersion ? deck.createdAtVersion : CURRENT_GAME_VERSION}
      </div>
      <div className={css.deckRightBottomLegend}>
        by {deck.createdByDisplayName ? deck.createdByDisplayName : "unknown"}
      </div>

      <div className={css.deckLeftBottomLegend}>
        <CopyDeckToGameButton master={deck.master} cards={deck.cards} />
      </div>

      <div className={css.deckLeftBottomSecondaryLegend}>
        <ExportAsImage url={url} />
      </div>

      <div>
        <DeckMasterAndCardsContainerStyle
          masterEl={
            <div>
              <Master
                masterKey={deck.master}
                actionRegistrationComponent={(selectedMasterKey) => (
                  <AddMasterToDeckOrOpenDetailsActionOverlay
                    masterKey={selectedMasterKey}
                    setSelectedMaster={setSelectedMaster}
                  />
                )}
              />
            </div>
          }
        >
          <DeckCardsContainerStyle
            lastSelectedCards={cards}
            cardActionWrapper={(card) => (
              <CardForDeckActionOverlay card={card} setLastSelectedCards={setLastSelectedCards} />
            )}
          />
        </DeckMasterAndCardsContainerStyle>
        <div className={css.belowDeck}>
          <div className={css.description}>{deck.description}</div>
        </div>
      </div>
    </fieldset>
  );
}
