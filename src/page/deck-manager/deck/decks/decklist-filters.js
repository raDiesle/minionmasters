import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import css from "page/deck-manager/deck/decks/decklist-filters.module.scss";
import GameTypeInput from "page/deck-manager/savedeck/inputs/game-type-input";
import GameTypeSecondaryInput from "page/deck-manager/savedeck/inputs/game-type-secondary-input";
import GameTypeThirdInput from "page/deck-manager/savedeck/inputs/game-type-third-input";
import React from "react";

export default function DecklistFilters({
  gameType,
  setGameType,
  gameTypeSecondary,
  setGameTypeSecondary,
  gameTypeThird,
  setGameTypeThird,
  masterFilter,
  setMasterFilter,
}) {
  return (
    <div className={css.formLayout}>
      <GameTypeInput
        gameType={gameType}
        setGameType={setGameType}
        setGameTypeThird={setGameTypeThird}
      />
      <GameTypeSecondaryInput
        gameTypeSecondary={gameTypeSecondary}
        setGameTypeSecondary={setGameTypeSecondary}
        gameType={gameType}
      />

      <GameTypeThirdInput
        gameType={gameType}
        gameTypeThird={gameTypeThird}
        setGameTypeThird={setGameTypeThird}
      />

      <div>
        <label htmlFor="masterFilter">Master</label>
        <select
          name="masterFilter"
          onChange={(e) => setMasterFilter(e.currentTarget.value)}
          value={masterFilter}
          style={{ width: "100%" }}
        >
          <option value="">-</option>
          {Object.keys(mastersMapping).map((key) => (
            <option value={key} key={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
