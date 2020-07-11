import {faEdit} from "@fortawesome/free-regular-svg-icons/faEdit";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {convertFromRaw, Editor, EditorState} from "draft-js";
import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {db, dbErrorHandlerPromise} from "../../firestore";
import {ButtonColor, ButtonInGroupStyle} from "../filters/ButtonFilterGroup";
import WikiEditorActive from "./WikiEditorActive";

const EditorStyle = styled.div`
  border: 1px solid lightgray;
  border-right: 0;
  padding: 8px;
`;

const LastEditedStyle = styled.div`
  font-size: 8px;
`;

const EditWithButtonStyle = styled.div`
  display: flex;
`

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
                <EditWithButtonStyle>
                    <EditorStyle>
                        {currentWikiData.createdAt ? <Editor ref={editor}
                                                             editorState={currentWikiData.val}
                                                             readOnly={true}
                        /> : <div>&nbsp;&nbsp;&nbsp;Noone added, yet.&nbsp;&nbsp;&nbsp;</div>
                        }
                    </EditorStyle>
                    <ButtonInGroupStyle onClick={() => setInEditMode(true)}>
                        <ButtonColor>
                            <FontAwesomeIcon icon={faEdit}/>
                        </ButtonColor>
                    </ButtonInGroupStyle>
                </EditWithButtonStyle>
                <LastEditedStyle>
                    {currentWikiData.createdAt &&
                    <div>last edit: {currentWikiData.createdAt.toLocaleString()} - {currentWikiData.createdBy}</div>}
                </LastEditedStyle>
            </div>
        );
    }
}