import React from "react";
import styled from "styled-components";

const AnalysisDataStyle = styled.div`
  padding-top: 25px;
`;

export default function AnalysisData({cards}) {

    const totalMana = cards.reduce((accumulator, currentValue) => {
        return (accumulator + currentValue.manacost);
    }, 0);

    const numberOfCardsConsideringWildcards = cards.length; // TODO

    const avgMana = (totalMana / numberOfCardsConsideringWildcards * 10) / 10;
    return (
        <AnalysisDataStyle>
            Average Mana : {avgMana}
        </AnalysisDataStyle>
    )
}