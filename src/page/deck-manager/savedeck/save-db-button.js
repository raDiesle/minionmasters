import firebase from "@firebase/app";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import { CURRENT_GAME_VERSION, useCurrentUser } from "components/helper";
import mToast from "components/mToast";
import { db, dbErrorHandlerPromise } from "mm-firestore";
import { ButtonGroupStyle } from "page/deck-manager/build/filters/ButtonFilterGroup";
import cssButton from "page/deck-manager/build/filters/ButtonFilterGroup.module.scss";
import css from "page/deck-manager/savedeck/save-db-button.module.scss";
import { MAYHEM } from "page/deck-manager/savedeck/saved-decks-configs";
import React, { useState } from "react";

export default function SaveDbButton({
  lastSelectedCards,
  selectedMaster,
  name,
  createdByDisplayName,
  description,
  gameType,
  gameTypeSecondary,
  gameTypeThird,
}) {
  const dbRef = db.collection("decks");
  const [isSaved, setSaved] = useState(false);
  const currentUser = useCurrentUser();

  const formData = {
    deckname: name,
    createdByDisplayName,
    description,
    gameType,
    gameTypeSecondary,
    gameTypeThird,
  };

  const handleSaveButton = () => {
    const reduceCardData = lastSelectedCards.map(({ card: { iD }, count }) => ({
      card: { iD },
      count,
    }));

    dbRef
      .add({
        ...formData,
        createdAtVersion: CURRENT_GAME_VERSION,
        cards: reduceCardData,
        master: selectedMaster,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdByUid: currentUser.uid,
      })
      .then((result) => {
        mToast("Successful saved to database!");
        setSaved(true);
      })
      .catch(dbErrorHandlerPromise);
  };

  const hasValidationError =
    !formData.deckname ||
    !description ||
    !gameType ||
    !gameTypeSecondary ||
    (gameType === MAYHEM && !gameTypeThird);

  return (
    <div>
      {hasValidationError && (
        <>
          <FontAwesomeIcon icon={faExclamationTriangle} color="orange" />{" "}
          <span className={css.containsValidationError}>
            Provide all properties to save your deck.
          </span>
        </>
      )}
      {isSaved && (
        <div style={{ display: "flex", alignItems: "center", color: "green", fontWeight: "bold" }}>
          {" "}
          <FontAwesomeIcon
            icon={faCheckCircle}
            size="4x"
            color="green"
            style={{ paddingRight: "10px" }}
          />
          Your deck was successful saved! Go to "Decks" page to check it out!
        </div>
      )}
      <ButtonGroupStyle>
        <button
          className={classnames(cssButton.ButtonInGroupStyle, css.saveButton)}
          onClick={() => handleSaveButton()}
          disabled={hasValidationError}
        >
          Save
        </button>
      </ButtonGroupStyle>
    </div>
  );
}
