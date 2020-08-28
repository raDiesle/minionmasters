import { FullWidthMasterOverlay } from "page/deck-manager/build/masters/add-master-to-deck-or-open-details-action-overlay";
import { MasterModal } from "page/deck-manager/build/masters/MasterModal";
import React, { useState } from "react";
import ClickNHold from "react-click-n-hold";

export default function BuildMasterDeckActionOverlay({ masterKey, setSelectedMaster }) {
  const [isOpenMasterModal, setIsOpenMasterModal] = useState(false);

  const handleOnContextMenu = (event) => {
    event && event.preventDefault();
    setIsOpenMasterModal(true);
  };

  return (
    <>
      <ClickNHold
        time={0.3}
        onClickNHold={() => {
          setIsOpenMasterModal(true);
        }}
      >
        <FullWidthMasterOverlay
          onClick={() => {
            // nothing
          }}
          onContextMenu={(event) => handleOnContextMenu(event)}
        ></FullWidthMasterOverlay>
      </ClickNHold>

      {isOpenMasterModal && (
        <MasterModal
          isOpenMasterModal={isOpenMasterModal}
          setIsOpenMasterModal={setIsOpenMasterModal}
          masterKey={masterKey}
        />
      )}
    </>
  );
}
