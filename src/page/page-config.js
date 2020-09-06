export const Slots = [...Array(10).keys()];
export const IDENTIFIER_FOR_EMPTY_SLOT = 999999;
export const INITIAL_EMPTY_SLOT_DATA = Slots.map((slot) => {
  return {
    card: {
      iD: IDENTIFIER_FOR_EMPTY_SLOT,
    },
    count: 0,
  };
});

export const findFirstNextFreeSlot = (lastSelectedCards) =>
  Slots.find(
    (slotPosition) => lastSelectedCards[slotPosition].card.iD === IDENTIFIER_FOR_EMPTY_SLOT
  );
