import mToast from "components/mToast";
import css from "page/deck-manager/build/masters/add-master-to-deck-or-open-details-action-overlay.module.scss";
import { MasterModal } from "page/deck-manager/build/masters/MasterModal";
import React, { useEffect, useState } from "react";
import ClickNHold from "react-click-n-hold";

export default function AddMasterToDeckOrOpenDetailsActionOverlay({
  setSelectedMaster,
  masterKey,
}) {
  const [isOpenMasterModal, setIsOpenMasterModal] = useState(false);

  const handleOnContextMenu = (event) => {
    event && event.preventDefault();
    setIsOpenMasterModal(true);
  };

  useEffect(() => {
    if (isOpenMasterModal) {
      window.ga.logEvent("screen_view", { screen_name: `/Master/${masterKey}` });
    }
  }, [isOpenMasterModal]);

  return (
    <>
      <ClickNHold
        time={0.3}
        onClickNHold={() => {
          setIsOpenMasterModal(true);
        }}
      >
        <div
          className={css.FullWidthMasterOverlay}
          onClick={() => {
            setSelectedMaster(masterKey);
            mToast("Master added to deck.");
          }}
          onContextMenu={(event) => handleOnContextMenu(event)}
        />
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
