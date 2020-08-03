import { anchorLinkTarget } from "components/helper";
import { MENU_LINKS_CONFIG } from "page/basics/resource-mgmt";
import React from "react";

export default function Achievements() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Achievements"])}
      <fieldset>
        <legend>Rewards</legend>
        Check here{" "}
        <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=897565762">
          https://steamcommunity.com/sharedfiles/filedetails/?id=897565762
        </a>
      </fieldset>
    </div>
  );
}
