import { Deck } from "page/carddeck/deck";
import { ImportFromUrl } from "page/carddeck/import-from-url";
import { useLastSelectedCards } from "page/carddeck/useLastSelectedCards";
import { DEFAULT_MASTER_NOT_SELECTED } from "page/Page";
import React, { useState } from "react";

export default function AppPreview() {
  const [selectedHero, setSelectedHero] = useState(DEFAULT_MASTER_NOT_SELECTED);
  const [lastSelectedCards, setLastSelectedCards] = useLastSelectedCards();

  return (
    <div>
      <ImportFromUrl
        setLastSelectedCards={setLastSelectedCards}
        setSelectedHero={setSelectedHero}
      />

      <Deck
        setLastSelectedCards={setLastSelectedCards}
        selectedHero={selectedHero}
        setSelectedHero={setSelectedHero}
        lastSelectedCards={lastSelectedCards}
      />
    </div>
  );
}
