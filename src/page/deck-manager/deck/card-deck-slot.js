import * as classnames from "classnames";
import { WildcardIcon } from "components/wildcard-icon";
import isEmpty from "lodash/isEmpty";
import { Card } from "page/deck-manager/build/cards/card/card";
import CardDeckSlotStyle from "page/deck-manager/deck/card-deck-slot-style";
import css from "page/deck-manager/deck/card-deck-slot.module.scss";
import EmptyCardSlotSelected from "page/deck-manager/deck/empty-card-slot-selected";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page-config";
import React from "react";

export function CardDeckSlot({
  lastSelectedCard: {
    count,
    card,
    card: { iD },
  },
  isSelectedSlot,
  cardActionWrapper,
  availableCards,
}) {
  const isAvailableCardsDefined = !isEmpty(availableCards);
  return (
    <CardDeckSlotStyle isSelectedSlot={isSelectedSlot}>
      {iD !== IDENTIFIER_FOR_EMPTY_SLOT ? (
        <>
          <div className={css.oneCardStyle}>
            <Card
              card={card}
              isDeckCard
              showDeck
              isFullWidthClickable
              availableCards={availableCards}
            >
              {cardActionWrapper(card)}
            </Card>
          </div>

          {count > 1 && (
            <div className={classnames(css.wildcardOverlaySecondStyle, css.noOpacityOverride)}>
              <Card
                card={card}
                isDeckCard
                showDeck
                isFullWidthClickable
                availableCards={availableCards}
              >
                {cardActionWrapper(card)}
                <WildcardIcon />
              </Card>
            </div>
          )}
          {count > 2 && (
            <div className={classnames(css.wildcardOverlayThirdStyle, css.noOpacityOverride)}>
              <Card
                card={card}
                isDeckCard
                showDeck
                isFullWidthClickable
                availableCards={availableCards}
              >
                {cardActionWrapper(card)}
                <WildcardIcon />
                <WildcardIcon isSecond />
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
