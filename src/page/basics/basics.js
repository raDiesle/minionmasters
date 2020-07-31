import Gamemodes from "page/basics/gamemodes";
import { BuilddeckGuide } from "page/basics/builddeck-guide";
import Community from "page/basics/community";
import MainScreen from "page/basics/main-screen";
import ResourceMngmt from "page/basics/resource-mgmt";
import ListOfMechanics from "page/basics/mechanics/list-of-mechanics";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

export default function Basics() {
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Mechanics</Tab>
          <Tab>Resource Mgmt</Tab>
          <Tab>Community</Tab>
          <Tab>Deck Strategies</Tab>
          <Tab>Main Screen</Tab>
          <Tab>Decks Guide</Tab>
        </TabList>
        <TabPanel>
          <ListOfMechanics />
        </TabPanel>
        <TabPanel>
          <ResourceMngmt />
        </TabPanel>
        <TabPanel>
          <Community />
        </TabPanel>
        <TabPanel>
          <BuilddeckGuide />
        </TabPanel>
        <TabPanel>
          <MainScreen />
        </TabPanel>
        <TabPanel>
          <Gamemodes />
        </TabPanel>
      </Tabs>
    </div>
  );
}
