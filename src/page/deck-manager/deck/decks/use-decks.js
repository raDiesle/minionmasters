import cardData from "generated/jobCardProps.json";

import { useState } from "react";

import { db, dbErrorHandlerPromise } from "mm-firestore";

export function useDecks() {
  const [decks, setDecks] = useState([]);
  // const [lastVisible, setLastVisible] = useState(null);
  // const [hasMore, setHasMore] = useState(true);

  const loadDecks = () => {
    // TODO why this is required ?
    // if (!PAGE_TABS_CONFIG.includes(location.pathname.split("?")[0])) return;

    // be aware its missing orderBy right now. to be changed to post and pagination later on
    let query = db.collection("decks").orderBy("createdAt", "desc");
    //.limit(3);

    /*
    if(lastVisible){
      query = query.startAfter(lastVisible);
    }
*/
    query
      .get()
      .then((documentSnapshots) => {
        //const lastItem = documentSnapshots.docs[documentSnapshots.docs.length-1];
        //   setLastVisible( lastItem);
        // setHasMore(documentSnapshots.docs.length === 3);

        const dbDecks = documentSnapshots.docs.map((doc) => ({
          iD: doc.id,
          ...doc.data(),
        }));

        const normalizedDecks = dbDecks.map((deck) => {
          const mapToCardData = (cardsToMap) =>
            cardsToMap.map(({ card: { iD: iDFromDb }, count }) => {
              const mappedCard = cardData.find(({ iD }) => iD === iDFromDb);
              const defaultCleaverCardFn = () => cardData.find(({ iD }) => iD === 26);
              return {
                card: typeof mappedCard === "undefined" ? defaultCleaverCardFn() : mappedCard,
                count: parseInt(count),
              };
            });
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
            tags: Array.isArray(deck.tags) ? deck.tags : [],
          };
        });

        setDecks((prevDecks) => {
          return [...prevDecks, ...normalizedDecks];
        });
      })
      .catch(dbErrorHandlerPromise);
  };

  return {
    decks,
    loadDecks,
  };
}
