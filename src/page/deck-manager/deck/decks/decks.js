import axios from "axios";
import {
  deckIdFromUrl,
  isForImagePreview,
  matchSelectedTabOutOfPath,
  useCurrentUser,
} from "components/helper";
import { useGaTrackView } from "footer/consent-cookie-banner";
import cardData from "generated/jobCardProps.json";
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
import { ROUTE_PATH_YOUR_DECKS } from "page/deck-manager/deck/decks/your-saved-decks-config";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import useAsyncEffect from "use-async-effect";

const PAGE_TABS_CONFIG = [ROUTE_PATH_DECKS, ROUTE_PATH_YOUR_DECKS, ROUTE_PATH_ID_FROM_PARAM];
const API_KEY_FIREBASE_REST = "AIzaSyBA96Wmq53h-6j3p37JAe_gJ8sX-emkuzY";

const isSingleDeckTabSelected = (selectedTabIndex) =>
  selectedTabIndex === PAGE_TABS_CONFIG.findIndex((config) => config === ROUTE_PATH_ID_FROM_PARAM);

export default function Decks({ setSelectedMaster, setLastSelectedCards, availableCards }) {
  useGaTrackView("/ListOfDecks");
  const [selectedTabIndex, setSelectedTabIndex] = useState(DEFAULT_SELECTED_TAB);

  const [decks, setDecks] = useState([]);
  const [gameTypeFilter, setGameTypeFilter] = useState("");
  const [gameTypeSecondaryFilter, setGameTypeSecondaryFilter] = useState("");
  const [gameTypeThirdFilter, setGameTypeThirdFilter] = useState("");
  const [masterFilter, setMasterFilter] = useState("");
  const [createdByFilter, setCreatedByFilter] = useState("");
  const [createdByFilterOptions, setCreatedByFilterOptions] = useState([""]);

  const currentUser = useCurrentUser();

  const location = useLocation();
  useEffect(() => {
    setSelectedTabIndex(matchSelectedTabOutOfPath(PAGE_TABS_CONFIG));
  }, [location.pathname]);

  useAsyncEffect(
    (isMounted) => {
      if (!PAGE_TABS_CONFIG.includes(location.pathname.split("?")[0])) return;

      // be aware its missing orderBy right now. to be changed to post and pagination later on
      const unsubscribePromise = axios
        .get(
          "https://firestore.googleapis.com/v1/projects/minionmastersmanager/databases/(default)/documents/decks?pageSize=500&key=" +
            API_KEY_FIREBASE_REST
        )
        .then((response) => {
          if (!isMounted()) return;

          const dbDecks = response.data.documents.map((document) => ({
            iD: document.name.substr(document.name.lastIndexOf("/") + 1),
            ...document.fields,
          }));

          const normalizedDecks = dbDecks.map((deck) => {
            //
            const mapToCardData = (cardsToMap) =>
              cardsToMap.map(
                ({
                  mapValue: {
                    fields: {
                      card: {
                        mapValue: {
                          fields: {
                            iD: { integerValue: iDFromDb },
                          },
                        },
                      },
                      count: { integerValue: count },
                    },
                  },
                }) => {
                  return {
                    card: cardData.find(({ iD }) => iD === parseInt(iDFromDb)),
                    count: parseInt(count),
                  };
                }
              );

            return {
              dbid: deck.iD,
              deckname: deck.deckname.stringValue,
              createdAt: new Date(deck.createdAt.timestampValue),
              createdAtVersion: deck.createdAtVersion.stringValue,
              createdByDisplayName: deck.createdByDisplayName.stringValue,
              createdByUid: deck.createdByUid.stringValue,
              gameType: deck.gameType.stringValue,
              master: deck.master.stringValue,
              cards: mapToCardData(deck.cards.arrayValue.values),
              premadeMaster: deck.premadeMaster && deck.premadeMaster.stringValue,
              premadeCards: deck.premadeCards && mapToCardData(deck.premadeCards.arrayValue.values),
              description: deck.description.stringValue,
              gameTypeSecondary: deck.gameTypeSecondary.stringValue,
              gameTypeThird: deck.gameTypeThird && deck.gameTypeThird.stringValue,
              youtubeLink: deck.youtubeLink && deck.youtubeLink.stringValue,
              redditLink: deck.redditLink && deck.redditLink.stringValue,
              tags:
                !isEmpty(deck.tags) &&
                !isEmpty(deck.tags.arrayValue.values) &&
                !isEmpty(deck.tags.arrayValue.values)
                  ? deck.tags.arrayValue.values.map(({ mapValue: { fields } }) => ({
                      label: fields.label.stringValue,
                      value: fields.value.stringValue,
                    }))
                  : [],
            };
          });

          setDecks(normalizedDecks);
          setCreatedByFilterOptions([
            ...new Set(normalizedDecks.map(({ createdByDisplayName }) => createdByDisplayName)),
          ]);
        });

      // .catch(dbErrorHandlerPromise);
      /*
      const unsubscribePromise = db
        .collection("decks")
        .orderBy("createdAt", "desc")
        .onSnapshot((documentSnapshots) => {
          if (!isMounted()) return;

          const dbDecks = documentSnapshots.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const normalizedDecks = dbDecks.map((deck) => {
            const mapToCardData = (cardsToMap) =>
              cardsToMap.map(({ card: { iD: iDFromDb }, count }) => {
                return {
                  card: cardData.find(({ iD }) => iD === iDFromDb),
                  count,
                };
              });

            return {
              dbid: deck.id,
              deckname: deck.deckname,
              createdAt: deck.createdAt.toDate(),
              createdAtVersion: deck.createdAtVersion,
              createdByDisplayName: deck.createdByDisplayName,
              createdByUid: deck.createdByUid,
              gameType: deck.gameType,
              master: deck.master,
              cards: mapToCardData(deck.cards),
              premadeMaster: deck.premadeMaster,
              premadeCards: deck.premadeCards && mapToCardData(deck.premadeCards),
              description: deck.description,
              gameTypeSecondary: deck.gameTypeSecondary,
              gameTypeThird: deck.gameTypeThird,
              youtubeLink: deck.youtubeLink,
              redditLink: deck.redditLink,
              tags: Array.isArray(deck.tags) ? deck.tags : [],
            };
          });
          setDecks(normalizedDecks);
          setCreatedByFilterOptions([
            ...new Set(normalizedDecks.map(({ createdByDisplayName }) => createdByDisplayName)),
          ]);
        });

       */
      return unsubscribePromise;
    },
    (promiseUnsubscribe) => {
      promiseUnsubscribe && promiseUnsubscribe();
    },
    [location.pathname]
  );

  const decksByDeckId = !isSingleDeckTabSelected(selectedTabIndex)
    ? decks
    : decks.filter(({ dbid }) => dbid === deckIdFromUrl);

  const decksWithGameType = !gameTypeFilter
    ? decksByDeckId
    : decksByDeckId.filter(({ gameType }) => gameType === gameTypeFilter);

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
            {isSingleDeckTabSelected(selectedTabIndex) && <TabPanel></TabPanel>}
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
            createdByFilterOptions={createdByFilterOptions}
            createdByFilter={createdByFilter}
            setCreatedByFilter={setCreatedByFilter}
          />
        </>
      )}

      <div className={css.totalCount}>
        count: {sortedByDateCards.length}/{decks.length}
      </div>

      {sortedByDateCards.map((deck) => (
        <SavedDeck
          deck={deck}
          key={deck.dbid}
          setSelectedMaster={setSelectedMaster}
          setLastSelectedCards={setLastSelectedCards}
          availableCards={availableCards}
        />
      ))}
    </div>
  );
}
