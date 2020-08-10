import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CURRENT_GAME_VERSION } from "components/helper";
import { useGaTrackView } from "consent-banner";
import orderBy from "lodash/orderBy";
import { db, dbErrorHandlerPromise } from "mm-firestore";
import DecklistFilters from "page/carddeck/ListOfDecks/decklist-filters";
import Master from "page/mastersoverview/master";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import cardData from "../../../generated/jobCardProps";
import { Card } from "../../Card";

import css from "./decks.module.scss";

const CardsContainerStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  @media (max-width: 767px) {
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  }
`;

export default function Decks() {
  useGaTrackView("/ListOfDecks");

  const [decks, setDecks] = useState([]);
  const [gameTypeFilter, setGameTypeFilter] = useState("");
  const [gameTypeSecondaryFilter, setGameTypeSecondaryFilter] = useState("");
  const [playStyleFilter, setPlayStyleFilter] = useState("");
  const [masterFilter, setMasterFilter] = useState("");

  const [availableCards, setAvailableCards] = useState("");
  const [isToggleAvailableCards, setIsToggleAvailableCards] = useState(false);

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

  const decksWithMaster = !masterFilter
    ? decksWithPlayStyle
    : decksWithPlayStyle.filter(({ master }) => master === masterFilter);
  // SORT BY VERSION DESC

  const decksWithAvailableCards = !availableCards
    ? decksWithMaster
    : decksWithMaster.filter(({ cards }) =>
        cards.every(({ iD }) =>
          isToggleAvailableCards ? !availableCards.includes(iD) : availableCards.includes(iD)
        )
      );

  return (
    <div className={css.pageContainer}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <FontAwesomeIcon
            icon={faTools}
            size="2x"
            color="yellow"
            style={{ paddingRight: "10px" }}
          />
          {"  "}Features under construction. Ready in some days. Ideas to share? - contact me!
        </div>
      </div>
      <DecklistFilters
        gameType={gameTypeFilter}
        setGameType={setGameTypeFilter}
        gameTypeSecondary={gameTypeSecondaryFilter}
        setGameTypeSecondary={setGameTypeSecondaryFilter}
        playStyle={playStyleFilter}
        setPlayStyle={setPlayStyleFilter}
        masterFiltr={masterFilter}
        setMasterFilter={setMasterFilter}
        availableCards={availableCards}
        setAvailableCards={setAvailableCards}
        isToggleAvailableCards={isToggleAvailableCards}
        setIsToggleAvailableCards={setIsToggleAvailableCards}
      />
      {decksWithAvailableCards.map((deck) => (
        <fieldset className={css.singleDeck} key={deck.createdAt.getTime()}>
          <legend>
            <div className={css.deckLegend}>{deck.deckname}</div>
          </legend>
          <div className={css.deckRightLegend}>
            v{deck.createdAtVersion ? deck.createdAtVersion : CURRENT_GAME_VERSION}
          </div>
          <CardsContainerStyle>
            {deck.master && (
              <div className={css.master}>
                <Master masterKey={deck.master} actionRegistrationComponent={() => {}} />
              </div>
            )}
            {orderBy(deck.cards, ({ manacost }) => parseInt(manacost), "asc").map((card) => (
              <Card card={card} isDeckCard showDeck key={card.iD} />
            ))}
          </CardsContainerStyle>
          <div className={css.deckBelow}>{deck.description}</div>
        </fieldset>
      ))}
    </div>
  );
}
