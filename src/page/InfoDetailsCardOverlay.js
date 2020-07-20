import {faInfoCircle} from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import CardDetailsModal from "./CardDetailsModal";
import css from "./InfoDetailsCardOverlay.module.scss";

export default function InfoDetailsCardOverlay({
  card,
  isFullWidthClickable = false,
}) {
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  return (
    <>
      {isOpenDetails ? (
        <CardDetailsModal
          isOpenDetails={isOpenDetails}
          setIsOpenDetails={setIsOpenDetails}
          card={card}
          key={card.iD}
        />
      ) : null}

      <div
        className={css.InfoDetailsOverlay}
        style={{
          padding: isFullWidthClickable ? "50% 0 36% 100%" : "50% 0 36% 30%",
        }}
        onClick={(event) => {
          setIsOpenDetails(true);
          event.stopPropagation();
        }}
      >
        {isFullWidthClickable === false && (
          <div className={css.InfoIconStyle}>
            <FontAwesomeIcon icon={faInfoCircle} size={"sm"} />
          </div>
        )}
      </div>
    </>
  );
}
