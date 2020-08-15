import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/carddeck/deck-manager";
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
  position: relative;

  color: rgb(240, 255, 51);
  font-weight: bolder;

  top: -86px;
  right: -8px;
  font-size: 14px;

  @media (max-width: 767px) {
    top: -54px;
    right: -5px;
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
}) {
  return (
    <CardDeckSlotStyle isSelectedSlot={isSelectedSlot}>
      {iD !== IDENTIFIER_FOR_EMPTY_SLOT ? (
        <>
          <Card card={card} isDeckCard showDeck isFullWidthClickable>
            {cardActionWrapper(card)}
          </Card>
          {count > 1 && (
            <WildcardOverlayStyle>
              <Card card={card} isDeckCard showDeck isFullWidthClickable>
                {cardActionWrapper(card)}
              </Card>
            </WildcardOverlayStyle>
          )}
        </>
      ) : isSelectedSlot ? (
        <EmptyCardSlotSelected>Select Card</EmptyCardSlotSelected>
      ) : (
        <EmptyCardSlotUnselectedStyle>&nbsp;</EmptyCardSlotUnselectedStyle>
      )}
    </CardDeckSlotStyle>
  );
}
