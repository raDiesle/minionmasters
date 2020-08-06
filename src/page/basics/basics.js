import { gaTrackView } from "firestore";
import AdventuresChallenges from "page/basics/adventures-challenges";
import { BuilddeckGuide } from "page/basics/builddeck-guide";
import Draft from "page/basics/draft";
import Guild from "page/basics/guild";

import MainScreen from "page/basics/main-screen";
import Maythem from "page/basics/maythem";
import ListOfMechanics from "page/basics/mechanics/list-of-mechanics";
import ResourceMngmt from "page/basics/resource-mgmt";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

export default function Basics() {
  gaTrackView("/Basics");
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Resources & Rewards</Tab>
          <Tab>Buffs/Debuffs</Tab>
          <Tab>Deck Strategies</Tab>
          <Tab>Draft</Tab>
          <Tab>Maythem</Tab>
          <Tab>Guild</Tab>
          <Tab>Adventures & Challenges</Tab>
          <Tab>Main Screen</Tab>
        </TabList>
        <TabPanel>
          <ResourceMngmt />
        </TabPanel>
        <TabPanel>
          <ListOfMechanics />
        </TabPanel>
        <TabPanel>
          <BuilddeckGuide />
        </TabPanel>
        <TabPanel>
          <Draft />
        </TabPanel>
        <TabPanel>
          <Maythem />
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
