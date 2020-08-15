import mToast from "components/mToast";
import { MasterModal } from "page/mastersoverview/MasterModal";
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

export default function AddMasterToDeckOrOpenDetailsActionOverlay({ setSelectedHero, masterKey }) {
  const [isOpenHeroModal, setIsOpenHeroModal] = useState(false);

  const handleOnContextMenu = (event) => {
    event && event.preventDefault();
    setIsOpenHeroModal(true);
  };

  useEffect(() => {
    if (isOpenHeroModal) {
      window.ga.logEvent("screen_view", { screen_name: `/Master/${masterKey}` });
    }
  }, [isOpenHeroModal]);

  return (
    <>
      <ClickNHold
        time={0.3}
        onClickNHold={() => {
          setIsOpenHeroModal(true);
        }}
      >
        <FullWidthMasterOverlay
          onClick={() => {
            setSelectedHero(masterKey);
            mToast("Master added to deck.");
          }}
          onContextMenu={(event) => handleOnContextMenu(event)}
        />
      </ClickNHold>
      {isOpenHeroModal && (
        <MasterModal
          isOpenHeroModal={isOpenHeroModal}
          setIsOpenHeroModal={setIsOpenHeroModal}
          masterKey={masterKey}
        />
      )}
    </>
  );
}
