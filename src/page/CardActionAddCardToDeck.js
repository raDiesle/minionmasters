import {RARITY_KEYS} from "../rarity/rarityMapping";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import React, {useState} from "react";
import styled from "styled-components";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import CardDetailsModal from "./CardDetailsModal";

export default function CardActionAddCardToDeck({card, isDeckCard, onClick}) {

    const [isOpenDetails, setIsOpenDetails] = useState(false);


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

    const InfoDetailsOverlay = styled.div`
    position: absolute;
    top: 30%;
    right: 0px;
    padding: 15% 0 15% 15%;
   
    &:hover{
      cursor: pointer;
    }
`;


    const InfoIconStyle = styled(OverlayActionBackground)`
  padding-left: 2px;
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
        {isOpenDetails ? <CardDetailsModal isOpenDetails={isOpenDetails}
                                           setIsOpenDetails={setIsOpenDetails}
                                           card={card}
                                           key={card.pageId}/>
            : null
        }


        {card.rarity !== RARITY_KEYS.Perk &&
        <AddCardToDeckOverlay onClick={onClick}>
            <AddCardToDeckIconStyle>
                <FontAwesomeIcon icon={isDeckCard ? faMinusCircle : faPlusCircle} size={"sm"}/>
            </AddCardToDeckIconStyle>
        </AddCardToDeckOverlay>
        }
        <InfoDetailsOverlay onClick={(event) => {
            setIsOpenDetails(true);
            event.stopPropagation();
        }}>
            <InfoIconStyle>
                <FontAwesomeIcon icon={faInfoCircle} size={"sm"}/>
            </InfoIconStyle>
        </InfoDetailsOverlay>
    </div>;

}