import firebase from '@firebase/app';
import React, {useState} from "react";
import {toast} from "react-toastify";
import styled from "styled-components";
import {db, dbErrorHandlerPromise} from "../../../firestore";
import {ButtonGroupStyle, ButtonInGroupStyle} from "../../filters/ButtonFilterGroup";

const InputGroupStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  
  padding: 5px 0;
`;

export default function SaveDeckToDb({relevantCards, selectedHero}) {
    const [deckname, setDeckname] = useState("");

    const dbRef = db.collection("decks");

    const handleSaveButton = () => {
        const cardIds = relevantCards.map(({iD}) => iD);

        dbRef.add({
            deckname,
            cards: cardIds,
            hero: selectedHero,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then((result) => {
                toast("saved");
                debugger;
            })
            .catch(dbErrorHandlerPromise)
    };

    return <div>
        <div>
            <InputGroupStyle>
                <label htmlFor="deckname">Deckname *</label>
                <input type="text" name="deckname" onChange={(e) => setDeckname(e.currentTarget.value)}
                       value={deckname}/>
            </InputGroupStyle>

            <ButtonGroupStyle>
                <ButtonInGroupStyle onClick={() => handleSaveButton()}>
                    Save
                </ButtonInGroupStyle>
            </ButtonGroupStyle>
        </div>
    </div>
}