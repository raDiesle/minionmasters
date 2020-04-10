import React, {useEffect, useState} from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import cardData from "../generated/jobCardProps";

import _dropRight from "lodash.dropright";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import {typeMapping} from "../cardtype/typeMapping";
import {factionMapping} from "../faction/Factions";
import {targetsMapping} from "../attack/targetsMapping";
import {rarityMapping} from "../rarity/rarityMapping";
import sortBy from "lodash.sortby";
import CardDetailsGoodBadAgainst from "./CardDetailsGoodBadAgainst";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons/faHeart";
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons/faHeart";
import CardDiscussions from "./CardDiscussions";

const ModalContainerStyle = styled.div`
   position: relative;
    
`;

const ModalAlignCloseStyle = styled.div`
  position: absolute;
  right: 17px;
  top: -15px;
`;

const ModalCloseStyle = styled.div`  
    position: fixed;
    
  & > svg {
    
      
      &:hover{
        color: #a0a0a0;
        filter:drop-shadow(1px 1px 1px #a0a0a0);
        cursor: pointer;
      }
  }
`;

const CardHeaderStyle = styled.h2`
  margin-top: 0;
`;


const CardPropertyUlStyle = styled.div`
    padding-top: 30px;
    
    display: grid;
    grid-auto-flow: column;
    grid-row-gap: 25px;
    grid-column-gap: 10px;
    align-items: center;
    text-align: center;
    list-style-type: none;
    padding-inline-start: 0;
    
    & > div {
    //  margin: 1rem;
    }
    
    
    @media (max-width: 950px) {
        grid-auto-flow: unset;
        grid-template-columns: auto auto auto;   
    }
`;

const CardPropertyKeyStyle = styled.div`
  font-weight: bold;
`;

const CardPropertyLiStyle = styled.div`

`;

const CardImageStyle = styled.img`
    width: 60px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;


const DescriptionStyle = styled.div`
  padding-top: 40px;
  line-height: 2rem;
`;

const RarityStyle = styled.div`
  color: ${({rarity}) => rarityMapping[rarity]};
`;

const CardGlossaryUlStyle = styled.div`
  padding-top: 20px;
  
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding-inline-start: 0;
`;

const CardGlossaryStyle = styled.div`
    color: orange;
    font-weight: bold;
`;

const PortraitStyle = styled.div`
  color: gold;
  display: flex;
  flex-direction: column;
  align-items: center;
 
`;

const LikeStyle = styled.div`
 // display: flex;
 // justify-content: center;
