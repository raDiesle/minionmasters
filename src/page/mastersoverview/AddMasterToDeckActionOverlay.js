import { MasterModal } from "page/mastersoverview/MasterModal";
import React, { useState } from "react";
import LongPress from "react-long";
import styled from "styled-components";

const OverlayActionBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px dotted rgba(0, 0, 0, 0.5);
  color: #fff;
`;

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

export default function AddMasterToDeckActionOverlay({ setSelectedHero, masterKey }) {
  const [isOpenHeroModal, setIsOpenHeroModal] = useState(false);

  const handleOnContextMenu = (event) => {
    event && event.preventDefault();
    setIsOpenHeroModal(true);
  };

  return (
    <>
      <LongPress
        time={200}
        onLongPress={(event) => handleOnContextMenu(event)}
        onPress={() => setSelectedHero(masterKey)}
      >
        <FullWidthMasterOverlay
          onClick={() => {
            setSelectedHero(masterKey);
          }}
          onContextMenu={(event) => handleOnContextMenu(event)}
        ></FullWidthMasterOverlay>
      </LongPress>

      <MasterModal
        isOpenHeroModal={isOpenHeroModal}
        setIsOpenHeroModal={setIsOpenHeroModal}
        masterKey={masterKey}
      />
    </>
  );
}
