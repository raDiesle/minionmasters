import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "page/deck-manager/savedeck/save-db-button.module.scss";
import SaveDeckForm from "page/deck-manager/savedeck/save-deck-form";
import React from "react";

export default function SaveDeckContent({ selectedMaster, lastSelectedCards }) {
  const maxNumberOfCards = 10; // verify
  const isIncompleteDeck = lastSelectedCards.length < maxNumberOfCards;

  if (isIncompleteDeck || !selectedMaster) {
    return (
      <div className={css.validations}>
        {isIncompleteDeck && (
          <div>
            <FontAwesomeIcon icon={faExclamationTriangle} color="orange" /> The deck is incomplete.
            Select all card slots.
          </div>
        )}
        {!selectedMaster && (
          <div>
            <FontAwesomeIcon icon={faExclamationTriangle} color="orange" /> Select a master for the
            deck.
          </div>
        )}
      </div>
    );
  } else {
    return <SaveDeckForm lastSelectedCards={lastSelectedCards} selectedMaster={selectedMaster} />;
  }
}