`;

export default function CardDetailsModal({card, card: {image, attackdelay, attackspeed, damage, description, faction, flying, health, manacost, name, range, rarity, speed, targets, type}, isOpenDetails, setIsOpenDetails}) {
    const [modals, setModals] = useState([]);
    const [glossary, setGlossary] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            const $cardRootContainer = `div[data-name="${name}"] `;

            /* Should be moved to batch jobs to prepare data */
// expects that both have same size.
            let inlineItemItems = document.querySelectorAll(`${$cardRootContainer} span[data-inline-text]:not([data-inline-text=""]`);
            const inlineItemItemss = [...inlineItemItems].map(inlineNode => inlineNode.getAttribute("data-inline-text"));

            let inlineItemTitles = document.querySelectorAll(`${$cardRootContainer} span[data-highlight]:not([data-highlight=""]`);
            const inlineItemTits = [...inlineItemTitles].map(inlineNode => inlineNode.getAttribute("data-highlight"));

            const result = inlineItemTits.map((title, index) => (
                {
                    text: inlineItemItemss[index],
                    title
                }))
                .filter(({text}) => text); // because description is missing in gameData

            setGlossary(result);

            [...document.querySelectorAll(`${$cardRootContainer}span[data-card]:not([data-card=""]`)].map(foundItem => {
                    foundItem.addEventListener('click', function (e) {
                        const clickedInfo = this.getAttribute("data-card");
                        // to find card.name is a hack. If sort by iD, it will likely find the card to summon
                        const card = sortBy(cardData, ["iD"]).find(card => {
                            return (
                                card.unitToSummon === clickedInfo
                                || card.name.toLowerCase().replace(/\s/g, "") === clickedInfo.toLowerCase()
                            )
                        });

                        if (typeof card !== "undefined") {
                            setModals((modals) => [...modals,
                                card,
                            ]);
                        }
                    });

                    return true;
                }
            );

        }, 0);

        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'unset';
    }, []);


    return (<div>
            {
                modals.map(card => <CardDetailsModal key={card.pageId}
                                                     card={card}
                                                     isOpenDetails={true}
                                                     setIsOpenDetails={() => (setModals((currentModals) => _dropRight(currentModals)))}/>
                )
            }

            <ReactModal
                isOpen={
                    isOpenDetails
                }
                onRequestClose={() => setIsOpenDetails(false)}
                className="modalContentStyle"
            >
                <ModalContainerStyle data-name={name}>
                    <ModalAlignCloseStyle>
                        <ModalCloseStyle>
                            <FontAwesomeIcon icon={faTimesCircle}
                                             size={"2x"}
                                             onClick={() => setIsOpenDetails(false)}
                            />
                        </ModalCloseStyle>
                    </ModalAlignCloseStyle>

                    <CardHeaderStyle>
                        {name}
                    </CardHeaderStyle>


                    <CardPropertyUlStyle>

                        <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>

                            </CardPropertyKeyStyle>
                            <PortraitStyle>
                                <LikeStyle>
                                    <FontAwesomeIcon icon={faHeartSolid} size={"xs"}/><FontAwesomeIcon
                                    icon={faHeartSolid} size={"xs"}/>
                                    <FontAwesomeIcon icon={faHeartRegular} size={"xs"}/><FontAwesomeIcon
                                    icon={faHeartRegular} size={"xs"}/><FontAwesomeIcon icon={faHeartRegular}
                                                                                        size={"xs"}/>
                                </LikeStyle>
                                <CardImageStyle src={`generated/img/${image}`} alt={image}/>
                            </PortraitStyle>
                        </CardPropertyLiStyle>

                        {image === "BloodImps.jpg" && <CardPropertyLiStyle>
                            <PortraitStyle>
                                <LikeStyle>
                                    <FontAwesomeIcon icon={faHeartSolid} size={"xs"} color={"transparent"}/>
                                </LikeStyle>
                                <img src="bloodimp_inline.jpg" width="60px"/>
                            </PortraitStyle>
                        </CardPropertyLiStyle>
                        }

                        <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Cost
                            </CardPropertyKeyStyle>
                            <div>
                                {manacost}
                            </div>
                        </CardPropertyLiStyle>

                        <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Faction
                            </CardPropertyKeyStyle>
                            <div>
                                {factionMapping[faction]} {faction}
                            </div>
                        </CardPropertyLiStyle>

                        <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Rarity
                            </CardPropertyKeyStyle>
                            <RarityStyle rarity={rarity}>
                                {rarity}
                            </RarityStyle>
                        </CardPropertyLiStyle>

                        <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Type
                            </CardPropertyKeyStyle>
                            <div>
                                <FontAwesomeIcon icon={typeMapping[type]} size={"xs"}/> {type}
                            </div>
                        </CardPropertyLiStyle>

                        {targets && <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Targets
                            </CardPropertyKeyStyle>
                            <div>
                                {targetsMapping[targets] && <>
                                    {targetsMapping[targets]} {targets}
                                </>}
                            </div>
                        </CardPropertyLiStyle>
                        }

                        {!isNaN(health) &&
                        <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Health
                            </CardPropertyKeyStyle>
                            <div>
                                {health}
                            </div>
                        </CardPropertyLiStyle>
                        }

                        {!isNaN(attackspeed) && <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Attack Speed
                            </CardPropertyKeyStyle>
                            <div>
                                {attackspeed}
                            </div>
                        </CardPropertyLiStyle>
                        }

                        {!isNaN(attackdelay) &&
                        <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Attack Delay
                            </CardPropertyKeyStyle>
                            <div>
                                {attackdelay}
                            </div>
                        </CardPropertyLiStyle>
                        }

                        {!isNaN(damage) &&
                        <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Damage
                            </CardPropertyKeyStyle>
                            <div>
                                {damage}
                            </div>
                        </CardPropertyLiStyle>
                        }

                        {!isNaN(range) &&
                        <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Range
                            </CardPropertyKeyStyle>
                            <div>
                                {range}
                            </div>
                        </CardPropertyLiStyle>
                        }

                        {speed &&
                        <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Speed
                            </CardPropertyKeyStyle>
                            <div>
                                {speed}
                            </div>
                        </CardPropertyLiStyle>
                        }

                        {flying &&
                        <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Flying
                            </CardPropertyKeyStyle>
                            <div>
                                {flying}
                            </div>
                        </CardPropertyLiStyle>
                        }


                    </CardPropertyUlStyle>


                    <DescriptionStyle dangerouslySetInnerHTML={{__html: description}}/>


                    <CardGlossaryUlStyle>
                        {
                            glossary.length > 0 && glossary.map(({title, text}) =>
                                <CardPropertyLiStyle key={title}>
                                    <CardGlossaryStyle>
                                        {title}
                                    </CardGlossaryStyle>
                                    <div dangerouslySetInnerHTML={{__html: text}}></div>
                                </CardPropertyLiStyle>
                            )}
                    </CardGlossaryUlStyle>


                    <CardDiscussions/>

                    <CardDetailsGoodBadAgainst card={card}/>

                </ModalContainerStyle>
            </ReactModal>
        </div>
    );
}
