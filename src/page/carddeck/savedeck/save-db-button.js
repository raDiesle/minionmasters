import firebase from "@firebase/app";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import { CURRENT_GAME_VERSION } from "components/helper";
import mToast from "components/mToast";
import { auth, db, dbErrorHandlerPromise } from "mm-firestore";
import { MAYHEM } from "page/carddeck/savedeck/saved-decks-configs";
import { ButtonGroupStyle } from "page/filters/ButtonFilterGroup";
import cssButton from "page/filters/ButtonFilterGroup.module.scss";
import React, { useEffect, useState } from "react";
import css from "./save-db-button.module.scss";

function listenUserAuth(setCurrentUser) {
  return auth.onAuthStateChanged((user) => {
    setCurrentUser(auth.currentUser);
  });
}

export default function SaveDbButton({
  relevantCards,
  selectedHero,
  name,
  description,
  gameType,
  gameTypeSecondary,
  gameTypeThird,
  playStyle,
}) {
  const dbRef = db.collection("decks");

  const [isSaved, setSaved] = useState(false);

  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    const listen = listenUserAuth(setCurrentUser);
    return () => listen();
  }, []);

  console.log(currentUser);

  const formData = {
    deckname: name,
    description,
    gameType,
    gameTypeSecondary,
    gameTypeThird,
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
        createdByUid: currentUser.uid,
        createdByDisplayName: currentUser.displayName,
      })
      .then((result) => {
        mToast("saved");
        setSaved(true);
      })
      .catch(dbErrorHandlerPromise);
  };

  const hasValidationError =
    !formData.deckname ||
    !description ||
    !gameType ||
    !gameTypeSecondary ||
    (gameType === MAYHEM && !gameTypeThird) ||
    !playStyle;

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