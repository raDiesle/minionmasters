import { gaTrackView } from "firestore";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/carddeck/DeckContainer";
import React from "react";

import AnalyzeDeck from "./analyze-deck";
import SaveDeckToDb from "./save-deck-to-db";

export default function SaveDeckContainer({ lastSelectedCards, selectedHero }) {
  gaTrackView("/SaveDeckContainer");
  const relevantCards = lastSelectedCards
    .filter(({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT)
    .map(({ card }) => card);

  return (
    <div>
      <AnalyzeDeck relevantCards={relevantCards} selectedHero={selectedHero} />

      <SaveDeckToDb relevantCards={relevantCards} selectedHero={selectedHero} />
    </div>
  );
}
