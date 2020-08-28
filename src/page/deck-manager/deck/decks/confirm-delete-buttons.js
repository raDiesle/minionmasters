import { faTimesCircle } from "@fortawesome/free-regular-svg-icons/faTimesCircle";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import cssButton from "components/button.module.scss";
import mToast from "components/mToast";
import { dbErrorHandlerPromise } from "mm-firestore";
import { ROUTE_PATH_DECKS } from "page/deck-manager/deck/decks/decks-config";
import React from "react";
import { useHistory } from "react-router-dom";

export function ConfirmDeleteButtons({ dbRef, setIsConfirmDelete, setIsEditing }) {
  const history = useHistory();

  const handleDelete = () => {
    dbRef
      .delete()
      .then(() => {
        mToast("Deck was deleted.");
        setIsConfirmDelete(false);
        setIsEditing(false);
        history.push(ROUTE_PATH_DECKS);
      })
      .catch(dbErrorHandlerPromise);
  };

  return (
    <>
      <button
        className={classnames(cssButton.buttonSpacing, cssButton.ButtonInGroupStyle)}
        onClick={() => handleDelete()}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
        <span>Confirm</span>
      </button>
      <button
        className={classnames(cssButton.buttonSpacing, cssButton.ButtonInGroupStyle)}
        onClick={() => setIsConfirmDelete(false)}
      >
        <FontAwesomeIcon icon={faTimesCircle} />
        <span>Cancel</span>
      </button>
    </>
  );
}
