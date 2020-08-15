import Basics from "page/basics/basics";

import DeckManager, { Slots } from "page/carddeck/deck-manager";

import Decks from "page/carddeck/ListOfDecks/decks";
import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import css from "./page.module.scss";

export const IDENTIFIER_FOR_EMPTY_SLOT = 999999;
export const INITIAL_EMPTY_SLOT_DATA = Slots.map((slot) => {
  return {
    card: {
      iD: IDENTIFIER_FOR_EMPTY_SLOT,
    },
    count: 0,
  };
});

export const DEFAULT_MASTER_NOT_SELECTED = "";

export function Page() {
  /*
  const isUrlImport =
    typeof qs.parse(window.location.search, { ignoreQueryPrefix: true }).hero !== "undefined";
*/
  // Morellia: S.T.INT, Healing Fireball, Chain Lightning, Drone Buzzers, Lightning Bolt, Morgrul the Swarmer King, Whirly Scrat, Annihilator, Scrat Launcher, Shen Stormstrike

  const [selectedHero, setSelectedHero] = useState(DEFAULT_MASTER_NOT_SELECTED);
  const [lastSelectedCards, setLastSelectedCards] = useState(INITIAL_EMPTY_SLOT_DATA);

  return (
    <div className={css.pageContentContainer}>
      <Tabs style={{ paddingTop: "20px" }}>
        <TabList>
          <Tab>Deck Manager</Tab>
          <Tab>Decks </Tab>
          <Tab>The Game</Tab>
        </TabList>
        <TabPanel forceRender>
          <DeckManager
            lastSelectedCards={lastSelectedCards}
            setLastSelectedCards={setLastSelectedCards}
            selectedHero={selectedHero}
            setSelectedHero={setSelectedHero}
          />
        </TabPanel>
        <TabPanel>
          <Decks setLastSelectedCards={setLastSelectedCards} setSelectedHero={setSelectedHero} />
        </TabPanel>
        <TabPanel>
          <Basics />
        </TabPanel>
      </Tabs>
    </div>
  );
}
