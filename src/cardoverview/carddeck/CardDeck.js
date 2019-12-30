import React, {useEffect, useRef, useState} from "react";
import {CardDeckSlot} from "./CardDeckSlot";
import styled from "styled-components";
import {FacebookIcon, FacebookShareButton} from 'react-share';
import {CopyToClipboard} from "react-copy-to-clipboard";
import {faLink} from "@fortawesome/free-solid-svg-icons/faLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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

export function CardDeck({allCardsData, selectedCard: {pageId: selectedCardId}}) {
    let Slots = [...Array(11).keys()];
    const [lastSelectedCards, setLastSelectedCards] = useState(Slots.map(slot => {
        return {pageId: 0}
    }));

    const lastSelectedCardPageIds = lastSelectedCards.filter(Boolean).map(({pageId}) => pageId);
    const pageIdsToParam = lastSelectedCardPageIds.join("&pageId=");
    let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}${window.location.pathname}?pageId=${pageIdsToParam}`;

    const findFirstNextFreeSlot = () => Slots.find(slotPosition => lastSelectedCards[slotPosition].pageId === 0);

    const [prevSelectedSlot, currentSelectedSlot, setCurrentSelectedSlot] = useTraceableState(findFirstNextFreeSlot);

    let isCardAlreadyOnSelectedSlot = lastSelectedCards[currentSelectedSlot] ? lastSelectedCards[currentSelectedSlot].pageId === selectedCardId : selectedCardId === 0;

    if (!isCardAlreadyOnSelectedSlot && lastSelectedCards[prevSelectedSlot]?.pageId === lastSelectedCards[currentSelectedSlot]?.pageId) {
        const nextFirstFreeSlot = findFirstNextFreeSlot() + 1;
        const cardToAddData = allCardsData.find((cardsData) => cardsData && cardsData.pageId === selectedCardId);
        const newLastSelectedCards = [...lastSelectedCards];
        newLastSelectedCards[currentSelectedSlot] = cardToAddData;
        setLastSelectedCards(newLastSelectedCards);
        setCurrentSelectedSlot(nextFirstFreeSlot);
    }

    /*
    useEffect(() => {
        if (!allCardsData) {
            return;
        }
        let selectedPageIdsFromUrl = qs.parse(window.location.search, {ignoreQueryPrefix: true}).pageId;
        if (selectedPageIdsFromUrl && !Array.isArray(selectedPageIdsFromUrl)) {
            selectedPageIdsFromUrl = [selectedPageIdsFromUrl];
        }
        const selectedPageIdsNormalized = selectedPageIdsFromUrl ? selectedPageIdsFromUrl.map(pageId => parseInt(pageId)) : [];
        const prefillSelectedCardsWithData = allCardsData.filter(({pageId}) => selectedPageIdsNormalized.includes(pageId));

        setLastSelectedCards(prefillSelectedCardsWithData);
    }, [allCardsData]);
*/

    return <div>
        <h3>Your Deck</h3>
        <CardDeckStyle>
            {
                Slots.map((slotPos) =>
                    <CardDeckSlot key={slotPos} number={slotPos} isSelectedSlot={findFirstNextFreeSlot() === slotPos}
                                  lastSelectedCard={lastSelectedCards[slotPos]}/>)
            }
        </CardDeckStyle>

        <div style={{display: "flex"}}>
            <FacebookShareButton
                url={""}
                className="Demo__some-network__share-button">
                <FacebookIcon
                    size={32}
                    round/>
            </FacebookShareButton>

            <CopyToClipboard
                text={url}
                onCopy={() => {
                    // Stuff to run once the user has copied...
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