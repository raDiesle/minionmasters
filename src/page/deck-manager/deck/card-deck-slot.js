import * as classnames from "classnames";
import { WildcardIcon } from "components/wildcard-icon";
import { Card } from "page/deck-manager/build/cards/card/card";
import css from "page/deck-manager/deck/card-deck-slot.module.scss";
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
  return (
    <div className={css.CardDeckSlotStyleDefinition}>
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
        <div className={css.EmptyCardSlotSelectedStyle}>Select Card</div>
      ) : (
        <div className={css.EmptyCardSlotUnselectedStyle}>&nbsp;</div>
      )}
    </div>
  );
}
