import { gaTrackView } from "consent-banner";
import { MasterModal } from "page/mastersoverview/MasterModal";
import React, { useEffect, useState } from "react";
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

export default function AddMasterToDeckOrOpenDetailsActionOverlay({ setSelectedHero, masterKey }) {
  const [isOpenHeroModal, setIsOpenHeroModal] = useState(false);

  const handleOnContextMenu = (event) => {
    event && event.preventDefault();
    setIsOpenHeroModal(true);
  };

  useEffect(() => {
    if (isOpenHeroModal) {
      gaTrackView(`/Master/${masterKey}`);
    }
  }, [isOpenHeroModal]);

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
