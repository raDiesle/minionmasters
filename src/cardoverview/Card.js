import React, {useState} from "react";
import styled from "styled-components";
import ReactModal from 'react-modal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import VoidBourneIcon from "../faction/VoidbourneIcon";
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
import {useDrag} from "react-dnd";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons/faArrowRight";


const CardContainerStyle = styled.div`
    width: 100px;
    margin-right: 1px;
    margin-top: 2px;
    border-color: black;
    border-width: 1px;
    opacity: ${({dragging, isShowDragHelp}) => dragging || isShowDragHelp ? 0.4 : 1.0};
    border-style: ${({dragging, isShowDragHelp}) => dragging || isShowDragHelp ? "dotted" : "solid"};
`;

const CardContentStyle = styled.div`
    position: relative;
    &:hover {
      cursor: grab;
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
    Voidborne: <VoidBourneIcon/>,
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

const DragHelpOverlayStyle = styled.div`
  position:fixed;
  z-index: 100;
  top: 40%;
  right: 5px;
`;


export function Card({card: {pageId, image, manacost, description, name, rarity, type, faction, targets}, card}) {
    const [focused, setFocused] = useState(false);

    const [{dragging}, drag] = useDrag({
        item: {type: "card", card: {...card}},
        begin(monitor) {
            setIsShowDragHelp(false);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        end(item, monitor) {
        },
        collect: monitor => {
            return ({
                dragging: monitor.isDragging(),
            })
        },
    });

    const imageNormalized = image.charAt(0).toUpperCase() + image.slice(1);


    const [isShowDragHelp, setIsShowDragHelp] = useState(false);

    return <>
        {isShowDragHelp && <DragHelpOverlayStyle>
            <FontAwesomeIcon icon={faArrowRight} size={"10x"} color={"#EEEEEE"}/>
        </DragHelpOverlayStyle>}
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

        <CardContainerStyle ref={drag} dragging={dragging} isShowDragHelp={isShowDragHelp} onTouchStart={() => {
            setIsShowDragHelp(true);
        }}>
            <CardContentStyle>
                <CardImageStyle src={`img/${imageNormalized}`} alt={image} onClick={() => {
                    setIsShowDragHelp(false);
                    setFocused(true);
                }}/>
                <RightCornerStyle rarity={rarity}/>
                <ManacostStyle>{manacost}</ManacostStyle>

                <TopLeftCornerStyle/>
                <GroundAirStyle><FontAwesomeIcon icon={typeMapping[type]} size={"xs"}/></GroundAirStyle>

                <BottomLeftCornerStyle/>
                <FactionStyle>{factionMapping[faction]}</FactionStyle>

                <AttackTypeOverlay targets={targets}/>

            </CardContentStyle>


        </CardContainerStyle>
    </>
        ;
}