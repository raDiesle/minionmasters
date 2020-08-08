import firebase from "@firebase/app";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import { CURRENT_GAME_VERSION } from "components/helper";
import mToast from "components/mToast";
import { db, dbErrorHandlerPromise } from "firestore";
import { ButtonGroupStyle } from "page/filters/ButtonFilterGroup";
import cssButton from "page/filters/ButtonFilterGroup.module.scss";
import React from "react";
import css from "./save-db-button.module.scss";

export default function SaveDbButton({
  relevantCards,
  selectedHero,
  name,
  description,
  gameType,
  gameTypeSecondary,
  playStyle,
}) {
  const dbRef = db.collection("decks");

  const formData = {
    deckname: name,
    description,
    gameType,
    gameTypeSecondary,
    playStyle,
  };

  const handleSaveButton = () => {
    const cardIds = relevantCards.map(({ iD }) => iD);

    dbRef
      .add({
        ...formData,
        createdAtVersion: CURRENT_GAME_VERSION,
        cards: cardIds,
        hero: selectedHero,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((result) => {
        mToast("saved");
      })
      .catch(dbErrorHandlerPromise);
  };

  const hasValidationError = Object.values(formData).some((formValue) => !formValue);

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
