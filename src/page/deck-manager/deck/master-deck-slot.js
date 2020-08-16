import Master from "page/deck-manager/build/masters/master";
import BuildMasterDeckActionOverlay from "page/deck-manager/deck/build-master-deck-action-overlay";
import React from "react";
import styled from "styled-components";

const MasterDeckSlotStyle = styled.div`
  display: flex;

  position: relative;

  width: 90px;
  height: 90px;
  margin-top: 3px;
  //margin-right: 7px;

  @media (max-width: 767px) {
    height: 59px;
    width: 59px;
    //margin-top: 5px;
  }
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

export default function MasterDeckSlot({ selectedMaster, setSelectedMaster }) {
  return (
    <MasterDeckSlotStyle>
      <div>
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
          <MasterPlaceholder>Select Master</MasterPlaceholder>
        )}
      </div>
    </MasterDeckSlotStyle>
  );
}
