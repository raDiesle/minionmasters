import { isForImagePreview } from "components/helper";
import mToast from "components/mToast";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import { getCardWithDataByListOfId } from "page/deck-manager/deck/carddeckimport/import-helper";
import { INITIAL_EMPTY_SLOT_DATA } from "page/page-config";
import qs from "qs";
import { useEffect } from "react";

export const getSelectedMasterByUrl = (masterParam) =>
  Object.keys(mastersMapping).find((key) => mastersMapping[key].iD === parseInt(masterParam));

export const getSelectedCardsByUrl = (selectediDsFromUrl) => {
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

const convertUrlToSelections = ({ urlParams, setSelectedMaster, setLastSelectedCards }) => {
  try {
    if (urlParams.master) {
      setSelectedMaster(getSelectedMasterByUrl(urlParams.master));
    }
    const selectedCardsByUrl = getSelectedCardsByUrl(urlParams.iD);
    if (selectedCardsByUrl !== null) {
      setLastSelectedCards(selectedCardsByUrl);
    }
  } catch (e) {
    mToast("Something went wrong.");
  }
  if (!isForImagePreview) {
    mToast("Deck was loaded from link.");
  }
};

export function ImportFromUrl({ setLastSelectedCards, setSelectedMaster }) {
  useEffect(() => {
    let urlParams = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });
    convertUrlToSelections({ urlParams, setSelectedMaster, setLastSelectedCards });
  }, []); // eslint-disable-line  react-hooks/exhaustive-deps

  return null;
}
