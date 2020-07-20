import React from "react";
import styled from "styled-components";

const CardDeckSlotStyleDefinition = styled.div`
  width: 80px;
  height: 95px;

  @media (max-width: 767px) {
    height: 59px;
    width: 50px;
  }

  // margin-bottom: 5px;
  margin-top: 0;
  margin-bottom: 6px;
  margin-right: 2px;
`;

export default function CardDeckSlotStyle({ children }) {
  return <CardDeckSlotStyleDefinition>{children}</CardDeckSlotStyleDefinition>;
}
