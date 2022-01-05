import React, { useState } from "react";
import { SaveMapping } from "page/elo/save-mapping";
import { EloRanking } from "page/elo/elo-ranking";

export function Elo() {

  const [isMappingMode, setIsMappingMode] = useState(false);
  return (<div>
    <SaveMapping isMappingMode={isMappingMode} setIsMappingMode={setIsMappingMode} />
    {!isMappingMode && <EloRanking/>}
  </div>);
}