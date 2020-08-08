import GameStyleInput from "page/carddeck/savedeck/inputs/game-style-input";
import GameTypeInput from "page/carddeck/savedeck/inputs/game-type-input";
import GameTypeSecondaryInput from "page/carddeck/savedeck/inputs/game-type-secondary-input";
import React from "react";
import css from "./decklist-filters.module.scss";

export default function DecklistFilters({
  gameType,
  setGameType,
  gameTypeSecondary,
  setGameTypeSecondary,
  playStyle,
  setPlayStyle,
}) {
  return (
    <div className={css.formLayout}>
      <GameTypeInput
        gameType={gameType}
        setGameType={setGameType}
        setGameTypeSecondary={setGameTypeSecondary}
      />
      <GameTypeSecondaryInput
        gameTypeSecondary={gameTypeSecondary}
        setGameTypeSecondary={setGameTypeSecondary}
        gameType={gameType}
      />
      <GameStyleInput playStyle={playStyle} setPlayStyle={setPlayStyle} />
    </div>
  );
}
