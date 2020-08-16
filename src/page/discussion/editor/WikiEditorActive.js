import firebase from "@firebase/app";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faSave } from "@fortawesome/free-regular-svg-icons/faSave";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CURRENT_GAME_VERSION } from "components/helper";
import { auth, dbErrorHandlerPromise } from "mm-firestore";
import { ButtonGroupStyle, ButtonInGroupStyle } from "page/deck-manager/build/filters/ButtonFilterGroup";
/* eslint-disable jsx-a11y/anchor-is-valid */
import TextareaEditor from "page/discussion/editor/textarea-editor";
import Tooltip from "rc-tooltip/es";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const HistorySelectStyle = styled.select`
  height: 18px;
  font-size: 10px;
  background-color: #444;
`;

function listenUserAuth(setCurrentUsername) {
  return auth.onAuthStateChanged((user) => {
    setCurrentUsername(auth.currentUser?.displayName);
  });
}

const MENTION_IDENTIFIER = "@";

export default function WikiEditorActive({ setInEditMode, dbRef, placeholder }) {
  const [currentUsername, setCurrentUsername] = useState("");
  const [value, setValue] = useState("");
  const editorRef = useRef();

  useEffect(() => {
    const listen = listenUserAuth(setCurrentUsername);
    return () => listen();
  }, []);

  const [isDisabledInput, setIsDisabledInput] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    dbRef
      .orderBy("createdAt", "desc")
      .get()
      .then((documentSnapshots) => {
        const docs = documentSnapshots.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        const normalizedHistory = docs.map(({ createdAt, id, val, createdAtVersion }) => {
          return {
            id,
            createdAt: createdAt.toDate(),
            createdAtVersion: createdAtVersion,
            val: val,
          };
        });
        setHistory(normalizedHistory);

        if (normalizedHistory.length > 0) {
          setValue(normalizedHistory[0].val);
        }
      });
  }, []);

  const onHistorySelect = ({ target: { value: dbKey } }) => {
    const mappedHistoryData = history.find(({ id }) => id === dbKey);
    const loadedHistoryState = mappedHistoryData.val;
    const isLatest = history[0].id === mappedHistoryData.id;
    setIsDisabledInput(!isLatest);

    setValue(loadedHistoryState);
  };

  // TODO
  /*
  const addCard = () => {
    insertAtCaret(editorRef.current, MENTION_IDENTIFIER, setValue);
  };
  */

  const onSave = () => {
    const dataToSaveBackend = value;

    dbRef
      .add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdAtVersion: CURRENT_GAME_VERSION,
        createdBy: currentUsername,
        val: dataToSaveBackend,
      })
      .then(() => {
        setInEditMode(false);
      })
      .catch(dbErrorHandlerPromise);
  };

  return (
    <div>
      <div
        style={{
          maxWidth: "1000px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "12px",
          paddingBottom: "4px",
        }}
      >
        <ButtonGroupStyle>
          <Tooltip
            placement="top"
            overlay={
              <span>
                Type {MENTION_IDENTIFIER}. You can continue typing to filter references by name.
                Select it from the list.
              </span>
            }
          >
            <ButtonInGroupStyle>
              <FontAwesomeIcon icon={faInfoCircle} size={"sm"} /> How to reference a Master or Card
              in the text {"  "}
            </ButtonInGroupStyle>
          </Tooltip>
        </ButtonGroupStyle>

        <ButtonGroupStyle>
          <ButtonInGroupStyle>
            <HistorySelectStyle defaultValue="" onChange={(dbKey) => onHistorySelect(dbKey)}>
              {history.map((hist, idx) => (
                <option value={hist.id} key={hist.id}>
                  {hist.createdAt.toLocaleString()} {idx === 0 && "latest"}
                </option>
              ))}
            </HistorySelectStyle>
          </ButtonInGroupStyle>
        </ButtonGroupStyle>
      </div>

      <TextareaEditor
        value={value}
        setValue={setValue}
        isDisabledInput={isDisabledInput}
        placeholder={placeholder}
        editorRef={editorRef}
      />

      <div
        style={{
          display: "flex",
          maxWidth: "1000px",
          paddingTop: "10px",
          alignItems: "center",
        }}
      >
        <ButtonGroupStyle>
          <>
            <ButtonInGroupStyle
              onClick={(editorStateEvent) => onSave(editorStateEvent)}
              disabled={isDisabledInput}
              isButtonActive={isDisabledInput}
            >
              <FontAwesomeIcon icon={faSave} /> Save
            </ButtonInGroupStyle>
          </>
        </ButtonGroupStyle>
        <a style={{ paddingLeft: "8px" }} onClick={() => setInEditMode(false)}>
          <FontAwesomeIcon icon={faTimesCircle} /> Discard
        </a>
      </div>
    </div>
  );
}
