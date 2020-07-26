import React from "react";
import { TERM_TO_DESCRIPTION_MAPPING_CONFIG } from "page/cardmodal/card-description";
export default function ListOfMechanics() {
  return (
    <div>
      {Object.values(TERM_TO_DESCRIPTION_MAPPING_CONFIG).map(
        ({ display, description }, index) => (
          <div key={index} style={{ padding: "5px" }}>
            <div style={{ color: "yellow", fontWeight: "bold" }}>
              {display}:
            </div>
            <div>{description}</div>
          </div>
        )
      )}
    </div>
  );
}
