import * as classnames from "classnames";
import cssButton from "components/button.module.scss";
import { useGaTrackView } from "footer/consent-cookie-banner";
import { ABILITIES_CONFIG } from "page/abilities-config";
import DeebuffIcon from "page/wiki/abilities/buff-icon";
import BuffIcon from "page/wiki/abilities/debuff-icon";
import css from "page/wiki/static-content.module.scss";
import React, { useState } from "react";

export default function Abilities() {
  useGaTrackView("/Basics/Abilities");
  const [selectedBuff, setSelectedBuff] = useState("ALL");
  return (
    <div className={css.container}>
      <div>
        <div className={cssButton.ButtonGroupStyle}>
          <button
            className={classnames(
              cssButton.ButtonInGroupStyle,
              selectedBuff === "ALL" && cssButton.isButtonActive
            )}
            onClick={() => setSelectedBuff("ALL")}
          >
            All
          </button>
          <button
            className={classnames(
              cssButton.ButtonInGroupStyle,
              selectedBuff === "DEBUFF" && cssButton.isButtonActive
            )}
            onClick={() => setSelectedBuff("DEBUFF")}
          >
            <BuffIcon /> Debuff
          </button>
          <button
            className={classnames(
              cssButton.ButtonInGroupStyle,
              selectedBuff === "BUFF" && cssButton.isButtonActive
            )}
            onClick={() => setSelectedBuff("BUFF")}
          >
            <DeebuffIcon /> Buff
          </button>
        </div>
      </div>
      {ABILITIES_CONFIG.map(({ display, terms }) => (
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
                  "CohortTwo", // obsolete
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
                default:
              }
              return null;
            })
            .map(({ key, display, description }, index) => (
              <div key={index} style={{ padding: "5px" }}>
                <div style={{ color: "yellow", fontWeight: "bold" }}>{display}</div>
                <div>{description}</div>
              </div>
            ))}
        </fieldset>
      ))}
    </div>
  );
}
