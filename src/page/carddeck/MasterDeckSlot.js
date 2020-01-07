import styled from "styled-components";
import React from "react";

const MasterDeckSlotStyle = styled.div`
    width: 100px;
    height: 128px;
    
    @media (max-width: 767px) {
      height: 71px;
      width: 60px;
    }
    
    border: 1px rebeccapurple dotted;
    border-radius: 40px;
    margin-right: 20px !important;
    text-align: center;
`;

export default function MasterDeckSlot() {
    return <MasterDeckSlotStyle>Master-Feature coming soon.</MasterDeckSlotStyle>;
}