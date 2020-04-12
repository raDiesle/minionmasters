import {convertFromRaw, convertToRaw, Editor, EditorState} from "draft-js";
import {ButtonGroupStyle, ButtonInGroupStyle} from "../filters/ButtonFilterGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import {faSave} from "@fortawesome/free-regular-svg-icons/faSave";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import styled from "styled-components";
import * as firebase from "firebase";
import {auth, dbErrorHandlerPromise} from "../../firestore";
import {toast} from "react-toastify";

const EditorStyle = styled.div`
  //border: 1px dotted grey;
  padding: 5px 10px;
  margin: 5px 0;
  max-width: 600px;
  ${({isEditable}) => isEditable && (
    `
  background: 
            linear-gradient(90deg, #000 50%, transparent 50%),
            linear-gradient(0deg, #000 50%, transparent 50%),
            linear-gradient(90deg, #000 50%, transparent 50%),
            linear-gradient(0deg, #000 50%, transparent 50%);
          background-repeat: repeat-x, repeat-y, repeat-x, repeat-y;
          background-size: 15px 2px, 2px 15px, 15px 2px, 2px 15px;
          background-position: left top, right top, left bottom, left top;
          animation: border-dance 20s infinite linear;
        }
        
        @keyframes border-dance 
        {
          0%
          {
            background-position: left top, right top, right bottom, left bottom;
          }
          100% 
          {
            background-position: right top, right bottom, left bottom, left top;
          }
  `)
}
`;


const HistorySelectStyle = styled.select`
  height: 24px;
  font-size: 12px;
  background-color: #444;
`;

function listenUserAuth(setCurrentUsername) {
    return auth.onAuthStateChanged((user) => {
        setCurrentUsername(auth.currentUser?.displayName);
    });
}

export default function WikiEditorActive({setInEditMode, dbRef}) {
    const [currentUsername, setCurrentUsername] = useState("");
    useEffect(() => {
        const listen = listenUserAuth(setCurrentUsername);
        return () => listen()
    }, []);

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
            createdBy: currentUsername,
            val: dataToSaveBackend
        }).then(() => {
            toast("saved");
            setInEditMode(false);
        })
            .catch(dbErrorHandlerPromise);
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
        <EditorStyle isEditable={!isDisabledInput}>
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