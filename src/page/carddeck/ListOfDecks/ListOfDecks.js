import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db, dbErrorHandlerPromise, gaTrackView } from "../../../firestore";
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
  gaTrackView("/ListOfDecks");
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    db.collection("decks")
      .orderBy("createdAt", "desc")
      .get()
      .then((documentSnapshots) => {
        const dbDecks = documentSnapshots.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const normalizedDecks = dbDecks.map((deck) => {
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
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <FontAwesomeIcon icon={faTools} size="2x" color="yellow" style={{ paddingRight: "10px" }} />
        {"  "}Features under construction
        <div>
          <b>
            The next days I will heavily add new features how to save and share decks, so be
            prepared!
          </b>
        </div>
        <div>
          <b> Till that time, I recommend to share decks by URL/Bookmark.</b>
        </div>
      </div>
      {decks.map((deck) => (
        <SingleDeckContainerStyle key={deck.createdAt.getTime()}>
          {deck.deckname}, {deck.createdAt.toLocaleString()}
          <CardsContainerStyle>
            {deck.cards.map((card) => (
              <Card card={card} isDeckCard showDeck key={card.iD} />
            ))}
          </CardsContainerStyle>
        </SingleDeckContainerStyle>
      ))}
    </div>
  );
}
