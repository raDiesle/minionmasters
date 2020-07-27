import { faEdit } from "@fortawesome/free-regular-svg-icons/faEdit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mToast from "components/mToast";

import Tooltip from "rc-tooltip/es";

import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { auth, db, dbErrorHandlerPromise } from "../../firestore";
import { ButtonColor, ButtonInGroupStyle } from "../filters/ButtonFilterGroup";
import WikiEditorActive from "./WikiEditorActive";
import WikiEditorReadOnly from "./WikiEditorReadOnly";

const EditorStyle = styled.div`
  // border: 1px solid lightgray;
  border-right: 0;
  padding-right: 5px;
  max-width: 1000px;
  //padding: 8px;
  /*
  // border: 1px solid lightgray;
  border-right: 0;
  // padding: 8px;
  
  //    box-sizing: border-box;
    border: 1px solid #ddd;
    cursor: text;
    padding: 16px;
    border-radius: 2px;
    // margin-bottom: 2em;
    box-shadow: inset 0px 1px 8px -3px #ABABAB;
    background: #fefefe;
    
   */
`;

const LastEditedStyle = styled.div`
  padding-top: 5px;
  font-size: 8px;
`;

const EditWithButtonStyle = styled.div`
  display: flex;

  & > button {
    padding: 4px;
  }
`;

export default function WikiEditor({ card: { iD }, discussionType }) {
  const dbRef = db.collection("cards").doc(String(iD)).collection(discussionType);

  const [currentWikiData, setCurrentWikiData] = useState({
    createdAt: "",
    createdBy: "",
    val: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(!!auth.currentUser);
  }, []);

  const [isInEditMode, setInEditMode] = useState(false);
  useEffect(() => {
    if (isInEditMode) {
      return;
    }
    dbRef
      .orderBy("createdAt", "desc")
      .limit(1)
      .get()
      .then((documentSnapshots) => {
        if (documentSnapshots.docs.length > 0) {
          const doc = documentSnapshots.docs[0].data();
          setCurrentWikiData({
            createdAt: doc.createdAt.toDate(),
            createdBy: doc.createdBy,
            val: doc.val,
          });
        }
      })
      .catch(dbErrorHandlerPromise);
  }, [isInEditMode]);

  if (isInEditMode) {
    return (
      <WikiEditorActive
        setInEditMode={setInEditMode}
        dbRef={dbRef}
        placeholder="Type @ to reference a master or card."
      />
    );
  } else {
    return (
      <div>
        <EditWithButtonStyle>
          <EditorStyle>
            {currentWikiData.createdAt ? (
              <WikiEditorReadOnly value={currentWikiData.val} />
            ) : (
              <WikiEditorReadOnly value={currentWikiData.val} placeholder="None added, yet." />
            )}
          </EditorStyle>
          <Tooltip placement="bottomRight" overlay={<span>Edit</span>}>
            <ButtonInGroupStyle
              onClick={() => {
                if (isLoggedIn) {
                  setInEditMode(true);
                } else {
                  mToast("Login by Facebook, Google, or Twitter.");
                }
              }}
            >
              <ButtonColor>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FontAwesomeIcon icon={faEdit} />
                </div>
              </ButtonColor>
            </ButtonInGroupStyle>
          </Tooltip>
        </EditWithButtonStyle>
        <LastEditedStyle>
          {currentWikiData.createdAt && (
            <div>
              last edit: {currentWikiData.createdAt.toLocaleString()} - {currentWikiData.createdBy}
            </div>
          )}
        </LastEditedStyle>
      </div>
    );
  }
}
