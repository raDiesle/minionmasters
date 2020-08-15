import { db } from "mm-firestore";
import React from "react";
import WikiEditor from "./editor/WikiEditor";

export default function CardDiscussion({ card: { iD }, discussionType }) {
  const dbRef = db.collection("cards").doc(String(iD)).collection(discussionType);

  return (
    <div>
      <h3>Tips by community</h3>
      <div>
        <WikiEditor dbRef={dbRef} />
      </div>
    </div>
  );
}
