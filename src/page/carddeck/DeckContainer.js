import { useGaTrackView } from "consent-banner";
import CardForDeckActionOverlay from "page/carddeck/cardfordeck-actionoverlay";
import { HowToUse } from "page/carddeck/how-to-use";
import { useLastSelectedCards } from "page/carddeck/useLastSelectedCards";
import { useSelectedCardEvent } from "page/carddeck/useSelectedCardEvent";

import AddMasterToDeckOrOpenDetailsActionOverlay from "page/mastersoverview/AddMasterToDeckOrOpenDetailsActionOverlay";
import React, { useMemo, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styled from "styled-components";
import FiltersWithCards from "../FiltersWithCards";
import Masters from "../mastersoverview/Masters";
import { CardDeck } from "./CardDeck";
import ImportFromGame from "./carddeckimport/ImportFromGame";
import ExportActions from "./ExportActions";
import { ImportFromUrl } from "./ImportFromUrl";
import AnalyzeAndSaveDeckContainer from "./savedeck/save-deck-container";

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

export default function DeckContainer() {
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

      <CardDeck
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
          <Tab>Analyze & Save</Tab>
          <Tab>Import</Tab>
          <Tab>Export</Tab>
        </TabList>
        <TabPanel>
          <HowToUse />
          <MastersMemo setSelectedHero={setSelectedHero} />
          <FiltersWithCardsMemo setSelectedCardEvent={setSelectedCardEvent} />
        </TabPanel>
        <TabPanel>
          <AnalyzeAndSaveDeckContainer
            lastSelectedCards={lastSelectedCards}
            selectedHero={selectedHero}
          />
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
          <ExportActions lastSelectedCards={lastSelectedCards} selectedHero={selectedHero} />
        </TabPanel>
      </Tabs>
    </div>
  );
}
