import * as classnames from "classnames";
import SaveDbButton from "page/carddeck/savedeck/save-db-button";
import { GAME_TYPES, PLAY_STYLES } from "page/carddeck/savedeck/saved-decks-configs";
import React, { useState } from "react";
import css from "./save-deck-form.module.scss";

export default function SaveDeckForm({ relevantCards, selectedHero }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gameType, setGameType] = useState("");
  const [gameTypeSecondary, setGameTypeSecondary] = useState("");
  const [playStyle, setPlayStyle] = useState("");

  return (
    <div>
      <div className={css.formLayout}>
        <div className={css.inputGroupStyle}>
          <label htmlFor="name">Deckname *</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.currentTarget.value)}
            value={name}
          />
        </div>

        <div className={css.inputGroupStyle}>
          <label htmlFor="playStyle">Play Style *</label>
          <select
            name="playStyle"
            onChange={(e) => setPlayStyle(e.currentTarget.value)}
            value={playStyle}
          >
            <option value="">-</option>
            {PLAY_STYLES.map(({ key }) => (
              <option value={key} key={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div className={css.inputGroupStyle}>
          <label htmlFor="gameType">Game Type *</label>
          <select
            name="gameType"
            onChange={(e) => setGameType(e.currentTarget.value)}
            value={gameType}
          >
            <option value="">-</option>
            {GAME_TYPES.map(({ key }) => (
              <option value={key} key={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div className={css.inputGroupStyle}>
          <label htmlFor="gameTypeSecondary">Sub Game Type *</label>
          <select
            name="gameType"
            onChange={(e) => setGameTypeSecondary(e.currentTarget.value)}
            value={gameTypeSecondary}
            disabled={!gameType}
          >
            <option value="">-</option>
            {gameType &&
              GAME_TYPES.find(({ key }) => key === gameType).subitems.map(({ key }) => (
                <option value={key} key={key}>
                  {key}
                </option>
              ))}
          </select>
        </div>

        <div className={classnames(css.descriptionTextArea, css.inputGroupStyle)}>
          <label htmlFor="description">Description *</label>
          <textarea
            name="description"
            onChange={(e) => setDescription(e.currentTarget.value)}
            value={description}
            rows={3}
          />
        </div>
      </div>

      <SaveDbButton
        relevantCards={relevantCards}
        selectedHero={selectedHero}
        name={name}
        description={description}
        gameType={gameType}
        gameTypeSecondary={gameTypeSecondary}
        playStyle={playStyle}
      />
    </div>
  );
}
