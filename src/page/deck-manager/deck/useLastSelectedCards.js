import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page-config";
import { useState } from "react";

export const useLastSelectedCards = () => {
  const Slots = [...Array(10).keys()];
  const [lastSelectedCards, setLastSelectedCards] = useState(
    Slots.map((slot) => {
      return {
        card: {
          iD: IDENTIFIER_FOR_EMPTY_SLOT,
        },
        count: 0,
      };
    })
  );
  return [lastSelectedCards, setLastSelectedCards];
};
