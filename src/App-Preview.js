import { CardDeck } from "page/carddeck/CardDeck";
import { DEFAULT_MASTER_NOT_SELECTED, DEFAULT_SELECTED_TAB } from "page/carddeck/DeckContainer";
import { ImportFromUrl } from "page/carddeck/ImportFromUrl";
import { useLastSelectedCards } from "page/carddeck/useLastSelectedCards";
import { useSelectedCardEvent } from "page/carddeck/useSelectedCardEvent";
import React, { useState } from "react";

export default function AppPreview() {
  const [, setSelectedTabIndex] = useState(DEFAULT_SELECTED_TAB);
  const [selectedHero, setSelectedHero] = useState(DEFAULT_MASTER_NOT_SELECTED);
  const [selectedCardEvent, setSelectedCardEvent] = useSelectedCardEvent();
  const [lastSelectedCards, setLastSelectedCards] = useLastSelectedCards();

  return (
    <div>
      <ImportFromUrl
        setLastSelectedCards={setLastSelectedCards}
        setSelectedHero={setSelectedHero}
      />

      <CardDeck
        selectedCardEvent={selectedCardEvent}
        setSelectedCardEvent={setSelectedCardEvent}
        setLastSelectedCards={setLastSelectedCards}
        selectedHero={selectedHero}
        setSelectedHero={setSelectedHero}
        lastSelectedCards={lastSelectedCards}
        setSelectedTabIndex={setSelectedTabIndex}
      />
    </div>
  );
}
