import cloneDeep from "lodash/cloneDeep";
import InfoDetailsCardOverlay from "page/deck-manager/build/cards/card/info-details-card-overlay";
import css from "page/deck-manager/deck/carddeck-actionoverlay.module.scss";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page-config";
import React, { useState } from "react";
import ClickNHold from "react-click-n-hold";

export default function BuildCardDeckActionOverlay({ setLastSelectedCards, card }) {
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const handleRemoveCard = () =>
    setLastSelectedCards((prevSelectedCards) => {
      const slotPos = prevSelectedCards.findIndex(({ card: { iD } }) => iD === card.iD);
      const selectedCardsWithRemovedCard = cloneDeep(prevSelectedCards);

      const hasAnyWildcard = prevSelectedCards[slotPos].count > 1;

      if (hasAnyWildcard) {
        selectedCardsWithRemovedCard[slotPos] = {
          card: prevSelectedCards[slotPos].card,
          count: prevSelectedCards[slotPos].count - 1,
        };
      } else {
        selectedCardsWithRemovedCard[slotPos] = {
          card: {
            iD: IDENTIFIER_FOR_EMPTY_SLOT,
          },
        };
      }
      return selectedCardsWithRemovedCard;
    });

  const handleOnClick = () => {
    handleRemoveCard();
  };
  const handleOnContextMenu = (event) => {
    event && event.preventDefault();
    setIsOpenDetails(true);
  };

  return (
    <>
      <ClickNHold
        time={0.3}
        onClickNHold={() => {
          setIsOpenDetails(true);
        }}
      >
        <div
          className={css.fullCardWidthActionOverlay}
          onClick={(event) => {
            handleOnClick(event);
          }}
          onContextMenu={(event) => {
            handleOnContextMenu(event);
          }}
        ></div>
      </ClickNHold>
      {isOpenDetails && (
        <InfoDetailsCardOverlay
          card={card}
          isOpenDetails={isOpenDetails}
          setIsOpenDetails={setIsOpenDetails}
        />
      )}
    </>
  );
}
