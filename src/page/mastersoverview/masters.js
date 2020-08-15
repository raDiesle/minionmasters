import React from "react";

import Master from "./master";
import css from "./masters.module.scss";
import { mastersMapping } from "./mastersMapping";

export default function Masters({ actionRegistrationComponent }) {
  return (
    <div className={css.masters}>
      {Object.keys(mastersMapping).map((masterKey) => (
        <div key={masterKey} className={css.masterContainer}>
          <Master masterKey={masterKey} actionRegistrationComponent={actionRegistrationComponent} />
        </div>
      ))}
    </div>
  );
}
