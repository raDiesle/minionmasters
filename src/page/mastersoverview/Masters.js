import React from "react";
import styled from "styled-components";

import Master from "./master";
import { mastersMapping } from "./mastersMapping";

const MastersStyle = styled.a`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export default function Masters({ actionRegistrationComponent }) {
  return (
    <MastersStyle name="mastersview">
      {Object.keys(mastersMapping).map((masterKey) => (
        <div key={masterKey}>
          <Master masterKey={masterKey} actionRegistrationComponent={actionRegistrationComponent} />
        </div>
      ))}
    </MastersStyle>
  );
}
