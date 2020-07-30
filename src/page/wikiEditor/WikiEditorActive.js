import firebase from "@firebase/app";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faSave } from "@fortawesome/free-regular-svg-icons/faSave";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "rc-tooltip/es";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { auth, dbErrorHandlerPromise } from "../../firestore";
import { ButtonGroupStyle, ButtonInGroupStyle } from "../filters/ButtonFilterGroup";

import TextareaEditor from "./textarea-editor";

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
        const normalizedHistory = docs.map(({ createdAt, id, val }) => {
          return {
            id,
            createdAt: createdAt.toDate(),
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

  const insertAtCaret = (txtarea, text) => {
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;

    var br =
      txtarea.selectionStart || txtarea.selectionStart === "0"
        ? "ff"
        : document.selection
        ? "ie"
        : false;
    if (br === "ie") {
      txtarea.focus();
      var range = document.selection.createRange();
      range.moveStart("character", -txtarea.value.length);
      strPos = range.text.length;
    } else if (br === "ff") strPos = txtarea.selectionStart;

    var front = txtarea.value.substring(0, strPos);
    var back = txtarea.value.substring(strPos, txtarea.value.length);

    const newValue = front + text + back;

    // will be overridden by setValue
    txtarea.value = newValue;
    setValue(newValue);

    // txtarea.value
    setTimeout(() => {
      strPos = strPos + text.length;
      if (br === "ie") {
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart("character", -txtarea.value.length);
        range.moveStart("character", strPos);
        range.moveEnd("character", 0);
        range.select();
      } else if (br === "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
      }
      txtarea.scrollTop = scrollPos;
    }, 0); // TODO async issue? move to useasyncEffect in editor
  };

  const addCard = () => {
    insertAtCaret(editorRef.current, MENTION_IDENTIFIER);
  };

  const onSave = () => {
    const dataToSaveBackend = value;

    dbRef
      .add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
          fontSize: "10px",
          paddingBottom: "2px",
        }}
      >
        <ButtonGroupStyle>
          <ButtonInGroupStyle onClick={() => addCard()}>
            <FontAwesomeIcon icon={faPlus} /> Reference Master or Card
          </ButtonInGroupStyle>
          <Tooltip
            placement="top"
            overlay={
              <span>
                Press button or type {MENTION_IDENTIFIER}. You can start typing to filter references
                by name.
              </span>
            }
          >
            <ButtonInGroupStyle>
              <FontAwesomeIcon icon={faInfoCircle} size={"sm"} />
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
