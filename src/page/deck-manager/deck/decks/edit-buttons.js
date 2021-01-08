import firebase from "@firebase/app";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons/faTimesCircle";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import cssButton from "components/button.module.scss";
import { CURRENT_GAME_VERSION } from "components/version";
import { LAST_USERNAME_LOCALSTORAGE_KEY } from "components/localstorage-username";
import mToast from "components/mToast";
import localStorage from "local-storage";
import { dbErrorHandlerPromise } from "mm-firestore";
import { ROUTE_PATH_DECKS } from "page/deck-manager/deck/decks/decks-config";
import React from "react";
import { useHistory } from "react-router-dom";

export function EditButtons({
  hasValidationError,
  formData,
  setIsEditing,
  setIsConfirmDelete,
  dbRef,
}) {
  const history = useHistory();

  const editForm = (formData) => {
    dbRef
      .update({
        ...formData,
        createdAtVersion: CURRENT_GAME_VERSION,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((result) => {
        mToast("Successful edited and game version updated!");

        localStorage(LAST_USERNAME_LOCALSTORAGE_KEY, formData.createdByDisplayName);
        setIsEditing(false);
        history.push(ROUTE_PATH_DECKS);
      })
      .catch(dbErrorHandlerPromise);
  };

  return (
    <>
      <button
        className={classnames(cssButton.ButtonInGroupStyle, cssButton.buttonSpacing)}
        onClick={() => editForm(formData)}
        disabled={hasValidationError}
      >
        <FontAwesomeIcon icon={faSave} />
        Save
      </button>
      <button
        className={classnames(cssButton.buttonSpacing, cssButton.ButtonInGroupStyle)}
        onClick={() => setIsEditing(false)}
      >
        <FontAwesomeIcon icon={faTimesCircle} />
        <span>Cancel</span>
      </button>

      <button
        className={classnames(cssButton.buttonSpacing, cssButton.ButtonInGroupStyle)}
        onClick={() => setIsConfirmDelete(true)}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
        <span>Delete Deck</span>
      </button>
    </>
  );
}
