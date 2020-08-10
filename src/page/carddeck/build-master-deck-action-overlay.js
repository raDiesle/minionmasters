import { DEFAULT_MASTER_NOT_SELECTED } from "page/carddeck/DeckContainer";
import { FullWidthMasterOverlay } from "page/mastersoverview/AddMasterToDeckOrOpenDetailsActionOverlay";
import { MasterModal } from "page/mastersoverview/MasterModal";
import React, { useState } from "react";
import ClickNHold from "react-click-n-hold";

export default function BuildMasterDeckActionOverlay({ masterKey, setSelectedHero }) {
  const [isOpenHeroModal, setIsOpenHeroModal] = useState(false);

  const handleOnContextMenu = (event) => {
    event && event.preventDefault();
    setIsOpenHeroModal(true);
  };

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
            setSelectedHero(DEFAULT_MASTER_NOT_SELECTED);
          }}
          onContextMenu={(event) => handleOnContextMenu(event)}
        ></FullWidthMasterOverlay>
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
