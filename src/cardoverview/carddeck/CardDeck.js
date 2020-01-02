import React, {useEffect, useRef, useState} from "react";
import {CardDeckSlot} from "./CardDeckSlot";
import styled from "styled-components";
import {FacebookIcon, FacebookShareButton} from 'react-share';
import {CopyToClipboard} from "react-copy-to-clipboard";
import {faLink} from "@fortawesome/free-solid-svg-icons/faLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {CardDeckPrefillFromUrl} from "./CardDeckPrefillFromUrl";
import {toast} from 'react-toastify';

const CardDeckStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
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
                             allCardsData,
                             prevSelectedCardEvent: {eventId: prevSelectedEventId} = {eventId: 0},
                             selectedCardEvent: {eventId: cardSelectedEventId, card: {pageId: selectedCardId}},
                             setSelectedCardEvent
                         }
) {
    let Slots = [...Array(11).keys()];
    const [lastSelectedCards, setLastSelectedCards] = useState(Slots.map(slot => {
        return {
            eventId: 0,
            card: {
                pageId: 0
            }
        }
    }));

    const lastSelectedCardPageIds = lastSelectedCards.filter(Boolean).map(({card: {pageId}}) => pageId);
    const pageIdsToParam = lastSelectedCardPageIds.join("&pageId=");
    let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}${window.location.pathname}?pageId=${pageIdsToParam}`;

    const findFirstNextFreeSlot = () => Slots.find(slotPosition => lastSelectedCards[slotPosition].card.pageId === 0);

    const [prevSelectedSlot, currentSelectedSlot, setCurrentSelectedSlot] = useTraceableState(findFirstNextFreeSlot);

    let isCardAlreadyOnSelectedSlot = lastSelectedCards[currentSelectedSlot] ? lastSelectedCards[currentSelectedSlot].card.pageId === selectedCardId : selectedCardId === 0;

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
    }

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
        <h3>Your Deck</h3>
        <CardDeckPrefillFromUrl allCardsData={allCardsData}
                                setLastSelectedCards={setLastSelectedCards}
                                setCurrentSelectedSlot={setCurrentSelectedSlot}
        />
        <CardDeckStyle>
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


        <b>Share configured deck</b>
        <div style={{display: "flex"}}>
            <FacebookShareButton
                url={url}
                className="Demo__some-network__share-button">
                <FacebookIcon
                    size={32}
                    round/>
            </FacebookShareButton>

            <CopyToClipboard
                text={url}
                onCopy={() => {
                    toast("Link copied to clipboard");
                }}
                title="Copy link"
            >
                <button>
                    <FontAwesomeIcon icon={faLink}/>
                </button>
            </CopyToClipboard>
        </div>

    </div>;
}