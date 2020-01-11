import React from "react";
import styled from "styled-components";
import {Card} from "../Card";


const CardDeckSlotStyle = styled.div`
    width: 100px;
    height: 128px;
    
    @media (max-width: 767px) {
      height: 71px;
      width: 60px;
    }
    
     margin-right: 2px;
`;


const EmptyCardSlotUnselectedStyle = styled.div`
    width: 100%;
    height: 100%;
    
    border: 1px solid #000000;
`;

const EmptyCardSlotSelectedStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 25% 15%;
    text-align: center;
    
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

export function CardDeckSlot({number, lastSelectedCard, isSelectedSlot, handleOnClick}) {


    return (
        <CardDeckSlotStyle isSelectedSlot={isSelectedSlot}>
            {lastSelectedCard.card.pageId !== 0 ?
                <Card card={lastSelectedCard.card} onClick={() => handleOnClick(number)} isDeckCard showDeck/> :
                (isSelectedSlot ? <EmptyCardSlotSelectedStyle>
                        Select Card
                    </EmptyCardSlotSelectedStyle> :
                    <EmptyCardSlotUnselectedStyle>&nbsp;</EmptyCardSlotUnselectedStyle>)
            }
        </CardDeckSlotStyle>
    );

}