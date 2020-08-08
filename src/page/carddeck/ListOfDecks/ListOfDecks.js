import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CURRENT_GAME_VERSION } from "components/helper";
import orderBy from "lodash/orderBy";
import DecklistFilters from "page/carddeck/ListOfDecks/decklist-filters";
import Master from "page/mastersoverview/master";
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
  const [gameTypeFilter, setGameTypeFilter] = useState("");
  const [gameTypeSecondaryFilter, setGameTypeSecondaryFilter] = useState("");
  const [playStyleFilter, setPlayStyleFilter] = useState("");

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
            createdAtVersion: deck.createdAtVersion,
            gameType: deck.gameType,
            playStyle: deck.playStyle,
            master: deck.hero,
            description: deck.description,
            gameTypeSecondary: deck.gameTypeSecondary,
          };
        });
        setDecks(normalizedDecks);
      })
      .catch(dbErrorHandlerPromise);
  }, []);

  const decksWithGameType = !gameTypeFilter
    ? decks
    : decks.filter(({ gameType }) => gameType === gameTypeFilter);
  const decksWithGameTypeSecondary = !gameTypeSecondaryFilter
    ? decksWithGameType
    : decksWithGameType.filter(
        ({ gameTypeSecondary }) => gameTypeSecondary === gameTypeSecondaryFilter
      );
  const decksWithPlayStyle = !playStyleFilter
    ? decksWithGameTypeSecondary
    : decksWithGameTypeSecondary.filter(({ playStyle }) => playStyle === playStyleFilter);

  // SORT BY VERSION DESC

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
        {"  "}Features under construction. Ready in some days. Ideas to share? - contact me!
      </div>
      <DecklistFilters
        gameType={gameTypeFilter}
        setGameType={setGameTypeFilter}
        gameTypeSecondary={gameTypeSecondaryFilter}
        setGameTypeSecondary={setGameTypeSecondaryFilter}
        playStyle={playStyleFilter}
        setPlayStyle={setPlayStyleFilter}
      />
      {decksWithPlayStyle.map((deck) => (
        <SingleDeckContainerStyle key={deck.createdAt.getTime()}>
          {deck.deckname} {deck.createdAt.toLocaleString()}{" "}
          {deck.createdAtVersion ? deck.createdAtVersion : CURRENT_GAME_VERSION}v {deck.description}{" "}
          {deck.gameType} {deck.playStyle} {deck.gameTypeSecondary}
          <CardsContainerStyle>
            {deck.master && (
              <Master masterKey={deck.master} actionRegistrationComponent={() => {}} />
            )}
            {orderBy(deck.cards, ({ manacost }) => parseInt(manacost), "asc").map((card) => (
              <Card card={card} isDeckCard showDeck key={card.iD} />
            ))}
          </CardsContainerStyle>
        </SingleDeckContainerStyle>
      ))}
    </div>
  );
}
