import React from "react";
import css from "./master-and-cards-container-style.module.scss";

export function DeckMasterAndCardsContainerStyle({ masterEl, children }) {
  return (
    <div className={css.masterAndCardsColumns}>
      <div>{masterEl}</div>
      <div className={css.container}>{children}</div>
    </div>
  );
}
