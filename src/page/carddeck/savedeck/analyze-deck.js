import React from "react";
import AnalysisData from "./analysis-data";

export default function AnalyzeDeck({ relevantCards, selectedHero }) {
  return (
    <div>
      <fieldset>
        <legend>Analysis</legend>
        <AnalysisData cards={relevantCards} />
      </fieldset>
    </div>
  );
}
