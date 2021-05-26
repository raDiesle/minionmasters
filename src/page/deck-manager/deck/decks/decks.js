import {
  deckIdFromUrl,
  isForImagePreview,
  matchSelectedTabOutOfPath,
  useCurrentUser,
} from "components/helper";
import { useGaTrackView } from "footer/consent-cookie-banner";
import isEmpty from "lodash.isempty";
import orderBy from "lodash/orderBy";

import { DEFAULT_SELECTED_TAB } from "page/deck-manager/deck-manager";
import DecklistFilters from "page/deck-manager/deck/decks/decklist-filters";
import {
  ROUTE_PATH_DECKS,
  ROUTE_PATH_ID_FROM_PARAM,
} from "page/deck-manager/deck/decks/decks-config";

import css from "page/deck-manager/deck/decks/decks.module.scss";
import { SavedDeck } from "page/deck-manager/deck/decks/saved-deck";
import { useDecks } from "page/deck-manager/deck/decks/use-decks";
import { ROUTE_PATH_YOUR_DECKS } from "page/deck-manager/deck/decks/your-saved-decks-config";
import { labelToObjectMapping } from "page/deck-manager/savedeck/tags-input";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import InfiniteScroll from "react-infinite-scroll-component";
import useAsyncEffect from "use-async-effect";

export const PAGE_TABS_CONFIG = [ROUTE_PATH_DECKS, ROUTE_PATH_YOUR_DECKS, ROUTE_PATH_ID_FROM_PARAM];

const isSingleDeckTabSelected = (selectedTabIndex) =>
  selectedTabIndex === PAGE_TABS_CONFIG.findIndex((config) => config === ROUTE_PATH_ID_FROM_PARAM);

