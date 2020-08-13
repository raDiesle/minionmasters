import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "page/carddeck/savedeck/save-db-button.module.scss";
import SaveDeckForm from "page/carddeck/savedeck/save-deck-form";
import React from "react";

export default function SaveDeckContent({ selectedHero, relevantCards }) {
  const maxNumberOfCards = 10; // verify
  const isIncompleteDeck = relevantCards.length < maxNumberOfCards;

  if (isIncompleteDeck || !selectedHero) {
    return (
      <div className={css.validations}>
        {isIncompleteDeck && (
          <div>
            <FontAwesomeIcon icon={faExclamationTriangle} color="orange" /> The deck is incomplete.
            Select all card slots.
          </div>
        )}
        {!selectedHero && (
          <div>
            <FontAwesomeIcon icon={faExclamationTriangle} color="orange" /> Select a hero for the
            deck.
          </div>
        )}
      </div>
    );
  } else {
    return <SaveDeckForm relevantCards={relevantCards} selectedHero={selectedHero} />;
  }
}
