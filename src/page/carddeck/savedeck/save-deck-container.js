import React from "react";
import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginRequired from "components/login-required";
import { useGaTrackView } from "consent-banner";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/carddeck/deck-manager";
import SaveDeckPrimaryValidationAndForm from "page/carddeck/savedeck/save-deck-content";
import css from "./save-deck-container.module.scss";

export default function SaveDeckContainer({ lastSelectedCards, selectedHero }) {
  useGaTrackView("/SaveDeckContainer");
  const relevantCards = lastSelectedCards
    .filter(({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT)
    .map(({ card }) => card);

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

      <SaveDeckPrimaryValidationAndForm relevantCards={relevantCards} selectedHero={selectedHero} />
    </div>
  );
}
