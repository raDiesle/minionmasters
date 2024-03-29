import { useGaTrackView } from "footer/consent-cookie-banner";
import Abilities from "page/wiki/abilities/abilities";
import { ROUTE_PATH_ABILITIES } from "page/wiki/abilities/abilities-config";
import { BuildDecks } from "page/wiki/build-decks/build-decks";
import { ROUTE_PATH_BUILDDECKS } from "page/wiki/build-decks/build-decks-config";
import { GameModes } from "page/wiki/gamemodes/gamemodes";
import { ROUTE_PATH_GAMEMODES } from "page/wiki/gamemodes/gamemodes-config";
import Gameplay from "page/wiki/gameplay/gameplay";
import { ROUTE_PATH_GAMEPLAY } from "page/wiki/gameplay/gameplay-config";

import BasicsWiki from "page/wiki/main-screen/main-screen";
import { ROUTE_PATH_MAINSCREEN } from "page/wiki/main-screen/main-screen-config";
import Rewards from "page/wiki/rewards/rewards";
import { ROUTE_PATH_REWARDS } from "page/wiki/rewards/rewards-config";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { ROUTE_PATH_ONCE_BITTEN } from "page/wiki/once-bitten/once-bitten-config";
import { OnceBitten } from "page/wiki/once-bitten/once-bitten";

export default function Wiki() {
  useGaTrackView("/Basics");

  const pageTabsConfig = [
    ROUTE_PATH_REWARDS,
    ROUTE_PATH_MAINSCREEN,
    ROUTE_PATH_BUILDDECKS,
    ROUTE_PATH_GAMEPLAY,
    ROUTE_PATH_ABILITIES,
    ROUTE_PATH_GAMEMODES,
    ROUTE_PATH_ONCE_BITTEN
  ];

  const initialSelectedTab = pageTabsConfig.findIndex((tab) => tab === window.location.pathname);

  const [selectedTabIndex, setSelectedTabIndex] = useState(initialSelectedTab);

  return (
    <div>
      <script
        src="https://redditjs.com/post.js"
        data-url="http://www.techodrom.com/etc/star-trek-edges-closer-reality-tractor-beam-moves-object-using-nothing-power-ultrasound/"
        data-height="500"
        data-width="650"
        data-post-finder="mostComments"
        data-theme="light"
        data-show-submit="true"
      ></script>

      <Tabs selectedIndex={selectedTabIndex} onSelect={(tabIndex) => setSelectedTabIndex(tabIndex)}>
        <TabList>
          <Tab>
            <Link to={ROUTE_PATH_REWARDS}>Rewards</Link>
          </Tab>

          <Tab>
            <Link to={ROUTE_PATH_MAINSCREEN}>Basics</Link>
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

          <Tab>
            <Link to={ROUTE_PATH_ONCE_BITTEN}>Once Bitten</Link>
          </Tab>

        </TabList>

        <TabPanel>
          <Rewards />
        </TabPanel>

        <TabPanel>
          <BasicsWiki />
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

        <TabPanel>
          <OnceBitten />
        </TabPanel>
      </Tabs>
    </div>
  );
}
