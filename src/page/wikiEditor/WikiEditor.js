import {ButtonGroupStyle, ButtonInGroupStyle} from "../filters/ButtonFilterGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons/faEdit";
import React, {useState} from "react";
import WikiEditorActive from "./WikiEditorActive";
import {db} from "../../firestore";


export default function WikiEditor({iD}) {
    const [isInEditMode, setInEditMode] = useState(false);

    const dbRef = db.collection("cards").doc(String(iD)).collection("mechanics");


    if (isInEditMode) {
        return <WikiEditorActive setInEditMode={setInEditMode} dbRef={dbRef}/>
    } else {
        return (
            <ButtonGroupStyle>
                <ButtonInGroupStyle onClick={() => setInEditMode(true)}>
                    <FontAwesomeIcon icon={faEdit}/> Edit
                </ButtonInGroupStyle>
            </ButtonGroupStyle>
        );
    }
}