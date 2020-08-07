import css from "page/carddeck/carddeck-actionoverlay.module.scss";
import InfoDetailsCardOverlay from "page/InfoDetailsCardOverlay";
import React, { useState } from "react";
import LongPress from "react-long";

export default function CardforInfoActionOverlay({ card }) {
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const handleEvent = (event) => {
    event.preventDefault();
    setIsOpenDetails(true);
  };
  return (
    <>
      <LongPress time={200} onLongPress={(event) => handleEvent(event)}>
        <div
          onClick={(event) => handleEvent(event)}
          onContextMenu={(event) => handleEvent(event)}
          className={css.fullCardWidthActionOverlay}
        ></div>
      </LongPress>
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
