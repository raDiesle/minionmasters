import { ImportSingleDeckFromUrl } from "page/deck-manager/deck/import-export/url-import-export/import-single-deck-from-url";
import {
  CARD_PARAM_KEY,
  MASTER_PARAM_KEY,
  PREMADE_CARD_PARAM_KEY,
  PREMADE_MASTER_PARAM_KEY
} from "page/deck-manager/deck/import-export/url-import-export/url-export-import-config";
import React from "react";

export function ImportDecksFromUrl({
  setSelectedMaster,
  setLastSelectedCards,
  setSelectedPremadeMaster,
  setLastSelectedPremadeCards,
}) {
  return (
    <>
      <ImportSingleDeckFromUrl
        setSelectedMaster={setSelectedMaster}
        setLastSelectedCards={setLastSelectedCards}
        masterParamKey={MASTER_PARAM_KEY}
        cardsParamKey={CARD_PARAM_KEY}
      />
      <ImportSingleDeckFromUrl
        setSelectedMaster={setSelectedPremadeMaster}
        setLastSelectedCards={setLastSelectedPremadeCards}
        masterParamKey={PREMADE_MASTER_PARAM_KEY}
        cardsParamKey={PREMADE_CARD_PARAM_KEY}
      />
    </>
  );
}
