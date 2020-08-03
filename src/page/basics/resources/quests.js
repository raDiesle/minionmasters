import { anchorLinkTarget } from "components/helper";
import { MENU_LINKS_CONFIG } from "page/basics/resource-mgmt";
import React from "react";

export default function Quests() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Quests"])}
      <fieldset>
        <legend>Example Rewards</legend>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
          <img
            src="img/basics/resource_dailyquests.png"
            alt="dailyquests"
            style={{ width: "100%", maxWidth: "300px" }}
          />
          <img
            src="img/basics/resource_specialquests.png"
            alt="specialquests"
            style={{ width: "100%", maxWidth: "300px" }}
          />
        </div>
      </fieldset>
    </div>
  );
}
