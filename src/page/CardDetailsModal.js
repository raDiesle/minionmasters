import { faReddit } from "@fortawesome/free-brands-svg-icons/faReddit";
import { faSteam } from "@fortawesome/free-brands-svg-icons/faSteam";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faSquare } from "@fortawesome/free-solid-svg-icons/faSquare";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { gaTrackView } from "firestore";

import _dropRight from "lodash.dropright";
import CardProperties from "page/card-modal/card-properties";

import CardDescription from "page/cardmodal/card-description";
import CardDiscussion from "page/discussion/CardDiscussion";
import { ButtonGroupStyle, ButtonInGroupStyle } from "page/filters/ButtonFilterGroup";
import { RARITY_MAPPING_CONFIG } from "rarity/RARITY_MAPPING_CONFIG";
import React, { useState } from "react";
import ReactModal from "react-modal";

import styled from "styled-components";
import { targetsMapping } from "../attack/targetsMapping";
import { typeMapping } from "../cardtype/typeMapping";
import { factionMapping } from "../faction/Factions";

import css from "./CardDetailsModal.module.scss";

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

export default function CardDetailsModal({
  card,
  card: { description, name },
  isOpenDetails,
  setIsOpenDetails,
}) {
  gaTrackView(`/CardDetailsModal/${name}`);

  const [modals, setModals] = useState([]);

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

          <CardProperties card={card} />

          <CardDescription description={description} />

          <div>
            <h3>Tips by community</h3>
            <CardDiscussion card={card} discussionType="mechanics" />
          </div>

          <div>
            <h3>Continue exploring</h3>
            <ButtonGroupStyle>
              <ButtonInGroupStyle>
                <a
                  href={`https://www.reddit.com/r/MinionMasters/search?q=${name}&restrict_sr=1`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css.redditIcon}
                >
                  <span className={classNames("fa-layers fa-fw")}>
                    <FontAwesomeIcon icon={faSquare} />
                    <FontAwesomeIcon
                      icon={faReddit}
                      color="#fd7e14"
                      size="lg"
                      mask={["far", "circle"]}
                    />{" "}
                  </span>
                  <span> Reddits for {name}</span>
                </a>
              </ButtonInGroupStyle>
            </ButtonGroupStyle>
            <ButtonGroupStyle style={{ paddingTop: "5px" }}>
              <ButtonInGroupStyle>
                <a
                  href={` https://steamcommunity.com/app/489520/discussions/search/?q=${name}&gidforum=350543738456481917&include_deleted=1`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css.steamIcon}
                  color="#fd7e14"
                >
                  <span className={classNames("fa-layers fa-fw")}>
                    <FontAwesomeIcon icon={faSquare} size="lg" />
                    <FontAwesomeIcon icon={faSteam} size="lg" mask={["far", "circle"]} />{" "}
                  </span>
                  <span> Steam discussions for {name}</span>
                </a>
              </ButtonInGroupStyle>
            </ButtonGroupStyle>
          </div>
        </ModalContainerStyle>
      </ReactModal>
    </div>
  );
}
