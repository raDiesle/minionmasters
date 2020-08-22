import { isForImagePreview } from "components/helper";
import mToast from "components/mToast";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import { getCardWithDataByListOfId } from "page/deck-manager/deck/carddeckimport/import-helper";
import qs from "qs";
import { useEffect } from "react";

export function ImportFromUrl({ setLastSelectedCards, setSelectedMaster }) {
  useEffect(() => {
    let urlParams = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });
    try {
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

      const prefillSelectedCardsWithData = getCardWithDataByListOfId(selectediDsFromUrl);

      setLastSelectedCards((initialSelectedCards) => {
        const normalized = initialSelectedCards.map(
          (card, index) => prefillSelectedCardsWithData[index] || card
        );
        // TODO const nextFreeSlot = normalized.findIndex(({iD}) => iD === IDENTIFIER_FOR_EMPTY_SLOT);
        // TODO setCurrentSelectedSlot(nextFreeSlot);

        return normalized;
      });
    } catch (e) {
      mToast("Something went wrong.");
    }
    if (!isForImagePreview) {
      mToast("Deck was loaded from link.");
    }
  }, []); // eslint-disable-line  react-hooks/exhaustive-deps

  return null;
}
