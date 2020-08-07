import { imgPathFn } from "components/helper";
import { gaTrackView } from "firestore";
import React from "react";
import styled from "styled-components";
import { mastersMapping } from "./mastersMapping";

const OverlayActionBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px dotted rgba(0, 0, 0, 0.5);
  color: #fff;
`;
const IconStyle = styled(OverlayActionBackground)`
  padding-left: 2px;
`;

const MasterContentStyle = styled.div`
  position: relative;
  //   margin-right: 2px;
`;

const InfoMasterDetailsOverlay = styled.div`
  position: absolute;
  top: 0px;
  padding: 35px 0
    ${({ actionRegistrationComponent }) => (actionRegistrationComponent === null ? "56px" : "35px")}
    ${({ actionRegistrationComponent }) => (actionRegistrationComponent === null ? "90px" : "35px")};
  right: 0px;

  @media (max-width: 767px) {
    padding: ${({ actionRegistrationComponent }) =>
        actionRegistrationComponent === null ? "40px" : "11px"}
      0 11px
      ${({ actionRegistrationComponent }) =>
        actionRegistrationComponent === null ? "50px" : "11px"};
  }

  &:hover {
    cursor: pointer;
  }

  &:hover > div {
    color: yellow;
  }
`;

const MasterImgStyle = styled.img`
  width: 90px;
  height: auto;

  @media (max-width: 767px) {
    width: 50px;
    height: auto;
  }
`;

const MasterSelectedContainer = styled.div`
  border: 2px groove #000;
  border-radius: 50%;
  overflow: hidden;

  &:hover {
    border-color: yellow;
  }
`;

export default function Master({ masterKey, actionRegistrationComponent }) {
  gaTrackView(`/Master/${masterKey}`);

  const IMG_PATH = imgPathFn(mastersMapping[masterKey].icon);

  return (
    <MasterSelectedContainer>
      <MasterContentStyle>
        {actionRegistrationComponent && actionRegistrationComponent(masterKey)}
        <MasterImgStyle src={IMG_PATH} alt={masterKey} />
      </MasterContentStyle>
    </MasterSelectedContainer>
  );
}
