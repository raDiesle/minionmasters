import { faTimesCircle } from "@fortawesome/free-regular-svg-icons/faTimesCircle";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import mToast from "components/mToast";
import { dbErrorHandlerPromise } from "mm-firestore";
import cssButton from "page/deck-manager/build/filters/ButtonFilterGroup.module.scss";
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
      <div
        className={classnames(cssButton.buttonSpacing, cssButton.ButtonInGroupStyle)}
        onClick={() => handleDelete()}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
        <span>Confirm</span>
      </div>
      <div
        className={classnames(cssButton.buttonSpacing, cssButton.ButtonInGroupStyle)}
        onClick={() => setIsConfirmDelete(false)}
      >
        <FontAwesomeIcon icon={faTimesCircle} />
        <span>Cancel</span>
      </div>
    </>
  );
}
