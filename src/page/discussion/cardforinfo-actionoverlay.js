import css from "page/deck-manager/deck/carddeck-actionoverlay.module.scss";
import InfoDetailsCardOverlay from "page/deck-manager/build/cards/card/info-details-card-overlay";
import React, { useState } from "react";
import ClickNHold from "react-click-n-hold";

export default function CardforInfoActionOverlay({ card }) {
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const handleEvent = (event) => {
    event.preventDefault();
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
          onClick={(event) => handleEvent(event)}
          onContextMenu={(event) => handleEvent(event)}
          className={css.fullCardWidthActionOverlay}
        ></div>
      </ClickNHold>
      {isOpenDetails && (
        <InfoDetailsCardOverlay
          card={card}
          isFullWidthClickable={true}
          isOpenDetails={isOpenDetails}
          setIsOpenDetails={setIsOpenDetails}
        />
      )}
    </>
  );
}
