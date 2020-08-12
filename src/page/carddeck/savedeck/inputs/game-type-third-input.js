import { GAME_TYPES, MAYHEM } from "page/carddeck/savedeck/saved-decks-configs";
import React from "react";

export default function GameTypeThirdInput({ gameType, gameTypeThird, setGameTypeThird }) {
  if (gameType !== MAYHEM) {
    return null;
  }
  return (
    <div>
      <label htmlFor="gameTypeSecondary">Mayhem Type</label>
      <select
        name="gameTypeSecondary"
        onChange={(e) => setGameTypeThird(e.currentTarget.value)}
        value={gameTypeThird}
        style={{ width: "100%" }}
      >
        <option value="">-</option>
        {GAME_TYPES.find(({ key }) => key === MAYHEM).subitems.map(({ key }) => (
          <option value={key} key={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
}
