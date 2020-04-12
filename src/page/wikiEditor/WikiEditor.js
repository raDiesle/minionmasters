import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {ButtonGroupStyle, ButtonInGroupStyle} from "../filters/ButtonFilterGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons/faEdit";
import WikiEditorActive from "./WikiEditorActive";
import {db, dbErrorHandlerPromise} from "../../firestore";

import {convertFromRaw, Editor, EditorState} from "draft-js";

const EditorStyle = styled.div`
  border: 1px solid lightgray;
  padding: 8px;
`;

const EditButtonStyle = styled.div`
  padding-top: 4px;
`;

const LastEditedStyle = styled.div`
  font-size: 8px;
`;

export default function WikiEditor({card: {iD}, discussionType}) {
    const editor = useRef();

    const dbRef = db.collection("cards").doc(String(iD)).collection(discussionType);

    const [currentWikiData, setCurrentWikiData] = useState({
        createdAt: "",
        createdBy: "",
        val: EditorState.createEmpty()
    });

    const [isInEditMode, setInEditMode] = useState(false);
    useEffect(() => {
        if (isInEditMode) {
            return;
        }

        dbRef.orderBy("createdAt", "desc").limit(1).get().then((documentSnapshots) => {
            if (documentSnapshots.docs.length > 0) {
                const doc = documentSnapshots.docs[0].data();
                setCurrentWikiData({
                    createdAt: doc.createdAt.toDate(),
                    createdBy: doc.createdBy,
                    val: EditorState.createWithContent(convertFromRaw(JSON.parse(doc.val)))
                });
            }
        }).catch(dbErrorHandlerPromise);
    }, [isInEditMode]);

    if (isInEditMode) {
        return <WikiEditorActive setInEditMode={setInEditMode} dbRef={dbRef}/>
    } else {
        return (
            <div>
                <EditorStyle>
                    {currentWikiData.createdAt ? <Editor ref={editor}
                                                         editorState={currentWikiData.val}
                                                         readOnly={true}
                    /> : <div> There is no wiki data added, yet. Want to be the first one?</div>
                    }
                </EditorStyle>
                <LastEditedStyle>
                    {currentWikiData.createdAt &&
                    <div>last edit: {currentWikiData.createdAt.toLocaleString()} - {currentWikiData.createdBy}</div>}
                </LastEditedStyle>
                <EditButtonStyle>
                    <ButtonGroupStyle>
                        <ButtonInGroupStyle onClick={() => setInEditMode(true)}>
                            <FontAwesomeIcon icon={faEdit}/> Edit
                        </ButtonInGroupStyle>
                    </ButtonGroupStyle>
                </EditButtonStyle>
            </div>
        );
    }
}