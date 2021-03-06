import { db } from "mm-firestore";
import WikiEditor from "page/discussion/editor/wiki-editor";
import React from "react";

export default function MasterTipsByCommunity({ masterKey: iD }) {
  const dbRef = db.collection("masters").doc(String(iD)).collection("tips");

  return (
    <div>
      <h3>Tips by community</h3>
      <WikiEditor dbRef={dbRef} />
    </div>
  );
}
