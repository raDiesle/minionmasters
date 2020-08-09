import { DEFAULT_MASTER_NOT_SELECTED } from "page/carddeck/DeckContainer";
import { FullWidthMasterOverlay } from "page/mastersoverview/AddMasterToDeckOrOpenDetailsActionOverlay";
import { MasterModal } from "page/mastersoverview/MasterModal";
import React, { useState } from "react";
import LongPress from "react-long";

export default function BuildMasterDeckActionOverlay({ masterKey, setSelectedHero }) {
  const [isOpenHeroModal, setIsOpenHeroModal] = useState(false);

  const handleOnContextMenu = (event) => {
    event && event.preventDefault();
    setIsOpenHeroModal(true);
  };

  return (
    <>
      <LongPress time={200} onLongPress={() => handleOnContextMenu()}>
        <FullWidthMasterOverlay
          onClick={() => {
            setSelectedHero(DEFAULT_MASTER_NOT_SELECTED);
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
