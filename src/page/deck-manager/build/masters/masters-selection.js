import AddMasterToDeckOrOpenDetailsActionOverlay from "page/deck-manager/build/masters/AddMasterToDeckOrOpenDetailsActionOverlay";
import Masters from "page/deck-manager/build/masters/masters";
import React, { useMemo } from "react";

const MastersMemo = ({ setSelectedMaster }) => {
  return useMemo(() => {
    const mastersActionWrapper = (selectedMasterKey) => (
      <AddMasterToDeckOrOpenDetailsActionOverlay
        masterKey={selectedMasterKey}
        setSelectedMaster={setSelectedMaster}
      />
    );

    return <Masters actionRegistrationComponent={mastersActionWrapper} />;
  }, []);
};

export default function MastersSelection() {
  return <MastersMemo />;
}
