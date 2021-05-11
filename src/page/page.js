import * as classnames from "classnames";
import { isForImagePreview, matchSelectedTabOutOfPath } from "components/helper";
import cssHelper from "components/helper.module.scss";
import localStorage from "local-storage";
import { INITIAL_MASTER_SELECTED } from "page/deck-manager/build/masters/mastersMapping";
import DeckManager from "page/deck-manager/deck-manager";
import { ROUTE_PATH_MANAGER } from "page/deck-manager/deck-manager-config";
import Decks from "page/deck-manager/deck/decks/decks";
import { ROUTE_PATH_DECKS } from "page/deck-manager/deck/decks/decks-config";
import { AVAILABLE_CARDS_BY_URL_KEY } from "page/deck-manager/deck/import-export/url-import-export/export-as-url";
import { MyProfile } from "page/my-profile/my-profile";
import { AVAILABLE_CARDS_LOCALSTORAGE_KEY, ROUTE_PATH_PROFILE } from "page/my-profile/my-profile-config";
import { INITIAL_EMPTY_SLOT_DATA } from "page/page-config";
import { Tournaments } from "page/tournaments/tournaments";
import { ROUTE_PATH_TOURNAMENTS } from "page/tournaments/tournaments-config";
import Wiki from "page/wiki/wiki";
import { ROUTE_PATH_WIKI } from "page/wiki/wiki-config";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import css from "./page.module.scss";

export function Page() {
  const [selectedMaster, setSelectedMaster] = useState(INITIAL_MASTER_SELECTED);
  const [lastSelectedCards, setLastSelectedCards] = useState(INITIAL_EMPTY_SLOT_DATA);

  const [availableCards, setAvailableCards] = useState(
    localStorage(AVAILABLE_CARDS_LOCALSTORAGE_KEY) || []
  );
  const [isAvailableCardsFromUrl, setIsAvailableCardsFromUrl] = useState(false);
  useEffect(() => {
    const urlParams = qs.parse(window.location.search, {
      comma: true,
    });

    const availableCardsFromUrl = urlParams[AVAILABLE_CARDS_BY_URL_KEY];
    if (availableCardsFromUrl) {
      setAvailableCards(availableCardsFromUrl.map((iD) => parseInt(iD)));
      setIsAvailableCardsFromUrl(true);
    }
  }, []);
  const handleResetAvailableCardsFromUrl = () => {
    setAvailableCards(localStorage(AVAILABLE_CARDS_LOCALSTORAGE_KEY) || []);
    setIsAvailableCardsFromUrl(false);
  };

  const PAGE_TABS_CONFIG = [
    ROUTE_PATH_MANAGER,
    ROUTE_PATH_DECKS,
    ROUTE_PATH_WIKI,
    ROUTE_PATH_PROFILE,
    ROUTE_PATH_TOURNAMENTS,
  ];

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const location = useLocation();
  useEffect(() => {
    setSelectedTabIndex(matchSelectedTabOutOfPath(PAGE_TABS_CONFIG));
  }, [location.pathname, PAGE_TABS_CONFIG]);

  return (
    <div
      className={classnames(
        isForImagePreview ? css.containerForImagePreview : css.pageContentContainer
      )}
    >
      {isAvailableCardsFromUrl && (
        <div className={css.differentUserContext}>
          You see available cards of the person who shared link. Click{" "}
          <button className={css.buttonLink} onClick={() => handleResetAvailableCardsFromUrl()}>
            here
          </button>{" "}
          to reset.
        </div>
      )}
      <Tabs
        selectedIndex={selectedTabIndex}
        onSelect={(tabIndex) => {
          // setSelectedTabIndex(tabIndex);
        }}
      >
        <TabList
          className={classnames(
            isForImagePreview ? cssHelper.hideForImagePreview : "react-tabs__tab-list"
          )}
        >
          <Link to={ROUTE_PATH_MANAGER}>
            <Tab>Deck Manager</Tab>
          </Link>

          <Link to={ROUTE_PATH_DECKS}>
            <Tab>Decks</Tab>
          </Link>

          <Link to={ROUTE_PATH_WIKI}>
            <span className={css.managerSpacer}>
            <Tab>Wiki</Tab>

            </span>
          </Link>

          <Link to={ROUTE_PATH_PROFILE}>
            <Tab
              className={classnames(
                "react-tabs__tab"
              )}
            >
              My Profile
            </Tab>
          </Link>
          <Link to={ROUTE_PATH_TOURNAMENTS}>
            <Tab>Community</Tab>
          </Link>
        </TabList>

        <TabPanel forceRender>
          {/* peformance optimization !isForImagePreview && !deckIdFromUrl */}
          <DeckManager
            lastSelectedCards={lastSelectedCards}
            setLastSelectedCards={setLastSelectedCards}
            selectedMaster={selectedMaster}
            setSelectedMaster={setSelectedMaster}
            availableCards={availableCards}
          />
        </TabPanel>

        <TabPanel>
          <Decks
            setLastSelectedCards={setLastSelectedCards}
            setSelectedMaster={setSelectedMaster}
            availableCards={availableCards}
          />
        </TabPanel>

        <TabPanel>
          <Wiki />
        </TabPanel>

        <TabPanel>
          <MyProfile yourAvailableCardIds={availableCards} setAvailableCards={setAvailableCards} />
        </TabPanel>

        <TabPanel>
          <Tournaments />
        </TabPanel>
      </Tabs>
    </div>
  );
}
