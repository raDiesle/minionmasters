import React, { useState } from "react";

import { useLocation } from "react-router-dom";
import { SaveMapping } from "page/elo/save-mapping";
import { EloRanking } from "page/elo/elo-ranking";
import { EloDetails } from "page/elo/elo-details";

export function Elo() {
  const location = useLocation();
  const [isMappingMode, setIsMappingMode] = useState(false);

  if(location.search === ""){
    return <div>
      <div><SaveMapping isMappingMode={isMappingMode} setIsMappingMode={setIsMappingMode} />
        {!isMappingMode && <EloRanking/>}</div>
    </div>
  }

  return (<div>
    <EloDetails/>
  </div>);
}