import css from "page/deck-manager/deck/radio-button.module.scss";
import React from "react";

export function RadioButton({ ...rest }) {
  return (
    <label className={css.container}>
      {" "}
      <input type="radio" {...rest} />
      <span className={css.checkmark}></span>
    </label>
  );
}
