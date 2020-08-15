import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/carddeck/deck-manager";
import React from "react";
import AnalysisData from "./analysis-data";

export default function AnalyzeDeck({ lastSelectedCards, selectedHero }) {
  const relevantCards = lastSelectedCards
    .filter(({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT)
    .map(({ card }) => card);

  return (
    <div>
      <fieldset>
        <legend>Analysis</legend>
        <AnalysisData cards={relevantCards} />
      </fieldset>
    </div>
  );
}
