export function getCardIdsFromCount(lastSelectedCards) {
  return lastSelectedCards.reduce((total, { count, card: { iD } }) => {
    const wildcardsToMultipleIds = [...Array(count).keys()].map(() => iD);
    const mergeTotal = [...total, ...wildcardsToMultipleIds];
    return mergeTotal;
  }, []);
}

export function getCardNamesFromCount(lastSelectedCards) {
  return lastSelectedCards.reduce((total, { count, card: { name } }) => {
    const wildcardsToMultipleIds = [...Array(count).keys()].map(() => name);
    const mergeTotal = [...total, ...wildcardsToMultipleIds];
    return mergeTotal;
  }, []);
}

export function getCardDataFromCount(lastSelectedCards) {
  return lastSelectedCards.reduce((total, { count, card }) => {
    const wildcardsToMultipleIds = [...Array(count).keys()].map(() => card);
    const mergeTotal = [...total, ...wildcardsToMultipleIds];
    return mergeTotal;
  }, []);
}
