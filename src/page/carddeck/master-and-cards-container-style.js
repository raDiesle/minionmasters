import React from "react";
import css from "./master-and-cards-container-style.module.scss";

export function MasterAndCardsContainerStyle({ children }) {
  return <div className={css.container}>{children}</div>;
}
