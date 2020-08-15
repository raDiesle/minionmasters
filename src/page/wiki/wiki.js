import { useGaTrackView } from "footer/consent-banner";
import AdventuresChallenges from "page/wiki/adventures-challenges/adventures-challenges";
import { BuildDecks } from "page/wiki/deck-strategies/build-decks";
import Draft from "page/wiki/gamemodes/draft/draft";
import { GameModes } from "page/wiki/gamemodes/gamemodes";
import Gameplay from "page/wiki/gameplay/gameplay";
import Guild from "page/wiki/guild/guild";

import MainScreen from "page/wiki/mainscreen/main-screen";
import Mayhem from "page/wiki/gamemodes/mayhem/mayhem";
import Abilities from "page/wiki/abilities/list-of-mechanics";
import Rewards from "page/wiki/resource-mngt/resource-mgmt";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

export default function Wiki() {
  useGaTrackView("/Basics");
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Rewards</Tab>
          <Tab>Basics & Mainscreen</Tab>
          <Tab>Build Decks</Tab>
          <Tab>Gameplay</Tab>
          <Tab>Guild</Tab>
          <Tab>Abilities</Tab>
          <Tab>Game Modes</Tab>
        </TabList>

        <TabPanel>
          <Rewards />
        </TabPanel>
        <TabPanel>
          <MainScreen />
        </TabPanel>

        <TabPanel>
          <BuildDecks />
        </TabPanel>
        <TabPanel>
          <Gameplay />
        </TabPanel>
        <TabPanel>
          <Guild />
        </TabPanel>

        <TabPanel>
          <Abilities />
        </TabPanel>
        <TabPanel>
          <GameModes />
        </TabPanel>
      </Tabs>
    </div>
  );
}
