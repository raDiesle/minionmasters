import React, {useEffect, useState} from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import cardData from "../generated/jobCardProps";

import _dropRight from "lodash.dropright";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-regular-svg-icons";


const CardPropertyUlStyle = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-inline-start: 0;
    
    & > li {
      margin: 1rem;
    }
    
    
    @media (max-width: 950px) {
        flex-direction: column;   
        align-items: flex-start;   
    }
`;

const CardPropertyKeyStyle = styled.div`
  font-weight: bold;
`;

const CardPropertyLiStyle = styled.li`

`;

const CardImageStyle = styled.img`
    width: 60px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const ModalCloseStyle = styled.div`
    display: flex;
    justify-content: flex-end;
  & > svg {
    
      
      &:hover{
        color: #a0a0a0;
        filter:drop-shadow(1px 1px 1px #a0a0a0);
        cursor: pointer;
      }
  }
`;


export default function CardDetailsModal({card: {image, attackdelay, attackspeed, damage, description, faction, flying, health, manacost, name, range, rarity, speed, targets, type}, isOpenDetails, setIsOpenDetails}) {
    const [modals, setModals] = useState([]);
    const [glossary, setGlossary] = useState([]);

    useEffect(() => {
        setTimeout(() => {


// expects that both have same size
            let inlineItemItems = document.querySelectorAll('span[data-inline-text]:not([data-inline-text=""]');
            const inlineItemItemss = [...inlineItemItems].map(inlineNode => inlineNode.getAttribute("data-inline-text"));

            let inlineItemTitles = document.querySelectorAll('span[data-highlight]:not([data-highlight=""]');
            const inlineItemTits = [...inlineItemTitles].map(inlineNode => inlineNode.getAttribute("data-highlight"));

            const result = inlineItemTits.map((title, index) => (
                {
                    text: inlineItemItemss[index],
                    title
                }));

            setGlossary(result);

            [...document.querySelectorAll('span[data-card]:not([data-card=""]')].map(foundItem => {
                    foundItem.addEventListener('click', function (e) {
                        const clickedInfo = this.getAttribute("data-card");
                        // card.name is hack and means it is a small. cannot be mapped easy
                        const card = cardData.find(card => card.unitToSummon === clickedInfo || card.name.toLowerCase().replace(/\s/g, "") === clickedInfo.toLowerCase());

                        setModals((modals) => [...modals,
                            card,
                        ]);
                    });
                }
            );

        }, 0);

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
            >
                <div>
                    <ModalCloseStyle>
                        <FontAwesomeIcon icon={faTimesCircle}
                                         size={"2x"}
                                         onClick={() => setIsOpenDetails(false)}
                        />
                    </ModalCloseStyle>

                    <h2>
                        {name}
                    </h2>


                    <CardPropertyUlStyle>

                        <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>

                            </CardPropertyKeyStyle>
                            <div>
                                <CardImageStyle src={`generated/img/${image}`} alt={image}/>
                            </div>
                        </CardPropertyLiStyle>


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
                                {faction}
                            </div>
                        </CardPropertyLiStyle>

                        <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Rarity
                            </CardPropertyKeyStyle>
                            <div>
                                {rarity}
                            </div>
                        </CardPropertyLiStyle>

                        <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Type
                            </CardPropertyKeyStyle>
                            <div>
                                {type}
                            </div>
                        </CardPropertyLiStyle>

                        {targets && <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Targets
                            </CardPropertyKeyStyle>
                            <div>
                                {targets}
                            </div>
                        </CardPropertyLiStyle>
                        }

                        {health &&
                        <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Health
                            </CardPropertyKeyStyle>
                            <div>
                                {health}
                            </div>
                        </CardPropertyLiStyle>
                        }

                        {attackspeed && <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Attackspeed
                            </CardPropertyKeyStyle>
                            <div>
                                {attackspeed}
                            </div>
                        </CardPropertyLiStyle>
                        }

                        {attackdelay &&
                        <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Attackdelay
                            </CardPropertyKeyStyle>
                            <div>
                                {attackdelay}
                            </div>
                        </CardPropertyLiStyle>
                        }

                        {damage &&
                        <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                Damage
                            </CardPropertyKeyStyle>
                            <div>
                                {damage}
                            </div>
                        </CardPropertyLiStyle>
                        }

                        {range &&
                        <CardPropertyLiStyle>
                            <CardPropertyKeyStyle>
                                range
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


                </div>

                <div dangerouslySetInnerHTML={{__html: description}}/>

                <div>
                    <CardPropertyUlStyle>
                        {
                            glossary.length > 0 && glossary.map(({title, text}) =>
                                <CardPropertyLiStyle key={title}>
                                    <CardPropertyKeyStyle>
                                        {title}
                                    </CardPropertyKeyStyle>
                                    <div>
                                        {text}
                                    </div>
                                </CardPropertyLiStyle>
                            )}
                    </CardPropertyUlStyle>
                </div>
            </ReactModal>
        </div>
    );
}
