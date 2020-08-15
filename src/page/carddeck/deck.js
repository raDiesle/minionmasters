import mToast from "components/mToast";
import BuildCardDeckActionOverlay from "page/carddeck/build-card-deck-action-overlay";
import { CardDeckSlot } from "page/carddeck/card-deck-slot";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/carddeck/deck-manager";
import { MasterAndCardsContainerStyle } from "page/carddeck/master-and-cards-container-style";
import MasterDeckSlot from "page/carddeck/master-deck-slot";
import React, { useEffect, useRef, useState } from "react";
import allCardsData from "../../generated/jobCardProps";

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
export function Deck({
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
      (slotPosition) => lastSelectedCards[slotPosition].card.iD === IDENTIFIER_FOR_EMPTY_SLOT
    );
  const [prevSelectedSlot, currentSelectedSlot, setCurrentSelectedSlot] = useTraceableState(
    findFirstNextFreeSlot
  );

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
        typeof lastSelectedCards.find(({ card: { iD } }) => selectedCardId === iD) === "undefined";
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
        mToast("Card added to Deck");
      } else {
        const consideredOngoingCount = 1;

        const LIMIT_OF_WILDCARDS_ALL_OVER = 3;

        const numberOfWildcards = lastSelectedCards
          .map(({ count }) => count)
          .reduce((total, current) => {
            const STARTING_TO_BE_WILDCARD_COUNT_CONSIDERED = 1;
            return current > STARTING_TO_BE_WILDCARD_COUNT_CONSIDERED ? total + current : total;
          }, consideredOngoingCount);

        const isAllowedToAddAnotherWildcard = numberOfWildcards <= LIMIT_OF_WILDCARDS_ALL_OVER;

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
          mToast("Card added to Deck");
        } else {
          mToast("Wildcard limit reached.");
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

  return (
    <div>
      <MasterAndCardsContainerStyle>
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
              <BuildCardDeckActionOverlay
                setLastSelectedCards={setLastSelectedCards}
                setSelectedCardEvent={setSelectedCardEvent}
                setCurrentSelectedSlot={setCurrentSelectedSlot}
                slotPos={slotPos}
                card={card}
              />
            )}
            setSelectedTabIndex={setSelectedTabIndex}
          />
        ))}
      </MasterAndCardsContainerStyle>
    </div>
  );
}
