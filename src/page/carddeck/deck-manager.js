import { useGaTrackView } from "consent-banner";
import CardForDeckActionOverlay from "page/carddeck/cardfordeck-actionoverlay";
import { HowToUse } from "page/carddeck/how-to-use";
import AnalyzeDeck from "page/carddeck/savedeck/analyze-deck";
import { useLastSelectedCards } from "page/carddeck/useLastSelectedCards";
import { useSelectedCardEvent } from "page/carddeck/useSelectedCardEvent";

import AddMasterToDeckOrOpenDetailsActionOverlay from "page/mastersoverview/AddMasterToDeckOrOpenDetailsActionOverlay";
import React, { useMemo, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styled from "styled-components";
import FiltersWithCards from "../FiltersWithCards";
import Masters from "page/mastersoverview/masters";
import { Deck } from "page/carddeck/deck";
import ImportFromGame from "./carddeckimport/ImportFromGame";
import ExportDeck from "page/carddeck/export-deck";
import { ImportFromUrl } from "page/carddeck/import-from-url";
import SaveDeckContainer from "./savedeck/save-deck-container";

export const IDENTIFIER_FOR_EMPTY_SLOT = 999999;

export const DEFAULT_SELECTED_CARD_EVENT = {
  eventId: 0,
  card: {
    iD: IDENTIFIER_FOR_EMPTY_SLOT,
  },
};

const DeckOptionsStyle = styled.div``;

const FiltersWithCardsMemo = ({ setSelectedCardEvent }) => {
  return useMemo(() => {
    const cardActionWrapper = (card) => (
      <CardForDeckActionOverlay card={card} setSelectedCardEvent={setSelectedCardEvent} />
    );

    return <FiltersWithCards cardActionWrapper={cardActionWrapper} />;
  }, []);
};

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

export const DEFAULT_MASTER_NOT_SELECTED = "";
export const DEFAULT_SELECTED_TAB = 0;

export default function DeckManager() {
  useGaTrackView("/DeckContainer");
  const [selectedTabIndex, setSelectedTabIndex] = useState(DEFAULT_SELECTED_TAB);
  const [selectedHero, setSelectedHero] = useState(DEFAULT_MASTER_NOT_SELECTED);

  const [selectedCardEvent, setSelectedCardEvent] = useSelectedCardEvent();

  const [lastSelectedCards, setLastSelectedCards] = useLastSelectedCards();

  return (
    <div>
      <ImportFromUrl
        setLastSelectedCards={setLastSelectedCards}
        setSelectedHero={setSelectedHero}
      />

      <Deck
        selectedCardEvent={selectedCardEvent}
        setSelectedCardEvent={setSelectedCardEvent}
        setLastSelectedCards={setLastSelectedCards}
        selectedHero={selectedHero}
        setSelectedHero={setSelectedHero}
        lastSelectedCards={lastSelectedCards}
        setSelectedTabIndex={setSelectedTabIndex}
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
          <FiltersWithCardsMemo setSelectedCardEvent={setSelectedCardEvent} />
        </TabPanel>
        <TabPanel>
          <SaveDeckContainer lastSelectedCards={lastSelectedCards} selectedHero={selectedHero} />
        </TabPanel>

        <TabPanel>
          <DeckOptionsStyle>
            <ImportFromGame
              setShowDeck={true}
              setSelectedCardEvent={setSelectedCardEvent}
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
