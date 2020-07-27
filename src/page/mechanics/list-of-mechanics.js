import React from "react";
import { TERMS_CONFIG } from "page/terms-config";
export default function ListOfMechanics() {
  return (
    <div>
      {TERMS_CONFIG.map(({ display, terms }) => (
        <fieldset style={{ marginTop: "20px" }}>
          <legend>{display}</legend>
          {terms.map(({ display, description }, index) => (
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
