import { useGaTrackView } from "footer/consent-banner";
import AdventuresChallenges from "page/wiki/adventures-challenges/adventures-challenges";
import { DeckStrategies } from "page/wiki/deck-strategies/deck-strategies";
import Draft from "page/wiki/draft/draft";
import Gameplay from "page/wiki/gameplay/gameplay";
import Guild from "page/wiki/guild/guild";

import MainScreen from "page/wiki/mainscreen/main-screen";
import Mayhem from "page/wiki/mayhem/mayhem";
import ListOfMechanics from "page/wiki/buffs-debuffs/list-of-mechanics";
import ResourceMngmt from "page/wiki/resource-mngt/resource-mgmt";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

export default function Wiki() {
  useGaTrackView("/Basics");
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Resources & Rewards</Tab>
          <Tab>Buffs & Debuffs</Tab>
          <Tab>Deck Strategies</Tab>
          <Tab>Gameplay</Tab>
          <Tab>Draft</Tab>
          <Tab>Maythem</Tab>
          <Tab>Guild</Tab>
          <Tab>Adventures & Challenges</Tab>
          <Tab>Basics & Mainscreen</Tab>
        </TabList>
        <TabPanel>
          <ResourceMngmt />
        </TabPanel>
        <TabPanel>
          <ListOfMechanics />
        </TabPanel>
        <TabPanel>
          <DeckStrategies />
        </TabPanel>
        <TabPanel>
          <Gameplay />
        </TabPanel>
        <TabPanel>
          <Draft />
        </TabPanel>
        <TabPanel>
          <Mayhem />
        </TabPanel>
        <TabPanel>
          <Guild />
        </TabPanel>
        <TabPanel>
          <AdventuresChallenges />
        </TabPanel>
        <TabPanel>
          <MainScreen />
        </TabPanel>
      </Tabs>
    </div>
  );
}
