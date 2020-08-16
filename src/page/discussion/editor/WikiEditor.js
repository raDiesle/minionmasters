import { faEdit } from "@fortawesome/free-regular-svg-icons/faEdit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mToast from "components/mToast";
import { auth, dbErrorHandlerPromise } from "mm-firestore";
import { ButtonColor, ButtonInGroupStyle } from "page/deck-manager/build/filters/ButtonFilterGroup";
import WikiEditorActive from "page/discussion/editor/WikiEditorActive";
import WikiEditorReadOnly from "page/discussion/editor/WikiEditorReadOnly";

import Tooltip from "rc-tooltip/es";

import React, { useEffect, useState } from "react";

import styled from "styled-components";

const EditorStyle = styled.div`
  border-right: 0;
  padding-right: 5px;
  max-width: 1000px;
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

export default function WikiEditor({ dbRef }) {
  const [currentWikiData, setCurrentWikiData] = useState({
    createdAt: "",
    createdAtVersion: "",
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
            createdAtVersion: doc.createdAtVersion,
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
              last edit:{" "}
              {currentWikiData.createdAtVersion
                ? `v${currentWikiData.createdAtVersion}`
                : currentWikiData.createdAt.toLocaleString()}{" "}
              - {currentWikiData.createdBy}
            </div>
          )}
        </LastEditedStyle>
      </div>
    );
  }
}
