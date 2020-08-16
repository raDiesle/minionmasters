import React from "react";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import { ButtonGroupStyle } from "page/deck-manager/build/filters/ButtonFilterGroup";
import cssButton from "page/deck-manager/build/filters/ButtonFilterGroup.module.scss";
import css from "page/deck-manager/deck/decks/decks.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

import cssHelpers from "components/helper.module.scss";

export function CopyDeckToGameButton({ master, cards }) {
  return (
    <CopyToClipboard
      text={`/setdeck ${master}: ${cards.map(({ name }) => name).join(", ")}`}
      onCopy={() => {
        toast(
          "Copied to clipboard. Go to game, switch to a slot and paste command and press ENTER. Game must be english language. Experimental feature, might not work!",
          { position: "bottom-right", autoClose: 10000 }
        );
      }}
      title="Copy"
    >
      <ButtonGroupStyle>
        <div className={classnames(css.copyDeck, cssButton.ButtonInGroupStyle)}>
          <FontAwesomeIcon icon={faCopy} />
          <span className={cssHelpers.hideOnMobile}>Copy to game</span>
        </div>
      </ButtonGroupStyle>
    </CopyToClipboard>
  );
}
