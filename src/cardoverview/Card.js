import React, {useState} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import VoidborneIcon from "../faction/VoidborneIcon";
import ScratIcon from "../faction/ScratIcon";
import {faGavel} from "@fortawesome/free-solid-svg-icons/faGavel";
import {faYinYang} from "@fortawesome/free-solid-svg-icons/faYinYang";
import OutlanderIcon from "../faction/OutladerIcon";
import SlitherIcon from "../faction/SlitherIcon";
import EmpyrianIcon from "../faction/EmpyrianIcon";
import {faHatWizard} from "@fortawesome/free-solid-svg-icons/faHatWizard";
import CrystalElfIcon from "../faction/CrystalElfIcon";
import AccursedIcon from "../faction/AccursedIcon";
import {rarityMapping} from "../rarity/rarityMapping";
import {AttackTypeOverlay} from "./AttackTypeOverlay";
import {typeMapping} from "../cardtype/typeMapping";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import CardDetailsModal from "./CardDetailsModal";


const CardContainerStyle = styled.div`
    width: ${({zoom}) => zoom * 20}px;
    margin-right: 1px;
    margin-top: 2px;
    border-color: black;
    border-width: 1px;
    opacity: ${({focused}) => focused ? 0.4 : 1.0};
    border-style: ${({focused}) => focused ? "dotted" : "solid"};
`;

const CardContentStyle = styled.div`
    position: relative;
    &:hover {
    }
`;

const CardImageStyle = styled.img`
    width: 100%;   
`;

const ManacostStyle = styled.samp`
    position: absolute;
    top: -4px;
    right: 1px;
    font-weight: bold;   
`;
const RightCornerStyle = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;   
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-top: 30px solid ${({rarity}) => rarityMapping[rarity]};
`;

const GroundAirStyle = styled.div`
    position: absolute;
    top: -5px;
    left: 1px;   
     & > svg {
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
`;

const factionMapping = {
    Voidborne: <VoidborneIcon/>,
    Accursed: <AccursedIcon/>,
    Scrat: <ScratIcon/>,
    "Crystal Elf": <CrystalElfIcon/>,
    "Puff": <FontAwesomeIcon icon={faHatWizard} size={"xs"}/>,
    "Zen-Chi": <FontAwesomeIcon icon={faYinYang} size={"xs"}/>,
    "Slither": <SlitherIcon/>,
    "Outlander": <OutlanderIcon/>,
    "Empyrean": <EmpyrianIcon/>,
    "Stoutheart": <FontAwesomeIcon icon={faGavel} size={"xs"}/>
};
const FactionStyle = styled.div`
    position: absolute;
    bottom: -4px;
    left: 0px;
    
    & > svg {
        fill: #FFFFFF;     
        color: #FFFFFF;
    }
`;
const BottomLeftCornerStyle = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;   
    width: 0;
    height: 0;
    border-right: 30px solid transparent;
    border-bottom: 30px solid rgba(0,0,0, 0.5);
`;

const OverlayActionBackground = styled.div`
    background-color: rgba(0,0,0, 0.5);
    border: 1px dotted rgba(0,0,0, 0.5);
    color: #fff;
`;

const InfoDetailsOverlay = styled.div`
    position: absolute;
    top: 35px;
    right: 0px;
    padding: 15px 0 15px 15px;
   
    &:hover{
      cursor: pointer;
    }
`;
const InfoDetailsIconStyle = styled(OverlayActionBackground)`
  padding-right: 2px;
`;

const AddCardToDeckOverlay = styled.div`
    position: absolute;
    top: 35px;
    left: 0px;
    padding: 15px 15px 15px 0;    
    &:hover{
      cursor: pointer;
    }
`;
const AddToDeckIconStyle = styled(OverlayActionBackground)`
  padding-left: 2px;
`;

export function Card({card: {pageId, image, manacost, description, name, rarity, type, faction, targets}, card, onClick, isDeckCard = false, zoom, showDeck}) {
    const [isOpenDetails, setIsOpenDetails] = useState(false);
    const imageNormalized = image.charAt(0).toUpperCase() + image.slice(1);

    return <>
        <CardDetailsModal isOpenDetails={isOpenDetails}
                          setIsOpenDetails={setIsOpenDetails}
                          card={card}
        />

        <CardContainerStyle zoom={zoom}
        >
            <CardContentStyle>
                <CardImageStyle src={`generated/img/${imageNormalized}`} alt={image}/>
                <RightCornerStyle rarity={rarity}/>
                <ManacostStyle>{manacost}</ManacostStyle>

                <TopLeftCornerStyle/>
                <GroundAirStyle><FontAwesomeIcon icon={typeMapping[type]} size={"xs"}/></GroundAirStyle>

                <BottomLeftCornerStyle/>
                <FactionStyle>{factionMapping[faction]}</FactionStyle>

                <AttackTypeOverlay targets={targets}/>

                {showDeck &&
                <AddCardToDeckOverlay onClick={onClick}>
                    <InfoDetailsIconStyle>
                        <FontAwesomeIcon icon={isDeckCard ? faMinusCircle : faPlusCircle} size={"sm"}/>
                    </InfoDetailsIconStyle>
                </AddCardToDeckOverlay>
                }

                <InfoDetailsOverlay onClick={(event) => {
                    setIsOpenDetails(true);
                    event.stopPropagation();
                }}>
                    <AddToDeckIconStyle>
                        <FontAwesomeIcon icon={faInfoCircle} size={"sm"}/>
                    </AddToDeckIconStyle>
                </InfoDetailsOverlay>
            </CardContentStyle>


        </CardContainerStyle>
    </>
        ;
}