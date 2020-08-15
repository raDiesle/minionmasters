import { isForImagePreview } from "components/helper";
import mToast from "components/mToast";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page";
import qs from "qs";
import { useEffect } from "react";

import allCardsData from "generated/jobCardProps.json";

export function ImportFromUrl({ setLastSelectedCards, setSelectedMaster }) {
  useEffect(() => {
    let urlParams = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    if (urlParams.master) {
      //const  mastersMapping.find(({ iD }) => iD === urlParams.master)
      const keyByValue = Object.keys(mastersMapping).find(
        (key) => mastersMapping[key].iD === parseInt(urlParams.master)
      );
      setSelectedMaster(keyByValue);
    }

    let selectediDsFromUrl = urlParams.iD;

    if (selectediDsFromUrl && !Array.isArray(selectediDsFromUrl)) {
      selectediDsFromUrl = [selectediDsFromUrl];
    }
    if (!selectediDsFromUrl || selectediDsFromUrl.size === 0) {
      return;
    }

    var iDsWithOccurenceMap = {};
    selectediDsFromUrl.forEach(function (v) {
      if (iDsWithOccurenceMap[v]) iDsWithOccurenceMap[v]++;
      else iDsWithOccurenceMap[v] = 1;
    });

    const selectediDsNormalized = selectediDsFromUrl
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

    setLastSelectedCards((initialSelectedCards) => {
      const normalized = initialSelectedCards.map(
        (card, index) => prefillSelectedCardsWithData[index] || card
      );
      // TODO const nextFreeSlot = normalized.findIndex(({iD}) => iD === IDENTIFIER_FOR_EMPTY_SLOT);
      // TODO setCurrentSelectedSlot(nextFreeSlot);
      return normalized;
    });

    if (!isForImagePreview) {
      mToast("Deck was loaded from link.");
    }
  }, []); // eslint-disable-line  react-hooks/exhaustive-deps

  return null;
}
