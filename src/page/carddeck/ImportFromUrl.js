import { isForImagePreview } from "components/helper";
import mToast from "components/mToast";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/carddeck/DeckContainer";
import { mastersMapping } from "page/mastersoverview/mastersMapping";
import qs from "qs";
import { useEffect } from "react";

import allCardsData from "../../generated/jobCardProps";

export function ImportFromUrl({ setLastSelectedCards, setSelectedHero }) {
  useEffect(() => {
    let urlParams = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    if (urlParams.hero) {
      //const  mastersMapping.find(({ iD }) => iD === urlParams.hero)
      const keyByValue = Object.keys(mastersMapping).find(
        (key) => mastersMapping[key].iD === parseInt(urlParams.hero)
      );
      setSelectedHero(keyByValue);
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
        eventId: 0,
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
