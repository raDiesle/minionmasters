import Master from "page/deck-manager/build/masters/master";
import css from "page/deck-manager/build/masters/masters.module.scss";
import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import React from "react";

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
