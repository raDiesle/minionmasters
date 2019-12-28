import React, {useState} from "react";
import styled from "styled-components";
import ReactModal from 'react-modal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDove} from "@fortawesome/free-solid-svg-icons/faDove";
import {faShoePrints} from "@fortawesome/free-solid-svg-icons/faShoePrints";
import {faMagic} from "@fortawesome/free-solid-svg-icons/faMagic";
import {faHome} from "@fortawesome/free-solid-svg-icons/faHome";
import VoidBourneIcon from "./faction/VoidbourneIcon";
import ScratIcon from "./faction/ScratIcon";
import {faGavel} from "@fortawesome/free-solid-svg-icons/faGavel";

const CardContainerStyle = styled.div`
    width: 100px;
    margin-right: 2px;
    margin-top: 2px;
    border: 1px solid black;
`;

const CardContentStyle = styled.div`
    position: relative;
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

const rarityMapping = {
    Legendary: "rgba(255, 215, 0.6)",
    Supreme: "rgba(153, 51, 255,0.6)",
    Rare: "rgba(51, 153, 255, 0.6)",
    Common: "rgba(0, 153, 0, 0.6)",
    Perk: "rgba(255, 255, 255, 0.6)"
};
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
const typeMapping = {
    "Flying Minion": faDove,
    "Minion": faShoePrints,
    "Spell": faMagic,
    "Building": faHome
};
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
    Voidborne: <VoidBourneIcon/>,
    Accursed: "acc",
    Scrat: <ScratIcon/>,
    "Crystal Elf": "elf",
    "Puff": "Special",
    "Zen-Chi": "Zen",
    "Slither": "Slither",
    "Outlander": <FontAwesomeIcon icon={faGavel} size={"s"}/>,
    "Empyrean": "Empyrean"
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


export function Card({card: {pageId, image, manacost, description, name, rarity, type, faction}}) {
    const [focused, setFocused] = useState(false);

    return <CardContainerStyle>
        <CardContentStyle>
            <CardImageStyle src={`/img/${image}`} alt={image} onClick={() => setFocused(true)}/>
            <RightCornerStyle rarity={rarity}/>
            <ManacostStyle>{manacost}</ManacostStyle>

            <TopLeftCornerStyle/>
            <GroundAirStyle><FontAwesomeIcon icon={typeMapping[type]} size={"xs"}/></GroundAirStyle>

            <BottomLeftCornerStyle/>
            <FactionStyle>{factionMapping[faction]}</FactionStyle>

        </CardContentStyle>

        <ReactModal
            isOpen={
                focused
            }
            onRequestClose={() => setFocused(false)}
        >
            <div>
                <h2>
                    {name}
                </h2>
                <ul>
                    <li>
                        <img src="minion.jpg" alt="minion"/>
                    </li>
                    <li>
                        PageId: {pageId}
                    </li>
                    <li>
                        rarity: {rarity}
                    </li>
                    <li>
                        {description}
                    </li>
                    <li>
                        Manacost: {manacost}
                    </li>
                </ul>
            </div>
        </ReactModal>
    </CardContainerStyle>;
}