import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import _dropRight from "lodash.dropright";

import CardDescription from "page/cardmodal/card-description";
import CardDiscussion from "page/discussion/CardDiscussion";
import React, { useState } from "react";
import ReactModal from "react-modal";

import styled from "styled-components";
import { targetsMapping } from "../attack/targetsMapping";
import { typeMapping } from "../cardtype/typeMapping";
import { factionMapping } from "../faction/Factions";
import { rarityMapping } from "../rarity/rarityMapping";

const ModalContainerStyle = styled.div`
  position: relative;
`;

const ModalAlignCloseStyle = styled.div`
  position: absolute;
  right: 30px;
  top: -2px;
`;

const ModalCloseStyle = styled.div`
  position: fixed;

  & > svg {
    &:hover {
      color: #a0a0a0;
      filter: drop-shadow(1px 1px 1px #a0a0a0);
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

const CardPropertyLiStyle = styled.div``;

const CardImageStyle = styled.img`
  width: 60px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const RarityStyle = styled.div`
  color: ${({ rarity }) => rarityMapping[rarity]};
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

export default function CardDetailsModal({
  card,
  card: {
    image,
    attackdelay,
    attackspeed,
    damage,
    description,
    faction,
    flying,
    health,
    manacost,
    name,
    range,
    rarity,
    speed,
    targets,
    type,
  },
  isOpenDetails,
  setIsOpenDetails,
}) {
  const [modals, setModals] = useState([]);

  const isAttacking = !isNaN(damage) && !isNaN(attackspeed) && ![damage, attackspeed].includes(0);

  const IMG_FOLDER = "generated/img/";
  const FILE_ENDING = ".webp";
  const WIDTH = "_78";
  const IMG_PATH = IMG_FOLDER + image + WIDTH + FILE_ENDING;

  return (
    <div>
      {modals.map((card) => (
        <CardDetailsModal
          key={card.iD}
          card={card}
          isOpenDetails={true}
          setIsOpenDetails={() => setModals((currentModals) => _dropRight(currentModals))}
        />
      ))}

      <ReactModal
        isOpen={isOpenDetails}
        onRequestClose={() => setIsOpenDetails(false)}
        className="modalContentStyle"
        overlayClassName="modalOverlayStyle"
      >
        <ModalContainerStyle data-name={name}>
          <ModalAlignCloseStyle>
            <ModalCloseStyle>
              <FontAwesomeIcon
                icon={faTimesCircle}
                size={"2x"}
                onClick={() => setIsOpenDetails(false)}
              />
            </ModalCloseStyle>
          </ModalAlignCloseStyle>

          <CardHeaderStyle>{name}</CardHeaderStyle>

          <CardPropertyUlStyle>
            <CardPropertyLiStyle>
              <CardPropertyKeyStyle></CardPropertyKeyStyle>
              <PortraitStyle>
                {/*
                                <LikeStyle>
                                    <FontAwesomeIcon icon={faHeartSolid} size={"xs"}/><FontAwesomeIcon
                                    icon={faHeartSolid} size={"xs"}/>
                                    <FontAwesomeIcon icon={faHeartRegular} size={"xs"}/><FontAwesomeIcon
                                    icon={faHeartRegular} size={"xs"}/><FontAwesomeIcon icon={faHeartRegular}
                                                                                        size={"xs"}/>
                                </LikeStyle>
                                */}
                <CardImageStyle src={IMG_PATH} alt={image} />
              </PortraitStyle>
            </CardPropertyLiStyle>

            {image === "BloodImps.jpg" && (
              <CardPropertyLiStyle>
                <PortraitStyle>
                  <LikeStyle>
                    <FontAwesomeIcon icon={faHeartSolid} size={"xs"} color={"transparent"} />
                  </LikeStyle>
                  <img src="bloodimp_inline.jpg" width="60px" />
                </PortraitStyle>
              </CardPropertyLiStyle>
            )}

            <CardPropertyLiStyle>
              <CardPropertyKeyStyle>Cost</CardPropertyKeyStyle>
              <div>{manacost}</div>
            </CardPropertyLiStyle>

            <CardPropertyLiStyle>
              <CardPropertyKeyStyle>Faction</CardPropertyKeyStyle>
              <div>
                {factionMapping[faction]} {faction}
              </div>
            </CardPropertyLiStyle>

            <CardPropertyLiStyle>
              <CardPropertyKeyStyle>Rarity</CardPropertyKeyStyle>
              <RarityStyle rarity={rarity}>{rarity}</RarityStyle>
            </CardPropertyLiStyle>

            <CardPropertyLiStyle>
              <CardPropertyKeyStyle>Type</CardPropertyKeyStyle>
              <div>
                <FontAwesomeIcon icon={typeMapping[type]} size={"xs"} /> {type}
              </div>
            </CardPropertyLiStyle>

            {isAttacking && (
              <CardPropertyLiStyle>
                <CardPropertyKeyStyle>Targets</CardPropertyKeyStyle>
                <div>
                  {targetsMapping[targets] && (
                    <>
                      {targetsMapping[targets]} {targets}
                    </>
                  )}
                </div>
              </CardPropertyLiStyle>
            )}

            {!isNaN(health) && (
              <CardPropertyLiStyle>
                <CardPropertyKeyStyle>Health</CardPropertyKeyStyle>
                <div>{health}</div>
              </CardPropertyLiStyle>
            )}

            {isAttacking && (
              <CardPropertyLiStyle>
                <CardPropertyKeyStyle>Attack Speed</CardPropertyKeyStyle>
                <div>{attackspeed / 1000} s</div>
              </CardPropertyLiStyle>
            )}

            {!isNaN(attackdelay) && (
              <CardPropertyLiStyle>
                <CardPropertyKeyStyle>Attack Delay</CardPropertyKeyStyle>
                <div>{attackdelay}</div>
              </CardPropertyLiStyle>
            )}

            {!isNaN(damage) && (
              <CardPropertyLiStyle>
                <CardPropertyKeyStyle>Damage</CardPropertyKeyStyle>
                <div>{damage === 0 ? "-" : damage}</div>
              </CardPropertyLiStyle>
            )}

            {isAttacking && (
              <CardPropertyLiStyle>
                <CardPropertyKeyStyle>DPS</CardPropertyKeyStyle>
                <div>{Math.round((damage / attackspeed) * 10000) / 10}</div>
              </CardPropertyLiStyle>
            )}

            {isAttacking && (
              <CardPropertyLiStyle>
                <CardPropertyKeyStyle>Range</CardPropertyKeyStyle>
                <div>{range / 1000}</div>
              </CardPropertyLiStyle>
            )}

            {speed && (
              <CardPropertyLiStyle>
                <CardPropertyKeyStyle>Speed</CardPropertyKeyStyle>
                <div>{speed}</div>
              </CardPropertyLiStyle>
            )}

            {[true, false].includes(flying) && (
              <CardPropertyLiStyle>
                <CardPropertyKeyStyle>Flying</CardPropertyKeyStyle>
                <div>
                  <FontAwesomeIcon icon={flying ? faCheck : faTimes} />
                </div>
              </CardPropertyLiStyle>
            )}
          </CardPropertyUlStyle>

          <CardDescription description={description} />

          <div>
            <h3 style={{ marginBottom: 0 }}>Tips by community</h3>
            <CardDiscussion card={card} discussionType="mechanics" />
          </div>
        </ModalContainerStyle>
      </ReactModal>
    </div>
  );
}
