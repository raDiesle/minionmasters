import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/carddeck/DeckContainer";
import React from "react";
import styled from "styled-components";

const AnalysisDataStyle = styled.div`
  padding-top: 25px;
`;

export default function AnalysisData({ cards }) {
  const selectedCards = cards.filter(
    ({ iD }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT
  );
  const totalMana = selectedCards.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.manacost;
  }, 0);

  const numberOfCardsConsideringWildcards = selectedCards.length; // TODO

  const avgMana =
    numberOfCardsConsideringWildcards !== 0
      ? ((totalMana / numberOfCardsConsideringWildcards) * 10) / 10
      : 0;
  return <AnalysisDataStyle>Average Mana : {avgMana}</AnalysisDataStyle>;
}
