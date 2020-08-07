import AddMasterToDeckActionOverlay from "page/mastersoverview/AddMasterToDeckActionOverlay";
import Masters from "page/mastersoverview/Masters";
import React, { useMemo } from "react";

const MastersMemo = ({ setSelectedHero }) => {
  return useMemo(() => {
    const mastersActionWrapper = (selectedHeroKey) => (
      <AddMasterToDeckActionOverlay masterKey={selectedHeroKey} setSelectedHero={setSelectedHero} />
    );

    return <Masters actionRegistrationComponent={mastersActionWrapper} />;
  }, []);
};

export default function MastersSelection() {
  return <MastersMemo />;
}
