import css from "page/deck-manager/deck/decks/description-read-only.module.scss";
import React from "react";

export default function DeckDescription({ description }) {
  return (
    <div>
      <div className={css.description}>{description}</div>
    </div>
  );
}
