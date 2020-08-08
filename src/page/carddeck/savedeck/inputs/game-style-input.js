import { PLAY_STYLES } from "page/carddeck/savedeck/saved-decks-configs";
import React from "react";

export default function GameStyleInput({ playStyle, setPlayStyle }) {
  return (
    <div>
      <label htmlFor="playStyle">Play Style</label>
      <select
        name="playStyle"
        onChange={(e) => setPlayStyle(e.currentTarget.value)}
        value={playStyle}
        style={{ width: "100%" }}
      >
        <option value="">-</option>
        {PLAY_STYLES.map(({ key }) => (
          <option value={key} key={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
}
