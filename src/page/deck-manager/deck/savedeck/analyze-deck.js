import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page";
import React from "react";
import AnalysisData from "page/deck-manager/deck/savedeck/analysis-data";

export default function AnalyzeDeck({ lastSelectedCards, selectedMaster }) {
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
