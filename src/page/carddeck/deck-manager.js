import { useGaTrackView } from "consent-banner";
import CardForDeckActionOverlay from "page/carddeck/cardfordeck-actionoverlay";
import { Deck } from "page/carddeck/deck";
import ExportDeck from "page/carddeck/export-deck";
import { HowToUse } from "page/carddeck/how-to-use";
import { ImportFromUrl } from "page/carddeck/import-from-url";
import AnalyzeDeck from "page/carddeck/savedeck/analyze-deck";
import FiltersWithCards from "page/filters-with-cards";

import AddMasterToDeckOrOpenDetailsActionOverlay from "page/mastersoverview/AddMasterToDeckOrOpenDetailsActionOverlay";
import Masters from "page/mastersoverview/masters";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/Page";
import React, { useMemo, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styled from "styled-components";
import ImportFromGame from "./carddeckimport/ImportFromGame";
import SaveDeckContainer from "./savedeck/save-deck-container";

const DeckOptionsStyle = styled.div``;

const MastersMemo = ({ setSelectedHero }) => {
  return useMemo(() => {
    const mastersActionWrapper = (selectedHeroKey) => (
      <AddMasterToDeckOrOpenDetailsActionOverlay
        masterKey={selectedHeroKey}
        setSelectedHero={setSelectedHero}
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
  selectedHero,
  setSelectedHero,
}) {
  useGaTrackView("/DeckContainer");
  const [selectedTabIndex, setSelectedTabIndex] = useState(DEFAULT_SELECTED_TAB);

  return (
    <div>
      <ImportFromUrl
        setLastSelectedCards={setLastSelectedCards}
        setSelectedHero={setSelectedHero}
      />

      <Deck
        setLastSelectedCards={setLastSelectedCards}
        selectedHero={selectedHero}
        setSelectedHero={setSelectedHero}
        lastSelectedCards={lastSelectedCards}
      />

      <Tabs
        forceRenderTabPanel
        style={{ paddingTop: "20px" }}
        selectedIndex={selectedTabIndex}
        onSelect={(tabIndex) => setSelectedTabIndex(tabIndex)}
      >
        <TabList>
          <Tab>Build</Tab>
          <Tab>Save</Tab>
          <Tab>Import</Tab>
          <Tab>Export</Tab>
          <Tab>Analyze</Tab>
        </TabList>
        <TabPanel>
          <HowToUse />
          <MastersMemo setSelectedHero={setSelectedHero} />
          <FiltersWithCards
            cardActionWrapper={(card) => (
              <CardForDeckActionOverlay card={card} setLastSelectedCards={setLastSelectedCards} />
            )}
          />
        </TabPanel>
        <TabPanel>
          <SaveDeckContainer lastSelectedCards={lastSelectedCards} selectedHero={selectedHero} />
        </TabPanel>

        <TabPanel>
          <DeckOptionsStyle>
            <ImportFromGame
              setShowDeck={true}
              setLastSelectedCards={setLastSelectedCards}
              setSelectedHero={setSelectedHero}
            />
          </DeckOptionsStyle>
        </TabPanel>
        <TabPanel>
          <ExportDeck lastSelectedCards={lastSelectedCards} selectedHero={selectedHero} />
        </TabPanel>
        <TabPanel>
          <AnalyzeDeck lastSelectedCards={lastSelectedCards} selectedHero={selectedHero} />
        </TabPanel>
      </Tabs>
    </div>
  );
}
