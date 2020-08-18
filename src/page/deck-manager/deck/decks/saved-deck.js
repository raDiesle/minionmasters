import { CURRENT_GAME_VERSION } from "components/helper";
import AddMasterToDeckOrOpenDetailsActionOverlay from "page/deck-manager/build/masters/add-master-to-deck-or-open-details-action-overlay";
import Master from "page/deck-manager/build/masters/master";
import CardForDeckActionOverlay from "page/deck-manager/deck/cardfordeck-actionoverlay";
import { DeckCardsContainerStyle } from "page/deck-manager/deck/deck-cards-container-style";
import { DeckMasterAndCardsContainerStyle } from "page/deck-manager/deck/deck-master-and-cards-container-style";
import { CopyDeckToGameButton } from "page/deck-manager/deck/decks/copy-deck-to-game-button";
import css from "page/deck-manager/deck/decks/decks.module.scss";
import { ExportAsUrl } from "page/deck-manager/deck/export/export-as-url";
import React from "react";

export function SavedDeck({ deck, deck: { cards }, setSelectedMaster, setLastSelectedCards }) {
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
        <CopyDeckToGameButton master={deck.master} cards={cards} />
      </div>

      <div className={css.deckLeftBottomSecondaryLegend}>
        <ExportAsUrl selectedMaster={deck.master} lastSelectedCards={cards} />
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
