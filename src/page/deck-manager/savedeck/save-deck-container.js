import LoginRequired from "components/login-required";
import { useGaTrackView } from "footer/consent-cookie-banner";
import SaveDeckPrimaryValidationAndForm from "page/deck-manager/savedeck/save-deck-content";
import React from "react";

export default function SaveDeckContainer({
  lastSelectedCards,
  selectedMaster,
  lastSelectedPremadeCards,
  selectedPremadeMaster,
  isPremadeDeckActive,
}) {
  useGaTrackView("/SaveDeckContainer");

  return (
    <div>
      <LoginRequired />
      <h3>Save deck for public share</h3>
      <div>
        Visible on "Decks". Alternatively, you can also "Export" built deck by a link without
        saving.
      </div>

      <SaveDeckPrimaryValidationAndForm
        lastSelectedCards={lastSelectedCards}
        selectedMaster={selectedMaster}
        lastSelectedPremadeCards={lastSelectedPremadeCards}
        selectedPremadeMaster={selectedPremadeMaster}
        isPremadeDeckActive={isPremadeDeckActive}
      />
    </div>
  );
}
