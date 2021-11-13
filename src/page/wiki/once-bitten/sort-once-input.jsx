import React from "react";
import cssButton from "components/button.module.scss";
import * as classnames from "classnames";
import Tooltip from "rc-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAmountUp } from "@fortawesome/free-solid-svg-icons/faSortAmountUp";
import { faSortAmountDown } from "@fortawesome/free-solid-svg-icons/faSortAmountDown";


export function SortOnceInput({ sortByProp, setSortByProp}){

  return <div>
    <div className={cssButton.ButtonGroupStyle}>
      <button
        className={classnames([
          sortByProp === "asc" ? cssButton.isButtonActive : cssButton.isButtonInactive,
          cssButton.ButtonInGroupStyleWithState,
        ])}
        onClick={() => setSortByProp("asc")}
      >
        <Tooltip placement="bottomRight" overlay={<span> Sort by Remaining Health Ascending</span>}>
          <FontAwesomeIcon icon={faSortAmountUp} />
        </Tooltip>
      </button>
      <button
        className={classnames([
          sortByProp === "desc" ? cssButton.isButtonActive : cssButton.isButtonInactive,
          cssButton.ButtonInGroupStyleWithState,
        ])}
        onClick={() => setSortByProp("desc")}
      >
        <Tooltip placement="bottomRight" overlay={<span> Sort By Remaining Health Descending</span>}>
          <FontAwesomeIcon icon={faSortAmountDown} />
        </Tooltip>
      </button>
    </div>
  </div>
}