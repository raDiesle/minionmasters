import { gaTrackView } from "consent-banner";
import CardForDeckActionOverlay from "page/carddeck/cardfordeck-actionoverlay";
import { HowToUse } from "page/carddeck/how-to-use";

import AddMasterToDeckOrOpenDetailsActionOverlay from "page/mastersoverview/AddMasterToDeckOrOpenDetailsActionOverlay";
import React, { useEffect, useMemo, useRef, useState } from "react";
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

const DeckOptionsStyle = styled.div``;

const usePreviousValue = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useTraceableState = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const prevValue = usePreviousValue(value);
  return [prevValue, value, setValue];
};

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

export default function DeckContainer() {
  gaTrackView("/DeckContainer");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedHero, setSelectedHero] = useState(DEFAULT_MASTER_NOT_SELECTED);

  const [, selectedCardEvent, setSelectedCardEvent] = useTraceableState({
    eventId: 0,
    card: {
      iD: IDENTIFIER_FOR_EMPTY_SLOT,
    },
  });

  const Slots = [...Array(10).keys()];
  const [lastSelectedCards, setLastSelectedCards] = useState(
    Slots.map((slot) => {
      return {
        eventId: 0,
        card: {
          iD: IDENTIFIER_FOR_EMPTY_SLOT,
        },
        count: 0,
      };
    })
  );

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
