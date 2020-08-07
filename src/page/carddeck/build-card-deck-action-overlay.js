import css from "page/carddeck/carddeck-actionoverlay.module.scss";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/carddeck/DeckContainer";
import InfoDetailsCardOverlay from "page/InfoDetailsCardOverlay";
import React, { useState } from "react";
import LongPress from "react-long";

export default function BuildCardDeckActionOverlay({
  setLastSelectedCards,
  setSelectedCardEvent,
  setCurrentSelectedSlot,
  slotPos,
  card,
}) {
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const handleRemoveCard = (slotPos) =>
    setLastSelectedCards((prevSelectedCards) => {
      const selectedCardsWithRemovedCard = [...prevSelectedCards];

      const hasAnyWildcard = prevSelectedCards[slotPos].count > 1;

      if (hasAnyWildcard) {
        selectedCardsWithRemovedCard[slotPos] = {
          eventId: Math.random(),
          card: prevSelectedCards[slotPos].card,
          count: prevSelectedCards[slotPos].count - 1,
        };

        setSelectedCardEvent({
          eventId: Math.random(),
          card: prevSelectedCards[slotPos].card,
          action: "reduced",
        });
      } else {
        selectedCardsWithRemovedCard[slotPos] = {
          eventId: Math.random(),
          card: {
            iD: IDENTIFIER_FOR_EMPTY_SLOT,
          },
        };
        setSelectedCardEvent({
          eventId: Math.random(),
          card: { iD: IDENTIFIER_FOR_EMPTY_SLOT },
        });
        const nextFreeSlot = selectedCardsWithRemovedCard.findIndex(
          ({ card: { iD } }) => iD === IDENTIFIER_FOR_EMPTY_SLOT
        );
        setCurrentSelectedSlot(nextFreeSlot);
      }
      return selectedCardsWithRemovedCard;
    });

  const handleOnClick = () => {
    handleRemoveCard(slotPos);
  };
  const handleOnContextMenu = (event) => {
    event && event.preventDefault();
    setIsOpenDetails(true);
  };

  return (
    <>
      <LongPress time={200} onLongPress={(event) => handleOnContextMenu(event)}>
        <div
          className={css.fullCardWidthActionOverlay}
          onClick={(event) => {
            handleOnClick(event);
          }}
          onContextMenu={(event) => {
            handleOnContextMenu(event);
          }}
        ></div>
      </LongPress>
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
