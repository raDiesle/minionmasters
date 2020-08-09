import { imgPathFn } from "components/helper";
import React from "react";
import styled from "styled-components";
import { mastersMapping } from "./mastersMapping";

const MasterContentStyle = styled.div`
  position: relative;
  //   margin-right: 2px;
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
  const IMG_PATH = imgPathFn(mastersMapping[masterKey].icon);

  return (
    <MasterSelectedContainer>
      <MasterContentStyle>
        {/* hack */}
        {actionRegistrationComponent && actionRegistrationComponent(masterKey)}
        <MasterImgStyle src={IMG_PATH} alt={masterKey} />
      </MasterContentStyle>
    </MasterSelectedContainer>
  );
}
