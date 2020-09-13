import { faEdit } from "@fortawesome/free-regular-svg-icons/faEdit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cssButton from "components/button.module.scss";

import mToast from "components/mToast";
import { auth, dbErrorHandlerPromise } from "mm-firestore";
import WikiEditorActive from "page/discussion/editor/wiki-editor-active";
import css from "page/discussion/editor/wiki-editor.module.scss";
import WikiEditorReadOnly from "page/discussion/editor/WikiEditorReadOnly";

import Tooltip from "rc-tooltip/es";
import React, { useEffect, useState } from "react";

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
        <div className={css.EditWithButtonStyle}>
          <div className={css.EditorStyle}>
            {currentWikiData.createdAt ? (
              <WikiEditorReadOnly value={currentWikiData.val} />
            ) : (
              <WikiEditorReadOnly value={currentWikiData.val} placeholder="None added, yet." />
            )}
          </div>
          <Tooltip placement="bottomRight" overlay={<span>Edit</span>}>
            <button
              className={cssButton.ButtonInGroupStyle}
              onClick={() => {
                if (isLoggedIn) {
                  setInEditMode(true);
                } else {
                  mToast("Login by Facebook, Google, or Twitter.");
                }
              }}
            >
              <div className={cssButton.ButtonColor}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FontAwesomeIcon icon={faEdit} />
                </div>
              </div>
            </button>
          </Tooltip>
        </div>
        <div className={css.LastEditedStyle}>
          {currentWikiData.createdAt && (
            <div>
              last edit:{" "}
              {currentWikiData.createdAtVersion
                ? `v${currentWikiData.createdAtVersion}`
                : currentWikiData.createdAt.toLocaleString()}{" "}
              - {currentWikiData.createdBy}
            </div>
          )}
        </div>
      </div>
    );
  }
}
