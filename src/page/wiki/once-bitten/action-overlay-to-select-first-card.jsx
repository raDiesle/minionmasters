import css from "page/deck-manager/deck/carddeck-actionoverlay.module.scss";
import React from "react";

export function ActionOverlayToSelectFirstCard({card, setCurrentSelectedCard}){
  const handleOnClick = () => {
    setCurrentSelectedCard(card);
  }
  return <div
    className={css.fullCardWidthActionOverlay}
    onClick={(event) => {
      handleOnClick(event);
    }}
  ></div>
}