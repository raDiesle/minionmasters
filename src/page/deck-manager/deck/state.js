import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page-config";

export const STATE_CONFIG = {
  IS_ALL_EMPTY: "IS_ALL_EMPTY",
  IS_ALL_SELECTED: "IS_ALL_SELECTED",
  IS_SOME_SELECTED: "IS_SOME_SELECTED",
};

export function getState(masterSelected, lastSelectedCards) {
  const isEmptySlots = lastSelectedCards.every(
    ({ card: { iD } }) => iD === IDENTIFIER_FOR_EMPTY_SLOT
  );
  if (isEmptySlots) {
    return STATE_CONFIG.IS_ALL_EMPTY;
  }

  const isAllSelected = lastSelectedCards.every(
    ({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT
  );
  if (isAllSelected) {
    return STATE_CONFIG.IS_ALL_SELECTED;
  }

  const isStartedAndStillBuildingDeck = lastSelectedCards.some(
    ({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT
  );
  if (isStartedAndStillBuildingDeck) {
    return STATE_CONFIG.IS_SOME_SELECTED;
  }
}
