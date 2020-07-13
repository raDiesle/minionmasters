import {IDENTIFIER_FOR_EMPTY_SLOT} from "page/carddeck/DeckContainer";
import React from "react";
import styled from "styled-components";
import CardDeckSlotStyle from "../../CardDeckSlotStyle";
import EmptyCardSlotSelected from "../../EmptyCardSlotSelected";
import {Card} from "../Card";


const EmptyCardSlotUnselectedStyle = styled.div`
    width: 100%;
    height: calc(100% + 2px);
    margin-top: 1px;
    border: 1px solid #fff;
`;

export function CardDeckSlot({number, lastSelectedCard, isSelectedSlot, cardActionWrapper, setSelectedTabIndex}) {

    let CARDS_TAB_INDEX = 0;
    return (
        <CardDeckSlotStyle isSelectedSlot={isSelectedSlot}>
            {lastSelectedCard.card.iD !== IDENTIFIER_FOR_EMPTY_SLOT ?
                <Card card={lastSelectedCard.card} isDeckCard showDeck>
                    {cardActionWrapper(lastSelectedCard.card)}
                </Card> :
                (isSelectedSlot ?
                    <EmptyCardSlotSelected href="#cardsview" onClick={() => setSelectedTabIndex(CARDS_TAB_INDEX)}>
                        Select Card
                    </EmptyCardSlotSelected> :
                    <EmptyCardSlotUnselectedStyle>&nbsp;</EmptyCardSlotUnselectedStyle>)
            }
        </CardDeckSlotStyle>
    );

}