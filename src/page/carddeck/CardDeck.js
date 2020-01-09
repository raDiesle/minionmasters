import React, {useEffect, useRef, useState} from "react";
import {CardDeckSlot} from "./CardDeckSlot";
import styled from "styled-components";
import allCardsData from "../../generated/jobCardProps";
import MasterDeckSlot from "./MasterDeckSlot";

const CardDeckStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    
    @media (max-width: 767px) {
      justify-content: center;
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
                             selectedCardEvent: {eventId: cardSelectedEventId, card: {pageId: selectedCardId}},
                             setSelectedCardEvent,
                             selectedHero,
                             setSelectedHero,
                             setLastSelectedCards,
                             lastSelectedCards
                         }
) {

    let Slots = [...Array(10).keys()];

    const findFirstNextFreeSlot = () => Slots.find(slotPosition => lastSelectedCards[slotPosition].card.pageId === 0);
    const [prevSelectedSlot, currentSelectedSlot, setCurrentSelectedSlot] = useTraceableState(findFirstNextFreeSlot);

    let isCardAlreadyOnSelectedSlot = lastSelectedCards[currentSelectedSlot] ? lastSelectedCards[currentSelectedSlot].card.pageId === selectedCardId : selectedCardId === 0;
    const [prevSelectedEventId, setPrevSelectedCardEvent] = useState(0);

    useEffect(() => {
        if (cardSelectedEventId !== 0 && prevSelectedEventId !== cardSelectedEventId && !isCardAlreadyOnSelectedSlot && lastSelectedCards[prevSelectedSlot]?.eventId === lastSelectedCards[currentSelectedSlot]?.eventId) {
            const cardToAddData = allCardsData.find((cardsData) => cardsData && cardsData.pageId === selectedCardId);
            const newLastSelectedCards = [...lastSelectedCards];
            newLastSelectedCards[currentSelectedSlot] = {
                eventId: cardSelectedEventId,
                card: cardToAddData
            };
            setLastSelectedCards(newLastSelectedCards);
            const nextFreeSlot = newLastSelectedCards.findIndex(({card: {pageId}}) => pageId === 0);
            setCurrentSelectedSlot(nextFreeSlot);
            setPrevSelectedCardEvent(cardSelectedEventId);
        }
    }, [cardSelectedEventId, prevSelectedEventId, isCardAlreadyOnSelectedSlot, lastSelectedCards, prevSelectedSlot, currentSelectedSlot, setLastSelectedCards, setCurrentSelectedSlot, selectedCardId]);


    const handleRemoveCard = (slotPos) => setLastSelectedCards((prevSelectedCards) => {
        const selectedCardsWithRemovedCard = [...prevSelectedCards];
        selectedCardsWithRemovedCard[slotPos] = {
            eventId: Math.random(),
            card: {
                pageId: 0
            }
        };
        setSelectedCardEvent({
                eventId: Math.random(),
                card: {pageId: 0}
            }
        );
        const nextFreeSlot = selectedCardsWithRemovedCard.findIndex(({card: {pageId}}) => pageId === 0);
        setCurrentSelectedSlot(nextFreeSlot);
        return selectedCardsWithRemovedCard;
    });
    return <div>
        <CardDeckStyle>
            <MasterDeckSlot selectedHero={selectedHero}
                            setSelectedHero={setSelectedHero}
            />
            {
                Slots.map((slotPos) =>
                    <CardDeckSlot key={slotPos}
                                  number={slotPos}
                                  isSelectedSlot={currentSelectedSlot === slotPos}
                                  lastSelectedCard={lastSelectedCards[slotPos]}
                                  handleOnClick={handleRemoveCard}
                    />)
            }

        </CardDeckStyle>


    </div>
}