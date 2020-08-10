import DeebuffIcon from "components/buff-icon";
import BuffIcon from "components/debuff-icon";
import { useGaTrackView } from "consent-banner";
import css from "page/basics/static-content.module.scss";
import { ButtonGroupStyle, ButtonInGroupStyle } from "page/filters/ButtonFilterGroup";
import { TERMS_CONFIG } from "page/terms-config";
import React, { useState } from "react";

export default function ListOfMechanics() {
  useGaTrackView("/Basics/ListOfMechanics");
  const [selectedBuff, setSelectedBuff] = useState("ALL");
  return (
    <div className={css.container}>
      <div>
        <ButtonGroupStyle>
          <ButtonInGroupStyle
            onClick={() => setSelectedBuff("ALL")}
            isButtonActive={selectedBuff === "ALL"}
          >
            All
          </ButtonInGroupStyle>
          <ButtonInGroupStyle
            onClick={() => setSelectedBuff("DEBUFF")}
            isButtonActive={selectedBuff === "DEBUFF"}
          >
            <BuffIcon /> Debuff
          </ButtonInGroupStyle>
          <ButtonInGroupStyle
            isButtonActive={selectedBuff === "BUFF"}
            onClick={() => setSelectedBuff("BUFF")}
          >
            <DeebuffIcon /> Buff
          </ButtonInGroupStyle>
        </ButtonGroupStyle>
      </div>
      {TERMS_CONFIG.map(({ display, terms }) => (
        <fieldset style={{ marginTop: "20px" }} key={display}>
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
            .filter(({ isBuff }) => {
              switch (selectedBuff) {
                case "ALL":
                  return true;
                case "BUFF":
                  return isBuff;
                case "DEBUFF":
                  return !isBuff;
              }
            })
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
