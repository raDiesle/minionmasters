import React from "react";
import styled from "styled-components";

const AnalysisDataStyle = styled.div`
  padding-top: 25px;
`;

export default function AnalysisData({cards}) {

    const avgMana = cards.reduce((accumulator, currentValue) => {
        return (accumulator + currentValue.manacost) / cards.length;
    }, 0);

    return (
        <AnalysisDataStyle>
            Average Mana : {avgMana}
        </AnalysisDataStyle>
    )
}