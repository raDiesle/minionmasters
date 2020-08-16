import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGaTrackView } from "footer/consent-banner";

import _dropRight from "lodash.dropright";

import CardDescription from "page/card-modal/card-description";

import css from "page/card-modal/card-details-modal.module.scss";
import CardProperties from "page/card-modal/card-properties";
import CommunityLinks from "page/card-modal/community-links";
import CommunityTips from "page/discussion/CardDiscussion";
import React, { useState } from "react";
import ReactModal from "react-modal";

export default function CardDetailsModal({
  card,
  card: { description, name },
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
        <div className={css.ModalContainerStyle} data-name={name}>
          <div className={css.ModalAlignCloseStyle}>
            <div className={css.ModalCloseStyle}>
              <FontAwesomeIcon
                icon={faTimesCircle}
                size={"2x"}
                onClick={() => setIsOpenDetails(false)}
              />
            </div>
          </div>

          <h2 className={css.CardHeaderStyle}>{name}</h2>

          <CardProperties card={card} />

          <CardDescription description={description} />

          <CommunityTips card={card} discussionType="mechanics" />

          <CommunityLinks name={name} />
        </div>
      </ReactModal>
    </div>
  );
}
