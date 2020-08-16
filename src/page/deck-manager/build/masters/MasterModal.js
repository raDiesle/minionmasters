import { faTimesCircle } from "@fortawesome/free-regular-svg-icons/faTimesCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "page/deck-manager/build/masters/master-modal.module.scss";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import React from "react";
import ReactModal from "react-modal";

export function MasterModal({ masterKey, isOpenMasterModal, setIsOpenMasterModal }) {
  return (
    <ReactModal
      className="modalContentStyle"
      overlayClassName="modalOverlayStyle"
      isOpen={isOpenMasterModal}
      onRequestClose={() => setIsOpenMasterModal(false)}
    >
      <div className={css.ModalCloseStyle}>
        <FontAwesomeIcon
          icon={faTimesCircle}
          size={"2x"}
          onClick={() => setIsOpenMasterModal(false)}
        />
      </div>
      <div>{mastersMapping[masterKey].content}</div>
    </ReactModal>
  );
}
