import { Deck } from "page/deck-manager/deck/deck";
import { ImportFromUrl } from "page/deck-manager/deck/import-from-url";
import { useLastSelectedCards } from "page/deck-manager/deck/useLastSelectedCards";
import { DEFAULT_MASTER_NOT_SELECTED } from "page/page";
import React, { useState } from "react";

export default function AppPreview() {
  const [selectedMaster, setSelectedMaster] = useState(DEFAULT_MASTER_NOT_SELECTED);
  const [lastSelectedCards, setLastSelectedCards] = useLastSelectedCards();

  return (
    <div>
      <ImportFromUrl
        setLastSelectedCards={setLastSelectedCards}
        setSelectedMaster={setSelectedMaster}
      />

      <Deck
        setLastSelectedCards={setLastSelectedCards}
        selectedMaster={selectedMaster}
        setSelectedMaster={setSelectedMaster}
        lastSelectedCards={lastSelectedCards}
      />
    </div>
  );
}
