import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "page/carddeck/carddeck-actionoverlay.module.scss";
import { ButtonGroupStyle, ButtonInGroupStyle } from "page/filters/ButtonFilterGroup";
import InfoDetailsCardOverlay from "page/InfoDetailsCardOverlay";
import React, { useState } from "react";
import ClickNHold from "react-click-n-hold";

export default function CardForDeckActionOverlay({ setSelectedCardEvent, card, card: { iD } }) {
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const handleOnClick = (iDToSelectCard) => {
    setSelectedCardEvent({
      eventId: Math.random(),
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
          cardEventComponent={(iDFromModal) =>
            false && (
              <ButtonGroupStyle style={{ paddingTop: "15px" }}>
                <ButtonInGroupStyle onClick={() => handleOnClick(iDFromModal)}>
                  <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: "5px" }} /> Add Card to
                  deck
                </ButtonInGroupStyle>
              </ButtonGroupStyle>
            )
          }
        />
      )}
    </>
  );
}
