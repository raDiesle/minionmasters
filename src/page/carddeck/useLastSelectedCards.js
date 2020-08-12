import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/carddeck/DeckContainer";
import { useState } from "react";

export const useLastSelectedCards = () => {
  const Slots = [...Array(10).keys()];
  const [lastSelectedCards, setLastSelectedCards] = useState(
    Slots.map((slot) => {
      return {
        eventId: 0,
        card: {
          iD: IDENTIFIER_FOR_EMPTY_SLOT,
        },
        count: 0,
      };
    })
  );
  return [lastSelectedCards, setLastSelectedCards];
};
