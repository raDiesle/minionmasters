import { Slots } from "page/deck-manager/deck-manager";

export const IDENTIFIER_FOR_EMPTY_SLOT = 999999;
export const INITIAL_EMPTY_SLOT_DATA = Slots.map((slot) => {
  return {
    card: {
      iD: IDENTIFIER_FOR_EMPTY_SLOT,
    },
    count: 0,
  };
});
