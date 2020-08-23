import { useGaTrackView } from "footer/consent-cookie-banner";
import { ROUTE_PATH_DECKMANAGER_BUILD } from "page/deck-manager/build/build-config";
import FiltersWithCards from "page/deck-manager/build/filters-with-cards";

import AddMasterToDeckOrOpenDetailsActionOverlay
  from "page/deck-manager/build/masters/add-master-to-deck-or-open-details-action-overlay";
import Masters from "page/deck-manager/build/masters/masters";
import ImportFromGame from "page/deck-manager/deck/carddeckimport/import-from-game";
import CardForDeckActionOverlay from "page/deck-manager/deck/cardfordeck-actionoverlay";
import { Deck } from "page/deck-manager/deck/deck";
import ExportDeck from "page/deck-manager/deck/export-deck";
import { HowToUse } from "page/deck-manager/deck/how-to-use";
import { ImportFromUrl } from "page/deck-manager/deck/import-from-url";
import AnalyzeDeck from "page/deck-manager/savedeck/analyze-deck";
import SaveDeckContainer from "page/deck-manager/savedeck/save-deck-container";
import { ROUTE_PATH_DECKMANAGER_SAVE } from "page/deck-manager/savedeck/savedeck-config";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page-config";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styled from "styled-components";

const DeckOptionsStyle = styled.div``;

const MastersMemo = ({ setSelectedMaster }) => {
  return useMemo(() => {
    const mastersActionWrapper = (selectedMasterKey) => (
      <AddMasterToDeckOrOpenDetailsActionOverlay
        masterKey={selectedMasterKey}
        setSelectedMaster={setSelectedMaster}
      />
    );

    return <Masters actionRegistrationComponent={mastersActionWrapper} />;
  }, []);
};

export const DEFAULT_SELECTED_TAB = 0;

export const Slots = [...Array(10).keys()];

export const findFirstNextFreeSlot = (lastSelectedCards) =>
  Slots.find(
    (slotPosition) => lastSelectedCards[slotPosition].card.iD === IDENTIFIER_FOR_EMPTY_SLOT
  );

export default function DeckManager({
  lastSelectedCards,
  setLastSelectedCards,
  selectedMaster,
  setSelectedMaster,
}) {
  useGaTrackView("/DeckContainer");
  const [selectedTabIndex, setSelectedTabIndex] = useState(DEFAULT_SELECTED_TAB);

  return (
    <div>
      <ImportFromUrl
        setLastSelectedCards={setLastSelectedCards}
        setSelectedMaster={setSelectedMaster}
      />

      <Deck
        setLastSelectedCards={setLastSelectedCards}
        selectedMaster={selectedMaster}
        setSelectedMaster={setSelectedMaster}
        lastSelectedCards={lastSelectedCards}
      />

      {lastSelectedCards.some(({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT) && (
        <AnalyzeDeck lastSelectedCards={lastSelectedCards} selectedMaster={selectedMaster} />
      )}

      <Tabs
        forceRenderTabPanel
        selectedIndex={selectedTabIndex}
        onSelect={(tabIndex) => setSelectedTabIndex(tabIndex)}
      >
        <TabList>
          <Tab>
            {" "}
            <Link to={ROUTE_PATH_DECKMANAGER_BUILD}>Build</Link>
          </Tab>
          <Tab>
            <Link to={ROUTE_PATH_DECKMANAGER_SAVE}>Save</Link>
          </Tab>
          <Tab>Import</Tab>
          <Tab>Export</Tab>
        </TabList>
        <TabPanel>
          <HowToUse />
          <MastersMemo setSelectedMaster={setSelectedMaster} />
          <FiltersWithCards
            cardActionWrapper={(card) => (
              <CardForDeckActionOverlay card={card} setLastSelectedCards={setLastSelectedCards} />
            )}
          />
        </TabPanel>
        <TabPanel>
          <SaveDeckContainer
            lastSelectedCards={lastSelectedCards}
            selectedMaster={selectedMaster}
          />
        </TabPanel>

        <TabPanel>
          <DeckOptionsStyle>
            <ImportFromGame
              setShowDeck={true}
              setLastSelectedCards={setLastSelectedCards}
              setSelectedMaster={setSelectedMaster}
            />
          </DeckOptionsStyle>
        </TabPanel>
        <TabPanel>
          <ExportDeck lastSelectedCards={lastSelectedCards} selectedMaster={selectedMaster} />
        </TabPanel>
      </Tabs>
    </div>
  );
}
