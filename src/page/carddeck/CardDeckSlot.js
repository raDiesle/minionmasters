import React from "react";
import styled from "styled-components";
import {Card} from "../Card";
import EmptyCardSlotSelected from "../../EmptyCardSlotSelected";


const CardDeckSlotStyle = styled.div`
    width: 80px;
    height: 95px;
    
    @media (max-width: 767px) {
      height: 59px;
      width: 50px;
    }
    
    // margin-bottom: 5px;
     margin-top: 0;
     margin-bottom: 6px;
     margin-right: 2px;
`;


const EmptyCardSlotUnselectedStyle = styled.div`
    width: 100%;
    height: calc(100% + 2px);
    margin-top: 1px;
    border: 1px solid #000000;
`;

export function CardDeckSlot({number, lastSelectedCard, isSelectedSlot, handleOnClick, setSelectedTabIndex}) {


    let CARDS_TAB_INDEX = 0;
    return (
        <CardDeckSlotStyle isSelectedSlot={isSelectedSlot}>
            {lastSelectedCard.card.pageId !== 0 ?
                <Card card={lastSelectedCard.card} onClick={() => handleOnClick(number)} isDeckCard showDeck/> :
                (isSelectedSlot ?
                    <EmptyCardSlotSelected href="#cardsview" onClick={() => setSelectedTabIndex(CARDS_TAB_INDEX)}>
                        Select Card
                    </EmptyCardSlotSelected> :
                    <EmptyCardSlotUnselectedStyle>&nbsp;</EmptyCardSlotUnselectedStyle>)
            }
        </CardDeckSlotStyle>
    );

}