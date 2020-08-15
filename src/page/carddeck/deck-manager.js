import mToast from "components/mToast";
import { useGaTrackView } from "consent-banner";
import allCardsData from "generated/jobCardProps.json";
import cloneDeep from "lodash/cloneDeep";
import CardForDeckActionOverlay from "page/carddeck/cardfordeck-actionoverlay";
import { Deck } from "page/carddeck/deck";
import ExportDeck from "page/carddeck/export-deck";
import { HowToUse } from "page/carddeck/how-to-use";
import { ImportFromUrl } from "page/carddeck/import-from-url";
import AnalyzeDeck from "page/carddeck/savedeck/analyze-deck";

import AddMasterToDeckOrOpenDetailsActionOverlay from "page/mastersoverview/AddMasterToDeckOrOpenDetailsActionOverlay";
import Masters from "page/mastersoverview/masters";
import React, { useMemo, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styled from "styled-components";
import FiltersWithCards from "../FiltersWithCards";
import ImportFromGame from "./carddeckimport/ImportFromGame";
import SaveDeckContainer from "./savedeck/save-deck-container";

export const IDENTIFIER_FOR_EMPTY_SLOT = 999999;

export const DEFAULT_SELECTED_CARD_EVENT = {
  eventId: 0,
  card: {
    iD: IDENTIFIER_FOR_EMPTY_SLOT,
  },
};

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

export const DEFAULT_MASTER_NOT_SELECTED = "";
export const DEFAULT_SELECTED_TAB = 0;

export const Slots = [...Array(10).keys()];

export const findFirstNextFreeSlot = (lastSelectedCards) =>
  Slots.find(
    (slotPosition) => lastSelectedCards[slotPosition].card.iD === IDENTIFIER_FOR_EMPTY_SLOT
  );

export const INITIAL_EMPTY_SLOT_DATA = Slots.map((slot) => {
  return {
    eventId: 0,
    card: {
      iD: IDENTIFIER_FOR_EMPTY_SLOT,
    },
    count: 0,
  };
});

export default function DeckManager() {
  useGaTrackView("/DeckContainer");
  const [selectedTabIndex, setSelectedTabIndex] = useState(DEFAULT_SELECTED_TAB);
  const [selectedHero, setSelectedHero] = useState(DEFAULT_MASTER_NOT_SELECTED);
  const [lastSelectedCards, setLastSelectedCards] = useState(INITIAL_EMPTY_SLOT_DATA);

  ////////////

  const setSelectedCardEvent = ({ eventId: cardSelectedEventId, card: { iD: selectedCardId } }) => {
    const cardToAdd = allCardsData.find((cardsData) => cardsData.iD === selectedCardId);
    const newLastSelectedCards = cloneDeep(lastSelectedCards);

    const isCardNotInDeckYet =
      typeof lastSelectedCards.find(({ card: { iD } }) => selectedCardId === iD) === "undefined";
    if (isCardNotInDeckYet) {
      // add card
      const nextFreeSlot = findFirstNextFreeSlot(lastSelectedCards);

      newLastSelectedCards[nextFreeSlot] = {
        eventId: cardSelectedEventId,
        card: cardToAdd,
        count: 1,
      };
      setLastSelectedCards(newLastSelectedCards);

      mToast("Card added to Deck");
    } else {
      const consideredOngoingCount = 1;

      const LIMIT_OF_WILDCARDS_ALL_OVER = 3;

      const numberOfWildcards = lastSelectedCards
        .map(({ count }) => count)
        .reduce((total, current) => {
          const STARTING_TO_BE_WILDCARD_COUNT_CONSIDERED = 1;
          return current > STARTING_TO_BE_WILDCARD_COUNT_CONSIDERED ? total + current : total;
        }, consideredOngoingCount);

      const isAllowedToAddAnotherWildcard = numberOfWildcards <= LIMIT_OF_WILDCARDS_ALL_OVER;

      if (isAllowedToAddAnotherWildcard) {
        const positionOfExistingOccurence = lastSelectedCards.findIndex(
          ({ card: { iD } }) => selectedCardId === iD
        );
        newLastSelectedCards[positionOfExistingOccurence] = {
          eventId: cardSelectedEventId,
          card: newLastSelectedCards[positionOfExistingOccurence].card,
          count: newLastSelectedCards[positionOfExistingOccurence].count + 1,
        };
        setLastSelectedCards(newLastSelectedCards);

        mToast("Card added to Deck");
      } else {
        mToast("Wildcard limit reached.");
      }
    }
  };
  ////////////

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
              <CardForDeckActionOverlay card={card} setSelectedCardEvent={setSelectedCardEvent} />
            )}
          />
          ;
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
