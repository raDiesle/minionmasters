import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/carddeck/DeckContainer";
import React from "react";
import styled from "styled-components";
import CardDeckSlotStyle from "../../CardDeckSlotStyle";
import EmptyCardSlotSelected from "../../EmptyCardSlotSelected";
import { Card } from "../Card";

const EmptyCardSlotUnselectedStyle = styled.div`
  width: 100%;
  height: calc(100% + 2px);
  margin-top: 1px;
  border: 1px solid #fff;
`;

const WildcardOverlayStyle = styled.div`
  position: absolute;

  color: rgba(255, 255, 255, 0.7);
  font-weight: bolder;

  top: 0;
  right: 20px;
  padding: 25px 0 0 10px;
  font-size: 30px;

  @media (max-width: 767px) {
    top: -10px;
    right: 9px;
    font-size: 20px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export function CardDeckSlot({
  lastSelectedCard: {
    count,
    card,
    card: { iD },
  },
  isSelectedSlot,
  cardActionWrapper,
  setSelectedTabIndex,
}) {
  let CARDS_TAB_INDEX = 0;

  return (
    <CardDeckSlotStyle isSelectedSlot={isSelectedSlot}>
      {iD !== IDENTIFIER_FOR_EMPTY_SLOT ? (
        <Card card={card} isDeckCard showDeck>
          {cardActionWrapper(card)}
          {count > 1 && <WildcardOverlayStyle>x{count}</WildcardOverlayStyle>}
        </Card>
      ) : isSelectedSlot ? (
        <EmptyCardSlotSelected
          onClick={() => setSelectedTabIndex(CARDS_TAB_INDEX)}
        >
          Select Card
        </EmptyCardSlotSelected>
      ) : (
        <EmptyCardSlotUnselectedStyle>&nbsp;</EmptyCardSlotUnselectedStyle>
      )}
    </CardDeckSlotStyle>
  );
}
