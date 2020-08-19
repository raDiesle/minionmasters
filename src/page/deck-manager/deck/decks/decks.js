import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGaTrackView } from "footer/consent-cookie-banner";
import cardData from "generated/jobCardProps.json";
import { db, dbErrorHandlerPromise } from "mm-firestore";
import DecklistFilters from "page/deck-manager/deck/decks/decklist-filters";

import css from "page/deck-manager/deck/decks/decks.module.scss";
import { SavedDeck } from "page/deck-manager/deck/decks/saved-deck";
import React, { useEffect, useState } from "react";

export default function Decks({ setSelectedMaster, setLastSelectedCards }) {
  useGaTrackView("/ListOfDecks");

  const [decks, setDecks] = useState([]);
  const [gameTypeFilter, setGameTypeFilter] = useState("");
  const [gameTypeSecondaryFilter, setGameTypeSecondaryFilter] = useState("");
  const [gameTypeThirdFilter, setGameTypeThirdFilter] = useState("");

  const [masterFilter, setMasterFilter] = useState("");

  const [availableCards, setAvailableCards] = useState("");
  const [isToggleAvailableCards, setIsToggleAvailableCards] = useState(false);

  useEffect(() => {
    console.debug("fetched decks");
    db.collection("decks")
      .orderBy("createdAt", "desc")
      .get()
      .then((documentSnapshots) => {
        const dbDecks = documentSnapshots.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const normalizedDecks = dbDecks.map((deck) => {
          const mappedCardData = deck.cards.map(({ card: { iD: iDFromDb }, count }) => {
            return {
              card: cardData.find(({ iD }) => iD === iDFromDb),
              count,
            };
          });
          return {
            dbid: deck.id,
            deckname: deck.deckname,
            cards: mappedCardData,
            createdAt: deck.createdAt.toDate(),
            createdAtVersion: deck.createdAtVersion,
            createdByDisplayName: deck.createdByDisplayName,
            gameType: deck.gameType,
            master: deck.master,
            description: deck.description,
            gameTypeSecondary: deck.gameTypeSecondary,
            gameTypeThird: deck.gameTypeThird,
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

  const decksWithGameTypeThird = !gameTypeThirdFilter
    ? decksWithGameTypeSecondary
    : decksWithGameTypeSecondary.filter(
        ({ gameTypeThird }) => gameTypeThird === gameTypeThirdFilter
      );

  const decksWithMaster = !masterFilter
    ? decksWithGameTypeThird
    : decksWithGameTypeThird.filter(({ master }) => master === masterFilter);
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
          paddingBottom: "15px",
        }}
      >
        <div>
          <FontAwesomeIcon
            icon={faTools}
            size="2x"
            color="yellow"
            style={{ paddingRight: "10px" }}
          />
          {"  "}Features under construction. Ready in some days. Ideas to share? - contact me! Sorry
          that I had to delete some decks.
        </div>
      </div>
      <DecklistFilters
        gameType={gameTypeFilter}
        setGameType={setGameTypeFilter}
        gameTypeSecondary={gameTypeSecondaryFilter}
        setGameTypeSecondary={setGameTypeSecondaryFilter}
        gameTypeThird={gameTypeThirdFilter}
        setGameTypeThird={setGameTypeThirdFilter}
        masterFiltr={masterFilter}
        setMasterFilter={setMasterFilter}
        availableCards={availableCards}
        setAvailableCards={setAvailableCards}
        isToggleAvailableCards={isToggleAvailableCards}
        setIsToggleAvailableCards={setIsToggleAvailableCards}
      />
      {decksWithAvailableCards.map((deck) => (
        <SavedDeck
          deck={deck}
          key={deck.dbid}
          setSelectedMaster={setSelectedMaster}
          setLastSelectedCards={setLastSelectedCards}
        />
      ))}
    </div>
  );
}
