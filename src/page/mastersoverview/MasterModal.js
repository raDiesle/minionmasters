import {faTimesCircle} from "@fortawesome/free-regular-svg-icons/faTimesCircle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import css from "page/mastersoverview/master-modal.module.scss";
import React from "react";
import ReactModal from "react-modal";
import {mastersMapping} from "./mastersMapping";

export function MasterModal({
  masterKey,
  isOpenHeroModal,
  setIsOpenHeroModal,
}) {
  return (
    <ReactModal
      className="modalContentStyle"
      overlayClassName="modalOverlayStyle"
      isOpen={isOpenHeroModal}
      onRequestClose={() => setIsOpenHeroModal(false)}
    >
      <div className={css.ModalCloseStyle}>
        <FontAwesomeIcon
          icon={faTimesCircle}
          size={"2x"}
          onClick={() => setIsOpenHeroModal(false)}
        />
      </div>
      <div>{mastersMapping[masterKey].content}</div>
    </ReactModal>
  );
}
