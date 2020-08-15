import * as classnames from "classnames";
import css from "page/deck-manager/build/filters/available-cards-filter.module.scss";
import { ButtonGroupStyle } from "page/deck-manager/build/filters/ButtonFilterGroup";
import cssButton from "page/deck-manager/build/filters/ButtonFilterGroup.module.scss";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

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
    <div>
      <button
        className={classnames(cssButton.ButtonInGroupStyle, css.appliedHover)}
        style={{ width: "180px" }}
      >
        <input
          type="checkbox"
          id="toggleAvailable"
          name="toggleAvailable"
          style={{ minWidth: "unset" }}
          value={isToggleAvailableCards}
          onChange={() => setIsToggleAvailableCards((prevIsToggle) => !prevIsToggle)}
        />
        <label htmlFor="toggleAvailable" className={css.labelInline}>
          Toggle {isToggleAvailableCards ? "owned" : "not owned"}
        </label>
      </button>
    </div>
  );

  return (
    <div>
      <label>Filter by available cards</label>
      <ButtonGroupStyle>
        {!toPasteAvailableCards ? copyCommand : !availableCards ? pasteHere : applied}
      </ButtonGroupStyle>
    </div>
  );
}
