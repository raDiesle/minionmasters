import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import css from "page/deck-manager/deck/decks/discuss-on-saved-deck.module.scss";
import React, { useState } from "react";

export function RedditOnSavedDeck({ redditLink }) {
  const [isExpandedDiscussions, setIsExpandedDiscussions] = useState(false);
  return (
    <div>
      {!isExpandedDiscussions ? (
        <div className={css.expander} onClick={() => setIsExpandedDiscussions(true)}>
          <FontAwesomeIcon icon={faChevronDown} /> show discussions
        </div>
      ) : (
        <div>
          <div className={css.expander} onClick={() => setIsExpandedDiscussions(false)}>
            <FontAwesomeIcon icon={faChevronUp} /> hide discussions
          </div>
        </div>
      )}
    </div>
  );
}
