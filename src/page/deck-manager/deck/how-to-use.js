import { is_touch_device } from "components/helper";

import css from "page/deck-manager/deck/how-to-use.module.scss";
import React from "react";

export function HowToUse() {
  return (
    <div className={css.container}>
      {is_touch_device() ? (
        <code>long touch</code>
      ) : (
        <>
          <code>left click mouse</code> to add to deck. <code>right click mouse</code> or{" "}
          <code>long hold left mouse</code>
        </>
      )}{" "}
      to open Master or Card information
    </div>
  );
}
