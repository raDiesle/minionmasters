import React from "react";

import Master from "./master";
import css from "./masters.module.scss";
import { mastersMapping } from "./mastersMapping";

export default function Masters({ actionRegistrationComponent }) {
  return (
    <a className={css.masters} name="mastersview">
      {Object.keys(mastersMapping).map((masterKey) => (
        <div key={masterKey} className={css.masterContainer}>
          <Master masterKey={masterKey} actionRegistrationComponent={actionRegistrationComponent} />
        </div>
      ))}
    </a>
  );
}
