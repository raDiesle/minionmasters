import React from "react";
import AnalysisData from "./analysis-data";

export default function AnalyzeDeck({ relevantCards, selectedHero }) {
  return (
    <div>
      <AnalysisData cards={relevantCards} />
    </div>
  );
}
