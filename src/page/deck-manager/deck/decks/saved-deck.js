import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";

import { CURRENT_GAME_VERSION } from "components/helper";
import CardForDeckActionOverlay from "page/deck-manager/deck/cardfordeck-actionoverlay";
import { DeckCardsContainerStyle } from "page/deck-manager/deck/deck-cards-container-style";
import { DeckMasterAndCardsContainerStyle } from "page/deck-manager/deck/deck-master-and-cards-container-style";
import css from "page/deck-manager/deck/decks/decks.module.scss";
import { ButtonGroupStyle } from "page/deck-manager/build/filters/ButtonFilterGroup";
import cssButton from "page/deck-manager/build/filters/ButtonFilterGroup.module.scss";
import AddMasterToDeckOrOpenDetailsActionOverlay from "page/deck-manager/build/masters/AddMasterToDeckOrOpenDetailsActionOverlay";
import Master from "page/deck-manager/build/masters/master";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

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
          <div>
            <div>
              <CopyToClipboard
                text={`/setdeck ${deck.master}: ${deck.cards.map(({ name }) => name).join(", ")}`}
                onCopy={() => {
                  toast(
                    "Copied to clipboard. Go to game, switch to a slot and paste command and press ENTER. Game must be english language. Experimental feature, might not work!",
                    { position: "bottom-right", autoClose: 10000 }
                  );
                }}
                title="Copy"
              >
                <ButtonGroupStyle>
                  <div className={classnames(css.copyDeck, cssButton.ButtonInGroupStyle)}>
                    <FontAwesomeIcon icon={faCopy} />
                    Copy to game
                  </div>
                </ButtonGroupStyle>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
}
