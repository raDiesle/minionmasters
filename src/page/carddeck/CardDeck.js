import React, {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import styled from "styled-components";
import allCardsData from "../../generated/jobCardProps";
import CardActionAddCardToDeck from "../CardActionAddCardToDeck";
import {IDENTIFIER_FOR_EMPTY_SLOT} from "../carddeck/DeckContainer";
import {CardDeckSlot} from "./CardDeckSlot";
import MasterDeckSlot from "./MasterDeckSlot";

const CardDeckStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;

  @media (max-width: 767px) {
    // justify-content: center;
  }
`;

const usePreviousValue = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
const useTraceableState = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const prevValue = usePreviousValue(value);
  return [prevValue, value, setValue];
};

// refactor to only pass selectedCardId
export function CardDeck({
  selectedCardEvent: {
    eventId: cardSelectedEventId,
    card: { iD: selectedCardId },
    action,
  },
  setSelectedCardEvent,
  selectedHero,
  setSelectedHero,
  setLastSelectedCards,
  lastSelectedCards,
  setSelectedTabIndex,
}) {
  let Slots = [...Array(10).keys()];

  const findFirstNextFreeSlot = () =>
    Slots.find(
      (slotPosition) =>
        lastSelectedCards[slotPosition].card.iD === IDENTIFIER_FOR_EMPTY_SLOT
    );
  const [
    prevSelectedSlot,
    currentSelectedSlot,
    setCurrentSelectedSlot,
  ] = useTraceableState(findFirstNextFreeSlot);

  let isCardAlreadyOnSelectedSlot = lastSelectedCards[currentSelectedSlot]
    ? lastSelectedCards[currentSelectedSlot].card.iD === selectedCardId
    : selectedCardId === IDENTIFIER_FOR_EMPTY_SLOT;
  const [prevSelectedEventId, setPrevSelectedCardEvent] = useState(0);

  useEffect(() => {
    if (
      cardSelectedEventId !== 0 &&
      prevSelectedEventId !== cardSelectedEventId &&
      !isCardAlreadyOnSelectedSlot &&
      lastSelectedCards[prevSelectedSlot]?.eventId ===
        lastSelectedCards[currentSelectedSlot]?.eventId
    ) {
      if (action === "reduced") {
        return;
      }

      const cardToAddData = allCardsData.find(
        (cardsData) => cardsData && cardsData.iD === selectedCardId
      );
      const newLastSelectedCards = [...lastSelectedCards];

      const isCardNotInDeckYet =
        typeof lastSelectedCards.find(
          ({ card: { iD } }) => selectedCardId === iD
        ) === "undefined";
      if (isCardNotInDeckYet) {
        // add card
        newLastSelectedCards[currentSelectedSlot] = {
          eventId: cardSelectedEventId,
          card: cardToAddData,
          count: 1,
        };

        setLastSelectedCards(newLastSelectedCards);
        const nextFreeSlot = newLastSelectedCards.findIndex(
          ({ card: { iD } }) => iD === IDENTIFIER_FOR_EMPTY_SLOT
        );
        setCurrentSelectedSlot(nextFreeSlot);
        setPrevSelectedCardEvent(cardSelectedEventId);
        toast("Card added to Deck");
      } else {
        const consideredOngoingCount = 1;

        const LIMIT_OF_WILDCARDS_ALL_OVER = 3;

        const numberOfWildcards = lastSelectedCards
          .map(({ count }) => count)
          .reduce((total, current) => {
            const STARTING_TO_BE_WILDCARD_COUNT_CONSIDERED = 1;
            return current > STARTING_TO_BE_WILDCARD_COUNT_CONSIDERED
              ? total + current
              : total;
          }, consideredOngoingCount);

        const isAllowedToAddAnotherWildcard =
          numberOfWildcards <= LIMIT_OF_WILDCARDS_ALL_OVER;

        if (isAllowedToAddAnotherWildcard) {
          const positionOfExistingOccurence = lastSelectedCards.findIndex(
            ({ card: { iD } }) => selectedCardId === iD
          );
          newLastSelectedCards[positionOfExistingOccurence] = {
            eventId: cardSelectedEventId,
            card: newLastSelectedCards[positionOfExistingOccurence].card,
            count: newLastSelectedCards[positionOfExistingOccurence].count + 1,
          };
          setLastSelectedCards(newLastSelectedCards);
          setPrevSelectedCardEvent(cardSelectedEventId);
          toast("Card added to Deck");
        } else {
          toast("Wildcard limit reached.");
        }
      }
    }
  }, [
    cardSelectedEventId,
    prevSelectedEventId,
    isCardAlreadyOnSelectedSlot,
    lastSelectedCards,
    prevSelectedSlot,
    currentSelectedSlot,
    setLastSelectedCards,
    setCurrentSelectedSlot,
    selectedCardId,
  ]);

  const handleRemoveCard = (slotPos) =>
    setLastSelectedCards((prevSelectedCards) => {
      const selectedCardsWithRemovedCard = [...prevSelectedCards];

      const hasAnyWildcard = prevSelectedCards[slotPos].count > 1;

      if (hasAnyWildcard) {
        selectedCardsWithRemovedCard[slotPos] = {
          eventId: Math.random(),
          card: prevSelectedCards[slotPos].card,
          count: prevSelectedCards[slotPos].count - 1,
        };

        setSelectedCardEvent({
          eventId: Math.random(),
          card: prevSelectedCards[slotPos].card,
          action: "reduced",
        });
      } else {
        selectedCardsWithRemovedCard[slotPos] = {
          eventId: Math.random(),
          card: {
            iD: IDENTIFIER_FOR_EMPTY_SLOT,
          },
        };
        setSelectedCardEvent({
          eventId: Math.random(),
          card: { iD: IDENTIFIER_FOR_EMPTY_SLOT },
        });
        const nextFreeSlot = selectedCardsWithRemovedCard.findIndex(
          ({ card: { iD } }) => iD === IDENTIFIER_FOR_EMPTY_SLOT
        );
        setCurrentSelectedSlot(nextFreeSlot);
      }
      return selectedCardsWithRemovedCard;
    });

  return (
    <div>
      <CardDeckStyle>
        <MasterDeckSlot
          selectedHero={selectedHero}
          setSelectedHero={setSelectedHero}
          setSelectedTabIndex={setSelectedTabIndex}
        />
        {Slots.map((slotPos) => (
          <CardDeckSlot
            key={slotPos}
            number={slotPos}
            isSelectedSlot={currentSelectedSlot === slotPos}
            lastSelectedCard={lastSelectedCards[slotPos]}
            cardActionWrapper={(card) => (
              <CardActionAddCardToDeck
                onClick={() => {
                  handleRemoveCard(slotPos);
                }}
                card={card}
                isDeckCard
              />
            )}
            setSelectedTabIndex={setSelectedTabIndex}
          />
        ))}
      </CardDeckStyle>
    </div>
  );
}
