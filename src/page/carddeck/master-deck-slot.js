import BuildMasterDeckActionOverlay from "page/carddeck/build-master-deck-action-overlay";
import React, { useMemo } from "react";
import styled from "styled-components";
import Master from "../mastersoverview/master";

const MasterDeckSlotStyle = styled.div`
  display: flex;

  position: relative;

  width: 90px;
  height: 90px;
  margin-top: 3px;
  margin-right: 7px;

  @media (max-width: 767px) {
    height: 50px;
    width: 50px;
    //margin-top: 5px;
  }
`;

const MasterContentStyle = styled.div`
  //   width: 100%;
  //   position: relative;
`;

const MasterPlaceholder = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  text-align: center;
  padding: 20% 15%;
  cursor: pointer;
  text-decoration: none;

  @media (max-width: 767px) {
    font-size: 0.6rem;
  }

  &:before {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    border: 2px dashed #fff;
    top: 0px;
    left: 0px;
    border-radius: 50%;
    animation: spin 10s linear infinite;
  }

  :hover::before {
    border-color: yellow;
  }

  @keyframes spin {
    100% {
      transform: rotateZ(360deg);
    }
  }
`;

const MastersMemo = ({ masterKey }) => {
  return useMemo(() => {
    const mastersActionWrapper = (selectedHeroKey) => (
      <BuildMasterDeckActionOverlay masterKey={selectedHeroKey} />
    );

    return <Master masterKey={masterKey} actionRegistrationComponent={mastersActionWrapper} />;
  }, []);
};

export default function MasterDeckSlot({ selectedHero, setSelectedHero }) {
  return (
    <MasterDeckSlotStyle>
      <MasterContentStyle>
        {selectedHero ? (
          <Master
            masterKey={selectedHero}
            actionRegistrationComponent={(selectedHeroKey) => (
              <BuildMasterDeckActionOverlay
                masterKey={selectedHeroKey}
                setSelectedHero={setSelectedHero}
              />
            )}
          />
        ) : (
          <MasterPlaceholder>Select Master</MasterPlaceholder>
        )}
      </MasterContentStyle>
    </MasterDeckSlotStyle>
  );
}
