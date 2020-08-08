import firebase from "@firebase/app";
import * as classnames from "classnames";
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
        cards: cardIds,
        hero: selectedHero,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((result) => {
        mToast("saved");
      })
      .catch(dbErrorHandlerPromise);
  };

  return (
    <div>
      <ButtonGroupStyle>
        <button
          className={classnames(cssButton.ButtonInGroupStyle, css.saveButton)}
          onClick={() => handleSaveButton()}
          disabled={Object.values(formData).some((formValue) => !formValue)}
        >
          Save
        </button>
      </ButtonGroupStyle>
    </div>
  );
}
