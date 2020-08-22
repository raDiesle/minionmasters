import { matchSelectedTabOutOfPath } from "components/helper";

import DeckManager from "page/deck-manager/deck-manager";
import { ROUTE_PATH_MANAGER } from "page/deck-manager/deck-manager-config";
import Decks from "page/deck-manager/deck/decks/decks";
import { ROUTE_PATH_DECKS } from "page/deck-manager/deck/decks/decks-config";
import { DEFAULT_MASTER_NOT_SELECTED, INITIAL_EMPTY_SLOT_DATA } from "page/page-config";
import Wiki from "page/wiki/wiki";
import { ROUTE_PATH_WIKI } from "page/wiki/wiki-config";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import css from "./page.module.scss";

export function Page() {
  /*
  const isUrlImport =
    typeof qs.parse(window.location.search, { ignoreQueryPrefix: true }).master !== "undefined";
*/
  // Morellia: S.T.INT, Healing Fireball, Chain Lightning, Drone Buzzers, Lightning Bolt, Morgrul the Swarmer King, Whirly Scrat, Annihilator, Scrat Launcher, Shen Stormstrike
  const [selectedMaster, setSelectedMaster] = useState(DEFAULT_MASTER_NOT_SELECTED);
  const [lastSelectedCards, setLastSelectedCards] = useState(INITIAL_EMPTY_SLOT_DATA);

  const PAGE_TABS_CONFIG = [ROUTE_PATH_MANAGER, ROUTE_PATH_DECKS, ROUTE_PATH_WIKI]; //

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  /*
  const history = useHistory();
  useEffect(() => {
    history.push({
      pathname: window.location.pathname,
      search: toParams(selectedMaster, lastSelectedCards),
    });
    console.log("pushed");
  }, [selectedMaster, lastSelectedCards]);
*/
  /*
  const history = useHistory();
  useEffect(() => {
    return history.listen((location) => {
      console.log(`You changed the page to: ${location.pathname}`);

      const isCardModal = qs.parse(location.search).cardModal;
      if (isCardModal) {
      }
    });
  }, [history]);
*/

  const location = useLocation();
  useEffect(() => {
    setSelectedTabIndex(matchSelectedTabOutOfPath(PAGE_TABS_CONFIG));
  }, [location.pathname]);

  return (
    <div className={css.pageContentContainer}>
      <Tabs
        style={{ paddingTop: "20px" }}
        selectedIndex={selectedTabIndex}
        onSelect={(tabIndex) => {
          // setSelectedTabIndex(tabIndex);
        }}
      >
        <TabList>
          <Link to={ROUTE_PATH_MANAGER}>
            <Tab>Deck Manager</Tab>
          </Link>
          <Link to={ROUTE_PATH_DECKS}>
            <Tab>Decks</Tab>
          </Link>
          <Link to={ROUTE_PATH_WIKI}>
            <Tab>Wiki</Tab>
          </Link>
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
