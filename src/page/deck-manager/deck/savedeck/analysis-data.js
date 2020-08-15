import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page";
import React from "react";
import styled from "styled-components";

import css from "page/deck-manager/deck/savedeck/analysis-data.module.scss";

const AnalysisDataStyle = styled.div`
  display: flex;
  flex-wrap: wrap;

  padding-top: 0;
`;

export default function AnalysisData({ cards }) {
  const selectedCards = cards.filter(({ iD }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT);
  const totalMana = selectedCards.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.manacost;
  }, 0);

  const numberOfCardsConsideringWildcards = selectedCards.length; // TODO

  const avgMana =
    numberOfCardsConsideringWildcards !== 0
      ? ((totalMana / numberOfCardsConsideringWildcards) * 10) / 10
      : 0;
  return (
    <AnalysisDataStyle>
      <div className={css.property}>
        <b>Average Mana</b> <div>{avgMana}</div>
      </div>
    </AnalysisDataStyle>
  );
}
