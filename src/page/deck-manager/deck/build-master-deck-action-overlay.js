import { FullWidthMasterOverlay } from "page/deck-manager/build/masters/AddMasterToDeckOrOpenDetailsActionOverlay";
import { MasterModal } from "page/deck-manager/build/masters/MasterModal";
import { DEFAULT_MASTER_NOT_SELECTED } from "page/page";
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
            setSelectedMaster(DEFAULT_MASTER_NOT_SELECTED);
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
