import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginRequired from "components/login-required";
import { useGaTrackView } from "footer/consent-banner";
import SaveDeckPrimaryValidationAndForm from "page/deck-manager/deck/savedeck/save-deck-content";
import React from "react";
import css from "page/deck-manager/deck/savedeck/save-deck-container.module.scss";

export default function SaveDeckContainer({ lastSelectedCards, selectedMaster }) {
  useGaTrackView("/SaveDeckContainer");

  return (
    <div>
      <div className={css.saveDeckContainer}>
        <FontAwesomeIcon icon={faTools} size="2x" color="yellow" style={{ paddingRight: "10px" }} />
        {"  "}Features under construction
      </div>
      <LoginRequired />
      <h3>Save deck for public share</h3>
      <div>
        Visible on "Decks". Alternatively, you can also "Export" built deck by a link without
        saving.
      </div>

      <SaveDeckPrimaryValidationAndForm
        lastSelectedCards={lastSelectedCards}
        selectedMaster={selectedMaster}
      />
    </div>
  );
}
