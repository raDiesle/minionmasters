import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { REDDIT_LINK_PREFIX, REDDIT_PREFIX } from "components/community/reddit-icon";
import { YOUTUBE_PREFIX, YOUTUBE_PREFIX_SECOND } from "components/community/youtube-icon";
import { useCurrentUser } from "components/helper";
import css from "page/deck-manager/savedeck/save-db-button.module.scss";
import { MAYHEM } from "page/deck-manager/savedeck/saved-decks-configs";
import React from "react";

export default function SaveDbButton({
  deckname,
  createdByDisplayName,
  description,
  gameType,
  gameTypeSecondary,
  gameTypeThird,
  youtubeLink,
  redditLink,
  tags,
  handleSaveButton,
}) {
  const formData = {
    deckname,
    createdByDisplayName,
    description,
    gameType,
    gameTypeSecondary,
    gameTypeThird,
    youtubeLink,
    redditLink,
    tags,
  };
  const currentUser = useCurrentUser();

  const hasYoutubeError =
    youtubeLink &&
    !youtubeLink.startsWith(YOUTUBE_PREFIX) &&
    !youtubeLink.startsWith(YOUTUBE_PREFIX_SECOND);

  const hasRedditError = redditLink && !redditLink.startsWith(REDDIT_LINK_PREFIX);

  const hasValidationError =
    !currentUser ||
    !currentUser.uid ||
    !formData.deckname ||
    !gameType ||
    !gameTypeSecondary ||
    (gameType === MAYHEM && !gameTypeThird) ||
    (redditLink && !redditLink.startsWith(REDDIT_PREFIX)) ||
    hasYoutubeError;

  return (
    <div>
      {hasValidationError && (
        <>
          <FontAwesomeIcon icon={faExclamationTriangle} color="orange" />{" "}
          <ul className={css.containsValidationError}>
            <li>Provide required fields</li>
            {hasYoutubeError && (
              <li>
                Youtube link must start with either {YOUTUBE_PREFIX} or {YOUTUBE_PREFIX_SECOND}
              </li>
            )}
            {hasRedditError && <li>Reddit Link must start with {REDDIT_PREFIX}</li>}
          </ul>
        </>
      )}
      {handleSaveButton(hasValidationError, formData)}
    </div>
  );
}
