import { isForImagePreview } from "components/helper";
import mToast from "components/mToast";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import { getCardWithDataByListOfId } from "page/deck-manager/deck/import-export/carddeckimport/import-helper";
import { INITIAL_EMPTY_SLOT_DATA } from "page/page-config";
import qs from "qs";
import { useEffect } from "react";

const getSelectedMasterByUrl = (masterParam) =>
  Object.keys(mastersMapping).find((key) => mastersMapping[key].iD === parseInt(masterParam));

const getSelectedCardsByUrl = (selectediDsFromUrl) => {
  if (selectediDsFromUrl && !Array.isArray(selectediDsFromUrl)) {
    selectediDsFromUrl = [selectediDsFromUrl];
  }
  if (!selectediDsFromUrl || selectediDsFromUrl.size === 0) {
    return null;
  }

  const prefillSelectedCardsWithData = getCardWithDataByListOfId(selectediDsFromUrl);

  const normalized = INITIAL_EMPTY_SLOT_DATA.map(
    (card, index) => prefillSelectedCardsWithData[index] || card
  );
  // TODO const nextFreeSlot = normalized.findIndex(({iD}) => iD === IDENTIFIER_FOR_EMPTY_SLOT);
  // TODO setCurrentSelectedSlot(nextFreeSlot);

  return normalized;
};

export function ImportSingleDeckFromUrl({
  setLastSelectedCards,
  setSelectedMaster,
  masterParamKey,
  cardsParamKey,
}) {
  useEffect(() => {
    const urlParams = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });
    const masterParamValue = urlParams[masterParamKey];
    if (!masterParamValue) {
      return;
    }

    const master = getSelectedMasterByUrl(masterParamValue);
    const cardIdParamValue = urlParams[cardsParamKey];

    try {
      setSelectedMaster(master);
      const selectedCardsByUrl = getSelectedCardsByUrl(cardIdParamValue);
      if (selectedCardsByUrl !== null) {
        setLastSelectedCards(selectedCardsByUrl);
      }
    } catch (e) {
      mToast("Something went wrong.");
    }
    if (!isForImagePreview) {
      mToast("Deck was loaded from link.");
    }
  }, []); // eslint-disable-line  react-hooks/exhaustive-deps

  return null;
}
