import React from "react";
import css from "page/deck-manager/deck/master-and-cards-container-style.module.scss";

export function DeckMasterAndCardsContainerStyle({ masterEl, children }) {
  return (
    <div className={css.masterAndCardsColumns}>
      <div>{masterEl}</div>
      <div className={css.container}>{children}</div>
    </div>
  );
}
