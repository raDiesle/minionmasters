import { PLAYER_GAME_TYPE } from "page/deck-manager/savedeck/saved-decks-configs";
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
        name="gameTypeSecondary"
        onChange={(e) => setGameTypeSecondary(e.currentTarget.value)}
        value={gameTypeSecondary}
        style={{ width: "100%" }}
      >
        <option value="">-</option>
        {gameType &&
          PLAYER_GAME_TYPE.map(({ key }) => (
            <option value={key} key={key}>
              {key}
            </option>
          ))}
      </select>
    </div>
  );
}
