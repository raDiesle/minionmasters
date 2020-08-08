import { GAME_TYPES } from "page/carddeck/savedeck/saved-decks-configs";
import React from "react";

export default function GameTypeSecondaryInput({
  gameTypeSecondary,
  setGameTypeSecondary,
  gameType,
}) {
  return (
    <div>
      <label htmlFor="gameTypeSecondary">Sub Game Type</label>
      <select
        name="gameType"
        onChange={(e) => setGameTypeSecondary(e.currentTarget.value)}
        value={gameTypeSecondary}
        disabled={!gameType}
        style={{ width: "100%" }}
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
  );
}
