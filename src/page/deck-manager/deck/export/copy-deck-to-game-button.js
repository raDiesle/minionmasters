import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import cssButton from "components/button.module.scss";

import cssHelpers from "components/helper.module.scss";
import mToast from "components/mToast";
import { getCardNamesFromCount } from "page/deck-manager/deck/export/export-helper";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export function CopyDeckToGameButton({ master, cards }) {
  const cardNamesFromCount = getCardNamesFromCount(cards);
  return (
    <CopyToClipboard
      text={`/setdeck ${master}: ${cardNamesFromCount.join(", ")}`}
      onCopy={() => {
        mToast(
          <div>
            <div>Copied to clipboard.</div>
            <ol>
              <li>open game</li>
              <li>choose a slot</li>
              <li>paste command in chat</li>
              <li>press ENTER</li>
            </ol>
          </div>,
          { position: "bottom-right", autoClose: 10000 }
        );
      }}
      title="Copy"
    >
      <div className={cssButton.ButtonGroupStyle}>
        <button
          className={classnames(
            cssButton.buttonSpacingNoTextOnMobile,
            cssButton.ButtonInGroupStyle
          )}
        >
          <FontAwesomeIcon icon={faCopy} />
          <span className={cssHelpers.hideOnMobile}>Copy to game</span>
        </button>
      </div>
    </CopyToClipboard>
  );
}
