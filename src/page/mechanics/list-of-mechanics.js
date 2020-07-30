import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeebuffIcon from "components/buff-icon";
import BuffIcon from "components/debuff-icon";
import { ButtonGroupStyle, ButtonInGroupStyle } from "page/filters/ButtonFilterGroup";
import React from "react";
import { TERMS_CONFIG } from "page/terms-config";
import css from "./list-of-mechanics.module.scss";

export default function ListOfMechanics() {
  return (
    <div className={css.container}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <FontAwesomeIcon icon={faTools} size="2x" color="yellow" style={{ paddingRight: "10px" }} />
        {"  "} Page under construction
      </div>
      <div>
        <ButtonGroupStyle>
          <ButtonInGroupStyle>
            <BuffIcon /> Debuff
          </ButtonInGroupStyle>
          <ButtonInGroupStyle>
            <DeebuffIcon /> Buff
          </ButtonInGroupStyle>
        </ButtonGroupStyle>
      </div>
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
