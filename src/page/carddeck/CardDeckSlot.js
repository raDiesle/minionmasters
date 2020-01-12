import React from "react";
import styled from "styled-components";
import {Card} from "../Card";


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

const EmptyCardSlotSelectedStyle = styled.a`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 25% 15%;
    margin-top: 2px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    
  @media (max-width: 767px) {
      font-size: 9px;
   }

          background: 
            linear-gradient(90deg, #000 50%, transparent 50%),
            linear-gradient(0deg, #000 50%, transparent 50%),
            linear-gradient(90deg, #000 50%, transparent 50%),
            linear-gradient(0deg, #000 50%, transparent 50%);
          background-repeat: repeat-x, repeat-y, repeat-x, repeat-y;
          background-size: 15px 2px, 2px 15px, 15px 2px, 2px 15px;
          background-position: left top, right top, left bottom, left top;
          animation: border-dance 4s infinite linear;
        }
        
        @keyframes border-dance 
        {
          0%
          {
            background-position: left top, right top, right bottom, left bottom;
          }
          100% 
          {
            background-position: right top, right bottom, left bottom, left top;
          }
`;

export function CardDeckSlot({number, lastSelectedCard, isSelectedSlot, handleOnClick, setSelectedTabIndex}) {


    let CARDS_TAB_INDEX = 0;
    return (
        <CardDeckSlotStyle isSelectedSlot={isSelectedSlot}>
            {lastSelectedCard.card.pageId !== 0 ?
                <Card card={lastSelectedCard.card} onClick={() => handleOnClick(number)} isDeckCard showDeck/> :
                (isSelectedSlot ?
                    <EmptyCardSlotSelectedStyle href="#cardsview" onClick={() => setSelectedTabIndex(CARDS_TAB_INDEX)}>
                        Select Card
                    </EmptyCardSlotSelectedStyle> :
                    <EmptyCardSlotUnselectedStyle>&nbsp;</EmptyCardSlotUnselectedStyle>)
            }
        </CardDeckSlotStyle>
    );

}