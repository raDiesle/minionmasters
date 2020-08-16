// Export to URL
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";

export function exportDeckUrl(selectedMaster, lastSelectedCards) {
  const lastSelectedCardiDs = lastSelectedCards.reduce((total, { count, card: { iD } }) => {
    const wildcardsToMultipleIds = [...Array(count).keys()].map(() => iD);
    const mergeTotal = [...total, ...wildcardsToMultipleIds];
    return mergeTotal;
  }, []);
  const iDsToParam = lastSelectedCardiDs.join("&iD=");

  const masterParam = `master=${mastersMapping[selectedMaster].iD}`;
  const port = window.location.port === "3000" ? `:${window.location.port}` : "";
  const url = `${window.location.protocol}//${window.location.hostname}${port}${window.location.pathname}?${masterParam}&iD=${iDsToParam}`;

  return url;
}
