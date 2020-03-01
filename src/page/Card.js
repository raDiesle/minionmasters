import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {rarityMapping} from "../rarity/rarityMapping";
import {typeMapping} from "../cardtype/typeMapping";

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
export function Card({children, card: {image, manacost, rarity, type, faction, targets}}) {
    return <div>
        <CardContainerStyle>
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

                {children}
            </CardContentStyle>
        </CardContainerStyle>
    </div>
        ;
}