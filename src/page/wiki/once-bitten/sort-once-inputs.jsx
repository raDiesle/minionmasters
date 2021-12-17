import React from "react";
import { SortOnceInput } from "page/wiki/once-bitten/sort-once-input";
import cssButton from "components/button.module.scss";
import { BY_REMAINING_HEALTH, BY_MANA_EFFICIENCY } from "page/wiki/once-bitten/once-bitten";
import * as classnames from "classnames";
import css from "./sort-once-inputs.module.scss";
import Tooltip from "rc-tooltip";

export function SortOnceInputs({ sortByProp, setSortByProp, order, setOrder }) {
  return <div className={css.container}>
    <div className={css.container}>

      <div className={css.ascDesc}>
        <div>Sort by:</div>

        <div className={cssButton.ButtonGroupStyle}>
          <button
            value={sortByProp === BY_REMAINING_HEALTH}
            className={classnames([
              sortByProp === BY_REMAINING_HEALTH ? cssButton.isButtonActive : cssButton.isButtonInactive,
              cssButton.ButtonInGroupStyleWithState
            ])}
            onClick={() => setSortByProp(BY_REMAINING_HEALTH)}
          >
            By remaining health on last hit
          </button>

          <Tooltip placement="topLeft"
                   overlay={<span>( Mana cost / Unit Count => remaining health percentage in relation to minions health and its total cost)</span>}>
            <button
              className={classnames([
                sortByProp === BY_MANA_EFFICIENCY ? cssButton.isButtonActive : cssButton.isButtonInactive,
                cssButton.ButtonInGroupStyleWithState
              ])}
              value={sortByProp === BY_MANA_EFFICIENCY}
              onClick={() =>
                setSortByProp(BY_MANA_EFFICIENCY)
              }
            >
              by Mana efficiency
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
    <div className={css.ascDesc}>
      Ascending | Descending
      <SortOnceInput {...{ sortByProp: order, setSortByProp: setOrder }} />
    </div>
  </div>;
}