export default function Decks({ setSelectedMaster, setLastSelectedCards, availableCards }) {
  useGaTrackView("/ListOfDecks");
  const [selectedTabIndex, setSelectedTabIndex] = useState(DEFAULT_SELECTED_TAB);
  const location = useLocation();
  const history = useHistory();

  const [limit, setLimit] = useState(3);
  const { decks, loadDecks } = useDecks();
  useAsyncEffect((isMounted) => {
    loadDecks();
  }, []);

  const [gameTypeFilter, setGameTypeFilter] = useState("");
  const [gameTypeSecondaryFilter, setGameTypeSecondaryFilter] = useState("");
  const [gameTypeThirdFilter, setGameTypeThirdFilter] = useState("");
  const [masterFilter, setMasterFilter] = useState("");
  const [createdByFilter, setCreatedByFilter] = useState("");

  const [tagsFilter, setTagsFilter] = useState([]);
  useEffect(() => {
    const deckTagFromUrl = qs.parse(window.location.search, { ignoreQueryPrefix: true }).tag;
    if (deckTagFromUrl) {
      // why i stored label and not value in url ?
      const deckTagFromUrlObject = deckTagFromUrl.map((tag) =>
        labelToObjectMapping(decodeURIComponent(tag))
      );

      setTagsFilter(deckTagFromUrlObject);
    }
  }, []);
  const handleSetTags = (tags) => {
    setTagsFilter(tags);
    // const qs.parse(location.search,{ comma: true });
    const tagsAsQuery = qs.stringify({ tag: tags.map(({ value }) => value) });
    history.push({ search: tagsAsQuery });
  };

  const currentUser = useCurrentUser();

  useEffect(() => {
    setSelectedTabIndex(matchSelectedTabOutOfPath(PAGE_TABS_CONFIG));
  }, [location.pathname]);

  const decksByDeckId = !isSingleDeckTabSelected(selectedTabIndex)
    ? decks
    : decks.filter(({ dbid }) => dbid === deckIdFromUrl);

  const decksByTag = isEmpty(tagsFilter)
    ? decksByDeckId
    : decksByDeckId.filter(
        ({ tags }) =>
          !isEmpty(
            tagsFilter
              .map(({ value }) => value)
              .filter((tag) => tags.map(({ value }) => value).includes(tag))
          )
      );

  const decksWithGameType = !gameTypeFilter
    ? decksByTag
    : decksByTag.filter(({ gameType }) => gameType === gameTypeFilter);

  const decksWithGameTypeSecondary = !gameTypeSecondaryFilter
    ? decksWithGameType
    : decksWithGameType.filter(
        ({ gameTypeSecondary }) => gameTypeSecondary === gameTypeSecondaryFilter
      );

  const decksWithGameTypeThird = !gameTypeThirdFilter
    ? decksWithGameTypeSecondary
    : decksWithGameTypeSecondary.filter(
        ({ gameTypeThird }) => gameTypeThird === gameTypeThirdFilter
      );

  const decksWithMaster = !masterFilter
    ? decksWithGameTypeThird
    : decksWithGameTypeThird.filter(({ master }) => master === masterFilter);
  // SORT BY VERSION DESC

  const isYourDecksSelected = selectedTabIndex === 1 && currentUser;
  const decksWithYoursFilter = !isYourDecksSelected
    ? decksWithMaster
    : decksWithMaster.filter(({ createdByUid }) => createdByUid === currentUser.uid);

  const decksWithAuthor =
    !createdByFilter || deckIdFromUrl
      ? decksWithYoursFilter
      : decksWithYoursFilter.filter(
          ({ createdByDisplayName }) => createdByDisplayName === createdByFilter
        );

  const sortedByDateCards = orderBy(
    decksWithAuthor,
    ({ createdAt }) => createdAt.getTime(),
    "desc"
  );

  const cardsWithLimit = sortedByDateCards.slice(0, limit);

  return (
    <div className={css.pageContainer}>
      {!isForImagePreview && (
        <>
          <Tabs selectedIndex={selectedTabIndex} onSelect={(tabIndex) => {}}>
            <TabList>
              <Link to={ROUTE_PATH_DECKS}>
                <Tab>All Decks</Tab>
              </Link>
              {currentUser && (
                <Link to={ROUTE_PATH_YOUR_DECKS}>
                  <Tab>Your Decks</Tab>
                </Link>
              )}
              {deckIdFromUrl && (
                <Link to={ROUTE_PATH_ID_FROM_PARAM}>
                  <Tab>From Url</Tab>
                </Link>
              )}
            </TabList>
            <TabPanel></TabPanel>
            {currentUser && <TabPanel></TabPanel>}
            {deckIdFromUrl && <TabPanel></TabPanel>}
          </Tabs>

          <DecklistFilters
            gameType={gameTypeFilter}
            setGameType={setGameTypeFilter}
            gameTypeSecondary={gameTypeSecondaryFilter}
            setGameTypeSecondary={setGameTypeSecondaryFilter}
            gameTypeThird={gameTypeThirdFilter}
            setGameTypeThird={setGameTypeThirdFilter}
            masterFiltr={masterFilter}
            setMasterFilter={setMasterFilter}
            createdByFilterOptions={
              decks
                ? [...new Set(decks.map(({ createdByDisplayName }) => createdByDisplayName))]
                : [""]
            }
            createdByFilter={createdByFilter}
            setCreatedByFilter={setCreatedByFilter}
            tagsFilter={tagsFilter}
            setTagsFilter={handleSetTags}
          />
        </>
      )}

      <div className={css.totalCount}>
        count: {sortedByDateCards.length}/{decks.length}
      </div>

      <InfiniteScroll
        dataLength={limit} //This is important field to render the next data
        next={() => {
          setLimit((prevLimit) => prevLimit * 2);
        }}
        hasMore={() => {
          return limit < sortedByDateCards.length;
        }}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {cardsWithLimit.map((deck) => (
          <SavedDeck
            deck={deck}
            key={deck.dbid}
            setSelectedMaster={setSelectedMaster}
            setLastSelectedCards={setLastSelectedCards}
            availableCards={availableCards}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
