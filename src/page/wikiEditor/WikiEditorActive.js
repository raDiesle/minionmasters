import {convertFromRaw, convertToRaw, Editor, EditorState} from "draft-js";
import {ButtonGroupStyle, ButtonInGroupStyle} from "../filters/ButtonFilterGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import {faSave} from "@fortawesome/free-regular-svg-icons/faSave";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import styled from "styled-components";
import * as firebase from "firebase";
import {dbErrorHandlerPromise} from "../../firestore";
import {toast} from "react-toastify";

const EditorStyle = styled.div`
  border: 1px dotted grey;
  padding: 5px 10px;
  margin: 5px 0;
`;


const HistorySelectStyle = styled.select`
  height: 24px;
  font-size: 12px;
  background-color: #444;
`;

export default function WikiEditorActive({setInEditMode, dbRef}) {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [isDisabledInput, setIsDisabledInput] = useState(false);
    const [history, setHistory] = useState([]);
    const editor = useRef();

    useLayoutEffect(() => {
        editor.current.focus();
    }, []);

    useEffect(() => {
        dbRef.orderBy("createdAt", "desc").get().then((documentSnapshots) => {
            const docs = documentSnapshots.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            const normalizedHistory = docs.map(({createdAt, id, val}) => {
                return ({
                    id,
                    createdAt: createdAt.toDate(),
                    val: JSON.parse(val)
                });
            });
            setHistory(normalizedHistory);

            if (normalizedHistory.length > 0) {
                setEditorState(EditorState.createWithContent(convertFromRaw(normalizedHistory[0].val)));
            }
        });
    }, []);

    const onSave = () => {
        const currentContent = editorState.getCurrentContent();
        const dataToSaveBackend = JSON.stringify(convertToRaw(currentContent));
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

    const onHistorySelect = ({target: {value: dbKey}}) => {
        console.log(dbKey);
        const mappedHistoryData = history.find(({id}) => id === dbKey);

        const loadedHistoryState = EditorState.createWithContent(convertFromRaw(mappedHistoryData.val));

        const isLatest = history[0].id === mappedHistoryData.id;
        setIsDisabledInput(!isLatest);

        setEditorState(loadedHistoryState);
    };

    return <div>
        <EditorStyle>
            <Editor ref={editor}
                    editorState={editorState}
                    onChange={onChange}
                    readOnly={isDisabledInput}
            />
        </EditorStyle>

        <ButtonGroupStyle>
            <>
                <ButtonInGroupStyle onClick={() => setInEditMode(false)}>
                    <FontAwesomeIcon icon={faTimesCircle}/> Discard
                </ButtonInGroupStyle>
                <ButtonInGroupStyle onClick={(editorStateEvent) => onSave(editorStateEvent)}>
                    <FontAwesomeIcon icon={faSave}/> Save
                </ButtonInGroupStyle>
                <ButtonInGroupStyle>
                    <HistorySelectStyle defaultValue="" onChange={(dbKey) => onHistorySelect(dbKey)}>

                        {
                            history.map((hist, idx) => <option value={hist.id}
                                                               key={hist.id}>{hist.createdAt.toLocaleString()} {idx === 0 && "current"}</option>)
                        }
                    </HistorySelectStyle>

                </ButtonInGroupStyle>
            </>

        </ButtonGroupStyle>
    </div>
}