import {ButtonGroupStyle, ButtonInGroupStyle} from "../filters/ButtonFilterGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons/faEdit";
import React, {useEffect, useRef, useState} from "react";
import WikiEditorActive from "./WikiEditorActive";
import {db, dbErrorHandlerPromise} from "../../firestore";

import {convertFromRaw, Editor, EditorState} from "draft-js";


export default function WikiEditor({iD}) {
    const [isInEditMode, setInEditMode] = useState(false);
    const editor = useRef();

    const dbRef = db.collection("cards").doc(String(iD)).collection("mechanics");

    const [currentWikiData, setCurrentWikiData] = useState({
        createdAt: "",
        val: EditorState.createEmpty()
    });

    useEffect(() => {
        dbRef.orderBy("createdAt", "desc").limit(1).get().then((documentSnapshots) => {
            const doc = documentSnapshots.docs[0].data();

            if (doc) {
                setCurrentWikiData({
                    createdAt: doc.createdAt,
                    val: EditorState.createWithContent(convertFromRaw(JSON.parse(doc.val)))
                });
            }
        }).catch(dbErrorHandlerPromise);
    }, []);

    if (isInEditMode) {
        return <WikiEditorActive setInEditMode={setInEditMode} dbRef={dbRef}/>
    } else {
        return (
            <div>
                <Editor ref={editor}
                        editorState={currentWikiData.val}
                        readOnly={true}
                />
                <ButtonGroupStyle>
                    <ButtonInGroupStyle onClick={() => setInEditMode(true)}>
                        <FontAwesomeIcon icon={faEdit}/> Edit
                    </ButtonInGroupStyle>
                </ButtonGroupStyle>
            </div>
        );
    }
}