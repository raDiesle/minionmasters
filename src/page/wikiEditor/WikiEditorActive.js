import {convertToRaw, Editor, EditorState} from "draft-js";
import {ButtonGroupStyle, ButtonInGroupStyle} from "../filters/ButtonFilterGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import {faSave} from "@fortawesome/free-regular-svg-icons/faSave";
import React, {useLayoutEffect, useRef, useState} from "react";
import styled from "styled-components";
import * as firebase from "firebase";
import {dbErrorHandlerPromise} from "../../firestore";
import {toast} from "react-toastify";

const EditorStyle = styled.div`
  border: 1px dotted grey;
  padding: 5px 10px;
  margin: 5px 0;
`;


export default function WikiEditorActive({setInEditMode, dbRef}) {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const editor = useRef();
    useLayoutEffect(() => {
        editor.current.focus();
    }, []);

    const onSave = () => {
        const currentContent = editorState.getCurrentContent();
        const dataToSaveBackend = convertToRaw(currentContent).blocks.map(e => e.text)[0];
        dbRef.add({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            val: dataToSaveBackend
        }).then(() => toast("saved"))
            .catch(dbErrorHandlerPromise);
        setInEditMode(false);
    };

    const onChange = (currentEditorState) => {
        setEditorState(currentEditorState);
    };

    return <div>
        <EditorStyle>
            <Editor ref={editor} editorState={editorState} onChange={onChange}/>
        </EditorStyle>

        <ButtonGroupStyle>
            <>
                <ButtonInGroupStyle>
                    <FontAwesomeIcon icon={faTimesCircle}/> Discard
                </ButtonInGroupStyle>
                <ButtonInGroupStyle onClick={(editorStateEvent) => onSave(editorStateEvent)}>
                    <FontAwesomeIcon icon={faSave}/> Save
                </ButtonInGroupStyle>
            </>

        </ButtonGroupStyle>
    </div>
}