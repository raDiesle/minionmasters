import { ButtonGroupStyle } from "page/filters/ButtonFilterGroup";
import cssButton from "page/filters/ButtonFilterGroup.module.scss";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import css from "page/filters/available-cards-filter.module.scss";

export default function AvailableCardsFilter({
  availableCards,
  setAvailableCards,
  isToggleAvailableCards,
  setIsToggleAvailableCards,
  toPasteAvailableCards,
  setToPasteAvailableCards,
}) {
  const copyCommand = (
    <CopyToClipboard
      text={"/gaoc"}
      onCopy={() => {
        toast("Command copied. Paste it anywhere in Minionmasters game chat and press ENTER.");
        setToPasteAvailableCards(true);
      }}
      title="Filter your available cards"
    >
      <button className={cssButton.ButtonInGroupStyle}>
        <div>Click to copy command</div>
      </button>
    </CopyToClipboard>
  );

  const pasteHere = (
    <input
      type="text"
      placeholder="paste here: CTRL+V "
      onChange={(e) => {
        const pastedValue = e.currentTarget.value;
        if (pastedValue) {
          setAvailableCards(pastedValue.split(" ").map(Number));
        }
      }}
    />
  );

  const applied = (
    <div className={css.appliedContainer}>
      <button className={cssButton.ButtonInGroupStyle}>
        <input
          type="checkbox"
          id="toggleAvailable"
          name="toggleAvailable"
          value={isToggleAvailableCards}
          onChange={() => setIsToggleAvailableCards((prevIsToggle) => !prevIsToggle)}
        />
        <label htmlFor="toggleAvailable" style={{ width: "135px", textAlign: "left" }}>
          Toggle {isToggleAvailableCards ? "owned" : "not owned"}
        </label>
      </button>
    </div>
  );

  return (
    <div>
      Filter by available cards
      <ButtonGroupStyle>
        {!toPasteAvailableCards ? copyCommand : !availableCards ? pasteHere : applied}
      </ButtonGroupStyle>
    </div>
  );
}
