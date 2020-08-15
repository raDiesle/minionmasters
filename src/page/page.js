import { ROUTE_PATH_MANAGER } from "page/deck-manager/deck-manager-config";
import { ROUTE_PATH_DECKS } from "page/deck-manager/deck/decks/decks-config";
import Wiki from "page/wiki/wiki";

import DeckManager, { Slots } from "page/deck-manager/deck-manager";

import Decks from "page/deck-manager/deck/decks/decks";
import { ROUTE_PATH_WIKI } from "page/wiki/wiki-config";
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
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

  const pageTabsConfig = [ROUTE_PATH_MANAGER, ROUTE_PATH_DECKS, ROUTE_PATH_WIKI];

  const location = useLocation();
  const initialSelectedTab = pageTabsConfig.findIndex((tab) => tab === location.pathname);

  const [selectedTabIndex, setSelectedTabIndex] = useState(initialSelectedTab);

  return (
    <div className={css.pageContentContainer}>
      <Tabs
        style={{ paddingTop: "20px" }}
        selectedIndex={selectedTabIndex}
        onSelect={(tabIndex) => setSelectedTabIndex(tabIndex)}
      >
        <TabList>
          <Tab>
            <Link to={ROUTE_PATH_MANAGER}>Deck Manager</Link>
          </Tab>
          <Tab>
            <Link to={ROUTE_PATH_DECKS}>Decks</Link>
          </Tab>
          <Tab>
            <Link to={ROUTE_PATH_WIKI}>Wiki</Link>
          </Tab>
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
