import * as classnames from "classnames";
import { matchSelectedTabOutOfPath } from "components/helper";
import cssNeonEffect from "components/neon-effect.module.scss";
import { useGaTrackView } from "footer/consent-cookie-banner";
import { ROUTE_PATH_DECKMANAGER_BUILD } from "page/deck-manager/build/build-config";
import FiltersWithCards from "page/deck-manager/build/filters-with-cards";

import AddMasterToDeckOrOpenDetailsActionOverlay from "page/deck-manager/build/masters/add-master-to-deck-or-open-details-action-overlay";
import Masters from "page/deck-manager/build/masters/masters";
import { INITIAL_MASTER_SELECTED } from "page/deck-manager/build/masters/mastersMapping";
import {
  ROUTE_PATH_DECKMANAGER_EXPORT,
  ROUTE_PATH_DECKMANAGER_IMPORT,
} from "page/deck-manager/deck-manager-config";
import CardForDeckActionOverlay from "page/deck-manager/deck/cardfordeck-actionoverlay";
import { Deck } from "page/deck-manager/deck/deck";

import { HowToUse } from "page/deck-manager/deck/how-to-use";
import { ImportDecksFromUrl } from "page/deck-manager/deck/import-export/url-import-export/import-decks-from-url";
import SaveDeckContainer from "page/deck-manager/savedeck/save-deck-container";
import { ROUTE_PATH_DECKMANAGER_SAVE } from "page/deck-manager/savedeck/savedeck-config";
import { IDENTIFIER_FOR_EMPTY_SLOT, INITIAL_EMPTY_SLOT_DATA } from "page/page-config";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const MasterSelector = ({ setSelectedMaster }) => {
  //  return useMemo(() => {
  const mastersActionWrapper = (selectedMasterKey) => (
    <AddMasterToDeckOrOpenDetailsActionOverlay
      masterKey={selectedMasterKey}
      setSelectedMaster={setSelectedMaster}
    />
  );

  return <Masters actionRegistrationComponent={mastersActionWrapper} />;
  //}, []);
};

export const DEFAULT_SELECTED_TAB = 0;

export default function DeckManager({
  lastSelectedCards,
  setLastSelectedCards,
  selectedMaster,
  setSelectedMaster,
  availableCards,
}) {
  useGaTrackView("/DeckContainer");
  const [selectedTabIndex, setSelectedTabIndex] = useState(DEFAULT_SELECTED_TAB);

  const [selectedPremadeMaster, setSelectedPremadeMaster] = useState(INITIAL_MASTER_SELECTED);
  const [lastSelectedPremadeCards, setLastSelectedPremadeCards] = useState(INITIAL_EMPTY_SLOT_DATA);

  const isPremadeActiveByUrlImport =
    typeof qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    }).pMaster !== "undefined";

  const [isPremadeDeckActive, setIsPremadeDeckActive] = useState(
    isPremadeActiveByUrlImport ? true : null
  );

  const PAGE_TABS_CONFIG = [
    ROUTE_PATH_DECKMANAGER_BUILD,
    ROUTE_PATH_DECKMANAGER_SAVE,
    ROUTE_PATH_DECKMANAGER_IMPORT,
    ROUTE_PATH_DECKMANAGER_EXPORT,
  ];

  const location = useLocation();
  useEffect(() => {
    setSelectedTabIndex(matchSelectedTabOutOfPath(PAGE_TABS_CONFIG));
  }, [location.pathname, PAGE_TABS_CONFIG]);

  return (
    <div>
      <ImportDecksFromUrl
        setLastSelectedCards={setLastSelectedCards}
        setSelectedMaster={setSelectedMaster}
        setSelectedPremadeMaster={setSelectedPremadeMaster}
        setLastSelectedPremadeCards={setLastSelectedPremadeCards}
      />

      <Deck
        selectedMaster={selectedMaster}
        setSelectedMaster={setSelectedMaster}
        lastSelectedCards={lastSelectedCards}
        setLastSelectedCards={setLastSelectedCards}
        availableCards={availableCards}
        selectedPremadeMaster={selectedPremadeMaster}
        setSelectedPremadeMaster={setSelectedPremadeMaster}
        lastSelectedPremadeCards={lastSelectedPremadeCards}
        setLastSelectedPremadeCards={setLastSelectedPremadeCards}
        isPremadeDeckActive={isPremadeDeckActive}
        setIsPremadeDeckActive={setIsPremadeDeckActive}
      />

      <Tabs
        forceRenderTabPanel
        selectedIndex={selectedTabIndex}
        onSelect={(tabIndex) => {
          //setSelectedTabIndex(tabIndex)
        }}
      >
        <TabList>
          <Link to={ROUTE_PATH_DECKMANAGER_BUILD}>
            <Tab>Build</Tab>
          </Link>
          <Link to={ROUTE_PATH_DECKMANAGER_SAVE}>
            <Tab
              className={classnames(
                "react-tabs__tab",
                (isPremadeDeckActive === null
                  ? lastSelectedCards.every(({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT)
                  : lastSelectedPremadeCards.every(
                      ({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT
                    ) &&
                    lastSelectedCards.every(
                      ({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT
                    )) && cssNeonEffect.neonEffect
              )}
            >
              Save
            </Tab>
          </Link>
        </TabList>
        <TabPanel>
          <HowToUse />
          <MasterSelector
            setSelectedMaster={
              isPremadeDeckActive === true ? setSelectedPremadeMaster : setSelectedMaster
            }
          />
          <FiltersWithCards
            availableCards={availableCards}
            cardActionWrapper={(card) => (
              <CardForDeckActionOverlay
                card={card}
                setLastSelectedCards={
                  isPremadeDeckActive === true ? setLastSelectedPremadeCards : setLastSelectedCards
                }
              />
            )}
          />
        </TabPanel>
        <TabPanel>
          <SaveDeckContainer
            lastSelectedCards={lastSelectedCards}
            selectedMaster={selectedMaster}
            lastSelectedPremadeCards={lastSelectedPremadeCards}
            selectedPremadeMaster={selectedPremadeMaster}
            isPremadeDeckActive={isPremadeDeckActive}
          />
        </TabPanel>
      </Tabs>
    </div>
  );
}
