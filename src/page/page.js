import Wiki from "page/wiki/wiki";

import DeckManager, { Slots } from "page/deck-manager/deck/deck-manager";

import Decks from "page/deck-manager/deck/ListOfDecks/decks";
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
    typeof qs.parse(window.location.search, { ignoreQueryPrefix: true }).master !== "undefined";
*/
  // Morellia: S.T.INT, Healing Fireball, Chain Lightning, Drone Buzzers, Lightning Bolt, Morgrul the Swarmer King, Whirly Scrat, Annihilator, Scrat Launcher, Shen Stormstrike

  const [selectedMaster, setSelectedMaster] = useState(DEFAULT_MASTER_NOT_SELECTED);
  const [lastSelectedCards, setLastSelectedCards] = useState(INITIAL_EMPTY_SLOT_DATA);

  return (
    <div className={css.pageContentContainer}>
      <Tabs style={{ paddingTop: "20px" }}>
        <TabList>
          <Tab>Deck Manager</Tab>
          <Tab>Decks </Tab>
          <Tab>Wiki</Tab>
        </TabList>
        <TabPanel forceRender>
          <DeckManager
            lastSelectedCards={lastSelectedCards}
            setLastSelectedCards={setLastSelectedCards}
            selectedMaster={selectedMaster}
            setSelectedMaster={setSelectedMaster}
          />
        </TabPanel>
        <TabPanel>
          <Decks
            setLastSelectedCards={setLastSelectedCards}
            setSelectedMaster={setSelectedMaster}
          />
        </TabPanel>
        <TabPanel>
          <Wiki />
        </TabPanel>
      </Tabs>
    </div>
  );
}
