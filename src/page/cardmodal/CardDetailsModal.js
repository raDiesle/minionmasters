import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGaTrackView } from "consent-banner";

import _dropRight from "lodash.dropright";
import CardProperties from "page/card-modal/card-properties";

import CardDescription from "page/cardmodal/card-description";

import css from "page/cardmodal/CardDetailsModal.module.scss";
import CommunityLinks from "page/cardmodal/community-links";
import CardDiscussion from "page/discussion/CardDiscussion";
import React, { useState } from "react";
import ReactModal from "react-modal";

import styled from "styled-components";

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
  card: { iD, description, name },
  isOpenDetails,
  setIsOpenDetails,
}) {
  useGaTrackView(`/CardDetailsModal/${name}`);

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

          <CardDiscussion card={card} discussionType="mechanics" />

          <div className={css.buttonsLayout}>
            <CommunityLinks name={name} />
          </div>
        </ModalContainerStyle>
      </ReactModal>
    </div>
  );
}
