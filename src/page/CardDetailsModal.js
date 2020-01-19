import React from "react";
import styled from "styled-components";
import ReactModal from "react-modal";

const CardPropertyUlStyle = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-inline-start: 0;
  
  & > li {
  margin: 1rem;
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

export default function CardDetailsModal({card: {image, attackdelay, attackspeed, damage, description, faction, flying, health, manacost, name, range, rarity, speed, targets, type}, isOpenDetails, setIsOpenDetails}) {
    return (<ReactModal
            isOpen={
                isOpenDetails
            }
            onRequestClose={() => setIsOpenDetails(false)}
        >
            <div>
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

            {description}
        </ReactModal>
    );
}