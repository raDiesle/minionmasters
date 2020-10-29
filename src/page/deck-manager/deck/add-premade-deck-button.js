import { faUserFriends } from "@fortawesome/free-solid-svg-icons/faUserFriends";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import cssButton from "components/button.module.scss";
import cssHelpers from "components/helper.module.scss";
import mToast from "components/mToast";
import Tooltip from "rc-tooltip";
import React from "react";

export function AddPremadeDeckButton({ setIsPremadeDeckActive }) {
  const handleButtonClick = () => {
    setIsPremadeDeckActive(true);

    mToast("Deck of first Premade stored in background");
  };

  return (
    <div className={cssButton.ButtonGroupStyle}>
      <Tooltip placement="bottomLeft" overlay={<span>Select for premade</span>}>
        <button
          className={classnames(
            cssButton.buttonSpacingNoTextOnMobile,
            cssButton.ButtonInGroupStyle
          )}
          onClick={() => handleButtonClick()}
        >
          <FontAwesomeIcon icon={faUserFriends} />
          <span className={cssHelpers.hideOnMobile}>Add 2on2 Premade Team Deck</span>
        </button>
      </Tooltip>
    </div>
  );
}
