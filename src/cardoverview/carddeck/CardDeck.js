import React, {useEffect, useState} from "react";
import {CardDeckSlot} from "./CardDeckSlot";
import styled from "styled-components";
import {FacebookIcon, FacebookShareButton} from 'react-share';
import {CopyToClipboard} from "react-copy-to-clipboard";
import {faLink} from "@fortawesome/free-solid-svg-icons/faLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as qs from "qs";

const CardDeckStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export function CardDeck({allCardsData}) {
    const [lastSelectedCards, setLastSelectedCards] = useState([]);

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

    const handleLastSelectedCard = (lastCard, number) => {
        const newLastSelectedCards = [...lastSelectedCards];
        newLastSelectedCards[number] = lastCard;
        setLastSelectedCards(newLastSelectedCards);
    };

    const lastSelectedCardPageIds = lastSelectedCards.filter(Boolean).map(({pageId}) => pageId);
    const pageIdsToParam = lastSelectedCardPageIds.join("&pageId=");
    let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}${window.location.pathname}?pageId=${pageIdsToParam}`;


    return <div>


        <h3>Your Deck</h3>
        <CardDeckStyle>
            {
                [...Array(11).keys()].map((number) => <CardDeckSlot key={number} number={number}
                                                                    lastSelectedCard={lastSelectedCards[number]}
                                                                    setLastSelectedCard={handleLastSelectedCard}/>)
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