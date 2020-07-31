import React, { useState } from "react";
import firebase from "@firebase/app";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mToast from "components/mToast";
import styled from "styled-components";
import { db, dbErrorHandlerPromise } from "../../../firestore";
import { ButtonGroupStyle, ButtonInGroupStyle } from "../../filters/ButtonFilterGroup";

const InputGroupStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;

  padding: 5px 0;
`;

export default function SaveDeckToDb({ relevantCards, selectedHero }) {
  const [deckname, setDeckname] = useState("");
  const dbRef = db.collection("decks");

  const maxNumberOfCards = 10; // verify
  const isIncompleteDeck = relevantCards.length < maxNumberOfCards;

  const handleSaveButton = () => {
    const cardIds = relevantCards.map(({ iD }) => iD);

    dbRef
      .add({
        deckname,
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
      <div>
        <InputGroupStyle>
          <label htmlFor="deckname">Deckname *</label>
          <input
            type="text"
            name="deckname"
            onChange={(e) => setDeckname(e.currentTarget.value)}
            value={deckname}
          />
        </InputGroupStyle>

        <ButtonGroupStyle>
          <ButtonInGroupStyle
            onClick={() => handleSaveButton()}
            disabled={isIncompleteDeck || !selectedHero}
          >
            Save
          </ButtonInGroupStyle>
        </ButtonGroupStyle>

        {isIncompleteDeck && (
          <div>
            <FontAwesomeIcon icon={faExclamationTriangle} color="orange" />
            The deck is incomplete.
          </div>
        )}
        {!selectedHero && (
          <div>
            <FontAwesomeIcon icon={faExclamationTriangle} color="orange" />
            You missed to select a hero for the deck.
          </div>
        )}
      </div>
    </div>
  );
}
