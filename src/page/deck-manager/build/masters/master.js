import { imgPathFn } from "components/helper";
import React from "react";

import css from "page/deck-manager/build/masters/master.module.scss";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";

export default function Master({ masterKey, actionRegistrationComponent }) {
  const IMG_PATH = imgPathFn(mastersMapping[masterKey].icon);

  return (
    <div className={css.MasterSelectedContainer}>
      <div className={css.MasterContentStyle}>
        {/* hack */}
        {actionRegistrationComponent && actionRegistrationComponent(masterKey)}
        <img className={css.MasterImgStyle} src={IMG_PATH} alt={masterKey} />
      </div>
    </div>
  );
}
