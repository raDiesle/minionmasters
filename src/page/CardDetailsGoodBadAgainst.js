import mToast from "components/mToast";
import { db, dbErrorHandlerPromise } from "mm-firestore";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import AgainstCards from "./AgainstCards";
import CardDiscussion from "./discussion/CardDiscussion";

import FiltersWithCards from "./FiltersWithCards";

const GoodBadStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  & > div {
    flex: 50%;
    padding-right: 10px;
  }
`;

const CardRelationStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  & > div {
    padding-left: 20px;
  }
`;

const ActionEventListenerStyle = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 1000;
`;

const AgainstGoodHeaderStyle = styled.div`
  color: darkgreen;
  font-weight: bold;
`;

const AgainstBadHeaderStyle = styled.div`
  color: darkred;
  font-weight: bold;
`;

const swapArrayElements = (arr, x, y) => {
  if (arr[x] === undefined || arr[y] === undefined) {
    return arr;
  }
  const a = x > y ? y : x;
  const b = x > y ? x : y;
  return [...arr.slice(0, a), arr[b], ...arr.slice(a + 1, b), arr[a], ...arr.slice(b + 1)];
};

const fetchAgainstCards = (iD) => {
  const againstRef = db.collection("cards").doc(String(iD));
  return againstRef
    .get()
    .then((querySnapshot) => {
      const defaultData = {
        goodAgainst: [],
        badAgainst: [],
      };
      if (!querySnapshot.exists) {
        return defaultData;
      }
      const data = querySnapshot.data();
      return {
        goodAgainst: data.goodAgainst || [],
        badAgainst: data.badAgainst || [],
      };
    })
    .catch(dbErrorHandlerPromise);
};

const FiltersWithCardsMemo = ({ handleSelectCard }) =>
  useMemo(
    () => (
      <FiltersWithCards
        cardActionWrapper={(card) => (
          <ActionEventListenerStyle
            onClick={() => handleSelectCard(card.iD)}
          ></ActionEventListenerStyle>
        )}
      ></FiltersWithCards>
    ),
    []
  );

export default function CardDetailsGoodBadAgainst({ card, card: { iD } }) {
  const againstRef = db.collection("cards").doc(String(iD));

  const badAgainstKey = "badAgainst";
  const goodAgainstKey = "goodAgainst";

  const [selectionState, setSelectionState] = useState("NONE");

  const [cardDbData, setCardDbData] = useState({
    goodAgainst: [],
    badAgainst: [],
  });

  const triggerDataRefreshAgainst = () => {
    fetchAgainstCards(iD, againstRef)
      .then((data) => {
        setCardDbData(data);
      })
      .catch(dbErrorHandlerPromise);
  };
  useEffect(() => {
    triggerDataRefreshAgainst();
  }, []);

  const updateUpvoteSelection = (goodOrBadKey, currentVotedCardiD) => {
    setSelectionState("NONE");

    const againstVotedCards = [...cardDbData[goodOrBadKey]];
    const votedPosition = againstVotedCards.findIndex((val) => val === currentVotedCardiD);
    const isAddedNewToList = votedPosition === -1;
    const newOrderedVotes = isAddedNewToList
      ? [...againstVotedCards, currentVotedCardiD]
      : swapArrayElements(againstVotedCards, votedPosition, votedPosition - 1);

    const againstRef = db.collection("cards").doc(String(iD));
    return againstRef
      .set(
        {
          [goodOrBadKey]: newOrderedVotes,
        },
        { merge: true }
      )
      .then(function () {
        mToast("Saved");
        return Promise.resolve();
      })
      .catch(dbErrorHandlerPromise);
  };

  const handleSelectCard = (currentVotedCardiD) => {
    const goodOrBadKey = selectionState === "GOOD_AGAINST" ? goodAgainstKey : badAgainstKey;

    updateUpvoteSelection(goodOrBadKey, currentVotedCardiD)
      .then((_) => {
        selectionState === "GOOD_AGAINST"
          ? triggerDataRefreshAgainst()
          : triggerDataRefreshAgainst();
      })
      .catch(dbErrorHandlerPromise);
    setSelectionState("NONE");
  };

  return (
    <div>
      {selectionState === "NONE" && (
        <GoodBadStyle>
          <CardRelationStyle>
            <AgainstGoodHeaderStyle>Good against</AgainstGoodHeaderStyle>

            <CardDiscussion card={card} discussionType="goodAgainst" />

            <AgainstCards
              triggerDataRefresh={triggerDataRefreshAgainst}
              cardModalId={iD}
              againstKey={"goodAgainst"}
              votedCards={cardDbData.goodAgainst}
              setSelectionState={setSelectionState}
              updateUpvoteSelection={updateUpvoteSelection}
              handleEmptyCardDeckSlotClick={() => setSelectionState("GOOD_AGAINST")}
            />
          </CardRelationStyle>
          <CardRelationStyle>
            <AgainstBadHeaderStyle>Bad against</AgainstBadHeaderStyle>

            <CardDiscussion card={card} discussionType="badAgainst" />

            <AgainstCards
              triggerDataRefresh={triggerDataRefreshAgainst}
              cardModalId={iD}
              againstKey={"badAgainst"}
              votedCards={cardDbData.badAgainst}
              setSelectionState={setSelectionState}
              updateUpvoteSelection={updateUpvoteSelection}
              handleEmptyCardDeckSlotClick={() => setSelectionState("BAD_AGAINST")}
            />
          </CardRelationStyle>
        </GoodBadStyle>
      )}
      {selectionState !== "NONE" && (
        <div>
          {selectionState === "GOOD_AGAINST" ? (
            <AgainstGoodHeaderStyle>Good against</AgainstGoodHeaderStyle>
          ) : (
            <AgainstBadHeaderStyle>Bad against</AgainstBadHeaderStyle>
          )}
          <FiltersWithCardsMemo handleSelectCard={handleSelectCard} />
        </div>
      )}
    </div>
  );
}
