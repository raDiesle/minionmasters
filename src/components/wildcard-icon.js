import * as classnames from "classnames";
import React from "react";
import css from "./wildcard-icon.module.scss";

export function WildcardIcon({ isSecond = false }) {
  return (
    <div className={classnames(css.wildcardRibbon, isSecond ? css.isSecond : css.isFirst)}>
      <div>WC</div>
    </div>
  );
}
