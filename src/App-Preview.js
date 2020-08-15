import { Deck } from "page/carddeck/deck";
import { DEFAULT_MASTER_NOT_SELECTED } from "page/carddeck/deck-manager";
import { ImportFromUrl } from "page/carddeck/import-from-url";
import { useLastSelectedCards } from "page/carddeck/useLastSelectedCards";
import { useSelectedCardEvent } from "page/carddeck/useSelectedCardEvent";
import React, { useState } from "react";

export default function AppPreview() {
  const [selectedHero, setSelectedHero] = useState(DEFAULT_MASTER_NOT_SELECTED);
  const [selectedCardEvent, setSelectedCardEvent] = useSelectedCardEvent();
  const [lastSelectedCards, setLastSelectedCards] = useLastSelectedCards();

  return (
    <div>
      <ImportFromUrl
        setLastSelectedCards={setLastSelectedCards}
        setSelectedHero={setSelectedHero}
      />

      <Deck
        selectedCardEvent={selectedCardEvent}
        setSelectedCardEvent={setSelectedCardEvent}
        setLastSelectedCards={setLastSelectedCards}
        selectedHero={selectedHero}
        setSelectedHero={setSelectedHero}
        lastSelectedCards={lastSelectedCards}
      />
    </div>
  );
}
