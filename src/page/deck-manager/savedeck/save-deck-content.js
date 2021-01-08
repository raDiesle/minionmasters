import firebase from "@firebase/app";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import cssButton from "components/button.module.scss";
import { useCurrentUser } from "components/helper";
import { CURRENT_GAME_VERSION } from "components/version";

import { LAST_USERNAME_LOCALSTORAGE_KEY } from "components/localstorage-username";
import mToast from "components/mToast";
import localStorage from "local-storage";
import { db, dbErrorHandlerPromise } from "mm-firestore";
import { ROUTE_PATH_DECKS } from "page/deck-manager/deck/decks/decks-config";
import css from "page/deck-manager/savedeck/save-db-button.module.scss";
import SaveOrEditDeckForm from "page/deck-manager/savedeck/save-or-edit-deck-form";
import { PREMADE_TEAM } from "page/deck-manager/savedeck/saved-decks-configs";
import React from "react";
import { useHistory } from "react-router-dom";

export default function SaveDeckContent({
  selectedMaster,
  lastSelectedCards,
  lastSelectedPremadeCards,
  selectedPremadeMaster,
  isPremadeDeckActive,
}) {
  const maxNumberOfCards = 10; // verify
  const isIncompleteDeck = lastSelectedCards.length < maxNumberOfCards;

  const reduceCardDataToIds = (cards) =>
    cards.map(({ card: { iD }, count }) => ({
      card: { iD },
      count,
    }));

  const currentUser = useCurrentUser();

  const history = useHistory();

  const dbRef = db.collection("decks");
  const saveForm = (formData) => {
    let request = {
      ...formData,
      createdAtVersion: CURRENT_GAME_VERSION,
      cards: reduceCardDataToIds(lastSelectedCards),
      master: selectedMaster,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdByUid: currentUser.uid,
    };

    if (formData.gameTypeSecondary === PREMADE_TEAM) {
      request = {
        ...request,
        premadeMaster: selectedPremadeMaster,
        premadeCards: reduceCardDataToIds(lastSelectedPremadeCards),
      };
    }

    dbRef
      .add(request)
      .then((docRef) => {
        mToast("Successful saved to database!");

        localStorage(LAST_USERNAME_LOCALSTORAGE_KEY, formData.createdByDisplayName);
        history.push(ROUTE_PATH_DECKS);
      })
      .catch(dbErrorHandlerPromise);
  };

  const handleSaveButton = (hasValidationError, formData) => (
    <div className={cssButton.ButtonGroupStyle}>
      <button
        className={classnames(cssButton.ButtonInGroupStyle, cssButton.buttonSpacing)}
        onClick={() => saveForm(formData)}
        disabled={hasValidationError}
      >
        <FontAwesomeIcon icon={faSave} />
        Save
      </button>
    </div>
  );

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
    return (
      <SaveOrEditDeckForm
        handleSaveButton={handleSaveButton}
        isPremadeDeckActive={isPremadeDeckActive}
      />
    );
  }
}
