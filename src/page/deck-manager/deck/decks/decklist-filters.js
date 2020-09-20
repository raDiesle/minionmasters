import { CreatedByDisplayInput } from "page/deck-manager/deck/decks/created-by-display-input";
import css from "page/deck-manager/deck/decks/decklist-filters.module.scss";
import { MasterFilterInput } from "page/deck-manager/deck/decks/master-filter-input";
import GameTypeInput from "page/deck-manager/savedeck/inputs/game-type-input";
import GameTypeSecondaryInput from "page/deck-manager/savedeck/inputs/game-type-secondary-input";
import GameTypeThirdInput from "page/deck-manager/savedeck/inputs/game-type-third-input";
import { TagsInput } from "page/deck-manager/savedeck/tags-input";
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
  createdByFilterOptions,
  createdByFilter,
  setCreatedByFilter,
  tagsFilter,
  setTagsFilter
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

      <MasterFilterInput masterFilter={masterFilter} setMasterFilter={setMasterFilter} />

      <CreatedByDisplayInput
        createdByFilterOptions={createdByFilterOptions}
        createdByFilter={createdByFilter}
        setCreatedByFilter={setCreatedByFilter}
      />

      <div>
        <label htmlFor="tags">Tags</label>
        <TagsInput tags={tagsFilter} setTags={setTagsFilter}/>
      </div>
    </div>
  );
}
