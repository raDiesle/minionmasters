import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/Page";
import React from "react";
import CardDeckSlotStyle from "../../CardDeckSlotStyle";
import EmptyCardSlotSelected from "../../EmptyCardSlotSelected";
import { Card } from "../Card";
import css from "./card-deck-slot.module.scss";

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
          <div className={css.oneCardStyle}>
            <Card card={card} isDeckCard showDeck isFullWidthClickable>
              {cardActionWrapper(card)}
            </Card>
          </div>
          {count > 1 && (
            <div className={css.wildcardOverlaySecondStyle}>
              <Card card={card} isDeckCard showDeck isFullWidthClickable>
                {cardActionWrapper(card)}
              </Card>
            </div>
          )}
          {count > 2 && (
            <div className={css.wildcardOverlayThirdStyle}>
              <Card card={card} isDeckCard showDeck isFullWidthClickable>
                {cardActionWrapper(card)}
              </Card>
            </div>
          )}
        </>
      ) : isSelectedSlot ? (
        <EmptyCardSlotSelected>Select Card</EmptyCardSlotSelected>
      ) : (
        <div className={css.EmptyCardSlotUnselectedStyle}>&nbsp;</div>
      )}
    </CardDeckSlotStyle>
  );
}
