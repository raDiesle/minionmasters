import { anchorLinkTarget } from "components/helper";
import { TokenImg } from "components/thegame-icons";
import { MENU_LINKS_CONFIG } from "page/basics/resource-mgmt";
import React from "react";

export default function ChallengesRewards() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Challenges Rewards"])}
      <fieldset>
        <legend>Rewards</legend>
        <div>6 {TokenImg()}</div>
      </fieldset>
    </div>
  );
}
