import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginRequired from "components/login-required";
import { gaTrackView } from "firestore";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/carddeck/DeckContainer";
import css from "page/carddeck/savedeck/save-db-button.module.scss";
import SaveDeckForm from "page/carddeck/savedeck/save-deck-form";
import React from "react";

import AnalyzeDeck from "./analyze-deck";

export default function SaveDeckContainer({ lastSelectedCards, selectedHero }) {
  gaTrackView("/SaveDeckContainer");
  const relevantCards = lastSelectedCards
    .filter(({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT)
    .map(({ card }) => card);

  const maxNumberOfCards = 10; // verify
  const isIncompleteDeck = relevantCards.length < maxNumberOfCards;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon icon={faTools} size="2x" color="yellow" style={{ paddingRight: "10px" }} />
        {"  "}Features under construction
      </div>
      <LoginRequired />
      <h3>Save deck for public share</h3>
      <div>
        Visible on "Decks". Alternatively, you can also "Export" built deck by a link without
        saving.
      </div>
      <AnalyzeDeck relevantCards={relevantCards} selectedHero={selectedHero} />

      {isIncompleteDeck || !selectedHero ? (
        <div className={css.validations}>
          {isIncompleteDeck && (
            <div>
              <FontAwesomeIcon icon={faExclamationTriangle} color="orange" /> The deck is
              incomplete. Select all card slots.
            </div>
          )}
          {!selectedHero && (
            <div>
              <FontAwesomeIcon icon={faExclamationTriangle} color="orange" /> Select a hero for the
              deck.
            </div>
          )}
        </div>
      ) : (
        <SaveDeckForm relevantCards={relevantCards} selectedHero={selectedHero} />
      )}
    </div>
  );
}
