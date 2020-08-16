// Export to URL
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import { DEFAULT_MASTER_NOT_SELECTED } from "page/page-config";

export function toParams(selectedMaster, lastSelectedCards) {
  const lastSelectedCardiDs = lastSelectedCards.reduce((total, { count, card: { iD } }) => {
    const wildcardsToMultipleIds = [...Array(count).keys()].map(() => iD);
    const mergeTotal = [...total, ...wildcardsToMultipleIds];
    return mergeTotal;
  }, []);
  const iDsToParam = lastSelectedCardiDs.join("&iD=");

  const masterParam = `master=${
    mastersMapping[selectedMaster] ? mastersMapping[selectedMaster].iD : DEFAULT_MASTER_NOT_SELECTED
  }`;
  const params = `?${masterParam}&iD=${iDsToParam}`;
  return params;
}

export function exportDeckUrl(selectedMaster, lastSelectedCards) {
  const params = toParams(selectedMaster, lastSelectedCards);
  const port = window.location.port === "3000" ? `:${window.location.port}` : "";
  const path = "preview"; // indicator for preview   //`${window.location.pathname}`;
  const url = `${window.location.protocol}//${window.location.hostname}${port}/${path}${params}`;

  return url;
}
