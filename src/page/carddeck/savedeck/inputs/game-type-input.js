import { GAME_TYPES } from "page/carddeck/savedeck/saved-decks-configs";
import React from "react";

export default function GameTypeInput({ gameType, setGameType, setGameTypeSecondary }) {
  return (
    <div>
      {" "}
      <label htmlFor="gameType">Game Type</label>
      <select
        name="gameType"
        onChange={(e) => {
          const newGameType = e.currentTarget.value;
          setGameType(newGameType);
          if (newGameType === "") {
            setGameTypeSecondary("");
          }
        }}
        value={gameType}
        style={{ width: "100%" }}
      >
        <option value="">-</option>
        {GAME_TYPES.map(({ key }) => (
          <option value={key} key={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
}
