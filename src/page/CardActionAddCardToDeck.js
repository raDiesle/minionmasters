import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import {RARITY_KEYS} from "../rarity/rarityMapping";

export default function CardActionAddCardToDeck({card, isDeckCard, onClick}) {

    const IconStyleSize = styled.div`
        @media (max-width: 767px) {
            font-size: 0.6rem;
        } 
    `;

    const OverlayActionBackground = styled(IconStyleSize)`
    background-color: rgba(0,0,0, 0.5);
    border: 1px dotted rgba(0,0,0, 0.5);
    color: #fff;
`;

    const AddCardToDeckIconStyle = styled(OverlayActionBackground)`
  padding-right: 2px;
`;

    const AddCardToDeckOverlay = styled.div`
    position: absolute;
    top: 30%;
    left: 0px;
    padding: 15% 15% 15% 0;    
    &:hover{
      cursor: pointer;
    }
`;

    return <div>
        {card.rarity !== RARITY_KEYS.Perk &&
        <AddCardToDeckOverlay onClick={onClick}>
            <AddCardToDeckIconStyle>
                <FontAwesomeIcon icon={isDeckCard ? faMinusCircle : faPlusCircle} size={"sm"}/>
            </AddCardToDeckIconStyle>
        </AddCardToDeckOverlay>
        }
    </div>;

}