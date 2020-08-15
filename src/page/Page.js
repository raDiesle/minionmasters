import Basics from "page/basics/basics";

import DeckManager from "page/carddeck/deck-manager";

import Decks from "page/carddeck/ListOfDecks/decks";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import css from "./page.module.scss";

export function Page() {
  /*
  const isUrlImport =
    typeof qs.parse(window.location.search, { ignoreQueryPrefix: true }).hero !== "undefined";
*/
  // Morellia: S.T.INT, Healing Fireball, Chain Lightning, Drone Buzzers, Lightning Bolt, Morgrul the Swarmer King, Whirly Scrat, Annihilator, Scrat Launcher, Shen Stormstrike
  return (
    <div className={css.pageContentContainer}>
      <Tabs style={{ paddingTop: "20px" }}>
        <TabList>
          <Tab>Deck Manager</Tab>
          <Tab>Decks</Tab>
          <Tab>The Game</Tab>
        </TabList>
        <TabPanel forceRender>
          <DeckManager />
        </TabPanel>
        <TabPanel>
          <Decks />
        </TabPanel>
        <TabPanel>
          <Basics />
        </TabPanel>
      </Tabs>
    </div>
  );
}
