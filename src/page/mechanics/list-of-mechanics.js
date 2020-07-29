import React from "react";
import { TERMS_CONFIG } from "page/terms-config";
import css from "./list-of-mechanics.module.scss";

export default function ListOfMechanics() {
  return (
    <div className={css.container}>
      {TERMS_CONFIG.map(({ display, terms }) => (
        <fieldset style={{ marginTop: "20px" }}>
          <legend>{display}</legend>
          {terms
            .filter(
              ({ key }) =>
                ![
                  "Stuns",
                  "Taunt",
                  "Poison",
                  "Mana Freeze (1)",
                  "Mana Freeze (2)",
                  "OverloadMulti",
                  "Voidborne Wound",
                  "BerryBuffPlural",
                  "CohortTwo",
                ].includes(key)
            )
            .map(({ key, display, description }, index) => (
              <div key={index} style={{ padding: "5px" }}>
                <div style={{ color: "yellow", fontWeight: "bold" }}>{display}:</div>
                <div>{description}</div>
              </div>
            ))}
        </fieldset>
      ))}
    </div>
  );
}
