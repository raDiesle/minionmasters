import firebase from "@firebase/app";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import { CURRENT_GAME_VERSION, useCurrentUser } from "components/helper";
import { LAST_USERNAME_LOCALSTORAGE_KEY } from "components/localstorage-username";
import mToast from "components/mToast";
import localStorage from "local-storage";
import { db, dbErrorHandlerPromise } from "mm-firestore";
import { ButtonGroupStyle } from "page/deck-manager/build/filters/ButtonFilterGroup";
import cssButton from "page/deck-manager/build/filters/ButtonFilterGroup.module.scss";
import { ROUTE_PATH_DECKS } from "page/deck-manager/deck/decks/decks-config";
import css from "page/deck-manager/savedeck/save-db-button.module.scss";
import SaveOrEditDeckForm from "page/deck-manager/savedeck/save-or-edit-deck-form";
import React from "react";
import { useHistory } from "react-router-dom";

export default function SaveDeckContent({ selectedMaster, lastSelectedCards }) {
  const maxNumberOfCards = 10; // verify
  const isIncompleteDeck = lastSelectedCards.length < maxNumberOfCards;
  const reducedCardData = lastSelectedCards.map(({ card: { iD }, count }) => ({
    card: { iD },
    count,
  }));

  const currentUser = useCurrentUser();

  const history = useHistory();

  const dbRef = db.collection("decks");
  const saveForm = (formData) => {
    dbRef
      .add({
        ...formData,
        createdAtVersion: CURRENT_GAME_VERSION,
        cards: reducedCardData,
        master: selectedMaster,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdByUid: currentUser.uid,
      })
      .then((result) => {
        mToast("Successful saved to database!");

        localStorage(LAST_USERNAME_LOCALSTORAGE_KEY, formData.createdByDisplayName);
        history.push(ROUTE_PATH_DECKS);
      })
      .catch(dbErrorHandlerPromise);
  };

  const handleSaveButton = (hasValidationError, formData) => (
    <ButtonGroupStyle>
      <button
        className={classnames(cssButton.ButtonInGroupStyle, cssButton.buttonSpacing)}
        onClick={() => saveForm(formData)}
        disabled={hasValidationError}
      >
        <FontAwesomeIcon icon={faSave} />
        Save
      </button>
    </ButtonGroupStyle>
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
        reduceCardData={reducedCardData}
        selectedMaster={selectedMaster}
        handleSaveButton={handleSaveButton}
      />
    );
  }
}
