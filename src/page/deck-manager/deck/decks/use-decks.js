import axios from "axios";
import cardData from "generated/jobCardProps.json";
import isEmpty from "lodash.isempty";

import { useState } from "react";
import { useLocation } from "react-router-dom";
import useAsyncEffect from "use-async-effect";

const API_KEY_FIREBASE_REST = "AIzaSyBA96Wmq53h-6j3p37JAe_gJ8sX-emkuzY";

export function useDecks(){
  const location = useLocation();
  const [decks, setDecks] = useState([]);
  useAsyncEffect(
    (isMounted) => {
      // TODO why this is required ?
      // if (!PAGE_TABS_CONFIG.includes(location.pathname.split("?")[0])) return;

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

  return decks;
}