import { faPencilAlt } from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import cssButton from "components/button.module.scss";
import css from "page/deck-manager/deck/decks/description-edit.module.scss";
import { EditSavedDeckActive } from "page/deck-manager/deck/decks/edit-saved-deck-active";
import { ROUTE_PATH_DECKS_EDIT_MODE } from "page/deck-manager/deck/decks/your-saved-deck-edit-config";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export function YourSavedDeckEdit({
  deck: {
    dbid,
    createdByDisplayName,
    deckname,
    description,
    gameType,
    gameTypeSecondary,
    gameTypeThird,
    youtubeLink,
    redditLink,
    tags,
  },
}) {
  const [isEditing, setIsEditing] = useState(false);
  const history = useHistory();

  const handleEditButtonClick = () => {
    setIsEditing(true);
    history.push(ROUTE_PATH_DECKS_EDIT_MODE(dbid));
  };

  return (
    <div className={css.descriptionEdit}>
      <fieldset className={css.fieldset}>
        <legend>Manage your deck</legend>
        {isEditing ? (
          <EditSavedDeckActive
            dbid={dbid}
            initialCreatedByDisplayName={createdByDisplayName}
            initialDeckname={deckname}
            initialDescription={description}
            initialGameType={gameType}
            initialGameTypeSecondary={gameTypeSecondary}
            initialGameTypeThird={gameTypeThird}
            initialYoutubeLink={youtubeLink}
            initialRedditLink={redditLink}
            initialTags={tags}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <div className={css.editButton}>
              <div className={cssButton.ButtonGroupStyle}>
                <button
                  className={classnames(cssButton.buttonSpacing, cssButton.ButtonInGroupStyle)}
                  onClick={() => handleEditButtonClick()}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </>
        )}
      </fieldset>
    </div>
  );
}
