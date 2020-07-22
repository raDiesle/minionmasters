import React, { useState } from "react";
import styled from "styled-components";
import { db, dbErrorHandlerPromise } from "../../../firestore";
import cardData from "../../../generated/jobCardProps";
import { Card } from "../../Card";

const SingleDeckContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

const CardsContainerStyle = styled.div`
  display: flex;
`;

export default function ListOfDecks() {
  const [decks, setDecks] = useState([]);
  db.collection("decks")
    .orderBy("createdAt", "desc")
    .get()
    .then((documentSnapshots) => {
      const dbDecks = documentSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const normalizedDecks = dbDecks.map((deck) => {
        console.log(deck.cards);
        const mappedCardData = deck.cards.map((iDFromDb) => {
          return cardData.find(({ iD }) => iD === iDFromDb);
        });
        return {
          deckname: deck.deckname,
          cards: mappedCardData,
          createdAt: deck.createdAt.toDate(),
        };
      });
      setDecks(normalizedDecks);
    })
    .catch(dbErrorHandlerPromise);

  return (
    <div>
      {decks.map((deck) => (
        <SingleDeckContainerStyle>
          {deck.deckname}, {deck.createdAt.toLocaleString()}
          <CardsContainerStyle>
            {deck.cards.map((card) => (
              <Card card={card} isDeckCard showDeck />
            ))}
          </CardsContainerStyle>
        </SingleDeckContainerStyle>
      ))}
    </div>
  );
}
