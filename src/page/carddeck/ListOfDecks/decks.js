import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import { CURRENT_GAME_VERSION } from "components/helper";
import { useGaTrackView } from "consent-banner";
import orderBy from "lodash/orderBy";
import { db, dbErrorHandlerPromise } from "mm-firestore";
import DecklistFilters from "page/carddeck/ListOfDecks/decklist-filters";
import { MasterAndCardsContainerStyle } from "page/carddeck/master-and-cards-container-style";
import { ButtonGroupStyle } from "page/filters/ButtonFilterGroup";
import Master from "page/mastersoverview/master";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import styled from "styled-components";
import cardData from "../../../generated/jobCardProps";
import { Card } from "../../Card";
import cssButton from "../../filters/ButtonFilterGroup.module.scss";

import css from "./decks.module.scss";

export default function Decks() {
  useGaTrackView("/ListOfDecks");

  const [decks, setDecks] = useState([]);
  const [gameTypeFilter, setGameTypeFilter] = useState("");
  const [gameTypeSecondaryFilter, setGameTypeSecondaryFilter] = useState("");
  const [gameTypeThirdFilter, setGameTypeThirdFilter] = useState("");

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
            createdByDisplayName: deck.createdByDisplayName,
            gameType: deck.gameType,
            master: deck.hero,
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
          {"  "}Features under construction. Ready in some days. Ideas to share? - contact me!
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
        <fieldset className={css.singleDeck} key={deck.createdAt.getTime()}>
          <legend>
            <div className={css.deckLegend}>{deck.deckname}</div>
          </legend>
          <div className={css.deckRightLegend}>
            v{deck.createdAtVersion ? deck.createdAtVersion : CURRENT_GAME_VERSION}
          </div>
          <div className={css.deckRightBottomLegend}>
            by {deck.createdByDisplayName ? deck.createdByDisplayName : "unknown"}
          </div>

          <div>
            <MasterAndCardsContainerStyle>
              <div>
                <Master masterKey={deck.master} actionRegistrationComponent={() => {}} />
              </div>
              {orderBy(deck.cards, ({ manacost }) => parseInt(manacost), "asc").map((card) => (
                <Card card={card} isDeckCard showDeck key={card.iD} />
              ))}
            </MasterAndCardsContainerStyle>

            <div className={css.description}>{deck.description}</div>
            <div>
              <div className={css.belowDeck}>
                <CopyToClipboard
                  text={`/setdeck ${deck.master}: ${deck.cards.map(({ name }) => name).join(", ")}`}
                  onCopy={() => {
                    toast(
                      "Copied to clipboard. Go to game, switch to a slot and paste command and press ENTER. Game must be english language. Experimental feature, might not work!",
                      { position: "bottom-right", autoClose: 10000 }
                    );
                  }}
                  title="Copy"
                >
                  <ButtonGroupStyle>
                    <div className={classnames(css.copyDeck, cssButton.ButtonInGroupStyle)}>
                      Copy to game
                    </div>
                  </ButtonGroupStyle>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </fieldset>
      ))}
    </div>
  );
}
