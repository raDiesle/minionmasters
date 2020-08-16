import * as classnames from "classnames";
import { useCurrentUser } from "components/helper";
import GameTypeInput from "page/deck-manager/deck/savedeck/inputs/game-type-input";
import GameTypeSecondaryInput from "page/deck-manager/deck/savedeck/inputs/game-type-secondary-input";
import GameTypeThirdInput from "page/deck-manager/deck/savedeck/inputs/game-type-third-input";
import SaveDbButton from "page/deck-manager/deck/savedeck/save-db-button";
import css from "page/deck-manager/deck/savedeck/save-deck-form.module.scss";
import React, { useEffect, useState } from "react";

export default function SaveDeckForm({ lastSelectedCards, selectedMaster }) {
  const [name, setName] = useState("");

  const [createdByDisplayName, setCreatedByDisplayName] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser.displayName) {
      setCreatedByDisplayName(currentUser.displayName);
    }
  }, [currentUser]);

  const [description, setDescription] = useState("");
  const [gameType, setGameType] = useState("");
  const [gameTypeSecondary, setGameTypeSecondary] = useState("");
  const [gameTypeThird, setGameTypeThird] = useState("");

  return (
    <div>
      <div className={css.formLayout}>
        <div className={css.inputGroupStyle}>
          <label htmlFor="createdByDisplayName">User Display Name</label>
          <input
            type="text"
            name="createdByDisplayName"
            onChange={(e) => setCreatedByDisplayName(e.currentTarget.value)}
            value={createdByDisplayName}
          />
        </div>

        <div className={css.inputGroupStyle}>
          <label htmlFor="name">Deckname</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.currentTarget.value)}
            value={name}
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

        <div className={css.inputGroupStyle}>
          <GameTypeThirdInput
            gameType={gameType}
            gameTypeThird={gameTypeThird}
            setGameTypeThird={setGameTypeThird}
          />
        </div>

        <div className={classnames(css.descriptionTextArea, css.inputGroupStyle)}>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            onChange={(e) => setDescription(e.currentTarget.value)}
            value={description}
            rows={3}
          />
        </div>
      </div>

      <SaveDbButton
        lastSelectedCards={lastSelectedCards}
        selectedMaster={selectedMaster}
        name={name}
        createdByDisplayName={createdByDisplayName}
        description={description}
        gameType={gameType}
        gameTypeSecondary={gameTypeSecondary}
        gameTypeThird={gameTypeThird}
      />
    </div>
  );
}
