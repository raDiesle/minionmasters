import cardData from "generated/jobCardProps.json";

import { useState } from "react";
import { useLocation } from "react-router-dom";
import useAsyncEffect from "use-async-effect";

import { db, dbErrorHandlerPromise } from "mm-firestore";

export function useDecks() {
  const location = useLocation();
  const [decks, setDecks] = useState([]);
  useAsyncEffect(
    (isMounted) => {
      // TODO why this is required ?
      // if (!PAGE_TABS_CONFIG.includes(location.pathname.split("?")[0])) return;

      // be aware its missing orderBy right now. to be changed to post and pagination later on
      db.collection("decks")
        .orderBy("createdAt", "desc")
        .limit(999)
        .get()

        .then((documentSnapshots) => {
          if (!isMounted()) return;

          const dbDecks = documentSnapshots.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const normalizedDecks = dbDecks.map((deck) => {
            const mapToCardData = (cardsToMap) =>
                cardsToMap.map(({ card: { iD: iDFromDb }, count }) => {
                  const mappedCard = cardData.find(({ iD }) => iD === iDFromDb);
                  const defaultCleaverCardFn = () => cardData.find(({ iD }) => iD === 26);
                  return {
                    card: typeof mappedCard === "undefined"
                      ? defaultCleaverCardFn() : mappedCard,
                    count: parseInt(count),
                  };
                })
            return {
              dbid: deck.iD,
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
              gameTypeThird: deck.gameTypeThird && deck.gameTypeThird,
              youtubeLink: deck.youtubeLink && deck.youtubeLink,
              redditLink: deck.redditLink && deck.redditLink,
              tags:
                Array.isArray(deck.tags) ? deck.tags : [],
            };
          });

          setDecks(normalizedDecks);
        }).catch(dbErrorHandlerPromise);
}, [location.pathname]);

  return decks;

}
