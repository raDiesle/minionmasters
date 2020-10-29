import Master from "page/deck-manager/build/masters/master";
import { DeckCardsContainerStyle } from "page/deck-manager/deck/deck-cards-container-style";
import { DeckMasterAndCardsContainerStyle } from "page/deck-manager/deck/deck-master-and-cards-container-style";
import React from "react";

export function TeamPremade({ teamPremade, setTeamPremade }) {
  return (
    <div>
      <DeckMasterAndCardsContainerStyle
        masterEl={
          <div>
            <Master
              masterKey={teamPremade.master}
              actionRegistrationComponent={(selectedMasterKey) => {}}
            />
          </div>
        }
      >
        <DeckCardsContainerStyle
          lastSelectedCards={teamPremade.cards}
          cardActionWrapper={(card) => {}}
          availableCards={[]}
        />
      </DeckMasterAndCardsContainerStyle>
    </div>
  );
}
