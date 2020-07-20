import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const OverlayActionBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px dotted rgba(0, 0, 0, 0.5);
  color: #fff;
`;

const AddMasterToDeckIconStyle = styled(OverlayActionBackground)`
  padding-left: 2px;
`;

const AddMasterToDeckOverlay = styled.div`
  position: absolute;
  top: 0;
  padding: 35px 35px 35px 0;
  left: 0px;

  @media (max-width: 767px) {
    padding: 11px 11px 11px 0;
  }

  //  padding: 15px 15px 15px 0;
  &:hover {
    cursor: pointer;
  }

  &:hover > div {
    color: yellow;
  }
`;

export default function AddMasterToDeck({ setSelectedHero, masterKey }) {
  return (
    <AddMasterToDeckOverlay
      onClick={() => {
        setSelectedHero(masterKey);
      }}
    >
      <AddMasterToDeckIconStyle>
        <FontAwesomeIcon icon={faPlusCircle} size={"sm"} />
      </AddMasterToDeckIconStyle>
    </AddMasterToDeckOverlay>
  );
}
