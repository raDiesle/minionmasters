import { is_touch_device } from "components/helper";

import css from "page/deck-manager/deck/how-to-use.module.scss";
import React from "react";

export function HowToUse() {
  const Content = () =>
    is_touch_device() ? (
      <>
        <code>touch</code> to add card Master or Card to deck
        <div>
          <code>long touch</code> to open Master or Card information
        </div>
      </>
    ) : (
      <>
        <span>
          <code>left click mouse</code> to add to deck
        </span>
        <div>
          <code>right click mouse</code> or <code>long hold left mouse</code> to open Master or Card information
        </div>
      </>
    );
  return (
    <div className={css.container}>
      <Content />
    </div>
  );
}
