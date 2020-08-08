import React from "react";
import WikiEditor from "../wikiEditor/WikiEditor";

export default function CardDiscussion({ card, discussionType }) {
  return (
    <div>
      <h3>Tips by community</h3>
      <div>
        <WikiEditor card={card} discussionType={discussionType} />
      </div>
    </div>
  );
}
