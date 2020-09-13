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
import Tooltip from "rc-tooltip";
import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

const TAGS_CONFIG_INITIAL = [
  "Voidborne",
  "Elves",
  "Zen-Chi",
  "Accursed",
  "Meta",
  "Fun",
  "Spell Intense",
  "Big Minions",
  "Medium Minions",
  "Small Minions",
  "Siege Pack",
  "Ranged",
  "Call to Arms",
  "Early Game",
  "Mid Game",
  "Late Game",
  "Easy skill",
  "Medium skill",
  "Hard skill",
  "Experimental",
  "Tournament Winner",
].map((label) => ({ value: label.toLowerCase().replace(/\W/g, ""), label }));

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
  const [tagsConfig, setTagsConfig] = useState([...new Set([...TAGS_CONFIG_INITIAL, ...tags])]);

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
          <CreatableSelect
            name="tags"
            options={tagsConfig}
            value={tags}
            onChange={(newValue, actionMeta) => {
              setTags(newValue || []);
            }}
            isValidNewOption={() => true}
            formatCreateLabel={(value) => <span>add "{value}"</span>}
            onCreateOption={(inputValue) => {
              const newValueObject = {
                value: inputValue.toLowerCase().replace(/\W/g, ""),
                label: inputValue,
              };
              setTagsConfig((prevTags) => [...prevTags, newValueObject]);
              setTags((prevTags) => [...prevTags, newValueObject]);
            }}
            isMulti
            isClearable
            isSearchable
            classNamePrefix="react-select"
            className={css.tagInput}
            placeholder="Select multiple and add new"
            closeMenuOnSelect={false}
          />
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
        handleSaveButton={handleSaveButton}
      />
    </div>
  );
}
