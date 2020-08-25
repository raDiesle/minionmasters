import Master from "page/deck-manager/build/masters/master";
import BuildMasterDeckActionOverlay from "page/deck-manager/deck/build-master-deck-action-overlay";
import css from "page/deck-manager/deck/master-deck-slot.module.scss";
import React from "react";

export default function MasterDeckSlot({ selectedMaster, setSelectedMaster }) {
  return (
    <div className={css.MasterDeckSlotStyle}>
      {selectedMaster ? (
        <Master
          masterKey={selectedMaster}
          actionRegistrationComponent={(selectedMasterKey) => (
            <BuildMasterDeckActionOverlay
              masterKey={selectedMasterKey}
              setSelectedMaster={setSelectedMaster}
            />
          )}
        />
      ) : (
        <div className={css.MasterPlaceholder}>Select Master</div>
      )}
    </div>
  );
}
