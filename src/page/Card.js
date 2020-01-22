import React, {useState} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {RARITY_KEYS, rarityMapping} from "../rarity/rarityMapping";
import {typeMapping} from "../cardtype/typeMapping";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import CardDetailsModal from "./CardDetailsModal";

import {factionMapping} from "../faction/Factions";
import {targetsMapping} from "../attack/targetsMapping";


const IconStyleSize = styled.div`
    @media (max-width: 767px) {
        font-size: 0.6rem;
    } 
`;

const CardContainerStyle = styled.div`
    width: 80px;
    margin-right: 1px;
    margin-top: 2px;
    
    @media (max-width: 767px) {
      width: 50px;     
    }
    
    &:hover {
    border-color: black;
    border-width: 1px;
     opacity: ${({focused}) => focused ? 0.4 : 1.0};
     border-style: ${({focused}) => focused ? "dotted" : "solid"};
    }         
`;

const CardContentStyle = styled.div`
    position: relative;
    &:hover {
    
    }
`;

const CardImageStyle = styled.img`
    width: 100%;   
`;

const ManacostStyle = styled(IconStyleSize)`
    position: absolute;
    top: -3px;
    right: 2px;
    font-weight: bold;   
    font-size: 0.8rem;
`;
const RightCornerStyle = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;   
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-top: 30px solid ${({rarity}) => rarityMapping[rarity]};
    
    @media (max-width: 767px) {
        border-left-width: 17px;
        border-top-width: 17px;
      }        
`;

const GroundAirStyle = styled(IconStyleSize)`
    position: absolute;
    top: 0;
    left: 0;
    padding: 1px;
            
     & > svg {
        vertical-align: text-top;
        fill: #FFFFFF;     
        color: #FFFFFF;
    }
`;

const TopLeftCornerStyle = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;   
    width: 0;
    height: 0;
    border-right: 30px solid transparent;
    border-top: 30px solid rgba(0,0,0, 0.5);
    
    @media (max-width: 767px) {
        border-right-width: 17px;
        border-top-width: 17px;
      }
`;


const BottomLeftCornerStyle = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;   
    width: 0;
    height: 0;
    border-right: 30px solid transparent;
    border-bottom: 30px solid rgba(0,0,0, 0.5);
    
      @media (max-width: 767px) {
        border-right-width: 17px;
        border-bottom-width: 17px;
      }
`;

const OverlayActionBackground = styled(IconStyleSize)`
    background-color: rgba(0,0,0, 0.5);
    border: 1px dotted rgba(0,0,0, 0.5);
    color: #fff;
`;

const FactionStyle = styled(IconStyleSize)`
    position: absolute;
    left: 0;
    bottom: 0;     
    padding: 1px;
    
    & > svg {
        vertical-align: bottom;
        fill: #FFFFFF;     
        color: #FFFFFF;
    }
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

const AttackTypeStyle = styled(IconStyleSize)`
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 1px;
    
    & > svg {
        vertical-align: bottom;
        fill: #FFFFFF;     
        color: #FFFFFF;
    }
`;
const BottomRightCornerStyle = styled.div`
    position: absolute;
    bottom: 0px;
    right: 0px;   
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-bottom: 30px solid rgba(0,0,0, 0.5);
    
    @media (max-width: 767px) {
        border-left-width: 17px;
        border-bottom-width: 17px;
      }
`;

//onClick to be removed and setter go here
export function Card({card: {pageId, image, manacost, description, name, rarity, type, faction, targets}, card, onClick, isDeckCard = false, zoom, showDeck}) {
    const [isOpenDetails, setIsOpenDetails] = useState(false);

    return <>
        {isOpenDetails ? <CardDetailsModal isOpenDetails={isOpenDetails}
                                           setIsOpenDetails={setIsOpenDetails}
                                           card={card}
                                           key={card.pageId}
        /> : null}

        <CardContainerStyle
        >
            <CardContentStyle>
                <CardImageStyle src={`generated/img/${image}`} alt={image}/>
                <RightCornerStyle rarity={rarity}/>
                <ManacostStyle>{manacost}</ManacostStyle>

                <TopLeftCornerStyle/>
                <GroundAirStyle><FontAwesomeIcon icon={typeMapping[type]} size={"xs"}/></GroundAirStyle>

                <BottomLeftCornerStyle/>
                <FactionStyle>{factionMapping[faction]}</FactionStyle>

                {targetsMapping[targets] && <>
                    <BottomRightCornerStyle/> <AttackTypeStyle>{targetsMapping[targets]}</AttackTypeStyle>
                </>}


                {rarity !== RARITY_KEYS.Perk &&
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
            </CardContentStyle>


        </CardContainerStyle>
    </>
        ;
}