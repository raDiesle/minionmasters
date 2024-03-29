import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons/faQuestionCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import { useCurrentUser } from "components/helper";
import { LAST_USERNAME_LOCALSTORAGE_KEY } from "components/localstorage-username";
import localStorage from "local-storage";
import GameTypeInput from "page/deck-manager/savedeck/inputs/game-type-input";
import GameTypeSecondaryInput from "page/deck-manager/savedeck/inputs/game-type-secondary-input";
import GameTypeThirdInput from "page/deck-manager/savedeck/inputs/game-type-third-input";
import SaveOrEditToDatabaseButton from "page/deck-manager/savedeck/save-db-button";
import css from "page/deck-manager/savedeck/save-deck-form.module.scss";
import { LADDER, MAYHEM, PREMADE_TEAM } from "page/deck-manager/savedeck/saved-decks-configs";
import { TagsInput } from "page/deck-manager/savedeck/tags-input";
import Tooltip from "rc-tooltip";
import React, { useEffect, useState } from "react";
import cssButton from "components/button.module.scss";
import { faSortAmountUp } from "@fortawesome/free-solid-svg-icons/faSortAmountUp";

export default function SaveOrEditDeckForm({
  handleSaveButton,
  initialCreatedByDisplayName = "",
  initialDeckname = "",
  initialDescription = "",
  initialGameType = "",
  initialGameTypeSecondary = "",
  initialGameTypeThird = "",
  initialYoutubeLink = "",
  initialRedditLink = "",
  initialTags = [],
  initialIsPrivate = false,
  isPremadeDeckActive = null,
}) {
  const [deckname, setDeckname] = useState(initialDeckname);

  const [createdByDisplayName, setCreatedByDisplayName] = useState(initialCreatedByDisplayName);
  const currentUser = useCurrentUser();
  const usernameFromLocalStorage = localStorage(LAST_USERNAME_LOCALSTORAGE_KEY);

  useEffect(() => {
    const isNotEditMode = initialCreatedByDisplayName === "";
    if (!!currentUser && isNotEditMode) {
      setCreatedByDisplayName(
        usernameFromLocalStorage ? usernameFromLocalStorage : currentUser.displayName
      );
    }
  }, [currentUser, initialCreatedByDisplayName, usernameFromLocalStorage]);

  const [description, setDescription] = useState(initialDescription);
  const [gameType, setGameType] = useState(initialGameType);
  const [gameTypeSecondary, setGameTypeSecondary] = useState(initialGameTypeSecondary);
  useEffect(() => {
    if (isPremadeDeckActive !== null) {
      setGameType(LADDER);
      setGameTypeSecondary(PREMADE_TEAM);
    }
  }, [isPremadeDeckActive]);

  const [gameTypeThird, setGameTypeThird] = useState(initialGameTypeThird);

  const [youtubeLink, setYoutubeLink] = useState(initialYoutubeLink);
  const [redditLink, setRedditLink] = useState(initialRedditLink);

  const [tags, setTags] = useState(initialTags);

  const [isPrivate, setIsPrivate] = useState(initialIsPrivate);

  return (
    <div>
      <div className={css.formLayout}>
        <div className={css.inputGroupStyle}>
          <label htmlFor="createdByDisplayName">User Display Name *</label>
          <input
            type="text"
            name="createdByDisplayName"
            onChange={(e) => setCreatedByDisplayName(e.currentTarget.value)}
            value={createdByDisplayName}
          />
        </div>

        <div className={css.inputGroupStyle}>
          <label htmlFor="name">Deckname *</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setDeckname(e.currentTarget.value)}
            value={deckname}
          />
        </div>

        <div className={css.inputGroupStyle}>
          <GameTypeInput
            gameType={gameType}
            setGameType={setGameType}
            setGameTypeThird={setGameTypeThird}
          />
        </div>

        <div className={css.inputGroupStyle}>
          <GameTypeSecondaryInput
            gameTypeSecondary={gameTypeSecondary}
            setGameTypeSecondary={setGameTypeSecondary}
            gameType={gameType}
          />
        </div>

        {gameType === MAYHEM && (
          <div className={css.inputGroupStyle}>
            <GameTypeThirdInput gameTypeThird={gameTypeThird} setGameTypeThird={setGameTypeThird} />
          </div>
        )}

        <div className={css.inputGroupStyle}>
          <label htmlFor="youtubeLink">Youtube Replay Link</label>
          <input
            type="text"
            name="youtubeLink"
            onChange={(e) => setYoutubeLink(e.currentTarget.value)}
            value={youtubeLink}
          />
        </div>

        <div className={css.inputGroupStyle}>
          <label htmlFor="redditLink">
            Reddit Discussion Link{" "}
            <Tooltip
              placement="topRight"
              overlay={
                <ol>
                  <li>
                    Create a reddit post yourself. Please also link the Minionmasters Manager URL
                  </li>
                  <li>Copy and paste the URL from browser</li>
                  <li>Press "Save"-button and reload page after</li>
                </ol>
              }
            >
              <FontAwesomeIcon icon={faQuestionCircle} />
            </Tooltip>
          </label>
          <input
            type="text"
            name="redditLink"
            onChange={(e) => setRedditLink(e.currentTarget.value)}
            value={redditLink}
          />
        </div>

        <div className={css.inputGroupStyle}>
          <label htmlFor="tags">Tags</label>
          <TagsInput tags={tags} setTags={setTags} />
        </div>

        <div className={classnames( css.inputGroupStyle)}>
          <label htmlFor="isPrivate">Visibility</label>

        <div className={cssButton.ButtonGroupStyle}>
          <button
            className={classnames([
              isPrivate === true ? cssButton.isButtonActive : cssButton.isButtonInactive,
              cssButton.ButtonInGroupStyleWithState,
            ])}
            onClick={() => setIsPrivate(true)}
          >
            <Tooltip placement="bottomRight" overlay={<span> Only you will see the deck. You need to stay login to see your decks.</span>}>
              <span>Private</span>
            </Tooltip>
          </button>

          <button
            className={classnames([
              isPrivate === false ? cssButton.isButtonActive : cssButton.isButtonInactive,
              cssButton.ButtonInGroupStyleWithState,
            ])}
            onClick={() => setIsPrivate(false)}
          >
            <Tooltip placement="bottomRight" overlay={<span> After save, all will see your deck.</span>}>
              <span>Public</span>
            </Tooltip>
          </button>

          </div>
        </div>


        <div className={classnames(css.descriptionTextArea, css.inputGroupStyle)}>
          <label htmlFor="description">
            Description
            <Tooltip
              placement="topRight"
              overlay={
                <span>You might want to embed Reddit post instead with description text.</span>
              }
            >
              <FontAwesomeIcon icon={faQuestionCircle} />
            </Tooltip>
          </label>
          <textarea
            name="description"
            onChange={(e) => setDescription(e.currentTarget.value)}
            value={description}
            rows={3}
          />
        </div>


      </div>

      <SaveOrEditToDatabaseButton
        deckname={deckname}
        createdByDisplayName={createdByDisplayName}
        description={description}
        gameType={gameType}
        gameTypeSecondary={gameTypeSecondary}
        gameTypeThird={gameTypeThird}
        youtubeLink={youtubeLink}
        redditLink={redditLink}
        tags={tags}
        isPrivate={isPrivate}
        handleSaveButton={handleSaveButton}
      />
    </div>
  );
}
