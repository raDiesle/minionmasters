import {ButtonGroupStyle, ButtonInGroupStyle} from "../../filters/ButtonFilterGroup";
import React, {useState} from "react";
import styled from "styled-components";
import * as firebase from "firebase";
import {db} from "../../../firestore";


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
        dbRef.add({
            deckname,
            cards: relevantCards,
            hero: selectedHero,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    };

    return <div>
        <form>
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
        </form>
    </div>
}