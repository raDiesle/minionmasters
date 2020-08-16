import mToast from "components/mToast";
import { MasterModal } from "page/deck-manager/build/masters/MasterModal";
import React, { useEffect, useState } from "react";
import ClickNHold from "react-click-n-hold";
import styled from "styled-components";

export const FullWidthMasterOverlay = styled.div`
  position: absolute;
  top: 0;
  padding: 90px 90px 0px 0;
  left: 0px;

  @media (max-width: 767px) {
    padding: 50px 50px 0 0;
  }

  &:hover {
    cursor: pointer;
  }

  &:hover > div {
    color: yellow;
  }
`;

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
        <FullWidthMasterOverlay
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
