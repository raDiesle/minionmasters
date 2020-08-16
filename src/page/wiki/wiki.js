import { useGaTrackView } from "footer/consent-banner";
import Abilities from "page/wiki/abilities/abilities";
import { ROUTE_PATH_ABILITIES } from "page/wiki/abilities/abilities-config";
import { BuildDecks } from "page/wiki/build-decks/build-decks";
import { ROUTE_PATH_BUILDDECKS } from "page/wiki/build-decks/build-decks-config";
import { GameModes } from "page/wiki/gamemodes/gamemodes";
import { ROUTE_PATH_GAMEMODES } from "page/wiki/gamemodes/gamemodes-config";
import Gameplay from "page/wiki/gameplay/gameplay";
import { ROUTE_PATH_GAMEPLAY } from "page/wiki/gameplay/gameplay-config";

import MainScreen from "page/wiki/main-screen/main-screen";
import { ROUTE_PATH_MAINSCREEN } from "page/wiki/main-screen/main-screen-config";
import Rewards from "page/wiki/rewards/rewards";
import { ROUTE_PATH_REWARDS } from "page/wiki/rewards/rewards-config";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

export default function Wiki() {
  useGaTrackView("/Basics");

  const pageTabsConfig = [
    ROUTE_PATH_REWARDS,
    ROUTE_PATH_MAINSCREEN,
    ROUTE_PATH_BUILDDECKS,
    ROUTE_PATH_GAMEPLAY,
    ROUTE_PATH_ABILITIES,
    ROUTE_PATH_GAMEMODES,
  ];

  const initialSelectedTab = pageTabsConfig.findIndex((tab) => tab === window.location.pathname);

  const [selectedTabIndex, setSelectedTabIndex] = useState(initialSelectedTab);

  return (
    <div>
      <Tabs selectedIndex={selectedTabIndex} onSelect={(tabIndex) => setSelectedTabIndex(tabIndex)}>
        <TabList>
          <Tab>
            <Link to={ROUTE_PATH_REWARDS}>Rewards</Link>
          </Tab>

          <Tab>
            <Link to={ROUTE_PATH_MAINSCREEN}>Mainscreen</Link>
          </Tab>

          <Tab>
            <Link to={ROUTE_PATH_BUILDDECKS}>Build Decks</Link>
          </Tab>

          <Tab>
            <Link to={ROUTE_PATH_GAMEPLAY}>Gameplay</Link>
          </Tab>

          <Tab>
            <Link to={ROUTE_PATH_ABILITIES}>Abilities</Link>
          </Tab>

          <Tab>
            <Link to={ROUTE_PATH_GAMEMODES}>Game Modes</Link>
          </Tab>
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
          <Abilities />
        </TabPanel>

        <TabPanel>
          <GameModes />
        </TabPanel>
      </Tabs>
    </div>
  );
}
