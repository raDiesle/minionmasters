import allCardsData from "generated/jobCardProps.json";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page-config";

export function getCardWithDataByListOfId(selectediDs) {
  var iDsWithOccurenceMap = {};
  selectediDs.forEach(function (v) {
    if (iDsWithOccurenceMap[v]) iDsWithOccurenceMap[v]++;
    else iDsWithOccurenceMap[v] = 1;
  });

  const selectediDsNormalized = selectediDs
    ? Object.keys(iDsWithOccurenceMap).map((key) => ({
        iD: parseInt(key),
        count: iDsWithOccurenceMap[key],
      }))
    : [];
  const prefillSelectedCardsWithData = selectediDsNormalized.map(({ iD: selectediD, count }) => {
    const selectedCardData = allCardsData.find(({ iD }) => selectediD === parseInt(iD));
    return {
      card:
        typeof selectedCardData === "undefined"
          ? { iD: IDENTIFIER_FOR_EMPTY_SLOT }
          : selectedCardData,
      count,
    };
  });
  return prefillSelectedCardsWithData;
}
