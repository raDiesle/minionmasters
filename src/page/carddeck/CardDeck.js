import React, {useEffect, useRef, useState} from "react";
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

const usePreviousValue = value => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};
const useTraceableState = initialValue => {
    const [value, setValue] = useState(initialValue);
    const prevValue = usePreviousValue(value);
    return [prevValue, value, setValue];
};

// refactor to only pass selectedCardId
export function CardDeck({
                             selectedCardEvent: {eventId: cardSelectedEventId, card: {iD: selectedCardId}},
                             setSelectedCardEvent,
                             selectedHero,
                             setSelectedHero,
                             setLastSelectedCards,
                             lastSelectedCards,
                             setSelectedTabIndex
                         }
) {

    let Slots = [...Array(10).keys()];

    const findFirstNextFreeSlot = () => Slots.find(slotPosition => lastSelectedCards[slotPosition].card.iD === IDENTIFIER_FOR_EMPTY_SLOT);
    const [prevSelectedSlot, currentSelectedSlot, setCurrentSelectedSlot] = useTraceableState(findFirstNextFreeSlot);

    let isCardAlreadyOnSelectedSlot = lastSelectedCards[currentSelectedSlot] ? lastSelectedCards[currentSelectedSlot].card.iD === selectedCardId : selectedCardId === IDENTIFIER_FOR_EMPTY_SLOT;
    const [prevSelectedEventId, setPrevSelectedCardEvent] = useState(0);

    useEffect(() => {
        if (cardSelectedEventId !== 0 && prevSelectedEventId !== cardSelectedEventId && !isCardAlreadyOnSelectedSlot && lastSelectedCards[prevSelectedSlot]?.eventId === lastSelectedCards[currentSelectedSlot]?.eventId) {
            const cardToAddData = allCardsData.find((cardsData) => cardsData && cardsData.iD === selectedCardId);
            const newLastSelectedCards = [...lastSelectedCards];
            newLastSelectedCards[currentSelectedSlot] = {
                eventId: cardSelectedEventId,
                card: cardToAddData
            };
            setLastSelectedCards(newLastSelectedCards);

            const nextFreeSlot = newLastSelectedCards.findIndex(({card: {iD}}) => iD === IDENTIFIER_FOR_EMPTY_SLOT);
            setCurrentSelectedSlot(nextFreeSlot);
            setPrevSelectedCardEvent(cardSelectedEventId);
        }
    }, [cardSelectedEventId, prevSelectedEventId, isCardAlreadyOnSelectedSlot, lastSelectedCards, prevSelectedSlot, currentSelectedSlot, setLastSelectedCards, setCurrentSelectedSlot, selectedCardId]);


    const handleRemoveCard = (slotPos) => setLastSelectedCards((prevSelectedCards) => {
        const selectedCardsWithRemovedCard = [...prevSelectedCards];
        selectedCardsWithRemovedCard[slotPos] = {
            eventId: Math.random(),
            card: {
                iD: IDENTIFIER_FOR_EMPTY_SLOT
            }
        };
        setSelectedCardEvent({
                eventId: Math.random(),
            card: {iD: IDENTIFIER_FOR_EMPTY_SLOT}
            }
        );
        const nextFreeSlot = selectedCardsWithRemovedCard.findIndex(({card: {iD}}) => iD === IDENTIFIER_FOR_EMPTY_SLOT);
        setCurrentSelectedSlot(nextFreeSlot);
        return selectedCardsWithRemovedCard;
    });
    return <div>
        <CardDeckStyle>
            <MasterDeckSlot selectedHero={selectedHero}
                            setSelectedHero={setSelectedHero}
                            setSelectedTabIndex={setSelectedTabIndex}
            />
            {
                Slots.map((slotPos) =>
                    <CardDeckSlot key={slotPos}
                                  number={slotPos}
                                  isSelectedSlot={currentSelectedSlot === slotPos}
                                  lastSelectedCard={lastSelectedCards[slotPos]}
                                  cardActionWrapper={(card) =>
                                      <CardActionAddCardToDeck
                                          onClick={() => {
                                              handleRemoveCard(slotPos);
                                          }}
                                          card={card}
                                          isDeckCard
                                      />
                                  }
                                  setSelectedTabIndex={setSelectedTabIndex}
                    />)
            }

        </CardDeckStyle>


    </div>
}