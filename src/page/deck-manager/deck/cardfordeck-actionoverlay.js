import mToast from "components/mToast";
import allCardsData from "generated/jobCardProps.json";
import cloneDeep from "lodash/cloneDeep";
import css from "page/deck-manager/deck/carddeck-actionoverlay.module.scss";
import { findFirstNextFreeSlot } from "page/deck-manager/deck/deck-manager";
import InfoDetailsCardOverlay from "page/deck-manager/build/cards/card/info-details-card-overlay";
import React, { useState } from "react";
import ClickNHold from "react-click-n-hold";

export default function CardForDeckActionOverlay({ card, card: { iD }, setLastSelectedCards }) {
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const handleSelectedCard = ({ card: { iD: selectedCardId } }) => {
    setLastSelectedCards((lastSelectedCards) => {
      const cardToAdd = allCardsData.find((cardsData) => cardsData.iD === selectedCardId);
      const newLastSelectedCards = cloneDeep(lastSelectedCards);

      const isCardNotInDeckYet =
        typeof lastSelectedCards.find(({ card: { iD } }) => selectedCardId === iD) === "undefined";
      if (isCardNotInDeckYet) {
        // add card
        const nextFreeSlot = findFirstNextFreeSlot(lastSelectedCards);

        if (typeof nextFreeSlot == "undefined") {
          mToast("Deck is full!");
          return lastSelectedCards;
        }

        newLastSelectedCards[nextFreeSlot] = {
          card: cardToAdd,
          count: 1,
        };

        mToast("Card added to Deck");
        return newLastSelectedCards;
      } else {
        const consideredOngoingCount = 1;

        const LIMIT_OF_WILDCARDS_ALL_OVER = 3;

        const numberOfWildcards = lastSelectedCards
          .map(({ count }) => count)
          .reduce((total, current) => {
            const STARTING_TO_BE_WILDCARD_COUNT_CONSIDERED = 1;
            return current > STARTING_TO_BE_WILDCARD_COUNT_CONSIDERED ? total + current : total;
          }, consideredOngoingCount);

        const isAllowedToAddAnotherWildcard = numberOfWildcards <= LIMIT_OF_WILDCARDS_ALL_OVER;

        if (isAllowedToAddAnotherWildcard) {
          const positionOfExistingOccurence = lastSelectedCards.findIndex(
            ({ card: { iD } }) => selectedCardId === iD
          );
          newLastSelectedCards[positionOfExistingOccurence] = {
            card: newLastSelectedCards[positionOfExistingOccurence].card,
            count: newLastSelectedCards[positionOfExistingOccurence].count + 1,
          };

          mToast("Card added to Deck");
          return newLastSelectedCards;
        } else {
          mToast("Wildcard limit reached.");
          return lastSelectedCards;
        }
      }
    });
  };

  const handleOnClick = (iDToSelectCard) => {
    handleSelectedCard({
      card: {
        iD: iDToSelectCard,
      },
    });
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
          onClick={() => handleOnClick(iD)}
          className={css.fullCardWidthActionOverlay}
          onContextMenu={(event) => handleOnContextMenu(event)}
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
