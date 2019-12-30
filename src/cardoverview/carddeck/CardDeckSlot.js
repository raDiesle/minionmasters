import React from "react";
import styled from "styled-components";
import {Card} from "../Card";

const CardDeckSlotStyle = styled.div`
  border-width: 1px;
    border-color: #a0a0a0;
    border-style: ${({isSelectedSlot}) => isSelectedSlot ? "dotted" : "solid"};
`;

const CardContainerStyle = styled.div`
    width: 100px;
    height: 119px;
    margin-right: 1px;
    margin-top: 2px;    
`;

export function CardDeckSlot({number, lastSelectedCard, isSelectedSlot}) {
    return (
        <CardDeckSlotStyle isSelectedSlot={isSelectedSlot}>
            {lastSelectedCard ? <Card card={lastSelectedCard}/> :
                <CardContainerStyle>{isSelectedSlot ? "Select a card" : ""}</CardContainerStyle>}
        </CardDeckSlotStyle>
    );

}