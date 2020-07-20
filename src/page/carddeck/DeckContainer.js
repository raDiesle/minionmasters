import React, {useEffect, useMemo, useRef, useState} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import styled from "styled-components";
import CardActionAddCardToDeck from "../CardActionAddCardToDeck";
import FiltersWithCards from "../FiltersWithCards";
import InfoDetailsCardOverlay from "../InfoDetailsCardOverlay";

import AddMasterToDeck from "../mastersoverview/AddMasterToDeck";
import Masters from "../mastersoverview/Masters";
import {CardDeck} from "./CardDeck";
import ImportFromGame from "./carddeckimport/ImportFromGame";
import ExportActions from "./ExportActions";
import {ImportFromUrl} from "./ImportFromUrl";
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

const FiltersWithCardsMemo = ({ setSelectedCardEvent }) =>
  useMemo(() => {
    const cardActionWrapper = (card) => (
      <>
        <CardActionAddCardToDeck
          onClick={() => {
            setSelectedCardEvent({
              eventId: Math.random(),
              card: {
                iD: card.iD,
              },
            });
          }}
          card={card}
        />
        <InfoDetailsCardOverlay card={card} />
      </>
    );

    return <FiltersWithCards cardActionWrapper={cardActionWrapper} />;
  }, []);

export default function DeckContainer() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedHero, setSelectedHero] = useState("");

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
          <Tab>Select cards</Tab>
          <Tab>Select master</Tab>
          <Tab>Analyze & Save</Tab>
          <Tab>Import</Tab>
          <Tab>Export</Tab>
        </TabList>
        <TabPanel>
          <FiltersWithCardsMemo setSelectedCardEvent={setSelectedCardEvent} />
        </TabPanel>
        <TabPanel>
          <Masters
            actionRegistrationComponent={(selectedHeroKey) => (
              <AddMasterToDeck
                setSelectedHero={setSelectedHero}
                masterKey={selectedHeroKey}
              />
            )}
          />
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
          <ExportActions
            lastSelectedCards={lastSelectedCards}
            selectedHero={selectedHero}
          />
        </TabPanel>
      </Tabs>
    </div>
  );
}
